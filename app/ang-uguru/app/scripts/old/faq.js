'use strict';
$(function () {
    $("#faq dl dt a").each(function(e){
        $(this).on("click", function(e) {
            $(this).parent().parent().toggleClass("active");
            e.preventDefault();
        });
    });
});
