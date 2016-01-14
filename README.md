# Sc2Vis
Starcraft II Visualization course Datavisualization

At the time of writing the SC2Reader project was outdated, hence we could not fully use it to extract data from the latest Starcraft II Expansion pack (Legacy of the Void). Because of the limited time available we decided to quickly write our own parser. 
For this parser we used code and documentation from the following projects:
 * [S2Protocol](https://github.com/Blizzard/s2protocol)
 * [SC2Reader](https://github.com/GraylinKim/sc2reader)
 * [heroes-of-the-storm-replay-parser](https://github.com/karlgluck/heroes-of-the-storm-replay-parser)

# Replay Data
## Events
### Game Events

| Event Id | Event Name |
|----------|---------|
| 5 | NNet.Game.SUserFinishedLoadingSyncEvent |
| 7 | NNet.Game.SUserOptionsEvent |
| 9 | NNet.Game.SBankFileEvent |
| 10 | NNet.Game.SBankSectionEvent |
| 11 | NNet.Game.SBankKeyEvent |
| 12 | NNet.Game.SBankValueEvent |
| 13 | NNet.Game.SBankSignatureEvent |
| 14 | NNet.Game.SCameraSaveEvent |
| 21 | NNet.Game.SSaveGameEvent |
| 22 | NNet.Game.SSaveGameDoneEvent |
| 23 | NNet.Game.SLoadGameDoneEvent |
| 25 | NNet.Game.SCommandManagerResetEvent |
| 26 | NNet.Game.SGameCheatEvent |
| 27 | NNet.Game.SCmdEvent |
| 28 | NNet.Game.SSelectionDeltaEvent |
| 29 | NNet.Game.SControlGroupUpdateEvent |
| 30 | NNet.Game.SSelectionSyncCheckEvent |
| 31 | NNet.Game.SResourceTradeEvent |
| 32 | NNet.Game.STriggerChatMessageEvent |
| 33 | NNet.Game.SAICommunicateEvent |
| 34 | NNet.Game.SSetAbsoluteGameSpeedEvent |
| 35 | NNet.Game.SAddAbsoluteGameSpeedEvent |
| 36 | NNet.Game.STriggerPingEvent |
| 37 | NNet.Game.SBroadcastCheatEvent |
| 38 | NNet.Game.SAllianceEvent |
| 39 | NNet.Game.SUnitClickEvent |
| 40 | NNet.Game.SUnitHighlightEvent |
| 41 | NNet.Game.STriggerReplySelectedEvent |
| 43 | NNet.Game.SHijackReplayGameEvent |
| 44 | NNet.Game.STriggerSkippedEvent |
| 45 | NNet.Game.STriggerSoundLengthQueryEvent |
| 46 | NNet.Game.STriggerSoundOffsetEvent |
| 47 | NNet.Game.STriggerTransmissionOffsetEvent |
| 48 | NNet.Game.STriggerTransmissionCompleteEvent |
| 49 | NNet.Game.SCameraUpdateEvent |
| 50 | NNet.Game.STriggerAbortMissionEvent |
| 51 | NNet.Game.STriggerPurchaseMadeEvent |
| 52 | NNet.Game.STriggerPurchaseExitEvent |
| 53 | NNet.Game.STriggerPlanetMissionLaunchedEvent |
| 54 | NNet.Game.STriggerPlanetPanelCanceledEvent |
| 55 | NNet.Game.STriggerDialogControlEvent |
| 56 | NNet.Game.STriggerSoundLengthSyncEvent |
| 57 | NNet.Game.STriggerConversationSkippedEvent |
| 58 | NNet.Game.STriggerMouseClickedEvent |
| 59 | NNet.Game.STriggerMouseMovedEvent |
| 60 | NNet.Game.SAchievementAwardedEvent |
| 61 | NNet.Game.STriggerHotkeyPressedEvent |
| 62 | NNet.Game.STriggerTargetModeUpdateEvent |
| 63 | NNet.Game.STriggerPlanetPanelReplayEvent |
| 64 | NNet.Game.STriggerSoundtrackDoneEvent |
| 65 | NNet.Game.STriggerPlanetMissionSelectedEvent |
| 66 | NNet.Game.STriggerKeyPressedEvent |
| 67 | NNet.Game.STriggerMovieFunctionEvent |
| 68 | NNet.Game.STriggerPlanetPanelBirthCompleteEvent |
| 69 | NNet.Game.STriggerPlanetPanelDeathCompleteEvent |
| 70 | NNet.Game.SResourceRequestEvent |
| 71 | NNet.Game.SResourceRequestFulfillEvent |
| 72 | NNet.Game.SResourceRequestCancelEvent |
| 73 | NNet.Game.STriggerResearchPanelExitEvent |
| 74 | NNet.Game.STriggerResearchPanelPurchaseEvent |
| 75 | NNet.Game.STriggerResearchPanelSelectionChangedEvent |
| 76 | NNet.Game.STriggerCommandErrorEvent |
| 77 | NNet.Game.STriggerMercenaryPanelExitEvent |
| 78 | NNet.Game.STriggerMercenaryPanelPurchaseEvent |
| 79 | NNet.Game.STriggerMercenaryPanelSelectionChangedEvent |
| 80 | NNet.Game.STriggerVictoryPanelExitEvent |
| 81 | NNet.Game.STriggerBattleReportPanelExitEvent |
| 82 | NNet.Game.STriggerBattleReportPanelPlayMissionEvent |
| 83 | NNet.Game.STriggerBattleReportPanelPlaySceneEvent |
| 84 | NNet.Game.STriggerBattleReportPanelSelectionChangedEvent |
| 85 | NNet.Game.STriggerVictoryPanelPlayMissionAgainEvent |
| 86 | NNet.Game.STriggerMovieStartedEvent |
| 87 | NNet.Game.STriggerMovieFinishedEvent |
| 88 | NNet.Game.SDecrementGameTimeRemainingEvent |
| 89 | NNet.Game.STriggerPortraitLoadedEvent |
| 90 | NNet.Game.STriggerCustomDialogDismissedEvent |
| 91 | NNet.Game.STriggerGameMenuItemSelectedEvent |
| 92 | NNet.Game.STriggerMouseWheelEvent |
| 93 | NNet.Game.STriggerPurchasePanelSelectedPurchaseItemChangedEvent |
| 94 | NNet.Game.STriggerPurchasePanelSelectedPurchaseCategoryChangedEvent |
| 95 | NNet.Game.STriggerButtonPressedEvent |
| 96 | NNet.Game.STriggerGameCreditsFinishedEvent |
| 97 | NNet.Game.STriggerCutsceneBookmarkFiredEvent |
| 98 | NNet.Game.STriggerCutsceneEndSceneFiredEvent |
| 99 | NNet.Game.STriggerCutsceneConversationLineEvent |
| 100 | NNet.Game.STriggerCutsceneConversationLineMissingEvent |
| 101 | NNet.Game.SGameUserLeaveEvent |
| 102 | NNet.Game.SGameUserJoinEvent |
| 103 | NNet.Game.SCommandManagerStateEvent |
| 104 | NNet.Game.SCmdUpdateTargetPointEvent |
| 105 | NNet.Game.SCmdUpdateTargetUnitEvent |
| 106 | NNet.Game.STriggerAnimLengthQueryByNameEvent |
| 107 | NNet.Game.STriggerAnimLengthQueryByPropsEvent |
| 108 | NNet.Game.STriggerAnimOffsetEvent |
| 109 | NNet.Game.SCatalogModifyEvent |
| 110 | NNet.Game.SHeroTalentTreeSelectedEvent |
| 111 | NNet.Game.STriggerProfilerLoggingFinishedEvent |
| 112 | NNet.Game.SHeroTalentTreeSelectionPanelToggledEvent |

### Message Events

| Event Id | Event Name |
|----------|---------|
| 0 | NNet.Game.SChatMessage |
| 1 | NNet.Game.SPingMessage |
| 2 | NNet.Game.SLoadingProgressMessage |
| 3 | NNet.Game.SServerPingMessage |
| 4 | NNet.Game.SReconnectNotifyMessage |

### Tracker Events

| Event Id | Event Name |
|----------|---------|
| 0 | NNet.Replay.Tracker.SPlayerStatsEvent |
| 1 | NNet.Replay.Tracker.SUnitBornEvent |
| 2 | NNet.Replay.Tracker.SUnitDiedEvent |
| 3 | NNet.Replay.Tracker.SUnitOwnerChangeEvent |
| 4 | NNet.Replay.Tracker.SUnitTypeChangeEvent |
| 5 | NNet.Replay.Tracker.SUpgradeEvent |
| 6 | NNet.Replay.Tracker.SUnitInitEvent |
| 7 | NNet.Replay.Tracker.SUnitDoneEvent |
| 8 | NNet.Replay.Tracker.SUnitPositionsEvent |
| 9 | NNet.Replay.Tracker.SPlayerSetupEvent |

#### NNet.Replay.Tracker.SPlayerStatsEvent
Player Stats events are generated for all players that were in the game, even if they've since
left, every 10 seconds.  
This event contains the following keys:
 * *m_playerId*: The Id of the player
 * *_eventid*: The Id of the event
 * *_event*: The name of the event
 * *_bits*: 
 * *_gameloop*: **NOTE** gameloop is a unit of time in the game. *_gameloop / 16.0* gives seconds passed since start of the game 
 * *m_stats*: Container of player stats:
    * *m_scoreValueFoodMade*: **NOTE** food is a generic term for Terran Supply, Zerg Control and Protoss Psi.
    * *m_scoreValueFoodUsed*
    * *m_scoreValueMineralsCollectionRate*
    * *m_scoreValueMineralsCurrent*
    * *m_scoreValueMineralsFriendlyFireArmy*
    * *m_scoreValueMineralsFriendlyFireEconomy*
    * *m_scoreValueMineralsFriendlyFireTechnology*
    * *m_scoreValueMineralsKilledArmy*
    * *m_scoreValueMineralsKilledEconomy*
    * *m_scoreValueMineralsKilledTechnology*
    * *m_scoreValueMineralsLostArmy*
    * *m_scoreValueMineralsLostEconomy*
    * *m_scoreValueMineralsLostTechnology*
    * *m_scoreValueMineralsUsedActiveForces*
    * *m_scoreValueMineralsUsedCurrentArmy*
    * *m_scoreValueMineralsUsedCurrentEconomy*
    * *m_scoreValueMineralsUsedCurrentTechnology*
    * *m_scoreValueMineralsUsedInProgressArmy*
    * *m_scoreValueMineralsUsedInProgressEconomy*
    * *m_scoreValueMineralsUsedInProgressTechnology*
    * *m_scoreValueVespeneCollectionRate*
    * *m_scoreValueVespeneCurrent*
    * *m_scoreValueVespeneFriendlyFireArmy*
    * *m_scoreValueVespeneFriendlyFireEconomy*
    * *m_scoreValueVespeneFriendlyFireTechnology*
    * *m_scoreValueVespeneKilledArmy*
    * *m_scoreValueVespeneKilledEconomy*
    * *m_scoreValueVespeneKilledTechnology*
    * *m_scoreValueVespeneLostArmy*
    * *m_scoreValueVespeneLostEconomy*
    * *m_scoreValueVespeneLostTechnology*
    * *m_scoreValueVespeneUsedActiveForces*
    * *m_scoreValueVespeneUsedCurrentArmy*
    * *m_scoreValueVespeneUsedCurrentEconomy*
    * *m_scoreValueVespeneUsedCurrentTechnology*
    * *m_scoreValueVespeneUsedInProgressArmy*
    * *m_scoreValueVespeneUsedInProgressEconomy*
    * *m_scoreValueVespeneUsedInProgressTechnology*
    * *m_scoreValueWorkersActiveCount*
