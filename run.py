from app import app
from app import manager

app.debug = True

if __name__ == '__main__':
	# manager.run()
    app.run(host='10.248.146.115', port=5000)