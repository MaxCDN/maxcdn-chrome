var oauth, options

options = {
  requestTokenUrl: 'https://rws.netdna.com/oauth/request_token',
  authorizationUrl: 'https://rws.netdna.com/oauth/authorize',
  accessTokenUrl: 'https://rws.netdna.com/oauth/access_token'
}

/*globals chrome*/
chrome.storage.local.get(['MaxConsumerKey', 'MaxConsumerSecret', 'MaxCompanyAlias'], function(items) {
  options.consumerKey    = items.MaxConsumerKey
  options.consumerSecret = items.MaxConsumerSecret
  options.companyAlias = items.MaxCompanyAlias

  /*globals OAuth*/
  oauth = new OAuth(options)
  var MCA = options.companyAlias
//  oauth.get('https://rws.netdna.com/jdorfman/reports/nodes.json/stats/monthly', function(response) {
  oauth.get('https://rws.netdna.com/' + MCA + '/reports/nodes.json/stats/monthly', function(response) {
    response = JSON.parse(response.text)
    document.getElementById('size').innerHTML = numeral(response.data.summary.size).format('0.000 b');
    document.getElementById('cache-hits').innerHTML = numeral(response.data.summary.cache_hit).format('0.a');
    document.getElementById('non-cache-hits').innerHTML = numeral(response.data.summary.noncache_hit).format('0.a')
  })
})
