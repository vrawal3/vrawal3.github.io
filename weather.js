var x;
var y;
var xAxis;
var yAxis;
var svg;
var height;

function bar1() {

    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right;
    height = 400 - margin.top - margin.bottom;
    
    svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
    .attr("x", width/2)
    .attr("y", height+50)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("Crashes Frequency by Season");

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left-40)
    .attr("x", -margin.top)
    .text("Y axis title")

    
    x = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
    xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    
    y = d3.scaleLinear()
    .range([ height, 0]);
    yAxis = svg.append("g")
    .attr("class", "myYaxis")
    updateBar1(data1)
}

function updateBar1(data) {

    x.domain(data.map(function(d) { return d.group; }))
    xAxis.call(d3.axisBottom(x))
    
    y.domain([0, d3.max(data, function(d) { return d.value }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    
    var u = svg.selectAll("rect")
        .data(data)
    u
        .enter()
        .append("rect") 
        .merge(u) 
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d.group); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")
    u
        .exit()
        .remove()
}

// -------------------------------------------------------------------------------------------------------------------------------------

var x1;
var y1;
var xAxis1;
var yAxis1;
var svg1;
var height1;

function bar2() {

    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right;
    height1 = 400 - margin.top - margin.bottom;
    
    svg1 = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height1 + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    svg1.append("text")
        .attr("x", width/2)
        .attr("y", height1+50)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Crashes Frequency by Weather Conditions");

    x1 = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
    xAxis1 = svg1.append("g")
    .attr("transform", "translate(0," + height1 + ")")
    
    y1 = d3.scaleLinear()
    .range([ height1, 0]);
    yAxis1 = svg1.append("g")
    .attr("class", "myYaxis")
    updateBar2(ata1)
}

function updateBar2(data) {

    x1.domain(data.map(function(d) { return d.group; }))
    xAxis1.call(d3.axisBottom(x1))
    
    y1.domain([0, d3.max(data, function(d) { return d.value }) ]);
    yAxis1.transition().duration(1000).call(d3.axisLeft(y1));
    
    var u = svg1.selectAll("rect")
        .data(data)
    u
        .enter()
        .append("rect") 
        .merge(u) 
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x1(d.group); })
        .attr("y", function(d) { return y1(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height1 - y1(d.value); })
        .attr("fill", "#FAA0A0")
    u
        .exit()
        .remove()
}

// -------------------------------------------------------------------------------------------------------------------------------------

function update(d1, d2) {
    updateBar1(d1);
    updateBar2(d2);
}

function init() {
    bar1();
    bar2();
}

window.onload = init;