$('#request-calendar-toggle').click(function() {
    calendar_edit_mode_request();
    set_dates(null)
    $('.calendar-modal').show();
});

$('.student-request-view-calendar-toggle').click(function() {
    $('.calendar-modal').show();
});

$('#request-calendar-close').click(function() {
    reset_calendar();
    $('.calendar-modal').hide();
})

function set_dates(date_in_seconds) {
    if (date_in_seconds == null) {
        var first_date = new Date();
    } else {
       var first_date = new Date(date_in_seconds * 1000) 
    }
    process_dates(first_date);
}

// function set_dates(date_in_seconds) {
//     var first_date = new Date(date_in_seconds * 1000)
//     process_dates(first_date);
// }

function process_dates(date) {
    first_date = date
    day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    month_vals = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    day_int = first_date.getDay()
    var d = first_date.getDate();
    var m = first_date.getMonth();
    var y = first_date.getYear();
    for (i = 0; i < 7; i++) {
        var nextDate = new Date(y, m, d+i);   
        $('#calendar-day-'+(i + 1)).text(day_names[(day_int + i) % 7] + ' ' + (month_names[nextDate.getMonth()]) + '/' + nextDate.getDate());
    }
}

var clean_td = function(e){
   e.removeClass('success');
}

function fillGaps() {
    min = $('td.csstdhighlight:first').parent().index();
    max = $('td.csstdhighlight:last').parent().index();
    $('.myselect tr:lt('+max+'):gt('+min+') td:nth-child(3)').addClass('csstdhighlight');
}

$('.close-calendar-btn').click(function() {
    $(this).parent().parent().parent().parent().hide();
});

function process_column_tds(td_list) {
    day_range_list = []
    for (i = 0; i < 24; i++) {
        current_td = $(td_list[i]);
        if (current_td.hasClass('td-selected')) {
            day_range_list.push([i, i+1]);
        }
    }
    return merge_consecutive(day_range_list);
}

function get_calendar_selection() {
    calendar_data = []
    for (j = 2; j < 9; j++) {
        column_tds = $('table#request-calendar tr td:nth-child('+j+')');
        calendar_data.push(process_column_tds(column_tds));
    }
    return calendar_data
};

function merge_consecutive(day_range_arr) {
    results = []
    while(day_range_arr.length > 0) {
        if (day_range_arr.length == 1) {
            results.push(day_range_arr[0]);
            day_range_arr.shift();
            continue;
        }
        first = day_range_arr[0];
        second = day_range_arr[1];
        if (first[1] == second[0]) {
            day_range_arr[0][0] = first[0]
            day_range_arr[0][1] = second[1]
            day_range_arr.splice(1,1);
        } else {
            results.push(first);
            day_range_arr.shift();
        }
    }
    return results
}

function show_student_request_calendar(arr_ranges, time_in_seconds) {
    set_dates(time_in_seconds);
    reset_calendar();
    add_ranges_to_calendar(arr_ranges, 'td-selected');
    calendar_view_only();
}

function show_tutor_request_submitted_calendar(student_ranges, tutor_ranges, message_flag, time_in_seconds) {
    set_dates(time_in_seconds)
    if (message_flag) {
        $('#calendar-header-text').hide();
    }
    reset_calendar();
    add_mult_ranges_to_calendar(student_ranges, tutor_ranges);
    calendar_view_only();
}

function show_tutor_request_calendar(arr_ranges, time_amount, time_in_seconds) {
    set_dates(time_in_seconds)
    reset_calendar();
    add_ranges_to_calendar(arr_ranges, 'td-preselected');
    $('#calendar-header-text').html('Please select exactly <span id="num-hours-student">' + time_amount + '</span> hours of time from the schedule below.') ;
    if ($('td.time-slot.td-selected').length == 0) {
        calendar_edit_mode_tutor_accept();
    }
}   

function add_ranges_to_calendar(arr_ranges, class_to_add) {
    if ($('td.time-slot.td-preselected').length > 0) {
        $('.calendar-modal').show();
        return;
    }
    for (i = 0; i < arr_ranges.length; i++) {
        range = arr_ranges[i];
        day = range[0]
        start = range[1]
        end = range[2]
        column = day + 2
        for (j = start; j < end; j++) {
            column_tds = $('table#request-calendar tr td:nth-child('+column+')');
            row_object = column_tds[j];
            $(row_object).addClass(class_to_add);
        }
    }
    $('.calendar-modal').show();
}

function add_mult_ranges_to_calendar(student_ranges, tutor_ranges) {
    for (i = 0; i < student_ranges.length; i++) {
        range = student_ranges[i];
        day = range[0]
        start = range[1]
        end = range[2]
        column = day + 2
        for (j = start; j < end; j++) {
            column_tds = $('table#request-calendar tr td:nth-child('+column+')');
            row_object = column_tds[j];
            $(row_object).addClass('td-preselected');
        }
    }
    for (i = 0; i < tutor_ranges.length; i++) {
        range = tutor_ranges[i];
        day = range[0]
        start = range[1]
        end = range[2]
        column = day + 2
        for (j = start; j < end; j++) {
            column_tds = $('table#request-calendar tr td:nth-child('+column+')');
            row_object = column_tds[j];
            if ($(row_object).hasClass('td-preselected')) {
                $(row_object).removeClass('td-preselected');
            }
            $(row_object).addClass('td-selected');
        }
    }
    $('.calendar-modal').show();
}

function calendar_view_only() {
    $('.save-calendar-btn').hide()
    $('td.time-slot').css('cursor', 'auto');
}

function calendar_edit_mode_request() {
    $('td.time-slot').css('cursor', 'pointer');
    var selecting = false;
    var selectable = 'td.time-slot';
    $(selectable).mousedown(function () {
        selecting = true;
        // $(selectable).removeClass('td-selected');
    }).mouseenter(function () {
        if (selecting) {
            $(this).addClass('td-selected');
            window.getSelection().empty()
            // fillGaps();
        }
    });
    $(window).mouseup(function () {
        if (selecting) {
            selecting = false;
            window.getSelection().empty()
        } 
    }).click(function () {
        // $(selectable).removeClass('td-selected');
    });
    $('td.time-slot').hover(function() {
    $(this).addClass('success');
    }, function() {
        $(this).removeClass('success');
    });

    $('td.time-slot').click(function() {
        if ($(this).hasClass('td-selected')) {
            $(this).removeClass('td-selected');
        } else {
            $(this).addClass('td-selected');
        }
    });

    $('.save-calendar-btn').click(function() {
        get_calendar_selection();
        $(this).parent().parent().parent().parent().hide();
        $('#saved-tag').show();
        $('#saved-tag').delay(750).fadeOut('slow');
        if ($('td.time-slot.td-selected').length >= 1) {
            $('#select-calendar-slot-alert').hide();
            $('#request-avail-remove').hide();
            $('#request-avail-ok').show();
        } else {
            $('#request-avail-remove').show();
            $('#request-avail-ok').hide();
        }
    });
}

function calendar_edit_mode_tutor_accept() {
    $('td.time-slot').css('cursor', 'pointer');
    var selecting = false;
    var selectable = 'td.time-slot';
    $(selectable).mousedown(function () {
        selecting = true;
        // $(selectable).removeClass('td-selected');
    }).mouseenter(function () {
        if (selecting) {
            if ($(this).hasClass('td-preselected')) {
                $(this).removeClass('td-preselected');
                $(this).addClass('td-selected');
            }
            window.getSelection().empty()
            // fillGaps();
        }
    });
    $(window).mouseup(function () {
        if (selecting) {
            selecting = false;
            window.getSelection().empty()
        } 
    }).click(function () {
        // $(selectable).removeClass('td-selected');
    });
    $('td.time-slot').hover(function() {
        $(this).addClass('success');
        }, 
        function() {
            $(this).removeClass('success');
    });

    $('td.time-slot').click(function() {
        if ($(this).hasClass('td-selected')) {
            $(this).removeClass('td-selected');
            $(this).addClass('td-preselected');
        } else {
            if ($(this).hasClass('td-preselected')) {
                $(this).removeClass('td-preselected');
                $(this).addClass('td-selected');
            }
        }
    });

    $('.save-calendar-btn').click(function() {
        if ($('#num-hours-student').text() != $('td.time-slot.td-selected').length) {
            $('.calendar-alert').text('Please select exactly ' + $('#num-hours-student').text() + ' number of hours in the calendar');
            $('.calendar-alert').show();
        } else {
            $('.calendar-alert').hide();
            $(this).parent().parent().parent().parent().hide();
        }
    });
}

function reset_calendar() {
    $('.td-selected').each(function(){$(this).removeClass('td-selected')});
    $('.td-preselected').each(function(){$(this).removeClass('td-preselected')});
    $('.save-calendar-btn').show();
}