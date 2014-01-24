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

@app.route('/tutorsignup/')
def tutorsignup():
    return render_template('tutorsignup.html')