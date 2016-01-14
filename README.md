# Sc2Vis
Starcraft II Visualization course Datavisualization

# Replay Data
## Events
The event id's and names are gathered from Blizzard's s2protocol python package (up to date with file: protocol39576.py)
Note that the Event Names in the tables are the shortened names, an original event named: **NNet.Game.SUserFinishedLoadingSyncEvent** is called **SUserFinishedLoadingSyncEvent** in our tables.
### Game Events
Original Game Event Names are of the following form: **NNet.Game.***Event name*.

| *Event Id*  | *Event Name*  |
|----------|-----------|
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
Original Message Event Names are of the following form: **NNet.Game.***Event name*.

| Event Id   | Event Name                |
|------------|---------------------------|
| 0          | SChatMessage              |
| 1          | SPingMessage              |
| 2          | SLoadingProgressMessage   |
| 3          | SServerPingMessage        |
| 4          | SReconnectNotifyMessage   |

### Tracker Events
Original Tracker Event Names are of the following form: **NNet.Replay.Tracker.***Event name*.

| Event Id   | Event Name              |
|------------|-------------------------|
| 0          | SPlayerStatsEvent       |
| 1          | SUnitBornEvent          |
| 2          | SUnitDiedEvent          |
| 3          | SUnitOwnerChangeEvent   |
| 4          | SUnitTypeChangeEvent    |
| 5          | SUpgradeEvent           |
| 6          | SUnitInitEvent          |
| 7          | SUnitDoneEvent          |
| 8          | SUnitPositionsEvent     |
| 9          | SPlayerSetupEvent       |
