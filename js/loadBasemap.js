var mymap;
var popup = L.popup();
var lon;
var lat;

function onMapClick(e) { popup .setLatLng(e.latlng) .setContent("You clicked the map at " + e.latlng.toString()) .openOn(mymap); }
console.log(loadLeafletMap);
function loadLeafletMap() {
mymap = L.map('content-wrapper').setView([51.52768, 120.131072], 13);
// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { maxZoom: 18, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>', id: 'mapbox.streets' }).addTo(mymap);
// now add the click event detector to the map
mymap.on('click', onMapClick);
//// now call the code to add the markers
//addBasicMarkers();
}
console.log(loadLeafletMap);
//end code to add the leaflet map
//console.log(addBasicMarkers);

function getLocation() {
  alert('getting location');
  navigator.geolocation.getCurrentPosition(addBasicMarkers); }

//function getPosition(position) {
  //document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; }

function addBasicMarkers(position) {
  // create custom icon
  var testMarkerPink = L.AwesomeMarkers.icon({ icon: 'play', markerColor: 'pink' });
  var lat = position.coords.latitude
  var lon = position.coords.longitude
  // add a point
  //L.marker([51.5, -0.09]).addTo(mymap) .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
  // create a geoJSON feature -
  var geojsonFeature = {
    "type": "Feature",
    "properties": {
      "name": "User location",
      "popupContent": "This is where you are!"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [lat ,lon] } };
      // and add it to the map with icon
      L.geoJSON(geojsonFeature, { pointToLayer: function (feature, latlng) { return L.marker(latlng, {icon:testMarkerPink}); } }).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
      // L.geoJSON(geojsonFeature).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");
  } // end code to add the basic markers
//sconsole.log(addBasicMarkers);
