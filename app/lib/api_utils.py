def request_contains_all_valid_parameters(request_json, arr_parameters):
    sorted_request_json_keys = sorted([key for key in request_json])
    sorted_arr_parameters = sorted(arr_parameters)
    for key in sorted_arr_parameters:
    	if key not in sorted_request_json_keys:
    		return False
    return True