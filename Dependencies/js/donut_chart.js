var dcWidth = 300 / 2 / 2;
var dcHeight = 300 / 2 / 2;
var radius = Math.min(dcWidth, dcHeight) / 2;
var donutdcWidth = 75 / 2 / 2;
var legendRectSize = 18;
var legendSpacing = 4;

generateDonutCharts();
function resetDonutCharts() {
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 2; j++) {
      var x_1 = $("#chart_" + j + "_m_" + i + " svg");
      var x_2 = $("#chart_" + j + "_m_" + i + " .tooltip");
      x_1.remove();
      x_2.remove();

      var y_1 = $("#chart_" + j + "_v_" + i + " svg");
      var y_2 = $("#chart_" + j + "_v_" + i + " .tooltip");
      y_1.remove();
      y_2.remove();
    }
  }
}
function generateDonutCharts() {
  resetDonutCharts();
  
  for (var x in economy) {
    // if (x == 1) break;
    // Take data of current player
    var playerData = economy[x];
    var playerArrayMinerals = [], playerArrayVespene = [];
    var mineralsUsed = {}, mineralsLost = {}, vespeneUsed = {}, vespeneLost = {};

    playerData.forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop)) return;

      // Minerals:
      var mineralData = d.minerals;
      // # Used Current
      mineralsUsed.Army = +mineralData.army.usedCurrent;
      mineralsUsed.Economy = +mineralData.economy.usedCurrent;
      mineralsUsed.Technology = +mineralData.technology.usedCurrent;
      // # Lost
      mineralsLost.FriendlyFire = +mineralData.army.friendlyFire;
      mineralsLost.Killed = +mineralData.economy.killed;
      mineralsLost.Lost = +mineralData.technology.lost;

      // Vespene:
      var vespeneData = d.vespene;
      // # Used Current
      vespeneUsed.Army = +vespeneData.army.usedCurrent;
      vespeneUsed.Economy = +vespeneData.economy.usedCurrent;
      vespeneUsed.Technology = +vespeneData.technology.usedCurrent;
      // # Lost
      vespeneLost.FriendlyFire = +vespeneData.army.friendlyFire;
      vespeneLost.Killed = +vespeneData.economy.killed;
      vespeneLost.Lost = +vespeneData.technology.lost;
    });

    playerArrayMinerals.push(mineralsUsed); playerArrayMinerals.push(mineralsLost);
    playerArrayVespene.push(vespeneUsed); playerArrayVespene.push(vespeneLost);

    for (var m = 0; m < playerArrayMinerals.length; m++) {
      donut_chart("#chart_" + x + "_m_" + m, playerArrayMinerals[m], "m" + m);
    }

    for (var v = 0; v < playerArrayVespene.length; v++) {
      donut_chart("#chart_" + x + "_v_" + v, playerArrayVespene[v], "v" + v);
    }
  }

  $("#donut_player_0").html(player1_Name);
  $("#donut_player_1").html(player2_Name);
  $("#donut_player_0").css("color", saturateColor(player1_Color, 100));
  $("#donut_player_1").css("color", saturateColor(player2_Color, 100));
}

function initCheck(tempData_) {
  var i = 0;
  for (var k in tempData_) {
    if (tempData_[k] === 0) i++;
  }

  return i == Object.keys(tempData_).length;
}

// Function to create a donut chart
function donut_chart(divId, tempData_, flip) {
  var elem = $(divId);
  if (initCheck(tempData_)) {
    elem.hide();
    return;
  }
  elem.show();
  var color = switchColors(flip);

  var svg = d3.select(divId)
    .append('svg')
    .attr('width', dcWidth)
    .attr('height', dcHeight)
    .append('g')
    .attr('transform', 'translate(' + (dcWidth / 2) + 
      ',' + (dcHeight / 2) + ')');

  var arc = d3.svg.arc()
    .innerRadius(radius - donutdcWidth)
    .outerRadius(radius);

  var pie = d3.layout.pie()
    .value(function(d) { return d.value; })
    .sort(null);

  var tooltip = d3.select(divId)
    .append('div')
    .attr('class', 'tooltip');
  
  tooltip.append('div')
    .attr('class', 'label');

  tooltip.append('div')
    .attr('class', 'count');

  tooltip.append('div')
    .attr('class', 'percent');

  var dataset = [];
  for (var k in tempData_) {
    var keyArray = k.split(/(?=[A-Z])/);
    var keyName = keyArray.join(" ");
    var obj = { key: keyName, value: tempData_[k], enabled: true };
    dataset.push(obj);
  }

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      if (d.value > 0)
        return color(d.data.key); 
    })
    .each(function(d) { this._current = d; });

  path.on('mouseover', function(d) {
    var total = d3.sum(dataset.map(function(d) {
      return (d.enabled) ? d.value : 0;
    }));
    var percent = Math.round(1000 * d.data.value / total) / 10;
    tooltip.select('.label').html();
    tooltip.select('.count').html("<b>" + d.data.key + "</b>: " + d.data.value); 
    tooltip.select('.percent').html("<b>Percentage</b>: " + percent + '%'); 
    tooltip.style('display', 'block');
  });
  
  path.on('mouseout', function() {
    tooltip.style('display', 'none');
  });

  path.on('mousemove', function(d) {
    tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX - 190) + 'px');
  });
    
  // var legend = svg.selectAll('.legend')
  //   .data(color.domain())
  //   .enter()
  //   .append('g')
  //   .attr('class', 'legend')
  //   .attr('transform', function(d, i) {
  //     var dcHeight = legendRectSize + legendSpacing;
  //     var offset =  dcHeight * color.domain().length / 2;
  //     var horz = -2 * legendRectSize;// - 30;
  //     var vert = i * dcHeight - offset;
  //     return 'translate(' + horz + ',' + vert + ')';
  //   });

  // legend.append('rect')
  //   .attr('width', legendRectSize)
  //   .attr('height', legendRectSize)                                   
  //   .style('fill', color)
  //   .style('stroke', color)
  //   .on('click', function(key) {
  //     var rect = d3.select(this);
  //     var enabled = true;
  //     var totalEnabled = d3.sum(dataset.map(function(d) {
  //       return (d.enabled) ? 1 : 0;
  //     }));
      
  //     if (rect.attr('class') === 'disabled') {
  //       rect.attr('class', '');
  //     } else {
  //       if (totalEnabled < 2) return;
  //       rect.attr('class', 'disabled');
  //       enabled = false;
  //     }
  //     pie.value(function(d) {
  //       if (d.key === key) d.enabled = enabled;
  //       return (d.enabled) ? d.value : 0;
  //     });

  //     path = path.data(pie(dataset));
      
  //     path.transition()
  //       .duration(750)
  //       .attrTween('d', function(d) {
  //         var interpolate = d3.interpolate(this._current, d);
  //         this._current = interpolate(0);
  //         return function(t) {
  //           return arc(interpolate(t));
  //         };
  //       });
      
  //   });
    
  // legend.append('text')
  //   .attr('x', legendRectSize + legendSpacing)
  //   .attr('y', legendRectSize - legendSpacing)
  //   .text(function(d) { return d; });
}