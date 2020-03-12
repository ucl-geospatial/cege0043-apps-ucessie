// var
var pokemonGoLayer;
var mymap;
var popup = L.popup();

// a function to request earthquake data
function getPokemonGoData() {
  var layerURL = "data/pokemon_go_map.geojson";
  // create custom icon
  var style1 = { "color": "#ff4444", "weight": 5, "opacity": 0.65 };
  var style2 = { "color": "#ffff44", "weight": 5, "opacity": 0.65 };
  var style3 = { "color": "#114444", "weight": 5, "opacity": 0.65 };
  $.ajax({url: layerURL, crossDomain: true, success: function(result){ console.log(result);
  // load the geoJSON layer
  pokemonGoLayer = L.geoJSON().addTo(mymap);
  pokemonGoLayer.addData(result);
    // change the map zoom so that all the data is shown
    mymap.fitBounds(pokemonGoLayer.getBounds()); } });}// end of the inner function
