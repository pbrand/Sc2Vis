// 176 * 184
var widthFactor = 2;
var width = 402; //176 * widthFactor;
var svgMapImg;

initMap();
function initMap() {
  if (svgMapImg === undefined)
    mapImage();
  // Remove all circles and rects
  svgMapImg.selectAll("circle").remove(); 
  svgMapImg.selectAll("rect").remove();
  svgMapImg.selectAll("#map_legend").remove();

  for (var i = 0; i < 2; i++) {
    var data_structures = getLastData(structures[i]);
    var circles = svgMapImg.selectAll("circle").data(data_structures);
    drawStructures(circles, data_structures, i);

    var data_armies = getLastData(army[i]);
    var rects = svgMapImg.selectAll("rect").data(data_armies);
    drawArmies(rects, data_armies, i);
  }

    // Legend
    var lpWidth = 400;
    var legend = svgMapImg
      .append("g")
        .attr("id", "map_legend");

    legend.append("rect")
        .attr("x", lpWidth - 18)
        .attr("y", 10)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill-opacity", 0.0)
        .style("opacity", 1.0)
        .style("strok-width", 2)
        .style("stroke", "white");

    legend.append("text")
        .attr("x", lpWidth - 22)
        .attr("y", 14)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("text-anchor", "end")
        .text("Armies");
        
    legend.append("circle")
        .attr("cx", lpWidth - 13)
        .attr("cy", 36)
        .attr("r", 6)
        .style("fill-opacity", 0.0)
        .style("stroke-width", 2)
        .style("stroke", "white");
        
    legend.append("text")
        .attr("x", lpWidth - 22)
        .attr("y", 36)
        .attr("dy", ".35em")
        .style("fill", "white")
        .style("text-anchor", "end")
        .text("Structures");

  // Hover function
  $("#map svg > rect, #map svg > circle").hover(function() { 
    var id = this["__data__"];

    $('<div id="hoverElement">' + convertCamelCase(id.unitTypeName) + '</div>')
      .appendTo('body')
      .fadeIn('slow');
    // $('#hoverElement').show();

  }, function() {
    $('#hoverElement').remove();
    }).mousemove(function(e) {
      var mousex = e.pageX + 10; //Get X coordinates
      var mousey = e.pageY - 30; //Get Y coordinates
      $('#hoverElement')
      .css({ top: mousey, left: mousex })
    });
}

function getLastData(data) {
  var ret;
  for (var k in data) {
    var gameloopTime = k / 16.0;
    if (gameloopTime <= (timeFrame[1] / 1000)) 
      ret = data[k];
    else
      break;
  }

  var ret2 = [];
  for (var x in ret) {
    var obj = ret[x];
    ret2.push(ret[x]);
  }
  return ret2;
}

function mapImage() {
  $("#map > svg").remove();

  svgMapImg = d3.select("#map")
    .append("svg")
        .attr("width", width)
        .attr("height", width);

  svgMapImg.append("svg:image")
   .attr('width', width)
   .attr('height', width)
   .attr("xlink:href","../Dependencies/imgs/maps/" + mapName + ".jpg")
}

// var x = d3.scale.linear().domain([0, 176]).range([0, width]);
// var y = d3.scale.linear().domain([0, 184]).range([height + 50, 0]);


function drawStructures(svgElement, data, i) {
  var playerName = (i === 0 ? player1_Name : player2_Name);
  var playerRace = (i === 0 ? player1_Race : player2_Race);
  var playerColor = (i === 0 ? player1_Color : player2_Color);
  var saturation = 100;

  svgElement
    .enter().append("rect")
      .style("fill-opacity", 0.6)
      .style("stroke-width", 0.5)
      .style("stroke", "white")
      .style("stroke-opacity", 0.7)
      .style("fill", saturateColor(details.playerList[i].color, saturation))
      .attr("x", function(d) { return (d.x * widthFactor); })
      .attr("y", function(d) { return width - (d.y * widthFactor); })
      .attr("width", function(d) { return structureSize(d.unitTypeName); })
      .attr("height", function(d) { return structureSize(d.unitTypeName); })
      .attr("unitName", function(d) { return d.unitTypeName; });
}

function drawArmies(svgElement, data, i) {
  var playerName = (i === 0 ? player1_Name : player2_Name);
  var playerRace = (i === 0 ? player1_Race : player2_Race);
  var playerColor = (i === 0 ? player1_Color : player2_Color);
  var saturation = 70;

  svgElement
    .enter().append("circle")
      .style("fill-opacity", 0.7)
      .style("stroke", "white")
      .style("stroke-width", 1)
      .style("stroke-opacity", 0.2)
      .style("fill", saturateColor(details.playerList[i].color, saturation))
      .attr("cx", function(d) { return (d.x * widthFactor); })
      .attr("cy", function(d) { return width - (d.y * widthFactor); })
      .attr("r", function(d) { return armySize(d.unitTypeName); })
      .attr("unitName", function(d) { return d.unitTypeName; });

}

function structureSize(typeName) {
  return 10;
}
function armySize(typeName) {
  return 10;
}