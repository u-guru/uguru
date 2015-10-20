from app import app
from app import manager
import logging
from logging.handlers import SMTPHandler
import os


if os.environ.get('DATABASE_URL'):
    app.debug = True
else:
    app.debug = True


if __name__ == '__main__':

	manager.run()
    # app.run(host='10.37.129.2', port=5000)
