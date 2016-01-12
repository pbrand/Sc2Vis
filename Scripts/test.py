import sys
import argparse
import pprint

import mpyq
import protocol39576


class EventLogger:
    def __init__(self):
        self._event_stats = {}
        
    def log(self, output, event):
        # update stats
        if '_event' in event and '_bits' in event:
            stat = self._event_stats.get(event['_event'], [0, 0])
            stat[0] += 1  # count of events
            stat[1] += event['_bits']  # count of bits
            self._event_stats[event['_event']] = stat
        # write structure
        pprint.pprint(event, stream=output)
        
    def log_stats(self, output):
        for name, stat in sorted(self._event_stats.iteritems(), key=lambda x: x[1][1]):
            print >> output, '"%s", %d, %d,' % (name, stat[0], stat[1] / 8)
    

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('replay_file', help='.SC2Replay file to load')
    parser.add_argument("--gameevents", help="print game events",
                        action="store_true")
    parser.add_argument("--messageevents", help="print message events",
                        action="store_true")
    parser.add_argument("--trackerevents", help="print tracker events",
                        action="store_true")
    parser.add_argument("--attributeevents", help="print attributes events",
                        action="store_true")
    parser.add_argument("--header", help="print protocol header",
                        action="store_true")
    parser.add_argument("--details", help="print protocol details",
                        action="store_true")
    parser.add_argument("--initdata", help="print protocol initdata",
                        action="store_true")
    parser.add_argument("--stats", help="print stats",
                        action="store_true")
    args = parser.parse_args()

    archive = mpyq.MPQArchive(args.replay_file)
    
    logger = EventLogger()

    # Read the protocol header, this can be read with any protocol
    contents = archive.header['user_data_header']['content']
    header = protocol39576.decode_replay_header(contents)
    if args.header:
        logger.log(sys.stdout, header)

    # The header's baseBuild determines which protocol to use
    baseBuild = header['m_version']['m_baseBuild']
    try:
        protocol = __import__('protocol%s' % (baseBuild,))
    except:
        print >> sys.stderr, 'Unsupported base build: %d' % baseBuild
        sys.exit(1)
        
    # Print protocol details
    if args.details:
        contents = archive.read_file('replay.details')
        details = protocol.decode_replay_details(contents)
        logger.log(sys.stdout, details)

    # Print protocol init data
    if args.initdata:
        contents = archive.read_file('replay.initData')
        initdata = protocol.decode_replay_initdata(contents)
        logger.log(sys.stdout, initdata['m_syncLobbyState']['m_gameDescription']['m_cacheHandles'])
        logger.log(sys.stdout, initdata)

    # Print game events and/or game events stats
    if args.gameevents:
        contents = archive.read_file('replay.game.events')
        for event in protocol.decode_replay_game_events(contents):
            logger.log(sys.stdout, event)

    # Print message events
    if args.messageevents:
        contents = archive.read_file('replay.message.events')
        for event in protocol.decode_replay_message_events(contents):
            logger.log(sys.stdout, event)

    # Print tracker events
    if args.trackerevents:
        if hasattr(protocol, 'decode_replay_tracker_events'):
            contents = archive.read_file('replay.tracker.events')
            for event in protocol.decode_replay_tracker_events(contents):
                logger.log(sys.stdout, event)

    # Print attributes events
    if args.attributeevents:
        contents = archive.read_file('replay.attributes.events')
        attributes = protocol.decode_replay_attributes_events(contents)
        logger.log(sys.stdout, attributes)
        
    # Print stats
    if args.stats:
        logger.log_stats(sys.stderr)
