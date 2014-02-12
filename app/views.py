from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, \
session, flash, redirect, url_for
from forms import SignupForm, RequestForm
from models import User, Request, Skill
from hashlib import md5
import emails

@app.route('/', methods=['GET', 'POST'])
def index():
    request_form = RequestForm()
    return render_template('index.html', forms=[request_form],
        logged_in=session.get('user_id'))

@app.route('/requests/student/<request_id>')
def confirm_student_interest(request_id):
    if not session.get('user_id'):
        return redirect(url_for('login', redirect=True, student_confirm=request_id, \
            tutor_id=request.args.get('tutor_id')))
    user_id = session['user_id']
    user = User.query.get(user_id)
    r = Request.query.get(request_id)
    skill = Skill.query.get(r.skill_id)
    tutor_id = request.args.get('tutor_id')
    tutor = User.query.get(int(tutor_id))
    tutor_name = tutor.name

    page_info = {'student_name':user.name, 'tutor_name':tutor_name, }
    r.connected_tutor_id = tutor_id

    emails.send_connection_email(user, tutor, r)
    print "email sent"

    return render_template('student_accept.html', logged_in=session.get('user_id'), \
        page_dict = page_info)

@app.route('/requests/tutors/<request_id>')
def confirm_tutor_interest(request_id):
    if not session.get('user_id'):
        return redirect(url_for('login', redirect=True, tutor_confirm=request_id))
    user_id = session['user_id']
    user = User.query.get(user_id)
    request = Request.query.get(request_id)
    skill = Skill.query.get(request.skill_id)
    student_requesting_help = User.query.get(request.student_id)
    student_name = student_requesting_help.name
    skill_name = skill.name

    page_info = { 'student_name': student_name, 'skill_name': skill_name}
    
    #Make sure the correct user clicks this link
    if user not in request.requested_tutors:
        flash("You were sent to the wrong page. We've \
            redirected you back to the home page.")
        return redirect(url_for("index"))

    request.committed_tutors.append(user)
    student_requesting_help.incoming_requests_to_tutor.append(request)
    db_session.commit()

    #Send email to student to let them know
    url = url_for('confirm_student_interest', request_id=request.id, _external=True, tutor_id=user_id)
    print url
    emails.send_tutor_accept_to_student(request, user, skill, student_requesting_help, url)

    return render_template('tutor_accept.html', logged_in=session.get('user_id'), \
        page_dict = page_info)


@app.route('/validation/', methods=('GET', 'POST'))
def success():
    if request.method == "POST":
        ajax_json = request.json
        
        #Create user for first time experiences
        if ajax_json.get('student-signup'):
            u = User(
                name = ajax_json['name'], 
                password = md5(ajax_json['password']).hexdigest(),
                email = ajax_json['email'] + '@berkeley.edu',
                phone_number = ajax_json['phone']
            )
            db_session.add(u)
            try:
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            user_id = u.id
            authenticate(user_id)

        #Create a request
        if ajax_json.get('student-request'):
            user_id = session['user_id']
            u = User.query.get(user_id)
            r = Request(
                student_id = user_id,
                skill_id = 1, #change this later,
                description = ajax_json['description'],
                urgency = ajax_json['urgency'],
                frequency = ajax_json['frequency'],
                time_estimate = float(ajax_json['estimate'])
            )
            u.outgoing_requests.append(r)
            db_session.add(r)            
            db_session.commit()
            for tutor in r.requested_tutors:
                tutor.incoming_requests_to_tutor.append(r)
            db_session.commit()
            emails.send_request_to_tutors(r, \
                url_for('confirm_tutor_interest', request_id=r.id, _external=True))

        #Create a tutor for the first time
        if ajax_json.get('tutor-signup'):
            u = User(
                name = ajax_json['name'], 
                password = md5(ajax_json['password']).hexdigest(),
                email = ajax_json['email'] + '@berkeley.edu',
                phone_number = ajax_json['phone'],
            )
            u = User(
                name = ajax_json['name'], 
                password = md5(ajax_json['password']).hexdigest(),
                email = ajax_json['email'] + '@berkeley.edu',
                phone_number = ajax_json['phone']
            )
            db_session.add(u)
            db_session.commit()
            # Process skills
        return jsonify(dict=ajax_json)

@app.route('/logout/', methods=('GET', 'POST'))
def logout():
    session.pop("user_id")    
    flash('You have been logged out', 'info')
    return redirect(url_for("index"))

@app.route('/login/', methods=('GET', 'POST'))
def login():
    if session.get('user_id'):
        flash("You are already logged in!")
        return redirect(url_for('index'))
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        email = ajax_json['email']
        password = md5(ajax_json['password']).hexdigest()
        query = User.query.filter_by(email=email, password=password).first()
        if query:
            user = query
            authenticate(user.id)
            json['success'] = True                
            if request.args.get('redirect'):
                if request.args.get('tutor_confirm'):                    
                    json['redirect'] = redirect=url_for('confirm_tutor_interest',\
                        request_id=request.args.get('tutor_confirm'))
                if request.args.get('student_confirm'):                    
                    json['redirect'] = redirect=url_for('confirm_student_interest',\
                        request_id=request.args.get('student_confirm'), \
                        tutor_id=request.args.get('tutor_id'))                    
            else:
                flash("You have been logged in")
                json['redirect'] = '/'      
        else:
            json['failure'] = False
        return jsonify(json=json)
    return render_template("login.html", redirect=request.query_string)    

@app.route('/tutorsignup1/', methods=('GET', 'POST'))
def tutorsignup1():
    form = SignupForm()
    if form.validate_on_submit():
        return redirect('/')
    return render_template('tutorsignup1.html', form=form)

@app.route('/tutorsignup2/')
def tutorsignup2():  
    return render_template('tutorsignup2.html')

@app.route('/howitworks/')
def howitworks():
    return render_template('howitworks.html')

@app.route('/settings/')
def settings():
    return render_template('settings.html', logged_in=session.get('user_id'))

@app.route('/tutor_accept/')
def tutor_accept():
    page_info = { 'student_name': 'Jaclyn', 'skill_name': 'CS61A'}
    return render_template('tutor_accept.html', page_dict = page_info)

@app.route('/student_accept/')
def studentaccept():
    return render_template('student_accept.html')

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

@app.route('/sorry/')
def sorry():
    return render_template('sorry.html')

def authenticate(user_id):
    session['user_id'] = user_id

