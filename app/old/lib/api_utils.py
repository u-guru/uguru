from flask import Response, jsonify

# TODO: {'message': ['create_successfully']}
DEFAULT_SUCCESS_DICT = {'success':True}


def request_contains_all_valid_parameters(request_json, arr_parameters):
    sorted_request_json_keys = sorted([key for key in request_json])
    sorted_arr_parameters = sorted(arr_parameters)
    result = (sorted_request_json_keys == sorted_arr_parameters)
    return result

def request_contains_some_valid_parameters(request_json, arr_parameters):
    sorted_request_json_keys = sorted([key for key in request_json])
    sorted_arr_parameters = sorted(arr_parameters)
    result = (sorted_request_json_keys == sorted_arr_parameters)
    return result

#TODO: custom_error should be called error, pass in an arr instead of one
def json_response(http_code=200, return_dict=None, errors=None, \
    extra_headers=None, redirect=None):

    if return_dict and http_code == 200: 
        response = jsonify(return_dict)
    elif errors and redirect:
        response = jsonify(
            {
                'errors' : errors,
                'redirect': redirect
            }
        )
    elif errors:
        response = jsonify(
            {
                'errors' : errors
            }
        )
    else:
        default_error_message = get_default_error_message(http_code)
        response = jsonify(
            {
                'errors': [default_error_message]
            }
        )
    response.status_code = http_code
    return response

# TODO ADD MORE
def get_default_error_message(http_code):
    if http_code == 400:
        return '400 BAD REQUEST'
    elif http_code == 401:
        return '401 UNAUTHORIZED'
    elif http_code == 422:
        return '422 UNPROCESSABLE ENTITY'
    else:
        return '500 INTERNAL SERVER ERROR'

