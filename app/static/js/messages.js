var last_clicked_convo_num = null;
$(document).ready(function() {
   $('#message-list').on('click', 'a', function() {
        var display_id = $(this).attr('id');
        var full_div = "#messages div#conversation-detailed-" + display_id.split('-').reverse()[0]
        $('#message-list').hide();
        $(full_div).show('slide', {direction: 'right'}, 100);
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        last_clicked_convo_num = $(this).parent().index()

        if ($(this).children('div:first').hasClass('grey-background')) {
          var convo_number = $(this).parent().index();

          var data = {'update-message': true, 'conversation-num': convo_number}
          feed_count = parseInt($('#msg-notif').text()) - 1;
          if (feed_count == 0) {
            $('#msg-notif').hide()
          } else {
            $('#msg-notif').text(feed_count)
          }
          $('#msg-notif').text(feed_count);
          $(this).children('div:first').removeClass('grey-background');
          $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/send-message/' ,
            data: JSON.stringify(data),
            dataType: "json",
          });
        }
    });
   $('#messages').on('click', 'a.message-back-link', function() {
        $(this).parent().parent().parent().parent().hide();
        $('#default-message-box').hide();
        $('#message-list').show();
    });
   $('#messages').on('click', 'a.submit-message', function() {
        var message = $(this).parent().siblings('div:first').children('input:first').val();
        var conversation_num = last_clicked_convo_num
        $('#default-message-no-convo').hide();
        var data = {
            'send-message': message, 
            'conversation-num': conversation_num
        };

        var temp_message = $('#template-message').clone();
        temp_message.children().children('div:last').children('.chat-bubble').text(message);
        conversation_messages = $(this).parent().parent().parent().siblings('.conversation-messages')
        conversation_messages.append(temp_message);
        temp_message.show()
        $('#message-saved').show();
        $('#message-saved').delay(750).fadeOut('slow');
        $(this).parent().siblings('div:first').children('input:first').val('');
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/send-message/' ,
            data: JSON.stringify(data),
            dataType: "json",
        }); 
   });

    Date.prototype.today = function () { 
       return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    }

    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
});