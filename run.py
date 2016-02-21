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
    manager.run()
    # app.run(host=hon'192.168.42.70', port=5000)
