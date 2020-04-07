var mymap;
var popup = L.popup();
var quiz_lat;
var quiz_lon;
var latlng;
var current_position;
current_accuracy;

// get location from starting pointToLayer
alert('getting location');
function onMapClick(e) {
  popup .setLatLng(e.latlng) .setContent("You clicked the map at " + e.latlng.toString()) .openOn(mymap);
   document.getElementById('quiz_latitude').innerHTML = e.latlng.lat;
   document.getElementById('quiz_longitude').innerHTML = e.latlng.lng;
   quiz_lat = document.getElementById('quiz_latitude').innerHTML
   quiz_lon = document.getElementById('quiz_longitude').innerHTML
   console.log(e.latlng);
}

// set center user view
function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(loadLeafletMap); }
  else { document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; } }


// load base map
function loadLeafletMap() {
  mymap = L.map('content-wrapper');
  // load the tiles
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { maxZoom: 18, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>', id: 'mapbox.streets' }).addTo(mymap);
  // now add the click event detector to the map
  mymap.on('click', onMapClick);
  // now call the code to add the markers
  addBasicMarkers();
}

// get current showPosition
// placeholders for the L.marker and L.circle representing user's current position and accuracy
function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }

    var radius = e.accuracy / 2;

      current_position = L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      current_accuracy = L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      alert(e.message);
    }

    // wrap map.locate in a function
    function locate() {
      map.locate({setView: true, maxZoom: 16});
    }

    // call locate every 3 seconds... forever
    function loadUserPosition(){
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
    }



function addBasicMarkers(position) {
  // create custom icon
  var testMarkerPink = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'pink' });
  // add a point
  L.marker([lat,lon]).addTo(mymap) .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
  // create a geoJSON feature -
  var geojsonFeature = {
    "type": "Feature",
    "properties": {
      "name": "User location",
      "popupContent": "This is where you are!"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [lat, lon] } };
      // and add it to the map with icon
      L.geoJSON(geojsonFeature, { pointToLayer: function (feature, latlng) { return L.marker(latlng, {icon:testMarkerPink}); } }).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
      // L.geoJSON(geojsonFeature).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
  } // end code to add the basic markers
console.log(addBasicMarkers);
