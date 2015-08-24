from app import app
from app import manager
import logging
from logging.handlers import SMTPHandler
import os


if os.environ.get('DATABASE_URL'):
    app.debug = False
else:
    app.debug = True


if __name__ == '__main__':
	# manager.run()
    app.run(host='192.168.1.43', port=5000)
    # app.run(host='192.168.42.120', port=5000)
