function draw(){
  const svg     = d3.select("#svg1"),
        margin  = {top: 20, right: 20, bottom: 30, left: 50},
        width   = +svg.attr("width")  - margin.left - margin.right,
        height  = +svg.attr("height") - margin.top  - margin.bottom,
        x       = d3.scaleBand().rangeRound([0, width]).padding(0.2),
        y       = d3.scaleLinear().rangeRound([height, 0]),
        g       = svg.append("g")
                     .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").then(data => {
    data = data.features;
    console.log(typeof data);
    x.domain(data.map(d => d.properties.place));
    y.domain([0, d3.max(data, d => d.properties.mag)]);

    g.append("g")
        .attr("class", "axis axis-x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));


    g.append("g")
        .attr("class", "axis axis-y")
        .call(d3.axisLeft(y).ticks(10).tickSize(8));

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.properties.place))
        .attr("y", d => y(d.properties.mag))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.properties.mag));
  })
  .catch(err => {
    svg.append("text")
          .attr("y", 20)
          .attr("text-anchor", "left")
          .style("font-size", "20px")
          .style("font-weight", "bold")
          .text(`Couldn't open the data file: "${err}".`);
  });
}

function getMyParticipate(){
  $.ajax(
    {
     url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/getHighFive/"+ httpsPortNumberAPI ,
     crossDomain: true,
     success: function(result){
       console.log(result);
       loadMyPart(result);
          }});
   //end of the AJAX call
 }

 // adopt https://gist.github.com/jfreels/6734025
 function loadMyPart(result){
    rank_arr = result[0].array_to_json;
    console.log(typeof rank_arr);
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var y = d3.scaleLinear()
              .range([height, 0]);
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#svg2").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

          // format the data
          data.forEach(function(d) {
            d.questions_correct = +d.questions_correct;
            });

          // Scale the range of the data in the domains
          x.domain(data.map(function(d) { return d.day; }));
          y.domain([0, d3.max(data, function(d) { return d.questions_correct; })]);

          // append the rectangles for the bar chart
          svg.selectAll(".bar")
             .data(data)
             .enter().append("rect")
             .attr("class", "bar")
             .attr("x", function(d) { return x(d.questions_correct); })
             .attr("width", x.bandwidth())
             .attr("y", function(d) { return y(d.day); })
             .attr("height", function(d) { return height - y(d.questions_correct); });

          // add the x Axis
          svg.append("g")
             .attr("transform", "translate(0," + height + ")")
             .call(d3.axisBottom(x));

          // add the y Axis
          svg.append("g")
              .call(d3.axisLeft(y));

}
