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
