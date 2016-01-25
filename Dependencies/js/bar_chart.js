var height = 30;
var color = d3.scale.category10();

initBarCharts();
function initBarCharts() {
  $("#stackBarElement").remove();

  playerVersus();
  foodInformation();
  hoverBars();
}
function hoverBars() {
  // Hover function
  $("#statistics_bars > div svg rect").hover(function() { 
    var id = this["__data__"];

    $('<div id="stackBarElement">' + typeToDescription(id.key, id.category) + '</div>')
      .appendTo('body')
      .fadeIn('slow');
  }, function() {
    $('#stackBarElement').remove();
    }).mousemove(function(e) {
      var mousex = e.pageX + 10; //Get X coordinates
      var mousey = e.pageY - 50; //Get Y coordinates
      $('#stackBarElement')
      .css({ top: mousey, left: mousex })
    });

  // Hover function
  $("#food_bar > svg rect").hover(function() { 
    var id = this["__data__"];

    $('<div id="stackBarElement">' + typeToDescription(id.key, "") + '</div>')
      .appendTo('body')
      .fadeIn('slow');
  }, function() {
    $('#stackBarElement').remove();
    }).mousemove(function(e) {
      var mousex = e.pageX + 10; //Get X coordinates
      var mousey = e.pageY - 50; //Get Y coordinates
      $('#stackBarElement')
      .css({ top: mousey, left: mousex })
    });
}

function foodInformation() {
  var foodData_0 = { textVal: "Used Food" }, foodData_1 = { textVal: "Made Food" };
  economy[0].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop)) return;
      foodData_0.foodUsed = +d.food.used;
      foodData_0.foodMade = +d.food.made;
  });
  economy[1].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop)) return;
      foodData_1.foodUsed = +d.food.used;
      foodData_1.foodMade = +d.food.made;
  });

  $("#food_bar > svg").remove();

  stackedBarChart("food_bar", getDataSet(foodData_0), 0);
  stackedBarChart("food_bar", getDataSet(foodData_1), 1);
}

function playerVersus() {
  var categories = ["Minerals", "Vespene"];
  for (var x = 0; x <= 1; x++) {
    var currentData = { textVal: "Current" }, rateData = { textVal: "Collection Rate" }, forcesData = { textVal: "Used Active Forces" };
    economy[0].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop)) return;
      currentData.value_0 = (x == 0 ? +d.minerals.Current : +d.vespene.Current);
      rateData.value_0 = (x == 0 ? +d.minerals.CollectionRate : +d.vespene.CollectionRate);
      forcesData.value_0 = (x == 0 ? +d.minerals.UsedActiveForces : +d.vespene.UsedActiveForces);
    });
    economy[1].forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop)) return;
      currentData.value_1 = (x == 0 ? +d.minerals.Current : +d.vespene.Current);
      rateData.value_1 = (x == 0 ? +d.minerals.CollectionRate : +d.vespene.CollectionRate);
      forcesData.value_1 = (x == 0 ? +d.minerals.UsedActiveForces : +d.vespene.UsedActiveForces);
    });

    $("#bar_s_m_" + x + " > svg").remove();

    switchElements(currentData);
    stackedBarChart("bar_s_m_" + x, getDataSet(currentData, categories[x]), x);

    switchElements(rateData);
    stackedBarChart("bar_s_m_" + x, getDataSet(rateData, categories[x]), x);

    switchElements(forcesData);
    stackedBarChart("bar_s_m_" + x, getDataSet(forcesData, categories[x]), x);
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

function getDataSet(tempData_, cat) {
  var dataset = [];
  var temp = 0;
  for (var k in tempData_) {
      if (k == "textVal") continue;
      var obj = [{ category: cat, key: tempData_.textVal, x: tempData_[k], x0: temp }];
      temp = tempData_[k];
      dataset.push(obj);
  }
  return dataset;
}


// ------------ ACTUAL FUNCTION ------------- \\
var groups;
function stackedBarChart(divId, dataset, flip) {
  if (dataset === [] || typeof dataset[0] === 'undefined')
    return;
  if ((dataset[0][0].x == 0 && dataset[0][0].x0 == 0) || (dataset[1][0].x == 0 && dataset[1][0].x0 == 0))
    return;
  var width = "100%";
  var color = d3.scale.ordinal().range([saturateColor(player1_Color,90), saturateColor(player2_Color,90)]);

  var svg_ = d3.select("#" + divId)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  var widthContainer = $('#container').width() - 15;
  var titelWidth = (document.getElementById(divId).clientWidth * 0.12);
  var barWidth = widthContainer - titelWidth;
  var titelElement = svg_.append('g');
  var svg = svg_.append('g')
        .attr('transform', 'translate(' + titelWidth + ',0)');

  xMax = d3.max(dataset, function (group) {
      return d3.max(group, function (d) {
          return d.x;
      });
  });
  // var xScale = d3.scale.ordinal().rangeRoundBands([0, width])
  var xScale = d3.scale.linear()
    .domain([0, xMax])
    .range([0, width]);
  
  var months = dataset[0].map(function (d) {
    return d.y;
  });
  var yScale = d3.scale.ordinal()
    .domain(months)
    .rangeRoundBands([0, height], .1);
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');
  groups = svg.selectAll('g')
    .data(dataset)
    .enter()
    .append('g')
    .style('fill', function (d, i) {
        return color(i);
    });

  var tempX = titelWidth / widthContainer * 100;
  var rects = groups.selectAll('rect')
    .data(function (d) {
      return d;
    })
    .enter()
    .append('rect')
    .attr('x', function (d) {
      var tx = parseFloat(xScale(d.x0));
      var newTx = traversePercentage(tx, widthContainer, widthContainer - titelWidth);
      return newTx + "%";
    })
    .attr('y', function (d, i) {
      return yScale(d.y);
    })
      .attr('height', function (d) {
      return yScale.rangeBand();
    })
    .attr('width', function (d) {
      var tx = parseFloat(xScale(d.x));
      var newTx = traversePercentage(tx, widthContainer, widthContainer - titelWidth);
      var newTx_ = traversePercentage(parseFloat(xScale(d.x0)), widthContainer, widthContainer - titelWidth);
      return (newTx - newTx_) + "%";
    });

  var totalWidth = document.getElementById(divId).clientWidth;
  function fraction(x) {
    return x / xMax;
  }

  var xPos_1 = (dataset[0][0].x != 0 ? (fraction(dataset[0][0].x) * totalWidth) / 2.0 : 1);
  var xPos_2 = (dataset[1][0].x != 0 ? (fraction(dataset[1][0].x) * totalWidth) / 2.0 : 1);
  
  var legend = svg.selectAll('.legend')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var horz = parseFloat(xScale(d[0].x)) / 200 * barWidth - 14;
      if (i == 1) horz += parseFloat(xScale(d[0].x0)) / 200 * barWidth;

      vert = 8 + (yScale.rangeBand() / 2);
      return 'translate(' + horz + ',' + vert + ')';
    });
  legend.append('text')
    .text(function(d, i) { 
      var ret = fraction(d[0].x) - (i == 1 ? fraction(d[0].x0) : 0);
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
    .text(function(d, i) {
      return d[0].key;
    });
}

function traversePercentage(oldPerc, totWidth, newWidth) {
  var oldPerc_ = oldPerc / 100.0;
  var temp1 = oldPerc_ * newWidth;
  var temp2 = temp1 / totWidth;
  return temp2 * 100;
}