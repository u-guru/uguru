#login on focus
from app.models import *
    

def tutor_receives_student_request(r_id):
    from views import get_environment
    if get_environment() != 'PRODUCTION':
        BASE_URL = 'http://192.168.128.90:5000'
    else:
        BASE_URL = 'http://uguru.me'

    _request = Request.query.get(r_id)
    r_dict = _request.get_return_dict()
    student_name = r_dict['student']['name'].title()
    skill_name = r_dict['skill_name']
    time_estimate = r_dict['time_estimate']
    location = r_dict['location']
    urgency = r_dict['urgency']
    start_time = r_dict['start_time']

    if urgency: start_time = 'ASAP'

    result_msg = "Congrats! You're currently first in-line to receive this student request.\n\n" \
    + student_name + " needs " + skill_name  + " help " + \
    start_time + " for " + time_estimate + " at " + location + ". \n\n" +\
    "You will have 5 minutes to save a fellow bear, or we will have to pass this opportunity to another Guru in line.\n\n" + \
    "Accept or reject immediately through our mobile site: \n\n" + BASE_URL +  "/m/r/" + str(r_dict['server_id']) + \
    "\n\nNew uGuru Hourly rate is $16/hr (minimum, can be more based on demand)."

    return result_msg 

def student_receives_guru_accept(r_id): 
    from views import get_environment
    if get_environment() != 'PRODUCTION':
        BASE_URL = 'http://192.168.2.124:5000'
    else:
        BASE_URL = 'http://uguru.me'


    _request = Request.query.get(r_id)
    r_dict = _request.get_return_dict()
    tutor = User.query.get(_request.pending_tutor_id)
    tutor_name = tutor.get_first_name()
    student_name = r_dict['student']['name'].title()
    skill_name = r_dict['skill_name']
    num_tutors = str(len(_request.contacted_tutors))
    return tutor_name + """ can help! Check out """ +  tutor_name + """'s""" + \
    """ profile and confirm! \n\n""" + BASE_URL + """/m/p/""" + str(tutor.id) +"""/"""
    return result_msg


def student_not_connected(r_id):
    from views import get_environment
    if get_environment() != 'PRODUCTION':
        BASE_URL = 'http://192.168.2.124:5000'
    else:
        BASE_URL = 'http://uguru.me'

    _request = Request.query.get(r_id)
    r_dict = _request.get_return_dict()
    student_name = r_dict['student']['name'].title()
    skill_name = r_dict['skill_name']
    num_tutors = str(len(_request.contacted_tutors))
    return """Sorry """ + student_name + """, we tried our absolute best """ + \
    """and contacted all """ + num_tutors + """ we had for """ + \
    skill_name + """. \n\nIf you would like us to notify you when we have """ + \
    """someone available, """ + """please reply 'Yes'."""

def tutor_not_chosen(r_id, tutor_id):
    from views import get_environment
    if get_environment() != 'PRODUCTION':
        BASE_URL = 'http://192.168.2.124:5000'
    else:
        BASE_URL = 'http://uguru.me'

    _request = Request.query.get(r_id)
    r_dict = _request.get_return_dict()
    tutor = User.query.get(tutor_id)
    student_name = r_dict['student']['name'].title()
    tutor_name = tutor.get_first_name()
    return """Sorry """ + tutor_name + """, """ + student_name + \
    """ has decided to not choose you. \n\nDon't worry, this does \
    not impact your rating! \n\nHave a great day."""

def student_canceled(r_id, tutor_id):
    from views import get_environment
    if get_environment() != 'PRODUCTION':
        BASE_URL = 'http://192.168.2.124:5000'
    else:
        BASE_URL = 'http://uguru.me'

    _request = Request.query.get(r_id)
    r_dict = _request.get_return_dict()
    tutor = User.query.get(tutor_id)
    student_name = r_dict['student']['name'].title()
    tutor_name = tutor.get_first_name()
    return """Sorry """ + tutor_name + """, """ + student_name + \
    """ has canceled the request. \n\nWe'll message you again if """ + \
    """ another student needs help. \n\nHave a great day!"""

def guru_is_selected(r_id):
    
    from views import get_environment
    if get_environment() != 'PRODUCTION':
        BASE_URL = 'http://192.168.2.124:5000'
    else:
        BASE_URL = 'http://uguru.me'

    _request = Request.queryget(r_id)
    r_dict = _request.get_return_dict()
    tutor = User.query.get(tutor_id)
    student_name = r_dict['student']['name'].title()
    skill_name = r_dict['skill_name']
    tutor_name = tutor.get_first_name()
    return """Congrats! """ + student_name + """, has chosen you """  + \
    """ as their """ + skill_name + """ Guru! \n\nSee more details here at """ + BASE_URL +  """/m/r/ """ + \
    str(r_dict['server_id']) + """\n\nThrough the Uguru app, you can message your student, """ + \
    """, see the full request details, and bill your student with the tap of a button."""


#TO DISCUSS: They don't need to see this.
def student_receives_guru_reject():
    pass

def request_received_msg(user, tutor, _request, skill):
    user_name = user.name.split(" ")[0].title()
    amount = _request.student_estimated_hour * _request.time_estimate
    from views import calc_avg_rating
    if calc_avg_rating(tutor)[0] >= 4.0:
        msg = user_name + " needs your help with " + skill.upper() + " You can make up to $" + \
        str(amount) + ". Act fast and see if your schedules line up at http://berkeley.uguru.me."
    else:
        msg = user_name + " needs your help with " + skill.upper() + ". Act fast and see if your schedules line up at http://berkeley.uguru.me."
    return msg

def guru_can_help(tutor, skill_name):
    tutor_name = tutor.name.split(" ")[0].title()

    msg = tutor_name + " can help with " + skill_name.upper() + ". Check out " + tutor_name + "'s profile and confirm this session at http://berkeley.uguru.me. Happy Studying!"
    return msg

def its_a_match_guru(student, skill_name):
    student_name = student.name.split(" ")[0]
    msg = student_name + " has chosen you!" + " Message " + student_name + " now at http://berkeley.uguru.me/messages."
    return msg

def student_cap_reached(skill_name):
    return "You've received your 3 Gurus for your " + skill_name +  " request! You have 24 hours to choose one!"

def reminder_before_session(person_a, person_b, location, ending):
    person_a_name = person_a.name.split(" ")[0].title()
    person_b_name = person_b.name.split(" ")[0].title()
    msg = "Hey " + person_a_name + "! Your uGuru session with " + person_b_name + " is in one hour! Meet at " + location + ". Happy " + ending + "!"
    return msg

