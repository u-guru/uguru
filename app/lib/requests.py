##########################################
# Student Request Form Helper Functions ##
##########################################

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

    if request_status == 'matched':
        return_dict['connected_tutor'] = {
            'name': tutor.get_first_name(),
            'server_id': tutor.id,
            'profile_url': tutor.profie_url,
            #TODO, add more ... 
        }

    return return_dict

# MVP, see approved_tutors_ordered
def approved_tutors(_request):
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

