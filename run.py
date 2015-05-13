from app import app
from app import manager
import os


if os.environ.get('DATABASE_URL'):
    app.debug = False
else:
    app.debug = True

if __name__ == '__main__':
	manager.run()
    # app.run(host='192.168.42.66', port=5000)