var gameTime = details.gameTime; // Time in seconds
var mapName = details.mapName; // The name of the map

// General information about the players
// # Player 1 
var player1_Name = details.playerList[0].name;
var player1_Race = details.playerList[0].race;
var player1_Color = { r: details.playerList[0].color.r, g: details.playerList[0].color.g, b: details.playerList[0].color.b };

// # Player 2
var player2_Name = details.playerList[1].name;
var player2_Race = details.playerList[1].race;
var player2_Color = { r: details.playerList[1].color.r, g: details.playerList[1].color.g, b: details.playerList[1].color.b };

// Time frame (edited by brush )
var timeFrame = [0, 0];

reloadInit();
function reloadInit() {
	gameTime = details.gameTime; // Time in seconds
	mapName = details.mapName; // The name of the map

	// General information about the players
	// # Player 1 
	player1_Name = details.playerList[0].name;
	player1_Race = details.playerList[0].race;
	player1_Color = { r: details.playerList[0].color.r, g: details.playerList[0].color.g, b: details.playerList[0].color.b };

	// # Player 2
	player2_Name = details.playerList[1].name;
	player2_Race = details.playerList[1].race;
	player2_Color = { r: details.playerList[1].color.r, g: details.playerList[1].color.g, b: details.playerList[1].color.b };

	// Time frame (edited by brush )
	timeFrame = [0, 0];

	
}