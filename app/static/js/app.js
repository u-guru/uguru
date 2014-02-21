$(document).ready(function(){
    $('#login-link').click(function() {
        $('#home-top').hide();
        $('#how-it-works-main').hide();
        $('body').css('background-color','white')
        // $('#login-page').show();
        // $("#login-page").animate({width:'toggle'},350);
        $('#login-page').show('slide', {direction: 'right'}, 200);
    });
    $(window).resize(function() {
        if ($(window).width() <= 700) {
            $('#how-it-works-main').css('top', '87%');
            bottom_px = (parseInt($('#how-it-works-main').css("top").replace('px','')) - 220)+ 'px'
            $('.main').css('top',bottom_px);
            $('#home-button-1').attr('class', 'btn btn-sm')
            $('#home-button-1').css('padding', '10px 15px')
            $('#home-button-2').css('padding', '10px 15px')
            $('#home-button-2').attr('class', 'btn btn-sm')
            $('.logo_main').attr('style', 'font-size:4em;margin-top:-25px')
            $('#welcome_text').css('font-size','1em')
            $('.welcome').css('margin-top','40px')
            $('#how-it-works-main').css('font-size','1.2em')
            $('#home-button-group button').css('margin', '5px')
            $('#login-text').css('font-size', '.9em')
        }
        else {
            $('#how-it-works-main').css('top', '85%');
            $('.main').css('top','40%');            
            $('#home-button-1').attr('class', 'btn btn-lg')
            $('#home-button-2').attr('class', 'btn btn-lg')
            $('#home-button-1').css('padding', '15px 30px')
            $('#home-button-2').css('padding', '15px 30px')
            $('#welcome_text').css('font-size','1.5em')
            $('.logo_main').attr('style', 'font-size: 7em; margin-top: -35px;')
            $('#welcome_text').css('font-size','1.5em')
            $('#how-it-works-main').css('font-size','1.7em')
            $('#home-button-group button').css('margin', '10px')
            $('#login-text').css('font-size', '1.3em')
        }
    }).resize(); 
    
    $('#login-submit-link').click(function(){
    //check whether fields are blank
    if (!$('#login-email').val() || !$('#login-password').val()) {
      $('#alert-fields-login-2').show()
    } else {
      //else get data and send to server
      var data = {
        'email': $('input[name="login-email"]').val(),
        'password': $('input[name="login-password"]').val()
      }
      $.ajax({
        type: "POST",
        contentType: 'application/json;charset=UTF-8',
        url: '/login/' + '?' + '{{redirect}}'.replace('amp;', '').replace('amp;',''),
        data: JSON.stringify(data),
        dataType: "json",        
        success: function(result) {        
            if (result.json['success']) {
                window.location.replace(result.json['redirect'])
            } else {
                $('#alert-fields-login').show();     
                $('#alert-fields-login-redirect').hide();
            }
        }
        });      
        }
    });

})
