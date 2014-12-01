##########################################
# Student Request Form Helper Functions ##
##########################################

# TODO, make this more sophisticated in the following sense
# 1. When a tutor accepts, they should receive a flag on the client
#    side to show next steps.
# 2. Same for student
def request_obj_to_dict(_request, skill, student, tutor=None):
    from utils import pretty_date, python_datetime_to_js_date
    request_status = _request.get_status()

    return_dict = {
        'server_id': _request.id,
        'status': request_status,
        'student': {
                'name': student.get_first_name(),
                'server_id': student.id,
            },
        'tutor_count': len(_request.approved_tutors()),
        'description': _request.description,
        'time_estimate': _request.time_estimate,
        'location': _request.location,
        'time_created': pretty_date(_request.time_created),
        'remote': _request.remote,
        'urgency': _request.urgency,
        'start_time': python_datetime_to_js_date(_request.start_time)
    }

    #If request is in matched stage with a matched tutor
    if request_status == 'matched' and tutor:
        return_dict['connected_tutor'] = user_obj_to_dict(tutor)

    #If request is in pending stage with interested tutors
    interested_tutors = _request.get_interested_tutors()
    if request_status == 'pending' and len(interested_tutors) > 0:
        interested_tutors_arr = []
        for tutor in interested_tutors:
            tutor_profile_info_dict = user_obj_to_dict(tutor)
            interested_tutors_arr.append(tutor_profile_info_dict)
        return_dict['interested_tutors'] = interested_tutors_arr


    return return_dict

def user_obj_to_dict(user):
    return_dict = {
            'name': user.get_first_name(),
            'server_id': user.id,
            'profile_url': user.profile_url,
    }
    return return_dict

# MVP, see approved_tutors_ordered
def approved_tutors(_request):
    # TODO: Remove tutors that are already in the student's address book.

    return _request.requested_tutors

#TODO: This should sort the tutors based on uGuru score
def approved_tutors_ordered(tutors):
    pass

#TODO: Should be comparator to sort available tutors
def calc_uguru_score(tutor):
    pass

#TODO: This is MVP, this should be more sophisticated.
def contact_tutors(tutors):
    pass

