function getHighFive() {
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getHighFive/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log(result);
       loadHighFive(result);
          }});
   //end of the AJAX call
 }

 // adopt https://gist.github.com/jfreels/6734025
 function loadHighFive(result){
   data = result[0];
   console.log(data);
   d3.json(data, function (error,data) {
     if (error) {
           console.log("Had an error loading file.");
       }

     function tabulate(data, columns) {
   		var table = d3.select('body').append('table')
   		var thead = table.append('thead')
   		var	tbody = table.append('tbody');

   		// append the header row
   		thead.append('tr')
   		  .selectAll('th')
   		  .data(columns).enter()
   		  .append('th')
   		    .text(function (column) { return column; });

   		// create a row for each object in the data
   		var rows = tbody.selectAll('tr')
   		  .data(data)
   		  .enter()
   		  .append('tr');

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
   	tabulate(data, ['date', 'close']); // 2 column table

   });
 }
