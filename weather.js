function bar1() {
    // create 2 data_set
    var data1 = [
        {group: "5", value: 4},
        {group: "6", value: 16},
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
    
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Initialize the X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .padding(0.2);
    var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    
    // Initialize the Y axis
    var y = d3.scaleLinear()
    .range([ height, 0]);
    var yAxis = svg.append("g")
    .attr("class", "myYaxis")

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

    updateBar1(data1)
}

function update(data) {
    updateBar1(data);
}

function init() {
    bar1();
}

window.onload = init;