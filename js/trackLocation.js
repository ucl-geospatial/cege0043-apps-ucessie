var user_lat;
var user_lon;
var mymap;



function trackLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition); }
  else { document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser."; } }
function showPosition(position) {
  user_lat = position.coords.latitude;
  user_lon = position.coords.longitude;
  var marker = L.marker([user_lat,user_lon]).addTo(mymap).bindPopup("<b>You are here!</b>").openPopup();
  mymap.setView([user_lat, user_lon], 13)
  document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude; }
