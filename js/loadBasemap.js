var mymap;
var popup = L.popup();
var user_lat;
var user_lon;
var latlng;


// get location from starting pointToLayer
alert('getting location');
function onMapClick(e) {
  popup .setLatLng(e.latlng) .setContent("You clicked the map at " + e.latlng.toString()) .openOn(mymap);
   document.getElementById('quiz_latitude').innerHTML = e.latlng.lat;
   document.getElementById('quiz_longitude').innerHTML = e.latlng.lng;
   user_lat = document.getElementById('quiz_latitude').innerHTML
   user_lon = document.getElementById('quiz_longitude').innerHTML
   console.log(e.latlng);
}

// track position
function setLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      function loadLeafletMap(location) {
      lat = location.coords.latitude;
      lon = location.coords.longitude;
      latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      // set lat lon position
      mymap = L.map('content-wrapper').setView(latlng, 13);
      // load the tiles
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { maxZoom: 18, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>', id: 'mapbox.streets' }).addTo(mymap);
      // now add the click event detector to the map
      mymap.on('click', onMapClick);
      // now call the code to add the markers
      addBasicMarkers();
      //end code to add the leaflet map
      var marker = L.marker(latlng).addTo(mymap);
    });
  }
  else { document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; }
}

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);
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
