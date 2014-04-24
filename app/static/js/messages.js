var last_clicked_convo_num = null;
var update_feed = function() {
  var read_notifs = $('.grey-background').length
      $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/notif-update/' ,
            data: JSON.stringify({'update-total-messages':read_notifs}),
            dataType: "json",
      }); 
  if (read_notifs == 0) {
    $('#msg-notif').hide()
  } 
}




$(document).ready(function() {
  update_feed();
   $('#message-list').on('click', 'a', function() {
        var display_id = $(this).attr('id');
        var full_div = "#messages div#conversation-detailed-" + display_id.split('-').reverse()[0]
        $('#message-list').hide();
        conversation_messages = $(full_div).children('.container-fluid').children().children('.conversation-messages');
        conversation_messages.css('height', ($(document).height() - 300 ))
        $(full_div).show('slide', {direction: 'right'}, 100);
        conversation_messages.animate({ scrollTop: $(document).height() }, 100);
        last_clicked_convo_num = $(this).index()

        if ($(this).children('div:first').hasClass('grey-background')) {
          var convo_number = $(this).index();

          var data = {'update-message': true, 'conversation-num': ($('#message-feed').children().length - convo_number - 1)}
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
        // $('#default-message-box').hide();
        $('#message-list').show();
    });
   $('#messages').on('click', 'a.submit-message', function() {
        var message = $(this).parent().siblings('div:first').children('input:first').val();
        if (message == '') {
            $('#message-alert').show();
            return false;
        }
        $('#message-alert').hide();
        var conversation_num = last_clicked_convo_num
        $('#default-message-no-convo').hide();

        conversation_messages_div = $(this).parent().parent().parent().siblings('.conversation-messages')
        conversation_messages_div.show();
        // conversation_messages.css('height', ($(document).height()-500))
        
        saved_message_div = $(this).parent().parent().parent().siblings('.saved-message')
        saved_message_div.show();
        saved_message_div.delay(750).fadeOut('slow');
        var data = {
            'send-message': message, 
            'conversation-num': last_clicked_convo_num
        };

        var temp_message = $('#template-message').clone();
        temp_message.children().children('div:last').children('.chat-bubble').text(message);
        conversation_messages = $(this).parent().parent().parent().siblings('.conversation-messages')
        conversation_messages.append(temp_message);
        temp_message.show()
        conversation_messages.animate({ scrollTop: $(document).height() }, 100);
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

    $('#messages').on('keyup', 'input', function(e) {
        if ( e.keyCode === 13 ) { // 13 is enter key
            $(this).parent().siblings('div:last').children('a:first').trigger('click');
        }
    });



    Date.prototype.today = function () { 
       return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
    }

    // For the time now
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
    }
});