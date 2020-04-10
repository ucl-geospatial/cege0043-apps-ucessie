var user_lat;
var user_lon;

function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition); }
  else { document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; } }
function showPosition(position) {
  user_lat = position.coords.latitude;
  user_lon = position.coords.longitude;
  document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; }
