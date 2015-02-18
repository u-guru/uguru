$(document).ready(function() {
	getRequestsTable();
});

function getRequestsTable() {
	$.ajax({
		url: uguru_base_url + auth_token + "/user/" + user_id,
		type: 'GET',
		dataType: 'json',
		success: function(user){
			$('#user-table').html("");
			var header_row_attr = ['Id','Course', 'description', 'Online', 'In-person', 'Address', 'Time Estimate', 'Status'];
			var user_row_header = computeTableHeaderUser(header_row_attr)
			$('#user-table').append(user_row_header);
			console.log(user);
			for(i = 0; i < user.requests.length; i++){
				var request = user.requests[i];
				var user_attr_arr = [request.id, request.course.short_name, request.description, request.online,
				request.in_person, request.address, request.time_estimate, request.status];
				var user_row_string = computeTableRowUser(user_attr_arr, i)
				$('#user-table-body').append(user_row_string);
			}

			$('#user-table').DataTable({"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
			"sPaginationType": "bootstrap",
			"aaSorting": [[0, 'desc']],
			"oLanguage": {
			"sLengthMenu": "_MENU_ records per page"}});
		},
		error: function(err){
			console.log(err);
		}
	})
}

function computeTableHeaderUser(header_row, table_index) {
	var result_str = '<thead><tr role="row">'

	for (j = 0; j < header_row.length; j++) {
		if (j === 0) {
			result_str += '<th class="sorting_desc"> ' + header_row[j] + ' </th>';
		} else {
			result_str += '<th class="sorting"> ' + header_row[j] + ' </th>';
		}
	}

	result_str += '</tr></thead><tbody id="user-table-body"></tbody>'
	return result_str
}

function processListObjToString(objList, attr) {
	var result_str = '';
	for (k = 0; k < objList.length; k++) {
		result_str += objList[k][attr];
		if (k != objList.length - 1) {
			result_str += ', ';
		}
	}
	return result_str;
}

function computeTableRowUser(attr_arr, table_index) {
	var result_str = ''

	if (table_index % 2 === 1) {
		result_str += '<tr class="odd">'
	} else {
		result_str += '<tr class="even">'
	}

	for (j = 0; j < attr_arr.length; j++) {
		if (j === 0) {
			result_str += '<td class="sorting_1"> ' + attr_arr[j] + ' </td>';
		}
		else {
			result_str += '<td class="class"> ' + attr_arr[j] + ' </td>';
		}
	}

	result_str += '</tr>'
	return result_str

}