from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	app.run('192.168.128.90')
