import json
import string

from sc2reader import Sc2ReplayReader

class Sc2ReplayParser:
    def __init__(self, path_to_replay):
        self.__replay_path = path_to_replay # Expects data to be in a directory called Raw
        self.__reader = Sc2ReplayReader(self.__replay_path)
        self.__output_path = string.split(self.__replay_path, 'Raw/')[0] + 'JSON/'
    
    def parse(self):
        replay_name = string.rsplit(self.__replay_path,'/',1)[1] # extract filename + extension
        replay_name = string.split(replay_name, '.')[0] # remove extension
        print 'Reading file: '+replay_name
        
        parsed_details = {}
        parsed_economy_data = []
        self.__parse_replay_details(parsed_details)
        self.__parse_economy_data(parsed_economy_data)
        
        print 'Parsing to file: '+self.__output_path+replay_name+'.js'
        # Write data to file
        with open(self.__output_path+replay_name+'.js', 'w') as outfile:
            outfile.write('details = ')
            json.dump(parsed_details, outfile)
            outfile.write('\neconomy = ')
            json.dump(parsed_economy_data, outfile)
        outfile.close()
        
    def __parse_replay_details(self, output_list):
        # Get replay details from reader
        replay_header = self.__reader.get_replay_header()
        replay_details = self.__reader.get_replay_details()
                
        output_list['elapsedGameLoops'] = replay_header['m_elapsedGameLoops']
        output_list['baseBuild'] = self.__reader.get_replay_protocol_version()
        output_list['mapName'] = replay_details['m_title']
        output_list['gameStart'] = (replay_details['m_timeUTC'] / 10000000) - 11644473600 # Found at https://github.com/karlgluck/heroes-of-the-storm-replay-parser
        last_registered_game_loop = self.__reader.get_replay_tracker_events()[-1]['_gameloop'] 
        output_list['gameTime'] = last_registered_game_loop / 16.0 # in seconds and corresponds with ggtracker
        output_list['isBlizzardMap'] = replay_details['m_isBlizzardMap']
        output_list['gameSpeed'] = replay_details['m_gameSpeed']
        parsed_player_list = []
        for e in replay_details['m_playerList']:
            d = {}
            color = {}
            color['r'] = e['m_color']['m_r']
            color['g'] = e['m_color']['m_g']
            color['b'] = e['m_color']['m_b']
            color['a'] = e['m_color']['m_a']
            d['color'] = color
            d['teamId'] = e['m_teamId']
            d['observe'] = e['m_observe']
            d['control'] = e['m_control']
            d['race'] = e['m_race']
            d['handicap'] = e['m_handicap']
            d['name'] = e['m_name']
            d['result'] = e['m_result']
            d['region'] = e['m_toon']['m_region']
            parsed_player_list.append(d)
        output_list['playerList'] = parsed_player_list
    
    def __parse_economy_data(self, output_list):
        # PlayerId -> UserId mapping
        playerIdToUserId = {}
        tracker_events = self.__reader.get_replay_tracker_events()
        for event in tracker_events:
            if event['_event'] == 'NNet.Replay.Tracker.SPlayerSetupEvent':
                playerIdToUserId[event['m_playerId']] = event['m_userId']
        
        for event in tracker_events:
            if event['_eventid'] == 0: # NNet.Replay.Tracker.SPlayerStatsEvent
                economy_entry = {}
                economy_entry['gameloop'] = event['_gameloop']
                #economy_entry['playerId'] = event['m_playerId'] # WIP add events under each playerId, but don't know how to link all playerId's yet.
                economy_entry['userId'] = playerIdToUserId[event['m_playerId']]
                # capture all stats
                for stat in event['m_stats'].keys():
                    economy_entry[string.strip(stat,'m_')] = event['m_stats'][stat]
                output_list.append(economy_entry)