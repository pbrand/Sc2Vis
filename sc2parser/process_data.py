import glob, os
from sc2parser import Sc2ReplayParser

path = '../Data/Raw/'
os.chdir(path)
for file in glob.glob("*.SC2Replay"):
    absolute_path_to_file = os.path.abspath(file)
    p = Sc2ReplayParser(absolute_path_to_file)
    p.parse()