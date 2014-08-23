
if ($(window).width() < 768) {
   $('#course-input').attr('placeholder', 'Math 1A, Bio 1B ..');
   $('#home-course-submit-btn ').text('GO');
   $('#tutor-preview-content-description-1').text($('#tutor-preview-content-description-1').text().substr(0, 125) + '...')
}
else {
   alert('More than 960');
}