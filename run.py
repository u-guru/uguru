from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	manager.run()
    # app.run('192.168.1.233')
