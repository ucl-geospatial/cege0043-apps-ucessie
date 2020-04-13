// advanced function 1
var mymap;
var popup = L.popup();
var user_lat;
var user_lon;
var nearestLayer;

function getFormData() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/quizquestions/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log(result);
       loadFormData(result); }});
   //end of the AJAX call
 }
// advanced function
// create ajax request/ post - insert data to api
function calculateNearest() {
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI+"/getGeoJson/getNearest";
  var postString = "user_lat="+user_lat+"&user_lon="+user_lon;
  $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    success: function(data){console.log(data); drawNearest(data);}, data: postString }); }

// draw nearest point to layer
function drawNearest(data){
  // load the geoJSON layer
  nearestLayer = L.geoJson(data,
    { // use point to layer to create the points
      pointToLayer: function (feature, latlng) {
        // in this case, we build an HTML DIV string
        // using the values in the data
        var htmlString = "<div id='popup'"+feature.properties.id +"><h2>" + feature.properties.question_title + "</h2><br>";
        htmlString = htmlString + "<h3>"+feature.properties.question_text + "</h3><br>";
        // unique id for each answer
        htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1'/>"+feature.properties.answer_1+"<br>";
        htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
        htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
        htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
        htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
        // now include a hidden element with the answer
        // in this case the answer is alwasy the first choice
        // for the assignment this will of course vary - you can use feature.properties.correct_answer
        htmlString = htmlString + "<div id=answer"+feature.properties.id+" hidden>"+feature.properties.correct_answer+"</div>";
        htmlString = htmlString + "</div>";
        console.log(htmlString);
        console.log(latlng);
        return L.marker(latlng).bindPopup(htmlString);
      },
    }).addTo(mymap);
    mymap.fitBounds(nearestLayer.getBounds());
}
// advanced function (Correct answer)
function getCorrectAnswer() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getCorrectAnswer/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log(result);
       loadCorrectAnswer(result); }});
   //end of the AJAX call
 }
 function loadCorrectAnswer(result){
   var ans = result[0].array_to_json[0].num_questions;
   document.getElementById("loadCorrectAnswer").innerHTML = "You have " + ans +"questions answered correctly!";
 }


// advanced function (Show Ranking)
function getQuizRanking() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getRanking/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log(result);
       loadRanking(result);}});
   //end of the AJAX call
 }
 function loadRanking(result){
   var ans = result[0].array_to_json[0].rank;
   console.log(ans);
   document.getElementById("loadRank").innerHTML = "You are currently ranked: " + ans ;
 }

// advanced function (Top Five participates)
function getHighFive() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getHighFive/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log(result);
       loadHighFive(result);}});
   //end of the AJAX call
 }
 function loadHighFive(result){
   var rank = result[0].array_to_json[0].rank;
   var port_id = result[0].array_to_json[0].port_id;
   for(var i=0; i < rank.length; i++)
    document.getElementById("loadHighFive").innerHTML += "rank: "+rank[i]+", port_id: "+port_id[i] + "<br>";
 }
// advanced function 1
// advanced function 1
// advanced function 1
// advanced function 1
