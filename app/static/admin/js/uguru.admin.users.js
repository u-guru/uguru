var uguru_base_url = "http://uguru-rest.herokuapp.com/api/admin/";
var auth_token = '9c1185a5c5e9fc54612808977ee8f548b2258d31';

"http://admin.uguru.me/api/admin/9c1185a5c5e9fc54612808977ee8f548b2258d31/users"

$(document).ready(function() {
	getUsers();
});

function getUsers() {
	$.ajax({
		url: uguru_base_url + auth_token + "/users",
		type: 'GET',
		dataType: 'json',
		success: function(data){
			var users = data;
			$('#user-table').html("");
			var header_row_attr = ['Name', 'Email', 'Majors', 'Courses', 'University'];
			var user_row_header = computeTableHeaderUser(header_row_attr)
			$('#user-table').append(user_row_header);
			for(i = 0; i < users.length; i++){
				var user = users[i];
				if (user.id === 37) {
					console.log(user);
				}
				var user_attr_arr = [user.name, user.email, processListObjToString(user.majors, 'name'),
				processListObjToString(user.guru_courses, 'short_name'), user.university.title]
				var user_row_string = computeTableRowUser(user_attr_arr, i)
				$('#user-table-body').append(user_row_string);
			}

			$('#user-table').DataTable({"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
			"sPaginationType": "bootstrap",
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
			result_str += '<th class="sorting_asc"> ' + header_row[j] + ' </th>';
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
		} else {
			result_str += '<td class="class"> ' + attr_arr[j] + ' </td>';
		}
	}

	result_str += '</tr>'
	return result_str

}