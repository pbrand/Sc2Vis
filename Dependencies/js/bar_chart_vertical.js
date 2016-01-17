//Width and height
var w = 360;
var h = 180;
var barPadding = 1;
var c20 = d3.scale.category20();
var scale = null;

(function(d3) {
  'use strict';

  var totalDataset = [];
  var minV = 999999;
  var maxV = -999999;
  for (var x in economy) {
    var mineralCollectionRate = 0, vespeneCollectionRate = 0;
    var mineralCurrent = 0, vespeneCurrent = 0;
    var mineralUsedForces = 0, vespeneUsedForces = 0;

    economy[x].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop, 1200, 1400)) return;

      var minerals = d.minerals;
      mineralCurrent = +minerals.Current;
      mineralCollectionRate = +minerals.CollectionRate;
      mineralUsedForces = +minerals.UsedActiveForces;

      var vespene = d.vespene;
      vespeneCurrent = +vespene.Current;
      vespeneCollectionRate = +vespene.CollectionRate;
      vespeneUsedForces = +vespene.UsedActiveForces;
    });

    var tempData_m = [{ value: mineralCurrent, text: "Current" }, 
      { value: mineralCollectionRate, text: "Collection Rate" }, 
      { value: mineralUsedForces, text: "Used Forces" }];
    
    var tempData_v = [{ value: vespeneCurrent, text: "Current" }, 
      { value: vespeneCollectionRate, text: "Collection Rate" }, 
      { value: vespeneUsedForces, text: "Used Forces" }];

    var array = [tempData_m, tempData_v];
    totalDataset.push(array);

    var tmp = tempData_m.concat(tempData_v);
    minV = Math.min(d3.min(tmp, function(d) { return d.value; }), minV);
    maxV = Math.max(d3.max(tmp, function(d) { return d.value; }), maxV);
  }

  scale = d3.scale.linear()
      .domain([minV, maxV])
      .range([10, 100]);

  for (var i in totalDataset) {
    bar_chart_vertical("v_bar_chart_" + i, totalDataset[i][0]);
    bar_chart_vertical("v_bar_chart_" + i, totalDataset[i][1]);
  }
})(window.d3);

function percentage(dataset, value) {
  return ((value / dataset) * 100) + "%";
}

function bar_chart_vertical(divId, dataset) {
  var xSpacing = w / dataset.length;
  var yFactor = 4;

	//Create SVG element
	var svg = d3.select("#" + divId)
				.append("svg")
				.attr("width", w)
				.attr("height", h);

	svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("value", function(d) {
    return d.value;
   })
   .attr("x", function(d, i) {
   		return i * xSpacing;
   })
   .attr("y", function(d) {
   		return h - scale(d.value) * 1.7;
   })
   .attr("width", xSpacing - barPadding)
   .attr("height", function(d) {
   		return scale(d.value) * 1.7;
   })
   .attr("fill", function(d, i) {
		return c20(i);
   });

	svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
   	return d.text + " - " + d.value;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
   		return i * xSpacing + (xSpacing - barPadding) / 2;
   })
   .attr("y", function(d) {
   		return h - (scale(d.value) * 1.7) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");
}