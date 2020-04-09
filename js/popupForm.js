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
   // end of getFormData

//function formDataResponse(result){
  //var formData = result.responseText;
  //loadFormData(formData);
//}

// keep the layer global so that we can automatically pop up a
// pop-up menu on a point if necessary
// we can also use this to determine distance for the proximity alert
var formLayer;
function loadFormData() {
  $.ajax({
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/quizquestions/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
      console.log(result);
  // convert the text received from the server to JSON
  //var formJSON = JSON.parse(formData);
  //console.log(formData);
  // load the geoJSON layer
  formLayer = L.geoJson(result,
    { // use point to layer to create the points pointToLayer:
      function (feature, latlng) {
        // in this case, we build an HTML DIV string
        // using the values in the data
        //var htmlString = "<div id='popup'"+feature.properties.id +">s<h2>" + feature.properties.question_title + "</h2><br>";
        //htmlString = htmlString + "<h3>"+feature.properties.question_text + "</h3><br>";
        // unique id for each answer
        //htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1'/>"+feature.properties.answer_1+"<br>";
        //htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
        //htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
        //htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
        //htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
        // now include a hidden element with the answer
        // in this case the answer is alwasy the first choice
        // for the assignment this will of course vary - you can use feature.properties.correct_answer
        //htmlString = htmlString + "<div id=answer"+feature.properties.id+" hidden>feature.properties.correct_answer</div>";
        //htmlString = htmlString + "</div>";
        htmlString = "<div id='test1'><b>"+ feature.properties.question_text+"</b></div>";
        console.log(htmlString);
        console.log(latlng);
        return L.marker(latlng).bindPopup(htmlString);
      },
    }).addTo(mymap);
    mymap.fitBounds(formLayer.getBounds());
    }
  });
};


function checkAnswer(questionID) {
  // get the answer from the hidden div
  // NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed
  var answer = document.getElementById("answer"+questionID).innerHTML;
  // now check the question radio buttons
  var correctAnswer = false;
  var answerSelected = 0;
  for (var i=1; i < 5; i++) {
    if (document.getElementById(questionID+"_"+i).checked){ answerSelected = i; }
    if ((document.getElementById(questionID+"_"+i).checked) && (i == answer)) { alert ("Well done"); correctAnswer = true; } }
    if (correctAnswer === false) {
      // they didn't get it right
      alert("Better luck next time"); }
      // now close the popup
      mymap.closePopup();
      // the code to upload the answer to the server would go here
      // call an AJAX routine using the data
      // the answerSelected variable holds the number of the answer
      //that the user picked
    }
