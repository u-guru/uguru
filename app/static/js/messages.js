$(document).ready(function() {
   $('#message-list').on('click', 'a', function() {
        var display_id = $(this).attr('id');
        var full_div = "#messages div#conversation-detailed-" + display_id.split('-').reverse()[0]
        $('#message-list').hide();
        $(full_div).show('slide', {direction: 'right'}, 100);
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    });
   $('#messages').on('click', 'a.message-back-link', function() {
        $(this).parent().parent().parent().parent().hide();
        $('#message-list').show();
    });
   $('#messages').on('click', 'a.submit-message', function() {
        var message = $(this).siblings('.input-message').val();
        var conversation_num = parseInt($(this).parent().parent().parent().attr('id').split("-").reverse()[0]) - 1
        var data = {
            'send-message': message, 
            'conversation-num': conversation_num
        };
        var temp_message = $('#template-message').clone();
        temp_message.children().children().children('div:last').children('.chat-bubble').text(message);
        $('.conversation-messages').append(temp_message);
        temp_message.show()
        $('#message-saved').show();
        $('#message-saved').delay(750).fadeOut('slow');
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