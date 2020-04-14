var mymap;
var popup = L.popup();
var quiz_lat;
var quiz_lon;
var latlng;
var user_lat;
var user_lon;
var userlayer;

// get location from starting pointToLayer
function onMapClick(e) {
  popup .setLatLng(e.latlng) .setContent("You clicked the map at " + e.latlng.toString()) .openOn(mymap);
   document.getElementById('quiz_latitude').innerHTML = e.latlng.lat;
   document.getElementById('quiz_longitude').innerHTML = e.latlng.lng;
   quiz_lat = document.getElementById('quiz_latitude').innerHTML
   quiz_lon = document.getElementById('quiz_longitude').innerHTML
   console.log(e.latlng);
}
// this for pc set up
function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition); }
  else { document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; } }
function showPosition(position) {
  user_lat = position.coords.latitude;
  user_lon = position.coords.longitude;
  //var marker = L.marker([user_lat,user_lon]).addTo(mymap).bindPopup("<b>You are here!</b>").openPopup();
  mymap.setView([user_lat, user_lon], 20);
  document.getElementById('showLocation').innerHTML = "Latitude: " + user_lat + "<br>Longitude: " + user_lon;

}


// load base map
function loadLeafletMap() {
  console.log(user_lat);
  mymap = L.map('content-wrapper').setView([0, 0], 15);
  // load the tiles
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', { maxZoom: 18, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>', id: 'mapbox.streets' }).addTo(mymap);
  // now add the click event detector to the map
  mymap.on('click', onMapClick);
}

// load user center view
function loadUserLoc(){
  mymap.setView([user_lat, user_lon], 13);
}
