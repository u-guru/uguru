var create_table = function(arr_columns, data_arr, column_options) {
    var table_structure = generate_table_outline(arr_columns)
    table_structure += '<tbody>'

    //create rows
    for (var i = 0; i < data_arr.length; i ++) {
        var one_obj = data_arr[i];
        one_row_str = '<tr>';

        data_obj_keys = Object.keys(one_obj);
        for (var j = 0; j < data_obj_keys.length; j++) {
            current_key = data_obj_keys[j];
            if (column_options[current_key]) {
                one_row_str += '<td>' + one_obj[current_key];
                //todo: check if type object and has keys
                if (column_options[current_key] && j === 0) {
                    one_row_str += " <a href='/new_admin/campaigns/" + one_obj[current_key] + "/'><i class='fa fa-expand'></a>"
                }
                one_row_str += '</td>';
            }
        }

        one_row_str += '</tr>'
        table_structure += one_row_str;
    }
    table_structure += '</tbody>'
    return table_structure;
}

var generate_table_outline = function(arr_columns) {
    result = "<thead></tr>"
    for (var i = 0; i < arr_columns.length; i ++) {
        result += "<th>" + arr_columns[i] + "</th>"
    }
    result += "</tr></thead>"
    return result;
}