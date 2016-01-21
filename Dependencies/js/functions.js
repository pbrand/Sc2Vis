function withinTimeFrame(gameloop, timeFrame) {
  var gl = gameloop / 16.0;
  return (gl >= (timeFrame[0] / 1000) && gl <= (timeFrame[1] / 1000));
}

function switchColors(flip) {
  var color = d3.scale.ordinal().range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
  if (flip == 1) color = d3.scale.ordinal().range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"].reverse());
  return color;
}

// COLOR SATURATION
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function saturateColor(color, sat) {
  sat = sat / 100;
  var col = $.extend(true, {}, color);;
  var gray = (col.r * 0.3086) + (col.g * 0.6094) + (col.b * 0.0820);

  col.r = Math.round(col.r * sat + gray * (1 - sat));
  col.g = Math.round(col.g * sat + gray * (1 - sat));
  col.b = Math.round(col.b * sat + gray * (1 - sat));
  return rgbToHex(col.r, col.g, col.b);
}
