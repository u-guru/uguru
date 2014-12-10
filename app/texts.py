#login on focus
from app.models import *
#login redirect
#track mixpanel 
#accept or reject
BASE_URL = 'http://192.168.1.36:5000'

def tutor_receives_student_request(r_id):
    _request = Request.query.get(r_id)
    r_dict = _request.get_return_dict()
    student_name = r_dict['student']['name'].title()
    skill_name = r_dict['skill_name']
    time_estimate = r_dict['time_estimate']
    location = r_dict['location']
    urgency = r_dict['urgency']
    start_time = r_dict['start_time']

    if urgency: start_time = 'ASAP'

    result_msg = student_name + " needs " + skill_name  + " help " + \
    start_time + " for " + time_estimate + " at " + location + ". \n\n" +\
    "You have 10 minutes to save a fellow bear, or we'll have to pass this opportunity to another Guru.\n\n" + \
    "Accept/Reject/ or see more details here: \n " + BASE_URL +  "/r/" + str(r_dict['server_id'])

    return result_msg 

def student_receives_guru_accept(): 
    pass

#
def guru_is_selected():
    pass

def guru_rejected():
    pass

def guru_time_out():
    pass



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

