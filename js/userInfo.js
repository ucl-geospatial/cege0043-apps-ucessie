function getHighFive() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getHighFive/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log("HighFive!")
       console.log(result);
       loadHighFive(result);
          }});
   //end of the AJAX call
 }

 // adopt https://gist.github.com/jfreels/6734025
 function loadHighFive(result){
   rank_arr = result[0].array_to_json;
   console.log(typeof rank_arr);

     function tabulate(data, columns) {
   		var table = d3.select('#highFive').append('table');
   		var thead = table.append('thead');
   		var	tbody = table.append('tbody');
      console.log(data);
   		// append the header row
   		thead.append('tr')
   		  .selectAll('th')
   		  .data(columns)
        .enter()
   		  .append('th')
   		  .text(function (column) { return column; });
      console.log(thead);
   		// create a row for each object in the data
   		var rows = tbody.selectAll('tr')
   		  .data(data)
   		  .enter()
   		  .append('tr');
      console.log(rows);
   		// create a cell in each row for each column
   		var cells = rows.selectAll('td')
   		  .data(function (row) {
   		    return columns.map(function (column) {
   		      return {column: column, value: row[column]};
   		    });
   		  })
   		  .enter()
   		  .append('td')
   		    .text(function (d) { return d.value; });

   	  return table;
   	}

   	// render the table(s)
   	tabulate(rank_arr, ['rank', 'port_id']); // 2 column table

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
    document.getElementById("youAnswer").innerHTML = "You have " + ans +"questions answered correctly!";
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
    document.getElementById("youRank").innerHTML = "You are currently ranked: " + ans ;
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
    console.log(rank);
    for(var i=0; i < rank.length; i++)
     document.getElementById("loadHighFive").innerHTML += "rank: "+rank[i]+", port_id: "+port_id[i] + "<br>";
  }
