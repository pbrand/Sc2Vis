from sc2parser.s2protocol import protocol39576

f = open('EventTables.md', 'w')
f.write('### Game Events\n\n')
f.write('| Event Id | Event Name |\n|----------|---------|\n')
for k in protocol39576.game_event_types.keys():
    f.write('| '+str(k)+' | '+protocol39576.game_event_types[k][1]+' |\n')

f.write('\n### Message Events\n\n')
f.write('| Event Id | Event Name |\n|----------|---------|\n')
for k in protocol39576.message_event_types.keys():
    f.write('| '+str(k)+' | '+protocol39576.message_event_types[k][1]+' |\n')

f.write('\n### Tracker Events\n\n')
f.write('| Event Id | Event Name |\n|----------|---------|\n')
for k in protocol39576.tracker_event_types.keys():
    f.write('| '+str(k)+' | '+protocol39576.tracker_event_types[k][1]+' |\n')
f.close()
