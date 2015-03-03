from flask import Response, jsonify
import boto

def request_contains_all_valid_parameters(request_json, arr_parameters):
    sorted_request_json_keys = sorted([key for key in request_json])
    sorted_arr_parameters = sorted(arr_parameters)
    for key in sorted_arr_parameters:
    	if key not in sorted_request_json_keys:
    		return False
    return True

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

def upload_file_to_amazon(filename, file_string, s3_key, s3_secret, s3_bucket):
    conn = boto.connect_s3(s3_key, s3_secret)
    b = conn.get_bucket(s3_bucket)
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_string(file_string)
    sml.set_metadata('Content-Type', 'image/jpeg')
    sml.set_acl('public-read')