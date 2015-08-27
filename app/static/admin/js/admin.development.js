
$(document).ready(function() {

    getOpenIssues();
    getClosedIssues();

    $('#submit-github-issue-button').click(function() {
        createIssue();
    });

    $('#update-version-button').click(function() {
        console.log('version update button clicked');

        var payload = {
            'update': true,
            'message': $('#build-message').val(),
            'is_major': parseInt($('input[name=severityRadio]:radio:checked').val()) === 1,
            'is_minor': parseInt($('input[name=severityRadio]:radio:checked').val()) === 0,
            'type': parseInt($('input[name=buildTypeRadio]:radio:checked').val()),
            'is_android': $('input[name=androidCheckbox]').is(':checked'),
            'is_ios': $('input[name=iosCheckbox]').is(':checked')
        }
        $.ajax({
            url: uguru_base_url + 'app/update',
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(request){
                window.location.replace('/admin/development/');
            },
            error: function (request) {
                alert('Contact Samir, something went wrong');
            }
        });
    });

    $('#update-android-btn').click(function() {

        console.log('android updated button clicked');

        var payload = {'android': $('#current-android-version').val()}

        $.ajax({
            url: BASE_URL + '/app/update',
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(request){
                $('#development-update-app-alert').text('android Version has been updated to ' + request.version);
                $('#development-update-app-alert').show();
            },
            error: function (request) {
                alert('Contact Samir, something went wrong');
            }
        });

    });

});


function getOpenIssues() {
    $.ajax({
        url: uguru_base_url + auth_token + "/github/issues",
        type: 'GET',
        dataType: 'json',
        success: function(response){

            var labels = response.response.labels;
            var issues = response.response.issues;
            var team = response.response.team;
            for (k = 0; k < team.length; k++) {
                $('#team-names').append('<option>' + team[k] + '</option>');
            }

            for (k = 0; k < labels.length; k++) {
                $('#bug-labels-select').append('<option style="background-color:#' + labels[k].color+ '">' + labels[k].name + '</option>');
                $('#view-labels').append('<span class="label label-success" style="background-color:#' + labels[k].color+ ' !important">' + labels[k].name + '</span> ')
            }

            $('#team-names').chosen();
            $('#important-select').chosen();
            $('#bug-labels-select').chosen();

            $('#view-issue-table').html("");
            var header_row_attr = ['Time Created', 'Title', 'Description', 'Posted By','Priority', 'Labels', 'Actions'];
            var user_row_header = computeTableHeaderIssues(header_row_attr)
            $('#view-issue-table').append(user_row_header);
            for(i = 0; i < issues.length; i++){
                var issue = issues[i];
                console.log(issue.labels);
                var user_attr_arr = [issue.time_created, issue.title, issue.body,
                issue.contributor, issue.severity, processListObjToString(issue.labels, 'name'), issue.number];
                var user_row_string = computeTableRowUser(user_attr_arr, i)
                if (issue.state === 'open') {
                    $('#view-issue-table-body').append(user_row_string);
                }
            }

            $('#view-issue-table').DataTable({"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
            "sPaginationType": "bootstrap",
            "aaSorting": [[0, 'desc']],
            "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"}});

            $('.delete-issue-link').on('click', function() {
                if(confirm('Are you sure you want to delete this issue?')) {
                    deleteIssue($(this).data().attrDeleteId);
                }
            });

            $('.resolve-issue-link').on('click', function() {
                if(confirm('Are you sure this issue is resolved?')) {
                    resolveIssue($(this).data().attrResolveId);
                }
            });

        },
        error: function(err){
            console.log(err);
        }
    })
}

function getClosedIssues() {
    $.ajax({
        url: uguru_base_url + auth_token + "/github/issues",
        type: 'GET',
        dataType: 'json',
        success: function(response){
            var issues = response.response.issues;
            $('#view-closed-issue-table').html("");
            var header_row_attr = ['Time Closed', 'Title', 'Description', 'Posted By','Priority', 'Labels', 'Status'];
            var user_row_header = computeTableHeaderIssues(header_row_attr, true);
            $('#view-closed-issue-table').append(user_row_header);
            for(i = 0; i < issues.length; i++){
                var issue = issues[i];
                console.log(issue.labels);
                var user_attr_arr = [issue.time_closed, issue.title, issue.body,
                issue.contributor, issue.severity, processListObjToString(issue.labels, 'name'), 'SOLVED'];
                var user_row_string = computeTableRowUser(user_attr_arr, i, true)
                if (issue.state === 'closed' && issue.number > 26) {
                    $('#view-closed-issue-table-body').append(user_row_string);
                }
            }

            $('#view-closed-issue-table').DataTable({"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
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

function createIssue() {
    var labels = $('#bug-labels-select').val();

    if (!$('#bug-labels-select').val() || !$('#bug-title').val() || !$('#bug-description').val()) {
        alert('please fill in all fields');r
        return;
    }

    labels.push('contributor:' + $('#team-names').val());
    labels.push('urgency:' + (parseInt($('#important-select')[0].selectedIndex) + 1));
    var payload = {
        body: $('#bug-description').val(),
        title: $('#bug-title').val(),
        labels: labels
    }
    console.log(payload);
    $.ajax({
        url: uguru_base_url + auth_token + "/github/issues",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(payload),
        success: function(response){
            window.location.replace('/admin/issues/');
        },
        error: function(err){
            console.log(err);
        }
    })
}

function deleteIssue(issue_number) {
    $.ajax({
        url: uguru_base_url + auth_token + "/github/issues",
        type: 'DELETE',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data:JSON.stringify({number: issue_number}),
        success: function(response){
            window.location.replace('/admin/issues/');
        },
        error: function(err){
            console.log(err);
        }
    });
}

function resolveIssue(issue_number) {
    $.ajax({
        url: uguru_base_url + auth_token + "/github/issues",
        type: 'PUT',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data:JSON.stringify({number: issue_number}),
        success: function(response){
            window.location.replace('/admin/issues/');
        },
        error: function(err){
            console.log(err);
        }
    });
}

function computeTableRowUser(attr_arr, table_index, is_closed) {
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
        else if (j === attr_arr.length - 1 && !is_closed) {
            result_str += '<td><a class="delete-issue-link" data-attr-delete-id="' + attr_arr[j] +'"href="javascript:void(0);"><i class="icon-trash"></i></a>  <a class="resolve-issue-link" data-attr-resolve-id="' + attr_arr[j] +'"href="javascript:void(0);">  <i class="icon-check"></i></a></td>';
        }
        else {
            result_str += '<td class="class"> ' + attr_arr[j] + ' </td>';
        }
    }

    result_str += '</tr>'
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

function computeTableHeaderIssues(header_row, is_closed) {
    var result_str = '<thead><tr role="row">'

    for (j = 0; j < header_row.length; j++) {
        if (j === 0) {
            result_str += '<th class="sorting_desc"> ' + header_row[j] + ' </th>';
        } else {
            result_str += '<th class="sorting"> ' + header_row[j] + ' </th>';
        }
    }
    if (!is_closed) {
        result_str += '</tr></thead><tbody id="view-issue-table-body"></tbody>'
    } else {
        result_str += '</tr></thead><tbody id="view-closed-issue-table-body"></tbody>'
    }
    return result_str
}