var user_lat;
var user_lon;

function startDataUpload() { alert ("start data upload");

  // get name/string value
  var question_title = document.getElementById("question_title").value;
  var question_text = document.getElementById("question_text").value;
  var answer_1 = document.getElementById("choice1").value;
  var answer_2 = document.getElementById("choice2").value;
  var answer_3 = document.getElementById("choice3").value;
  var answer_4 = document.getElementById("choice4").value;
  var correct_answer = document.getElementById("correct_answer").value;
  alert(question_title +  " " + question_text + " " + correct_answer);
  // a var that hold all detail together, then can parse data in app
  var postString = "question_title="+question_title +"&question_text="+question_text+"&answer_1="+answer_1+"&answer_2="+answer_2+"&answer_3="+answer_3+"&answer_4="+answer_4+"&correct_answer="+correct_answer;
  alert(postString);

  // now get the geometry values
  var latitude = user_lat;
  var longitude = user_lon;
  postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
  alert(postString);

  // now get the radio button values
  //if (document.getElementById("morning").checked) { postString=postString+"&lecturetime=morning"; }
  //if (document.getElementById("afternoon").checked) { postString=postString+"&lecturetime=afternoon"; }

  // finally add the port id
  postString = postString +"&port_id="+httpsPortNumberAPI;
  alert (postString); // close off the startDataUpload function
  processData(postString); //
}
// create ajax request/ post - insert data to api
function processData(postString) {
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI+"/insertQuestion"
  $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    success: function(data){console.log(data); dataUploaded(data);}, data: postString }); }
// create the code to process the response from the data server
function dataUploaded(data) {
// change the DIV to show the response
document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data); }


function deleteRecord() {
  var deleteID = document.getElementById("deleteID").value;
  var deleteString = "id="+deleteID + "&port_id="+httpsPortNumberAPI;
  var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI+"/deleteQuestion";
  $.ajax({ url: serviceUrl, crossDomain: true, type: "POST", success: function(data){
    console.log(data); dataDeleted(data);}, data: deleteString }); }
    function dataDeleted(data){
      document.getElementById("dataDeleteResult").innerHTML = JSON.stringify(data); }
