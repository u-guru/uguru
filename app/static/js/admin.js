$(document).ready(function() {
    $('.container').on('click', 'a.login-user', function() {
        var user_id = $(this).parent().siblings('td:first').text();
        data = {'user-id': user_id}
        $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/admin-access/',
              data: JSON.stringify(data),
              dataType: "json",
              success: function(result) {
                window.location.replace('/activity/');
              }
          });
    });

    $('.container').on('click', 'a.login-student-request', function() {
        var user_id = $(this).siblings('span').text();
        data = {'user-id': user_id}
        $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/admin-access/',
              data: JSON.stringify(data),
              dataType: "json",
              success: function(result) {
                window.location.replace('/activity/');
              }
          });
    });

    $('.container').on('click', 'a.login-tutor-request', function() {
        var user_id = $(this).siblings('span').text();
        data = {'user-id': user_id}
        $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/admin-access/',
              data: JSON.stringify(data),
              dataType: "json",
              success: function(result) {
                window.location.replace('/activity/');
              }
          });
    });

    $('.container').on('click', 'a.view-student-message', function() {
        var user_id = $(this).siblings('span').text();
        data = {'user-id': user_id}
        $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/admin-access/',
              data: JSON.stringify(data),
              dataType: "json",
              success: function(result) {
                window.location.replace('/messages/');
              }
          });
    });

    $('.container').on('click', 'a.view-tutor-message', function() {
        var user_id = $(this).siblings('span').text();
        data = {'user-id': user_id}
        $.ajax({
              type: "POST",
              contentType: 'application/json;charset=UTF-8',
              url: '/admin-access/',
              data: JSON.stringify(data),
              dataType: "json",
              success: function(result) {
                window.location.replace('/messages/');
              }
          });
    });
});
