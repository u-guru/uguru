from app import app, models
from app.database import *
from flask import render_template, jsonify, redirect, request, \
session, flash, redirect, url_for
from forms import SignupForm, RequestForm
from models import User, Request, Skill, Course
from hashlib import md5
from datetime import datetime
import emails, boto

MAX_UPLOAD_SIZE = 1024 * 1024
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

@app.route('/', methods=['GET', 'POST'])
def index():
    if session.get('user_id'):
        return render_template('activity.html')
    request_form = RequestForm()
    return render_template('new_index.html', forms=[request_form],
        logged_in=session.get('user_id'))


@app.route('/sneak/', methods=['GET', 'POST'])
def sneak():
    return render_template('new_index.html')

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
    r.time_connected = datetime.now()

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

    #Check if student is already connected
    if request.connected_tutor_id:
        return render_template('sorry.html', logged_in=session.get('user_id'))
    else: 
        url = url_for('confirm_student_interest', request_id=request.id, _external=True, tutor_id=user_id)
        emails.send_tutor_accept_to_student(request, user, skill, student_requesting_help, url)

    return render_template('tutor_accept.html', logged_in=session.get('user_id'), \
        page_dict = page_info)

@app.route('/notification-settings/', methods=('GET','POST'))
def update_notifications():
    if request.method == "POST":
        ajax_json = request.json
        print ajax_json
        user_id = session['user_id']
        user = User.query.get(user_id)
        if 'text' in ajax_json:
            user.text_notification = ajax_json.get('text')
        if 'email' in ajax_json:
            user.email_notification = ajax_json.get('email')
        db_session.commit()
        print "user email notification is now " + str(user.email_notification)
        print "user next notification is now " + str(user.text_notification)
        return jsonify(ajax_json)

@app.route('/update-profile/', methods=('GET', 'POST'))
def update_profile():
    if request.method == "POST":
        ajax_json = {}
        return_json = {}
        user_id = session.get('user_id')
        user = User.query.get(user_id)
        
        #If image has been uploaded
        if request.files:
            file = request.files['file']
            extension = file.filename.rsplit('.',1)[1]
            destination_filename = md5(str(user_id)).hexdigest() + "." + extension

            upload_file_to_amazon(destination_filename, file)
        
            #save this to the db
            amazon_url = "https://s3.amazonaws.com/uguruprof/"+destination_filename
            user.profile_url = amazon_url

            db_session.commit();

        #if other profile data is being updated
        if request.json:
            ajax_json = request.json

        if ajax_json.get('intro'):
            user.tutor_introduction = ajax_json.get('intro')
        if ajax_json.get('price'):
            user.advertised_rate = ajax_json.get('price')
        if 'discover' in ajax_json:
            user.discoverability = ajax_json.get('discover')
        db_session.commit()
        return jsonify(ajax_json)


@app.route('/update-skill/', methods=('GET', 'POST'))
def update_skill():
    if request.method == "POST":
        return_json = {}
        ajax_json = request.json
        print ajax_json
        user_id = session.get('user_id')
        user = User.query.get(user_id)

        from app.static.data.variations import courses_dict

        if ajax_json.get('add'):
            skill_to_add = ajax_json.get('add').lower()

            #check if skill is a course
            if courses_dict.get(skill_to_add):
                skill_to_add_id = courses_dict[skill_to_add]
                skill = Skill.query.get(skill_to_add_id)
                user.skills.append(skill)
            else: #not a course 
                course = Course(skill_to_add)
                db_session.add(course)
        if ajax_json.get('remove'):
            skill_to_remove = ajax_json.get('remove').lower()
            for skill in user.skills:
                if skill.name.lower() == skill_to_remove:
                    user.skills.remove(skill)
        db_session.commit()
        return jsonify(response=return_json)
    

@app.route('/update-password/', methods=('GET','POST'))
def update_password():
    if request.method == "POST":
        return_json = {}
        
        ajax_json = request.json
        old_password = md5(ajax_json.get('old-pwd')).hexdigest()
        new_password = md5(ajax_json.get('new-pwd')).hexdigest()
        user_id = session['user_id']
        user = User.query.get(user_id)
        
        if old_password != user.password:
            return_json['error'] = 'Incorrect original password'
        else:
            user.password = new_password
            return_json['success'] = 'Password successfully updated'
            print "user password before was " + str(old_password)
            print "user password is now" + str(new_password)
        db_session.commit()
        return jsonify(response=return_json)

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
            try:
                db_session.add(u)
                skill = Skill.query.get(1)
                u.skills.append(skill)
                db_session.commit()
            except:
                db_session.rollback()
                raise 
            
            user_id = u.id
            authenticate(user_id)
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
                json['redirect'] = '/activity/'      
        else:
            json['failure'] = False
        return jsonify(json=json)
    return render_template("login.html", redirect_args=request.query_string)    

@app.route('/tutorsignup1/', methods=('GET', 'POST'))
def tutorsignup1():
    form = SignupForm()
    if form.validate_on_submit():
        return redirect('/')
    return render_template('tutorsignup1.html', form=form)

@app.route('/activity/')
def activity():
    # if not session.get('user_id'):
    #     return redirect(url_for('login', redirect=True, tutor_confirm=request_id))
    return render_template('activity.html', logged_in=session.get('user_id'))

@app.route('/tutor_offer/')
def tutor_offer():
    return render_template('tutor_offer.html')

@app.route('/messages/')
def messages():
    return render_template('messages.html')

@app.route('/student_request/')
def student_request():
    return render_template('student_request.html')

@app.route('/rate/')
def rate():
    return render_template('rate.html')

@app.route('/bill/')
def bill():
    return render_template('bill.html')

@app.route('/request_payment/')
def request_payment():
    return render_template('request_payment.html')

@app.route('/credit_card/')
def credit_card():
    return render_template('credit_card.html')

@app.route('/conversation')
def conversation():
    return render_template('conversation.html')

@app.route('/request_tutor/')
def request_tutor():
    return render_template('request_tutor.html')

@app.route('/student_signup/')
def student_signup():
    return render_template('student_signup.html')

@app.route('/tutor_signup/')
def tutor_signup():
    return render_template('tutor_signup.html')

@app.route('/tutorsignup2/')
def tutorsignup2():  
    return render_template('tutorsignup2.html')

@app.route('/howitworks/')
def howitworks():
    return render_template('howitworks.html')

@app.route('/settings/')
def settings():
    user_id = session.get('user_id')
    if not user_id:
        return redirect(url_for('login'))
    user = User.query.get(user_id)
    return render_template('settings.html', logged_in=session.get('user_id'), user=user)

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


def upload_file_to_amazon(filename, file):
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_file(file)
    sml.set_acl('public-read')
