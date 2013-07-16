 google.load('visualization', '1', {'packages': ['geochart']});
 google.setOnLoadCallback(drawMarkersMap);

  function drawMarkersMap() {
  var data = google.visualization.arrayToDataTable([
    ['City',   'Bandwidth', 'Hits'],
    ['Seattle',      2761477,    1285.31],
    ['Los Angeles',     1324110,    181.76],
    ['Chicago',    959574,     117.27],
    ['San Francisco',     907563,     130.17],
    ['Dallas',   655875,     158.9],
    ['Miami',     607906,     243.60],
    ['Atlanta',   380181,     140.7],
    ['Virginia',  371282,     102.41],
    ['New York', 67370,      213.44]
  ]);

  var options = {
//    region: 'US',
    displayMode: 'markers',
    colorAxis: {colors: ['black', 'orange']}
  };

  var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
  chart.draw(data, options);
};
