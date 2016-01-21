// 176 * 184
var width = 176 * 4;
var endTime = 10000;
var svg;

if (svg === undefined)
  mapImage();
initMap();
function initMap() {
  svg.selectAll("circle").remove(); svg.selectAll("rect").remove();

  console.log("After remove");
  for (var i = 0; i < 2; i++) {
    var data_structures = getLastData(structures[i], endTime);
    var circles = svg.selectAll("circle").data(data_structures);
    drawStructures(circles, data_structures, i);

    var data_armies = getLastData(army[i], endTime);
    var rects = svg.selectAll("rect").data(data_armies);
    drawArmies(rects, data_armies, i);
  }
}

function getLastData(data, endTime) {
  var ret;
  for (var k in data) {
    var gameloopTime = k / 16.0;
    if (gameloopTime <= endTime) 
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
  svg = d3.select("#map_img")
    .append("svg")
        .attr("width", width)
        .attr("height", width);

  svg.append("svg:image")
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
      .style("fill", saturateColor(details.playerList[i].color, saturation))
      .attr("x", function(d) { return (d.x * 4); })
      .attr("y", function(d) { return width - (d.y * 4); })
      .attr("width", function(d) { return structureSize(d.unitTypeName); })
      .attr("height", function(d) { return structureSize(d.unitTypeName); })
      .attr("unitName", function(d) { return d.unitTypeName; });
}

function drawArmies(svgElement, data, i) {
  var playerName = (i === 0 ? player1_Name : player2_Name);
  var playerRace = (i === 0 ? player1_Race : player2_Race);
  var playerColor = (i === 0 ? player1_Color : player2_Color);
  var saturation = 20;

  svgElement
    .enter().append("circle")
      .style("fill", saturateColor(details.playerList[i].color, saturation))
      .attr("cx", function(d) { return (d.x * 4); })
      .attr("cy", function(d) { return width - (d.y * 4); })
      .attr("r", function(d) { return armySize(d.unitTypeName); })
      .attr("unitName", function(d) { return d.unitTypeName; });
}

function structureSize(typeName) {
  return 5;
}
function armySize(typeName) {
  return 10;
}