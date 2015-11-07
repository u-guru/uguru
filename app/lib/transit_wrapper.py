from bart_api import BartApi
from pprint import pprint

bart = BartApi("MW9S-E7SL-26DU-VV8V")

PREFERENCES = {'EMBR':'s','12TH':'n','ROCK': 's'}

def getDepartures(abbr):
    station_info = bart.station_info(abbr)
    depts = bart.etd(abbr, None, 's')
    for dept in depts:
        hex_color = dept['estimates'][0]['hexcolor']
        print_args = (dept['estimates'][0]['length'], dept['destination'], dept['estimates'][0]['minutes'])
        print "%s car train for %s leaving in %s minutes" % print_args
    return depts


def getRealTimeTransitData():
    return getDepartures('EMBR')

def printHelpInfo():
    print "AVAILABLE COMMANDS"
    print
    print "EMBR <N,S>"
    print "12TH <N,S>"
    print "ROCK <N,S>"

# if __name__ == '__main__':
#     import sys
#     args = sys.argv

#     try:
#         if args[1] == 'help':
#             printHelpInfo()
#             pass

#         if args[1] in PREFERENCES.keys():
#             abbr = args[1]
#             getDepartures(abbr)

#     except:
#         print "No more trains available -- why are you