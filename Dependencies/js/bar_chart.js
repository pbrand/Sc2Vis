var height = 30;
var color = d3.scale.category10();
(function(d3) {
  'use strict';

  playerVersus();
  foodInformation();
})(window.d3);

function foodInformation() {
  var foodData_0 = {}, foodData_1 = {};
  economy[0].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop, 1200, 1400)) return;
      foodData_0.foodUsed = +d.food.used;
      foodData_0.foodMade = +d.food.made;
  });
  economy[1].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop, 1200, 1400)) return;
      foodData_1.foodUsed = +d.food.used;
      foodData_1.foodMade = +d.food.made;
  });

  stackedBarChart("food_bar", getDataSet(foodData_0), 0);
  stackedBarChart("food_bar", getDataSet(foodData_1), 1);
}

function playerVersus() {
  for (var x = 0; x <= 1; x++) {
    var currentData = { textVal: "Current" }, rateData = { textVal: "Collection Rate" }, forcesData = { textVal: "Used Active Forces" };
    economy[0].forEach(function(d, i) {
        if (!withinTimeFrame(d.gameloop, 1200, 1400)) return;
        currentData.value_0 = (x == 0 ? +d.minerals.Current : +d.vespene.Current);
        rateData.value_0 = (x == 0 ? +d.minerals.CollectionRate : +d.vespene.CollectionRate);
        forcesData.value_0 = (x == 0 ? +d.minerals.UsedActiveForces : +d.vespene.UsedActiveForces);
    });
    economy[1].forEach(function(d, i) {
        if (!withinTimeFrame(d.gameloop, 1200, 1400)) return;
        currentData.value_1 = (x == 0 ? +d.minerals.Current : +d.vespene.Current);
        rateData.value_1 = (x == 0 ? +d.minerals.CollectionRate : +d.vespene.CollectionRate);
        forcesData.value_1 = (x == 0 ? +d.minerals.UsedActiveForces : +d.vespene.UsedActiveForces);
    });

    switchElements(currentData);
    stackedBarChart("bar_s_m_" + x, getDataSet(currentData), x);

    switchElements(rateData);
    stackedBarChart("bar_s_m_" + x, getDataSet(rateData), x);

    switchElements(forcesData);
    stackedBarChart("bar_s_m_" + x, getDataSet(forcesData), x);
  }
} 

function switchElements(data) {
  var x = data.value_0;
  var y = data.value_1;
  if (x > y) { 
    data.value_0 = y;
    data.value_1 = x;
  }
}

function getDataSet(tempData_) {
  var dataset = [];
  var temp = 0;
  for (var k in tempData_) {
      if (k == "textVal") continue;
      var obj = [{ key: tempData_.textVal, x: tempData_[k], x0: temp }];
      temp = tempData_[k];
      dataset.push(obj);
  }
  return dataset;
}


// ------------ ACTUAL FUNCTION ------------- \\
function stackedBarChart(divId, dataset, flip) {
  var width = "100%";
  var color = switchColors(flip);

  var svg_ = d3.select("#" + divId)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var titelElement = svg_.append('g');
  var svg = svg_.append('g')
        .attr('transform', 'translate(' + (document.getElementById(divId).clientWidth * 0.12) + ',0)');

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
        return color(i);
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

  var xPos_1 = (fraction(dataset[0][0].x) * totalWidth) / 2.0;
  var xPos_2 = (fraction(dataset[1][0].x) * totalWidth) / 2.0;
  var legend = svg.selectAll('.legend')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
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

  var titel = titelElement.selectAll('.titel')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'titel')
    .attr('transform', function(d, i) {
      var vert = 8 + (yScale.rangeBand() / 2);
      return 'translate(' + 0 + ',' + vert + ')';
    });
  titel.append('text')
    // .attr('transform', 'translate(-100, 20)')
    .text(function(d, i) {
      return d[0].key;
    });
}