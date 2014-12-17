from app.models import *
from app.database import init_db
import sys


if len(sys.argv) > 1:
    arg = sys.argv[1]
else:
    arg = ''

def initialize():
    init_db()
    print 'db initialized'


if arg == 'initialize':
    initialize()