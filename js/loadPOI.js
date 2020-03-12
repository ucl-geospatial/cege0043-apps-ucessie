// var
var poiLayer;
var mymap;
var popup = L.popup();

// a function to request earthquake data
function getPOIdata() {
  var layerURL = "https://developer.cege.ucl.ac.uk:30271/getPOI";
  // create custom icon
  var testMarkerRed = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'red' });
  var testMarkerPink = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'pink' });
  $.ajax({url: layerURL, crossDomain: true,success: function(result){ console.log(result);
    // check that the data is correct , a console log
    // add the JSON layer onto the map - it will appear using the default icons
    // magnitude is 1.75 or less = pink; larger than is red
    poiLayer = L.geoJson(result, { pointToLayer: function (feature, latlng) {
      var isParking = feature.properties.name.toLowerCase().indexOf("parking"); console.log(isParking);
      switch (true) {
        case (isParking > -1):
        return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.name +"</b>");
        break;

        default:
        return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.name +"</b>");
        break; }}}).addTo(mymap);

    // change the map zoom so that all the data is shown
    mymap.fitBounds(poiLayer.getBounds()); }
    }); // end of the inner function
    } // end of the ajax request
    // end of the getPOI function
