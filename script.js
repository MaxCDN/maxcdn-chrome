var oauth, options

options = {
  requestTokenUrl: 'https://rws.netdna.com/oauth/request_token',
  authorizationUrl: 'https://rws.netdna.com/oauth/authorize',
  accessTokenUrl: 'https://rws.netdna.com/oauth/access_token'
}

var storageLocals = [
    'MaxConsumerKey'
  , 'MaxConsumerSecret'
  , 'MaxCompanyAlias'
]

/*globals chrome*/
chrome.storage.local.get(storageLocals, function(items) {

  // validate all the storage locals are there and strings
  for(var i=0; i<storageLocals.length; i++) {
    // redirect to set the options
    if (typeof items[storageLocals[i]] !== 'string') {
      alert('Please enter your credentials')
      chrome.tabs.create({ url: "options.html" })
      window.close()
      return
    }
  }

  options.consumerKey    = items.MaxConsumerKey
  options.consumerSecret = items.MaxConsumerSecret
  options.companyAlias   = items.MaxCompanyAlias

  /*globals OAuth*/
  oauth = new OAuth(options)
  var MCA = options.companyAlias

  /*globals moment*/
  var query = {
      date_from: moment().subtract('months', 1).format('YYYY-MM-DD')
    , date_to: moment().format('YYYY-MM-DD')
  }

  var url = 'https://rws.netdna.com/'
  url += MCA
  url += '/reports/nodes.json/stats'
  url += '?date_from=' + query.date_from
  url += '&'
  url += 'date_to=' + query.date_to

  oauth.get(url, function(response) {

    response = JSON.parse(response.text);
    console.log(response);

    // validate that we actually have some data
    var summary = response.data.summary
    if (typeof summary.cache_hit !== 'string') {
      chrome.tabs.create({ url: "no-data.html" })
      window.close()
    }

    /*globals numeral*/
    document.getElementById('size').innerHTML = numeral(summary.size).format('0.000 b');
    document.getElementById('cache-hits').innerHTML = numeral(summary.cache_hit).format('0.a');
    document.getElementById('non-cache-hits').innerHTML = numeral(summary.noncache_hit).format('0.a')

    // response.data
    // {
    //   stats [
    //     {
    //       pop_description = city
    //       cache_hit
    //       hit
    //       noncache_hit
    //       size
    //     }
    //   ]
    // }

    // we have to populate cdnData like [ { city: 'blah', bandwidth: 1234, hits: 1234 } ]
    var cdnData = [];

    var us_cities = ['Los Angeles', 'San Francisco', 'Seattle', 'New York', 'Atlanta', 'Dallas', 'Miami', 'Chicago', 'Virginia'];
    var eu_cities = ['Amsterdam', 'London', 'Frankfurt'];
    var us_rows = [];
    var eu_rows = [];

    /**
    for(var i=0; i<response.data.stats.length; i++) {
      var stat = response.data.stats[i];
      var needed = [ 'cache_hit', 'hit' ]; // , 'noncache_hit', 'size' ]
      var arr = [];
      arr.push(stat.pop_description);
      for (var n=0; n<needed.length; n++) {
        stat[needed[n]] = parseInt(stat[needed[n]], 10);
        arr.push(stat[needed[n]]);
      }
      cdnData.push(arr);
    }
    */
    //populate data for city data
    var tooltip = '';
    $.each(response.data.stats, function(i, stat){
        var statsize = parseInt(stat.size);
        var statsize_length = stat.size.length;
                    
        if (statsize_length >= 13) {
            statsize = statsize/1024/1024/1024/1024; //TB
            tooltip = "Requests: "+addCommas(stat.hit)+" Bandwidth: "+statsize.toFixed(2)+" TB";
        } else if (statsize_length >= 10 && statsize_length <= 12) {
            statsize = statsize/1024/1024/1024; //GB
            tooltip = "Requests: "+addCommas(stat.hit)+" Bandwidth: "+statsize.toFixed(2)+" GB";
        } else if (statsize_length >= 7 && statsize_length <= 9) {
            statsize = statsize/1024/1024; //MB
            tooltip = "Requests: "+addCommas(stat.hit)+" Bandwidth: "+statsize.toFixed(2)+" MB";
        } else if (statsize_length >= 4 && statsize_length <= 6) {
            statsize = statsize/1024; //KB
            tooltip = "Requests: "+addCommas(stat.hit)+" Bandwidth: "+statsize.toFixed(2)+" KB";
        } else {
            tooltip = "Requests: "+addCommas(stat.hit)+" Bandwidth: "+statsize.toFixed(2)+" bytes";
        }


        if ($.inArray(stat.pop_description, us_cities)>=0) {
            us_rows.push([
                stat.pop_description,
                parseInt(stat.hit),
                tooltip
                //parseFloat(stat.size/1024/1024/1024)
            ]);
        } else {
            eu_rows.push([
                stat.pop_description,
                parseInt(stat.hit),
                tooltip
                //parseFloat(stat.size/1024/1024/1024)
            ]);
        }
    });

    /*globals drawMarkersMap*/
    //drawMarkersMap(cdnData);
    drawMarkersMap(us_rows,eu_rows);
  })

})
