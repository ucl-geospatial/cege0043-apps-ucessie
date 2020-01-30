// var
var earthquakeLayer;
var mymap;
var popup = L.popup();

// a function to request earthquake data
function getEarthquakeData() {
  var layerURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
  // create custom icon
  var testMarkerRed = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'red' });
  var testMarkerPink = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'pink' });
  $.ajax({url: layerURL, crossDomain: true,success: function(result){ console.log(result);
    // check that the data is correct , a console log
    // add the JSON layer onto the map - it will appear using the default icons
    // magnitude is 1.75 or less = pink; larger than is red
    earthquakelayer = L.geoJson(result, { pointToLayer: function (feature, latlng) {
      if (feature.properties.mag > 1.75) { return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place +"</b>"); }
      else { return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place +"</b>");; } }, }).addTo(mymap);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(earthquakelayer.getBounds()); }
    }); // end of the inner function
    } // end of the ajax request
    // end of the getEarthquakeData function
