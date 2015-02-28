from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	manager.run()
    # app.run('10.248.146.12')
