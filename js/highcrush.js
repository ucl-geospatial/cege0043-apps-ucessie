// var
var mymap;
var popup = L.popup();
var highRiskCrashZones;

function getHighRiskCrashZonesData() {
  var layerURL = "https://api.qldtraffic.qld.gov.au/v1/highriskcrashzones";
  // create custom icon
  var style1 = { "color": "#ff4444", "weight": 5, "opacity": 0.65 };
  var style2 = { "color": "#ffff44", "weight": 5, "opacity": 0.65 };
  var style3 = { "color": "#114444", "weight": 5, "opacity": 0.65 };
  $.ajax({url: layerURL, crossDomain: true, success: function(result){ console.log(result);
  // load the geoJSON layer
  highRiskCrashZones = L.geoJSON().addTo(mymap);
  highRiskCrashZones.addData(result);
  // iterate over the lines and set style depending on district
  highRiskCrashZones.eachLayer(function(layer) { console.log(layer); switch (layer.feature.properties.District) {
    case "Metropolitan": layer.setStyle(style1); break;
    case "Metropolitan / South Coast": layer.setStyle(style2); break; default: layer.setStyle(style2); } });
    // change the map zoom so that all the data is shown
    mymap.fitBounds(highRiskCrashZones.getBounds()); } });}// end of the inner function
