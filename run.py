from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	app.run('0.0.0.0')