import define1 from "./7a9e12f9fb3d8e06@459.js";
import define2 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# Vehicle Type Crash Frequency`
)}

function _2(md){return(
md`Reading data in from the Vehicles.csv file`
)}

function _files(FileAttachment){return(
FileAttachment("Vehicles.csv").csv({typed: true})
)}

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(BubbleChart,files){return(
BubbleChart(files, {
  label: d => d['MODEL'],
  value: d => d['VALUE'],
  group: d => d['VEHICLE_TYPE'],
  title: d => d['TITLE'],
  width: 850
})
)}

function _BubbleChart(d3,location){return(
function BubbleChart(data, {
  name = ([x]) => x,
  label = name, // The label printed on the bubbles
  value = ([, y]) => y,
  group, // Stores categories for the color
  title, // Stores text to show on hover
  link, linkTarget = "_blank",
  width = 600, height = width+100, padding = 3, 
  margin = 1, marginTop = margin, marginRight = margin, marginBottom = margin, marginLeft = margin,
  groups, // Stores domain of the color scale
  colors = d3.schemeTableau10,
  fill = "#ccc", fillOpacity = 0.7,
  stroke, strokeWidth, strokeOpacity,
} = {}) {
  
  // Get the values from the data to visualize
  const D = d3.map(data, d => d);
  const V = d3.map(data, value);
  const G = group == null ? null : d3.map(data, group);
  const I = d3.range(V.length).filter(i => V[i] > 0);

  // Map the groups (vehicle types)
  if (G && groups === undefined) groups = I.map(i => G[i]);
  groups = G && new d3.InternSet(groups);

  // Scale
  const color = G && d3.scaleOrdinal(groups, colors);

  // Compute labels and titles.
  const L = label == null ? null : d3.map(data, label);
  const T = title === undefined ? L : title == null ? null : d3.map(data, title);

  const root = d3.pack()
      .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
      .padding(padding)
    (d3.hierarchy({children: I})
      .sum(i => V[i]));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-marginLeft, -marginTop, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("fill", "currentColor")
      .attr("font-size", 8.5)
      .attr("font-weight", "bold")
      .attr("font-family", "helvetica")
      .attr("text-anchor", "middle");

  const leaf = svg.selectAll("a")
    .data(root.leaves())
    .join("a")
      .attr("xlink:href", link == null ? null : (d, i) => link(D[d.data], i, data))
      .attr("target", link == null ? null : linkTarget)
      .attr("transform", d => `translate(${d.x},${d.y})`);

  // Inserting title for the bubble chart
  svg.append("text")
     .attr("x", width/2)
     .attr("y", padding+40)
     .attr("text-anchor", "middle")
     .style("font-size", "20px")
     .text("Vehicle Type Crash Frequency");

  // Drawing each bubble
  leaf.append("circle")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-opacity", strokeOpacity)
      .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
      .attr("fill-opacity", fillOpacity)
      .attr("r", d => d.r);

  if (T) leaf.append("title")
      .text(d => T[d.data]);

  if (L) {

    const uid = `O-${Math.random().toString(16).slice(2)}`;

    leaf.append("clipPath")
        .attr("id", d => `${uid}-clip-${d.data}`)
      .append("circle")
        .attr("r", d => d.r);

    leaf.append("text")
        .attr("clip-path", d => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`)
      .selectAll("tspan")
      .data(d => `${L[d.data]}`.split(/\n/g))
      .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
        .attr("fill-opacity", (d, i, D) => i === D.length - 1 ? 0.7 : null)
        .text(d => d);
  }

  return Object.assign(svg.node(), {scales: {color}});
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Vehicles.csv", {url: new URL("./files/535a0ac9c837d99116e6096866db76468292420902d7a9c9a914284ae08c19110339db6ee32f9e800e0c8a482f00ef6919c763c85066d1398c77f130c3e91b9f.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("files")).define("files", ["FileAttachment"], _files);
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["BubbleChart","files"], _chart);
  main.variable(observer("BubbleChart")).define("BubbleChart", ["d3","location"], _BubbleChart);
  const child1 = runtime.module(define1);
  main.import("howto", child1);
  const child2 = runtime.module(define2);
  main.import("Swatches", child2);
  return main;
}
