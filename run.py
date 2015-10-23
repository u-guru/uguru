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
<<<<<<< HEAD
    app.run(host='192.168.0.107', port=5000)
=======
    app.run(host='192.168.0.102', port=5000)

>>>>>>> b0e4916a3747ca62f354438733110c9b351ea82a
