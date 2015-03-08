from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	# manager.run()
    app.run(host='161.82.64.66', port=5000)
