
/*globals google,drawMarkersMap*/
google.load('visualization', '1', {'packages': ['geochart']})


function addCommas(numstr)
{
  numstr += '';
  x = numstr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

//function drawMarkersMap(cdnData) {
function drawMarkersMap(us_rows,eu_rows) {  

  /*
  var data = google.visualization.arrayToDataTable([
    [ 'City',   'Bandwidth', 'Hits'],
    [ 'Seattle',      2761477,    1285.31],
    [ 'Los Angeles',     1324110,    181.76],
    [ 'Chicago',    959574,     117.27],
    [ 'San Francisco',     907563,     130.17],
    [ 'Dallas',   655875,     158.9],
    [ 'Miami', 607906,     243.60],
    [ 'Atlanta', 380181,     140.7],
    [ 'Virginia', 371282, 102.41],
    [ 'New York', 67370, 213.44]
  ])
  */

  /*globals cdnData*/
  var us_data = new google.visualization.DataTable();
  us_data.addColumn('string', 'City');
  //us_data.addColumn('number', 'Cache Hits');
  us_data.addColumn('number', 'Requests');
  us_data.addColumn({type:'string', role:'tooltip'});

  //us_data.addColumn({type:'string', role:'tooltip'});
  //us_data.addColumn('number', 'Hits');

  //data.addColumn('number', 'Non-cache Hits')
  //data.addColumn('number', 'Size')
  //us_data.addRows(cdnData);
  us_data.addRows(us_rows);


  var eu_data = new google.visualization.DataTable();
  eu_data.addColumn('string', 'City');
    //us_data.addColumn('number', 'Cache Hits');
  eu_data.addColumn('number', 'Requests');
  eu_data.addColumn({type:'string', role:'tooltip'});
  eu_data.addRows(eu_rows); 

  var formatter_cachehits = new google.visualization.NumberFormat({fractionDigits: 0});
  var formatter_hits = new google.visualization.NumberFormat({fractionDigits: 3});
  
  formatter_cachehits.format(us_data, 1); // Apply formatter to US second column
  formatter_cachehits.format(us_data, 2); // Apply formatter to US 3rd column

  formatter_cachehits.format(eu_data, 1); // Apply formatter to EU second column
  formatter_cachehits.format(eu_data, 2); // Apply formatter to EU 3rd column

  var us_options = {
    //region: 'US',
    showZoomOut: true,
    colorAxis: {colors:['red','#004411']},
    region: 'US',
    displayMode: 'markers',
    enableRegionInteractivity: true,
    resolution:'metros',
    legend: {textStyle: {color: '#333', fontSize: 12, numberFormat:'.###'}},
    magnifyingGlass:{enable: true, zoomFactor: 7.5},
    markerOpacity:0.65,
    sizeAxis:{minValue: 10,  maxSize: 30, minSize: 10, maxValue: 30},
    tooltip:  {textStyle: {color: '#000000'}, showColorCode: true},
    colorAxis: {minValue: 0, colors: ['orange', 'red']},
    keepAspectRatio: true,
    height: 275
  }

  var eu_options = {
    showZoomOut: true,
    region: 155,
    displayMode: 'markers',
    //enableRegionInteractivity: true,
    resolution:'countries',
    legend: {textStyle: {color: '#333', fontSize: 12, numberFormat:'.###'}},
    magnifyingGlass:{enable: true, zoomFactor: 7.5},
    markerOpacity:0.65,
    sizeAxis:{minValue: 10,  maxSize: 30, minSize: 10, maxValue: 30},
    tooltip:  {textStyle: {color: '#000000'}, showColorCode: true},
    colorAxis: {minValue: 0, colors: ['orange', 'red']},
    keepAspectRatio: true,
    height: 275
  }
  //us chart
  var us_chart = new google.visualization.GeoChart(document.getElementById('us_chart_div'))
  us_chart.draw(us_data, us_options);

  var eu_chart = new google.visualization.GeoChart(document.getElementById('eu_chart_div'));
  eu_chart.draw(eu_data, eu_options);


}
