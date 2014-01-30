from app import app
from flask import render_template, redirect
from forms import SignupForm, RequestForm

@app.route('/', methods=['GET', 'POST'])
def index():
    request_form = RequestForm()
    if request_form.validate_on_submit():
        return redirect('/success/')
    return render_template('index.html', forms=[request_form])
    
	

@app.route('/success/')
def success():
    return "success"

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