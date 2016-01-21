// data
//  +--- baseBuild
//  +--- gameTime //In seconds
//  +--- elapsedGameLoops
//  +--- gameSpeed
//  +--- mapName
//  +--- playerList //which contains a dictionary per player containing:
//  |       +--- control
//  |       +--- race
//  |       +--- name
//  |       +--- color
//  |       |   +--- r
//  |       |   +--- g
//  |       |   +--- b
//  |       |   +--- a
//  |       +--- region
//  |       +--- handicap
//  |       +--- teamId
//  |       +--- observe
//  |       +--- result
//  +--- gameStart *As a UTC/GMT Timestamp*
//  +--- isBlizzardMap

var gameTime = details.gameTime; // Time in seconds
var mapName = details.mapName; // The name of the map

// General information about 
var player1_Name = details.playerList[0].name;
var player1_Race = details.playerList[0].race;
var player2_Name = details.playerList[1].name;
var player2_Race = details.playerList[1].race;

// Time frame (edited by brush )
var timeFrame = [0,0];