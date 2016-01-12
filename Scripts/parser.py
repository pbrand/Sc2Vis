import mpyq
import protocol39576
import json

Path = '../Data/Raw/'
File = '0c164dd4b2808634e3e40457d1da9ec5.SC2Replay'

archive = mpyq.MPQArchive(Path+File)

# Read the protocol header, this can be read with any protocol
contents = archive.header['user_data_header']['content']
header = protocol39576.decode_replay_header(contents)

# The header's baseBuild determines which protocol to use
baseBuild = header['m_version']['m_baseBuild']

try:
    protocol = __import__('protocol%s' % (baseBuild,))
except:
    print >> sys.stderr, 'Unsupported base build: %d' % baseBuild
    sys.exit(1)
        
if hasattr(protocol, 'decode_replay_tracker_events'):
    #f = open('../Data/JSON/'+File+'.json', 'w')
    contents = archive.read_file('replay.tracker.events')
    for event in protocol.decode_replay_tracker_events(contents):
        print str(event['m_playerId'])+' '+str(event['_event'])
        #f.write(json.dumps(event))
        #logger.log(sys.stdout, event)
    #f.close()
    