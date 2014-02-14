$(document).ready(function(){
    $(window).resize(function() {
        if ($(window).width() <= 700) {
            $('#how-it-works-main').css('top', '90%');
            $('.main').css('top','50%');
            $('#home-button-1').attr('class', 'btn btn-sm')
            $('#home-button-1').css('padding', '10px 15px')
            $('#home-button-2').css('padding', '10px 15px')
            $('#home-button-2').attr('class', 'btn btn-sm')
            $('.logo_main').attr('style', 'font-size:4em;margin-top:-20px')
            $('#welcome_text').css('font-size','1em')
            $('.welcome').css('margin-top','30px')
        }
        else {
            $('#how-it-works-main').css('top', '85%');
            $('.main').css('top','40%');            
            $('#home-button-1').attr('class', 'btn btn-lg')
            $('#home-button-2').attr('class', 'btn btn-lg')
            $('#home-button-1').css('padding', '15px 30px')
            $('#home-button-2').css('padding', '15px 30px')
            $('.logo_main').attr('style', 'font-size: 7em; margin-top: -35px;')
            $('#welcome_text').css('font-size','1.5em')
        }
    }).resize(); 
})
