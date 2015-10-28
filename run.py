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

<<<<<<< HEAD
	manager.run()
    # app.run(host='192.168.0.102', port=5000)
=======
	# manager.run()
    app.run(host='192.168.0.104', port=5000)

>>>>>>> 03923bf19ad53355937dfb38bd88d46e25b5b8df
