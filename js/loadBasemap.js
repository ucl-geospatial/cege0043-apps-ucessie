var mymap;
var popup = L.popup();
var quiz_lat;
var quiz_lon;
var latlng;
var current_position;
var current_accuracy;
var userlayer;

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
  L.marker([51.5, -0.09]).addTo(mymap) .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
  //addBasicMarkers();
  // load View
  mymap.on('locationfound', onLocationFound());
  mymap.on('locationerror', onLocationError());
  // locate view
  mymap.locate({setView: true, maxZoom: 16});

}

// get current showPosition
// placeholders for the L.marker and L.circle representing user's current position and accuracy
function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
        mymap.removeLayer(current_position);
        mymap.removeLayer(current_accuracy);
    }

    var radius = e.accuracy;

      current_position = L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are around here!").openPopup();

      current_accuracy = L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      alert(e.message);
    }

    // wrap map.locate in a function
    function locate() {
      mymap.locate({setView: true, maxZoom: 16});
    }

    // call locate every 3 seconds... forever
    function loadUserPosition(){
      mymap.on('locationfound', onLocationFound());
      mymap.on('locationerror', onLocationError());
    }
