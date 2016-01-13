import json
import string

from sc2reader import Sc2ReplayReader

class Sc2ReplayParser:
    def __init__(self, path_to_replay):
        self.__replay_path = path_to_replay
        self.__reader = Sc2ReplayReader(self.__replay_path)
        self.__output_path = '../Data/JSON/'
    
    def parse(self):
        print 'Reading file: '+self.__replay_path
        replay_name = string.rsplit(self.__replay_path,'/',1)[1] # extract filename + extension
        replay_name = string.split(replay_name, '.')[0] # remove extension
        
        parsed_details = {}
        parsed_economy_data = {}
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
        pass


    
# NOTE: TO GET TIME OF MATCH: a=(m_timeUTC / 10000000) - 11644473600 (Then test it with date -d @a)
path_to_data = '../Data/Raw/'
f = '0c164dd4b2808634e3e40457d1da9ec5.SC2Replay'
p = Sc2ReplayParser(path_to_data + f)
p.parse()

