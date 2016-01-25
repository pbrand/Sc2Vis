function withinTimeFrame(gameloop) {
  if (timeFrame[0] == 0 && timeFrame[1] == 0) {
    if (typeof xExtent !== 'undefined') {
      timeFrame = xExtent;
    }
  }
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

function convertCamelCase(text) {
  var ret = text
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
  return ret;
}

function typeToDescription(type, category) {
  var ret = "<div class='type_element'>" + convertCamelCase(type) + "</div>";
  switch (type) {
    case "Current":
      ret += category + " which are/were available to the player (in total).";
      break;
    case "Collection Rate":
      ret += "The rate the player is collecting " + category.toLowerCase() + " (in total).";
      break;
    case "Used Active Forces":
      ret += "The total " + category.toLowerCase() + " value of all the active forces."
      break;

    case "Used Food":
      ret += "The food supply used in total.";
      break;
    case "Made Food":
      ret += "The food supply made in total."
      break;
  }
  return ret;
}

function select_match() {
    var e = document.getElementById("matchBox");
    var matchID = e.options[e.selectedIndex].value;
    // replace data file
    var currentMatch = '../Data/JSON/'+document.getElementById("current_data").src;
    currentMatch = currentMatch.split('/Data/JSON/')[2];
    replacejsfile(currentMatch, '../Data/JSON/'+matchID+'.js', 'js', 'current_data');

    waitForDataLoad();
}

function createjsfile(filename, filetype, id){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
        fileref.setAttribute("id", id)
    }
    return fileref
}

function replacejsfile(oldfilename, newfilename, filetype, id){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist using
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
            var newDataElement=createjsfile(newfilename, filetype, id)
            allsuspects[i].parentNode.replaceChild(newDataElement, allsuspects[i])
        }
    }
}

var oldDataLength = economy[0].length + details.gameStart;
function waitForDataLoad() {
  if ((economy[0].length + details.gameStart) != oldDataLength) {
      oldDataLength = economy[0].length + details.gameStart;

      svgMapImg = undefined;
      reloadInit();
      changeResults();
      resizeScatterplot();
      initMap();
      generateDonutCharts();
      initBarCharts();
    } else {
      setTimeout(waitForDataLoad, 1000);
    }
}

function strip(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
}

changeResults();
function changeResults() {
  for (var i = 0; i < 2; i++) {
    var htmlVar = "LOSER", classVar = "loser";
    if (details.playerList[i].result > 1) {
      htmlVar = "WINNER";
      classVar = "winner";
    }

    $("#player_" + i + " .player_name").html(strip(details.playerList[i].name));
    var el = document.getElementById('player_' + i);
    if (el) {
      el.className = classVar;
    }
    $("#player_" + i + " .player_status").html(htmlVar);
  }
}

function getMinutes(ms) {
  return (ms/1000/60) << 0;
}