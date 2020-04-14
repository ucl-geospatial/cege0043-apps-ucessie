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


 // question data table
 function getQuestionTable() {
   $.ajax(
     {
      url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/quizquestions/"+ httpsPortNumberAPI ,
      crossDomain: true,
      success: function(result){
        console.log("Question Table!")
        console.log(result);
        loadQuestion(result);
           }});
    //end of the AJAX call
  }
  // idea came from: https://stackoverflow.com/questions/9268645/creating-a-table-linked-to-a-csv-file
  // adopt https://gist.github.com/jfreels/6734025
  function loadQuestion(result){
    rank_arr = result[0].features;
    console.log(typeof rank_arr);

      function tabulate(data, columns) {
    		var table = d3.select('#questionTable').append('table');
    		var thead = table.append('thead');
    		var	tbody = table.append('tbody');
       console.log(data[0].properties);
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
    		      return {column: column, value: row.properties[column]};
    		    });
    		  })
    		  .enter()
    		  .append('td')
    		  .text(function (d) { return d.value; });

    	  return table;
    	}

    	// render the table(s)
    	tabulate(rank_arr, ['id', 'question_title', 'question_text', 'answer_1', 'answer_2', 'answer_3', 'answer_4', 'correct_answer', 'port_id']); // 9 column table

  }

// get Question added from last week
// question data table
function getLastWeekTable() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getLastWeek/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log("Last Week Question Table!")
       console.log(result);
       loadLastWeek(result);
          }});
   //end of the AJAX call
 }
 // idea came from: https://stackoverflow.com/questions/9268645/creating-a-table-linked-to-a-csv-file
 // adopt https://gist.github.com/jfreels/6734025
 function loadLastWeek(result){
   rank_arr = result[0].features;
   console.log(typeof rank_arr);

     function tabulate(data, columns) {
       var table = d3.select('#lastweekTable').append('table');
       var thead = table.append('thead');
       var	tbody = table.append('tbody');
      console.log(data[0].properties);
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
             return {column: column, value: row.properties[column]};
           });
         })
         .enter()
         .append('td')
         .text(function (d) { return d.value; });

       return table;
     }

     // render the table(s)
     tabulate(rank_arr, ['id', 'question_title', 'question_text', 'answer_1', 'answer_2', 'answer_3', 'answer_4', 'correct_answer', 'port_id']); // 9 column table

 }
