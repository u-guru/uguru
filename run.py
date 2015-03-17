from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	manager.run()
    # app.run(host='192.168.0.104', port=5000)