(function(d3) {
  'use strict';

  var tempData = economy[0];
  var tempData_ = {};
  tempData.forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop, 1200, 1400)) return;
      tempData_.foodUsed = +d.scoreValueFoodUsed;
      tempData_.foodMade = +d.scoreValueFoodMade;
  });

  var dataset = [];
  var temp = 0;
  for (var k in tempData_) {
      var keyArray = k.split(/(?=[A-Z])/);
      var keyName = keyArray[keyArray.length - 1];
      var obj = [{ key: keyName, x: tempData_[k], x0: temp }];
      temp = tempData_[k];
      dataset.push(obj);
  }

  stackedBarChart("bar_chart", dataset, 30);
})(window.d3);

function stackedBarChart(divId, dataset, height) {
  var width = "100%";
  var colours = d3.scale.category10();

  var svg = d3.select("#" + divId)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g');

  xMax = d3.max(dataset, function (group) {
      return d3.max(group, function (d) {
          return d.x;
      });
  }),
  xScale = d3.scale.linear()
      .domain([0, xMax])
      .range([0, width]),
  months = dataset[0].map(function (d) {
      return d.y;
  }),
  yScale = d3.scale.ordinal()
      .domain(months)
      .rangeRoundBands([0, height], .1),
  xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom'),
  yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left'),
  groups = svg.selectAll('g')
      .data(dataset)
      .enter()
      .append('g')
      .style('fill', function (d, i) {
          return colours(i);
      }),
  rects = groups.selectAll('rect')
      .data(function (d) {
      return d;
  })
      .enter()
      .append('rect')
      .attr('x', function (d) {
      return xScale(d.x0);
  })
      .attr('y', function (d, i) {
      return yScale(d.y);
  })
      .attr('height', function (d) {
      return yScale.rangeBand();
  })
      .attr('width', function (d) {
      return xScale(d.x);
  });

  var totalWidth = document.getElementById(divId).clientWidth;
  function fraction(x) {
    return x / xMax;
  }

  console.log(svg.select("g"));

  var xPos_1 = (fraction(dataset[0][0].x) * totalWidth) / 2.0;
  var xPos_2 = (fraction(dataset[1][0].x) * totalWidth) / 2.0;
  var legend = svg.selectAll('.legend')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      console.log(d);
      var horz = (i * xPos_2) + xPos_1 - 10;
      var vert = 8 + (yScale.rangeBand() / 2);
      return 'translate(' + horz + ',' + vert + ')';
    });
  legend.append('text')
    .text(function(d, i) { 
      var ret = fraction(d[0].x); 
      if (i == 1) {
        ret = fraction(d[0].x) - fraction(d[0].x0);
      }
      return (ret * 100).toFixed(1) + "%";
    });
}