var minerals_current = d3.scale.ordinal().domain(["Army", "Economy", "Technology"]).range(["#637939", "#8ca252", "#b5cf6b"]);
var minerals_lost = d3.scale.ordinal().domain(["Lost", "Friendly Fire", "Killed"]).range(["#8c6d31", "#bd9e39", "#e7ba52"]);
var vespene_current = d3.scale.ordinal().domain(["Army", "Economy", "Technology"]).range(["#843c39", "#ad494a", "#d6616b"]);
var vespene_lost = d3.scale.ordinal().domain(["Lost", "Friendly Fire", "Killed"]).range(["#7b4173", "#a55194", "#ce6dbd"]);

function createLegenda(flip, color) {
  var donutLegenda = $("#donut_legenda_" + flip);
  if (donutLegenda.html() !== "") return;

  color.domain().forEach(function(d, i) {
    var legendaText = d, legendaColor = color.range()[i];

    var divElem = document.createElement("div");
    divElem.className = "legendaItem";

    var divRect = document.createElement("div");
    divRect.className = "legendaItemRect";
    divRect.style.backgroundColor = legendaColor;

    var divText = document.createElement("div");
    divText.className = "legendaItemText";
    divText.innerHTML = legendaText;

    divElem.appendChild(divRect);
    divElem.appendChild(divText);

    donutLegenda.append(divElem);
  });
}

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
  var returnColor;
  switch (flip) {
    case "m0":
      returnColor = minerals_current;
      break;
    case "m1":
      returnColor = minerals_lost;
      break;
    case "v0":
      returnColor = vespene_current;
      break;
    case "v1":
      returnColor = vespene_lost;
      break;
  }
  createLegenda(flip, returnColor);
  return returnColor;
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