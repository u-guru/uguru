from app import app
from flask import render_template

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/portfolio/')
def portfolio():
	return render_template('portfolio.html')

@app.route('/admin/')
def admin():
    return render_template('admin.html')

@app.route('/home/')
def home():
    return render_template('home.html')

@app.route('/tutorsignup1/')
def tutorsignup1():
    return render_template('tutorsignup1.html')

@app.route('/tutorsignup2/')
def tutorsignup2():
    return render_template('tutorsignup2.html')

@app.route('/howitworks/')
def howitworks():
    return render_template('howitworks.html')

@app.route('/studentsignup1/')
def studentsignup1():
    return render_template('studentsignup1.html')

@app.route('/studentsignup2/')
def studentsignup2():
    return render_template('studentsignup2.html')

@app.route('/studentsignup3/')
def studentsignup3():
    return render_template('studentsignup3.html')

@app.route('/login/')
def login():
    return render_template('login.html')

@app.route('/settings/')
def settings():
    return render_template('settings.html')