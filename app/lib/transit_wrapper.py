# from bart_api import BartApi

from pprint import pprint

from fiveoneone.route import Route
from fiveoneone.stop import Stop

_511_TOKEN = "798eae7e-de93-42ea-bc24-bba9d29c88d5"

# bart = BartApi("MW9S-E7SL-26DU-VV8V")

PREFERENCES = {'EMBR':'s','12TH':'n','ROCK': 's'}

def getBartDeparturesFrom(abbr):
    station_info = bart.station_info(abbr)
    depts = bart.etd(abbr, None, 's')
    for dept in depts:
        hex_color = dept['estimates'][0]['hexcolor']
        print_args = (dept['estimates'][0]['length'], dept['destination'], dept['estimates'][0]['minutes'])
        print "%s car train for %s leaving in %s minutes" % print_args
    return depts



def getRealTimeTransitData():
    # bartLines = getBartDeparturesFrom('EMBR')
    muniLines = getMuniDeparturesFrom()

def getMuniDeparturesFrom():
    route = Route(_511_TOKEN, "SF-MUNI", "45-Union Stockton", "45", True)
    stop = Stop(_511_TOKEN, "Union St and Buchanan St", "17056")
    departures = stop.next_departures(route.code, "Outbound")
    print "{} Outbound will arrive to {} in {} minutes".format(route.code, stop.name, departures.times[0])
    

getRealTimeTransitData()