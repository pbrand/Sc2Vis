function withinTimeFrame(gameloop, startTime, endTime) {
  var gl = gameloop / 16.0;
  return (gl >= startTime && gl <= endTime);
}

function switchColors(flip) {
  var color = d3.scale.ordinal().range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);
  if (flip == 1) color = d3.scale.ordinal().range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"].reverse());
  return color;
}