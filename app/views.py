from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, session
from forms import SignupForm, RequestForm
from models import User, Request
from hashlib import md5

@app.route('/', methods=['GET', 'POST'])
def index():
    request_form = RequestForm()
    return render_template('index.html', forms=[request_form],
        logged_in=session.get('user_id'))

@app.route('/validation/', methods=('GET', 'POST'))
def success():
    if request.method == "POST":
        ajax_json = request.json
        
        #Create user for first time experiences
        if ajax_json.get('student-signup'):
            u = User(
                name = ajax_json['name'], 
                password = md5(ajax_json['password']).hexdigest(),
                email = ajax_json['email'],
                phone_number = ajax_json['phone']
            )
            db_session.add(u)
            db_session.commit()
            user_id = u.id
            authenticate(user_id)

        #Create a request
        if ajax_json.get('student-request'):
            user_id = session['user_id']
            r = Request(
                student_id = user_id,
                skill_id = 1, #change this later,
                description = ajax_json['description'],
                urgency = ajax_json['urgency'],
                frequency = ajax_json['frequency'],
                time_estimate = float(ajax_json['estimate'])
            )
            db_session.add(r)
            db_session.commit()
            #TODO: Post request creation tutor notification

        return jsonify(name=test)
    # name = request.form['name']
    # email = request.args.get('email', "", type=str)
    # phone = request.args.get('phone', "", type=str)
    # print name + " sdasdsa"
    # return jsonify(test=name)

@app.route('/portfolio/')
def portfolio():
	return render_template('portfolio.html')

@app.route('/admin/')
def admin():
    return render_template('admin.html')

@app.route('/tutorsignup1/', methods=('GET', 'POST'))
def tutorsignup1():
    form = SignupForm()
    if form.validate_on_submit():
        return redirect('/')
    return render_template('tutorsignup.html', form=form)

@app.route('/tutorsignup2/')
def tutorsignup2():
    return render_template('tutorsignup2.html')

@app.route('/howitworks/')
def howitworks():
    return render_template('howitworks.html')

@app.route('/studentsignup3/')
def studentsignup3():
    return render_template('studentsignup3.html')

@app.route('/login/')
def login():
    return render_template('login.html')

@app.route('/settings/')
def settings():
    return render_template('settings.html')

@app.route('/tutoraccept/')
def tutoraccept():
    return render_template('tutoraccept.html')

@app.route('/studentaccept/')
def studentaccept():
    return render_template('studentaccept.html')

@app.route('/ratingconfirm/')
def ratingconfirm():
    return render_template('ratingconfirm.html')

@app.route('/rating_noshow/')
def rating_noshow():
    return render_template('rating_noshow.html')

@app.route('/rating_stars/')
def rating_stars():
    return render_template('rating_stars.html')

@app.route('/rating_gen/')
def rating_gen():
    return render_template('rating_gen.html')

def authenticate(user_id):
    session['user_id'] = user_id

def logout():
    session.pop('user_id')