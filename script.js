
var oauth, options
options = {
  consumerKey: '8fa1456bfdfd4a8cd61cdddf751bd8ca051da6bbc',
  consumerSecret: 'a481537dbcc88035c77582e680772204',
  requestTokenUrl: 'https://rws.netdna.com/oauth/request_token',
  authorizationUrl: 'https://rws.netdna.com/oauth/authorize',
  accessTokenUrl: 'https://rws.netdna.com/oauth/access_token'
}

/*globals OAuth*/
oauth = new OAuth(options)

// https://rws.netdna.com/expresscdn/account.json
var url = 'https://rws.netdna.com/expresscdn/reports/nodes.json/stats/daily'
oauth.get(url, function(data) {
  var $el = document.getElementById('account-info')
  $el.innerHTML = data.text
})
