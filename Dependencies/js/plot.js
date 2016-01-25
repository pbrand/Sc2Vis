var viewHeight = 402;
var viewWidth = 402;
var linePlotMargin = {top: 20, left: 100, right: 20, bottom: viewHeight - ((5/6)*viewHeight), left: 40};
var selectionPlotMargin = {top: viewHeight - ( (1/6)*viewHeight), right: 20, bottom: 20, left: 40};
var lpWidth = viewWidth - linePlotMargin.left - linePlotMargin.right;
var lpHeight = viewHeight - linePlotMargin.top - linePlotMargin.bottom;
var lpHeight2 = viewHeight;// - selectionPlotMargin.top - selectionPlotMargin.bottom;

var data1 = []; var data2 = [];var allData =[];
var resource = 'minerals'; var stat = 'CollectionRate';
prepareData();

var xExtent, x, y, x2, y2, xAxis, xAxis2, yAxis, brush, scatterPlotSvg, focus;
function initPlot() {
  xExtent = d3.extent(allData, function(d) { return d['gameloop'] });
  yExtent = d3.extent(allData, function(d) { return d[stat] }); 

  x = d3.time.scale()
      .domain(xExtent).nice()
      .range([0, lpWidth]);

  y = d3.scale.linear()
      .domain(yExtent).nice()
      .range([lpHeight, 0]);
      
  x2 = d3.scale.linear()
      .domain([0, d3.max(allData, function(d) { return d['gameloop'] })])
      .range([0, lpWidth]);

  y2 = d3.scale.linear()
      .domain(y.domain())
      .range([lpHeight2, 0]);

  var v_ = Math.ceil(getMinutes(xExtent[1]) / 5);
  console.log(getMinutes(xExtent[1]));
  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    //.ticks(d3.time.minute, 1)
    .ticks(d3.time.minutes, v_)
    .tickFormat(d3.time.format('%M:%S'));
    
  xAxis2 = d3.svg.axis()
       .scale(x2)
       .orient("bottom");

  yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");
      
  brush = d3.svg.brush()
      .x(x2)
      .extent(timeFrame)
      .on("brush", brushed);

  scatterPlotSvg = d3.select("#scatterplot").select("svg")
      .attr("width", viewWidth + 10)
      .attr("height", viewHeight - 42);

  focus = scatterPlotSvg.append("g")
      .attr("player", "focus")
      .attr("transform", "translate(" + (linePlotMargin.left + 10) + "," + linePlotMargin.top + ")");
}

function prepareData() {
  data1 = []; data2 = [];
  for(var e in economy[0]) {
    var d = {};
    d['gameloop'] = economy[0][e].gameloop / 16.0 * 1000;
    d[stat] = economy[0][e][resource][stat];
    data1.push(d);
  }
  for(var e in economy[1]) {
    var d = {};
    d['gameloop'] = economy[1][e].gameloop / 16.0 * 1000;
    d[stat] = economy[1][e][resource][stat];
    data2.push(d);
  }
  allData = data1.concat(data2);
}

var firstTime = true;
function drawScatterplot(resetDomain) {
  if (resetDomain === 'undefined') resetDomain = false;
  if (resetDomain) {
    x2.domain([0, d3.max(allData, function(d) { return d['gameloop'] })]);
  }

  var line = d3.svg.line()
             .x(function(d){ return x(d['gameloop']); }) //+(d.tsync));})
             .y(function(d){ return y(d[stat]); })  //d3.format(".3f")(d.DD));})
             .interpolate("basis"); 

  var line2 = d3.svg.line()
               .x(function(d){return x2(d['gameloop']) }) //+(d.tsync));})
               .y(function(d){return y2(d[stat]) })  //d3.format(".3f")(d.DD));})
               .interpolate("basis");

  focus.append("g")
      .attr("id", "xAxis")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + lpHeight + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("id", "xLabel")
      .attr("x", lpWidth)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Time (mm:ss)");

  focus.append("g")
      .attr("id", "yAxis")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("id", "yLabel")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(convertCamelCase(stat));

  focus.append("path")
      .attr("class", "line")
      .attr("d", line(data1))
      .attr("data-legend", player1_Name)
      .attr("clip-path", "url(#clip)")
      .style("stroke-width", 1)
      .style("stroke", saturateColor(player1_Color,100))
      .style("fill", "none");

  focus.append("path")
    .attr("class", "line2")
    .attr("d", line(data2))
    .attr("data-legend", player2_Name)
    .attr("clip-path", "url(#clip)")
      .style("stroke-width", 1)
      .style("stroke", saturateColor(player2_Color,100))
      .style("fill", "none");

      focus.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", lpHeight + 7);
      
  var legend = focus.append("g")
      .attr("class", "legend");

  legend.append("rect")
      .attr("x", lpWidth - 18)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", saturateColor(player1_Color,100));

  legend.append("text")
      .attr("x", lpWidth - 22)
      .attr("y", 6)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(player1_Name);
      
  legend.append("rect")
      .attr("x", lpWidth - 18)
      .attr("y", 30)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", saturateColor(player2_Color,100));
      
  legend.append("text")
      .attr("x", lpWidth - 22)
      .attr("y", 36)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(player2_Name);
}

function drawBrush() {
  //var offset = 10;
  // define our brush extent to be begin and end of the year
  //brush.extent([brush.extent()[0] + offset, brush.extent()[1] + offset]);

  // now draw the brush to match our extent
  // use transition to slow it down so we can see what is happening
  // remove transition so just d3.select(".brush") to just draw
  brush(d3.select(".brush"));

  // now fire the brushstart, brushmove, and brushend events
  // remove transition so just d3.select(".brush") to just draw
  /*brush.event(d3.select(".brush"));
  if((brush.extent()[1] + offset) > x2.domain()[1]){
    clearInterval(stop_running);
    running = false;
    document.getElementById("runButton").innerHTML = "Play";

    brush.extent([0, 120]);
    brush(d3.select(".brush"));
    brush.event(d3.select(".brush"));
  }*/
}

var running = false;
var stop_running = false;
function run() {
if(!running){
    stop_running = setInterval(drawBrush, 50);
    running = true;
    document.getElementById("runButton").innerHTML = "Pause";
  }
  else{
    clearInterval(stop_running);
    running = false;
    document.getElementById("runButton").innerHTML = "Play";
  }
}

function brushed() {
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  /*focus.select(".line").attr("d", line(data1));
  focus.select(".line2").attr("d", line(data2));
  focus.select(".x.axis").call(xAxis);*/
  timeFrame = brush.extent();
  initMap();
  generateDonutCharts();
  initBarCharts();

  // Redraw
  if (typeof redraw !== 'undefined') {
    redraw();
  }
}

function resizeScatterplot() {
  $('#scatterplot svg').html("")
  prepareData();
  initPlot();

  firstTime = false;
  linePlotMargin = {top: 20, right: 20, bottom: viewHeight - ( (3/4)*viewHeight), left: 50};
  selectionPlotMargin = {top: viewHeight - ( (1/6)*viewHeight), right: 20, bottom: 20, left: 40};
  lpWidth = viewWidth - linePlotMargin.left - linePlotMargin.right;
  lpHeight = viewHeight - linePlotMargin.top - linePlotMargin.bottom;
  lpHeight2 = viewHeight - selectionPlotMargin.top - selectionPlotMargin.bottom;

  x.range([0, lpWidth]);
  y.range([lpHeight, 0]);
  x2.range([0, lpWidth])
  y2.range([lpHeight2, 0]);

  xAxis.scale(x);
  yAxis.scale(y);
  xAxis2.scale(x2);

  var totalBrush = d3.extent(allData, function(d) { return d['gameloop'] });
  var newBrush = (timeFrame[0] == totalBrush[0] && timeFrame[1] == totalBrush[1]) ? [0,0] : timeFrame;
  brush
    .extent(newBrush);

  drawScatterplot();
  brushed();
}
resizeScatterplot();

function showLineData() {
  var selectType = document.getElementById("select_type");
  var selectLine = document.getElementById("select_line");

  resource = selectType.value;
  stat = selectLine.value;
  resizeScatterplot();
}