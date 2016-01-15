function withinTimeFrame(gameloop, startTime, endTime) {
  var gl = gameloop / 16.0;
  return (gl >= startTime && gl <= endTime);
}