var aData = ageData.map(d => ({
    age: d['AGE'],
    sex: d['SEX'],
    ageFreq: d['AGE_FREQUENCY']
  }))

var margin = ({top: 10, right: 20, bottom: 50, left: 105});

var visWidth = 400;
var visHeight = 400;
var sex = Array.from(new Set(aData.map(d => d.sex)));
var barColor = d3.scaleOrdinal().domain(sex).range(d3.schemeCategory10);
var x = d3.scaleLinear()
        .domain(d3.extent(aData, d => d.age)).nice()
        .range([0, visWidth])
var y = d3.scaleLinear()
        .domain(d3.extent(aData, d => d.ageFreq)).nice()
        .range([visHeight, 0])

function brushableScatterplot() {
  // set up

  // the value for when there is no brush
  const initialValue = aData;

  const svg = d3.select('#scatterPlot')
      .append("svg")
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom+50)
      .property('value', initialValue);

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.append("text")
     .attr("x", visWidth-100)
     .attr("y", visHeight+90)
     .attr("text-anchor", "middle")
     .style("font-size", "30px")
     .text("Frequency of Crashes by Age");
  
  // axes
  g.append("g").call(xAxis, x, 'Age');
  g.append("g").call(yAxis, y, 'Frequency');
  
  // draw points
  
  const radius = 3;
  
  const dots = g.selectAll('circle')
    .data(aData)
    .join('circle')
      .attr('cx', d => x(d.age))
      .attr('cy', d => y(d.ageFreq))
      .attr('fill', d =>  barColor(d.sex))
      .attr('opacity', 1)
      .attr('r', radius);
  
  // ********** brushing here **********
  
  const brush = d3.brush()
      // set the space that the brush can take up
      .extent([[0, 0], [visWidth, visHeight]])
      // handle events
      .on('brush', onBrush)
      .on('end', onEnd);
  
  g.append('g')
      .call(brush);
  
  function onBrush(event) {
    // event.selection gives us the coordinates of the
    // top left and bottom right of the brush box
    const [[x1, y1], [x2, y2]] = event.selection;
    
    // return true if the dot is in the brush box, false otherwise
    function isBrushed(d) {
      const cx = x(d.age);
      const cy = y(d.ageFreq)
      return cx >= x1 && cx <= x2 && cy >= y1 && cy <= y2;
    } 
    
    // style the dots
    dots.attr('fill', d => isBrushed(d) ? barColor(d.origin) : 'gray');
    
    // update the data that appears in the cars variable
    svg.property('value', aData.filter(isBrushed)).dispatch('input');
  }
  
  function onEnd(event) {
    // if the brush is cleared
    if (event.selection === null) {
      // reset the color of all of the dots
      dots.attr('fill', d => barColor(d.sex));
      svg.property('value', initialValue).dispatch('input');
    }
  }

  return svg.node();
}

function init() {
    const scatter = brushableScatterplot();
  }

window.onload = init;