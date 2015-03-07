from app import app
from app import manager

app.debug = False

if __name__ == '__main__':
	# manager.run()
    app.run(host='192.168.0.102', port=5000)
