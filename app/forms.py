from flask_wtf import Form
from flask_wtf.html5 import RangeInput
from wtforms import TextField, TextAreaField, RadioField, PasswordField
from wtforms.validators import InputRequired, Email

class SignupForm(Form):
    name = TextField('name', validators=[InputRequired()])
    email = TextField('email', validators=[InputRequired(), Email])
    password = PasswordField('password', validators=[InputRequired()])
    # telephone = 

class RequestForm(Form):
    skill = TextField('Skill', validators=[InputRequired()])
    description = TextAreaField('Please Tell Us More',
     validators=[InputRequired()])
    urgency = RadioField('Urgency', 
        choices=[(0, 'ASAP'), (1, 'Tomorrow'), (2, 'Next Week')],
        validators=[InputRequired()])
    # frequency = RadioField('Frequency', 
    #     choices=[(0, 'One Time'), (1, 'Regularly')],
    #     validators=[InputRequired()])
    # time_estimate = RangeInput('Time Estimate')

