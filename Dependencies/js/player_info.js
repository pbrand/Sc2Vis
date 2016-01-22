function resetPlayerInfo() {
  $("#player_info").remove();
}

function generatePlayerInfo() {
  // Reset everything
  resetPlayerInfo();

  // Create all divs
	var playerInfoElement = document.createElement("div");
  playerInfoElement.setAttribute("id", "player_info");
	for (var i = 0; i < 2; i++) {
		playerInfo(playerInfoElement, i);
	}

  var container = document.getElementsByClassName("container")[0];
  container.appendChild(playerInfoElement);
}

function playerInfo(playerInfoElement, i) {
	// General div element
	var playerElement = document.createElement("div");
	playerElement.setAttribute("id", "player_" + i);

  // Div containing the player name
  var playerName = document.createElement("div");
  playerName.setAttribute("class", "player_name");
  playerName.innerHTML = details.playerList[i].name;
  playerElement.appendChild(playerName);

  // Div containing the information elements (big thing)
  var playerGeneralDiv = document.createElement("div");
  playerGeneralDiv.setAttribute("class", "player_general");
  

  

  // Add the div
  playerInfoElement.appendChild(playerElement);
}