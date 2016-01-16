import json
import string

from sc2reader import Sc2ReplayReader

class Sc2ReplayParser:
    def __init__(self, path_to_replay):
        self.__replay_path = path_to_replay # Expects data to be in a directory called Raw
        self.__reader = Sc2ReplayReader(self.__replay_path)
        self.__output_path = string.split(self.__replay_path, 'Raw/')[0] + 'JSON/'
        self.__collect_data()
    
    def parse(self):
        replay_name = string.rsplit(self.__replay_path,'/',1)[1] # extract filename + extension
        replay_name = string.split(replay_name, '.')[0] # remove extension
        print 'Reading file: '+replay_name
        
        # Parse data
        parsed_details = {}
        parsed_economy_data = {}
        self.__parse_replay_details(parsed_details)
        self.__parse_economy_data(parsed_economy_data)
        
        # Write data to file
        print 'Parsing to file: '+self.__output_path+replay_name+'.js'
        with open(self.__output_path+replay_name+'.js', 'w') as outfile:
            outfile.write('details = ')
            json.dump(parsed_details, outfile)
            outfile.write(',\neconomy = ')
            json.dump(parsed_economy_data, outfile)
        outfile.close()
    
    def __collect_data(self):
        # read replay data:
        self.__replay_header = self.__reader.get_replay_header()
        self.__replay_details = self.__reader.get_replay_details()
        self.__tracker_events = self.__reader.get_replay_tracker_events()
        # set initial data:
        self.__economy_data = []
        self.__playerIdToUserId = {} # PlayerId -> UserId mapping
        for event in self.__tracker_events:
            if event['_event'] == 'NNet.Replay.Tracker.SPlayerSetupEvent':
                self.__playerIdToUserId[event['m_playerId']] = event['m_userId']
            if event['_event'] == 'NNet.Replay.Tracker.SPlayerStatsEvent':
                self.__economy_data.append(event)
        

    def __parse_replay_details(self, output_list):
        output_list['elapsedGameLoops'] = self.__replay_header['m_elapsedGameLoops']
        output_list['baseBuild'] = self.__reader.get_replay_protocol_version()
        output_list['mapName'] = self.__replay_details['m_title']
        output_list['gameStart'] = (self.__replay_details['m_timeUTC'] / 10000000) - 11644473600 # Found at https://github.com/karlgluck/heroes-of-the-storm-replay-parser
        last_registered_game_loop = self.__tracker_events[-1]['_gameloop'] 
        output_list['gameTime'] = last_registered_game_loop / 16.0 # in seconds and corresponds with ggtracker
        output_list['isBlizzardMap'] = self.__replay_details['m_isBlizzardMap']
        output_list['gameSpeed'] = self.__replay_details['m_gameSpeed']
        parsed_player_list = []
        for e in self.__replay_details['m_playerList']:
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
        for userId in self.__playerIdToUserId.values():
            output_list[userId] = []
            
        for event in self.__economy_data:
            economy_entry = {'food': {},
                                'minerals': {'army': {}, 'economy': {}, 'technology': {}},
                                'vespene': {'army': {}, 'economy': {}, 'technology': {}}}
            economy_entry['gameloop'] = event['_gameloop']
            
            self.__parse_economy_stats(economy_entry, event['m_stats'])
            
            current_userId = self.__playerIdToUserId[event['m_playerId']]
            output_list[current_userId].append(economy_entry)
    
    def __parse_economy_stats(self, economy_entry, stats):
        # capture all stats
        for stat in stats.keys():
            if 'Food' in stat:
                stat_type = string.split(stat, 'Food')[1]
                stat_type = first_char_to_lower(stat_type)
                economy_entry['food'][stat_type] = stats[stat]
            elif 'Minerals' in stat:
                self.__parse_resource_domain_stats('Minerals', economy_entry, stat, stats[stat])
            elif 'Vespene' in stat:
                self.__parse_resource_domain_stats('Vespene', economy_entry, stat, stats[stat])
            else:
                stat_type = string.strip(stat,'m_scoreValue')
                stat_type = first_char_to_lower(stat_type)
                economy_entry[stat_type] = stats[stat]
    
    def __parse_resource_domain_stats(self, resource, entry, stat, value):
        stat_type = string.split(stat, resource)[1]
        domain = ''
        if 'Army' in stat_type:
            domain = 'Army'
            stat_type = string.split(stat_type, domain)[0]
        elif 'Economy' in stat_type:
            domain = 'Economy'
            stat_type = string.split(stat_type, domain)[0]
        elif 'Technology' in stat_type:
            domain = 'Technology'
            stat_type = string.split(stat_type, domain)[0]
            
        if domain:
            stat_type = first_char_to_lower(stat_type)
            entry[resource.lower()][domain.lower()][stat_type] = value
        else:
            entry[resource.lower()][stat_type] = value

# Function changes the first character of a string to lower case.
first_char_to_lower = lambda s: s[:1].lower() + s[1:] if s else ''