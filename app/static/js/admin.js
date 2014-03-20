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
    $(window).unload(function() {
      alert('Handler for .unload() called.');
    });
});
