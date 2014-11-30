from app import app

app.debug = True

if __name__ == '__main__':
    app.run(host='192.168.128.90', debug=app.debug)