var startTime = 1200, endTime = 1300;
var width = 360 / 2;
var height = 360 / 2;
var radius = Math.min(width, height) / 2;
var donutWidth = 75 / 2;
var legendRectSize = 18;
var legendSpacing = 4;

(function(d3) {
  'use strict';

  for (var x in economy) {
    if (x == 1) break;
    // Take data of current player
    var playerData = economy[x];
    var playerArrayMinerals = [], playerArrayVespene = [];
    var mineralsUsed = {}, mineralsLost = {}, vespeneUsed = {}, vespeneLost = {};

    playerData.forEach(function(d, i) {
      if (!withinTimeFrame(d.gameloop, startTime, endTime)) return;

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
      donut_chart("#chart_m_" + m, playerArrayMinerals[m], 0);
    }

    for (var v = 0; v < playerArrayVespene.length; v++) {
      donut_chart("#chart_v_" + v, playerArrayVespene[v], 1);
    }
  }

})(window.d3);

function initCheck(tempData_) {
  var i = 0;
  for (var k in tempData_) {
    if (tempData_[k] === 0) i++;
  }

  return i == Object.keys(tempData_).length;
}

// Function to create a donut chart
function donut_chart(divId, tempData_, flip) {
  if (initCheck(tempData_)) return;
  var color = switchColors(flip);

  var svg = d3.select(divId)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + 
      ',' + (height / 2) + ')');

  var arc = d3.svg.arc()
    .innerRadius(radius - donutWidth)
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
      return color(d.data.key); 
    })
    .each(function(d) { this._current = d; });

  path.on('mouseover', function(d) {
    var total = d3.sum(dataset.map(function(d) {
      return (d.enabled) ? d.value : 0;
    }));
    var percent = Math.round(1000 * d.data.value / total) / 10;
    tooltip.select('.label').html(d.data.label);
    tooltip.select('.count').html(d.data.count); 
    tooltip.select('.percent').html(percent + '%'); 
    tooltip.style('display', 'block');
  });
  
  path.on('mouseout', function() {
    tooltip.style('display', 'none');
  });

  path.on('mousemove', function(d) {
    tooltip.style('top', (d3.event.layerY + 10) + 'px')
      .style('left', (d3.event.layerX + 10) + 'px');
  });
    
  var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var height = legendRectSize + legendSpacing;
      var offset =  height * color.domain().length / 2;
      var horz = -2 * legendRectSize;// - 30;
      var vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)                                   
    .style('fill', color)
    .style('stroke', color)
    .on('click', function(key) {
      var rect = d3.select(this);
      var enabled = true;
      var totalEnabled = d3.sum(dataset.map(function(d) {
        return (d.enabled) ? 1 : 0;
      }));
      
      if (rect.attr('class') === 'disabled') {
        rect.attr('class', '');
      } else {
        if (totalEnabled < 2) return;
        rect.attr('class', 'disabled');
        enabled = false;
      }
      pie.value(function(d) {
        if (d.key === key) d.enabled = enabled;
        return (d.enabled) ? d.value : 0;
      });

      path = path.data(pie(dataset));
      
      path.transition()
        .duration(750)
        .attrTween('d', function(d) {
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return function(t) {
            return arc(interpolate(t));
          };
        });
      
    });
    
  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });
}