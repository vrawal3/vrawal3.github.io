var data1 = [
    {group: "5", value: 4},
    {group: "6", value: 160},
    {group: "7", value: 8},
];

var data2 = [
    {group: "8", value: 7},
    {group: "9", value: 1},
    {group: "10", value: 20},
];

var data3 = [
    {group: "11", value: 10},
    {group: "12", value: 4},
    {group: "1", value: 14},
];

var data4 = [
    {group: "2", value: 7},
    {group: "3", value: 14},
    {group: "4", value: 9},
];

var x;
var y;
var xAxis;
var yAxis;
var svg;
var height;

function bar1() {
    // create 2 data_set
    
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Initialize the X axis
    x = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
    xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    
    // Initialize the Y axis
    y = d3.scaleLinear()
    .range([ height, 0]);
    yAxis = svg.append("g")
    .attr("class", "myYaxis")
    updateBar1(data1)
}

function updateBar1(data) {
    // Update the X axis
    x.domain(data.map(function(d) { return d.group; }))
    xAxis.call(d3.axisBottom(x))
    
    // Update the Y axis
    y.domain([0, d3.max(data, function(d) { return d.value }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    
    // Create the u variable
    var u = svg.selectAll("rect")
        .data(data)
    
    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function(d) { return x(d.group); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")
    
    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
}

var data11 = [
    {group: "1", value: 1},
    {group: "2", value: 2},
    {group: "3", value: 3},
];

var data22 = [
    {group: "1", value: 4},
    {group: "2", value: 5},
    {group: "3", value: 6},
];

var data33 = [
    {group: "1", value: 7},
    {group: "2", value: 8},
    {group: "3", value: 9},
];

var data44 = [
    {group: "1", value: 10},
    {group: "2", value: 11},
    {group: "3", value: 12},
];

var x1;
var y1;
var xAxis1;
var yAxis1;
var svg1;
var height1;

function bar2() {
    // create 2 data_set
    
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right;
    height1 = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    svg1 = d3.select("#my_dataviz1")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Initialize the X axis
    x1 = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
    xAxis1 = svg1.append("g")
    .attr("transform", "translate(0," + height1 + ")")
    
    // Initialize the Y axis
    y1 = d3.scaleLinear()
    .range([ height1, 0]);
    yAxis1 = svg1.append("g")
    .attr("class", "myYaxis")
    updateBar2(data11)
}

function updateBar2(data) {
    // Update the X axis
    x1.domain(data.map(function(d) { return d.group; }))
    xAxis1.call(d3.axisBottom(x1))
    
    // Update the Y axis
    y1.domain([0, d3.max(data, function(d) { return d.value }) ]);
    yAxis1.transition().duration(1000).call(d3.axisLeft(y1));
    
    // Create the u variable
    var u = svg1.selectAll("rect")
        .data(data)
    
    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function(d) { return x(d.group); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height1 - y(d.value); })
        .attr("fill", "#69b3a2")
    
    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
}

function update(data1, data2) {
    updateBar1(data1);
    updateBar2(data2);
}

function init() {
    bar1();
    bar2();
}

window.onload = init;