
var oauth, options

options = {
  requestTokenUrl: 'https://rws.netdna.com/oauth/request_token',
  authorizationUrl: 'https://rws.netdna.com/oauth/authorize',
  accessTokenUrl: 'https://rws.netdna.com/oauth/access_token'
}

/*globals chrome*/
chrome.storage.local.get(['MaxConsumerKey', 'MaxConsumerSecret'], function(items) {
  options.consumerKey = items.MaxConsumerKey
  options.consumerSecret = items.MaxConsumerSecret

  /*globals OAuth*/
  oauth = new OAuth(options)

  oauth.get('https://rws.netdna.com/jdorfman/reports/nodes.json/stats/monthly', function(response) {
    response = JSON.parse(response.text)
    document.getElementById('size').innerHTML = response.data.summary.size
    document.getElementById('cache-hits').innerHTML = response.data.summary.cache_hit
    document.getElementById('non-cache-hits').innerHTML = response.data.summary.noncache_hit
  })
})
