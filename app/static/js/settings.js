var autocomplete_json = [];

function hide_all_settings() {
  $('#settings').hide();
  $('#profile').hide();
  $('#billing').hide();
  $('#support').hide();
  $('#referral').hide();
}

var update_feed = function() {
  if (!$('#default-photo').is(':visible') && $('#short-description').val() && $('#major-input').val()) {
    $.ajax({
      type: "POST",
      contentType: 'application/json;charset=UTF-8',
      url: '/notif-update/' ,
      data: JSON.stringify({'update-total-settings':true}),
      dataType: "json",
    });
    $('#settings-notif').hide();
  }
};

var update_page = function() {
  var hash = window.location.hash;
  if (hash == '#main') {
    hide_all_settings();
    $('#settings').show();
  }
  if (hash == '#prof') {
    hide_all_settings();
    $('#profile').show();
  }
  if (hash == '#referral') {
    hide_all_settings();
    $('#referral').show();
  }
  if (hash == '#billing') {
    hide_all_settings();
    $('#billing').show();
  }
};

$(document).ready(function() {
  update_feed();
  update_page();

  function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
      return request.responseText;
  }

  autocomplete_json = JSON.parse(readJSON('/static/data/autocomplete.json'));
  

  $('#logout-btn').click(function() {
    window.location.replace('/logout/');
  });

  $('#account-profile-link').click(function() {
    hide_all_settings();
    $('#profile').show();
  });

  $('#account-referral-link').click(function() {
    hide_all_settings();
    $('#referral').show();
  });

  $('#account-billing-link').click(function() {
    hide_all_settings();
    $('#billing').show();
  });

  $('#account-settings-link').click(function() {
    hide_all_settings();
    $('#settings').show();
  });

  $('#apply-promo-code').click(function() {
    data = {
      'check_promo_code': $('#referral-promo').val()
    };
    $.ajax({
      type: "PUT",
      contentType: 'application/json;charset=UTF-8',
      url: '/api/user',
      data: JSON.stringify(data),
      dataType: "json",
      success: function(result) {
        if (result.errors) {
          $('#referral-promo-alert').text(result.errors);
          $('#referral-promo-alert').show();
        } else {
          $('#referral-promo-alert').hide();
          $('#referral-promo-success').show();
          $('#referral-promo-success').delay(750).fadeOut('slow');
          $('#referral-credits').text('$' + result.user.credit);
        }
      }
    });
  });

  $('#edit-referral-code').click(function() {
    $('#your-referral-code').hide();
    $('#your-referral-code-edit').show();
  });

  $('#change-credit-edit-btn').click(function() {
    if ($('#change-credit-edit-btn').text().trim() == 'Change') {
      $('#change-credit-container').show();
      $('#change-credit-edit-btn').text('Cancel');
      $('#change-credit-edit-btn').css('text-decoration', 'underline');
    } else {
      $('#change-credit-container').hide();
      $('#change-credit-edit-btn').text('Change');
    }
  });

  $('#change-debit-edit-btn').click(function() {
    if ($('#change-debit-edit-btn').text().trim() == 'Change') {
      $('#change-debit-container').show();
      $('#change-debit-edit-btn').text('Cancel');
      $('#change-debit-edit-btn').css('text-decoration', 'underline');
    } else {
      $('#change-debit-container').hide();
      $('#change-debit-edit-btn').text('Change');
    }
  });

  $('#add-debit-btn').click(function() {
    $('#change-debit-container').show();
    $(this).hide();
  });

  $('#add-credit-btn').click(function() {
    $('#change-credit-container').show();
    $(this).hide();
  });

  $('#edit-referral-code-submit').click(function() {
    data = {
      'update_promo_code': $('#referral-code').val()
    };
    $.ajax({
      type: "PUT",
      contentType: 'application/json;charset=UTF-8',
      url: '/api/user',
      data: JSON.stringify(data),
      dataType: "json",
      success: function(result) {
        if (result.errors) {
          $('#referral-edit-alert').text(result.errors);
          $('#referral-edit-alert').show();
        } else {
          $('#referral-edit-alert').hide();
          $('#your-referral-code-text').text(result.user.user_referral_code);
          $('#your-referral-code-url').text('http://uguru.me/' + result.user.user_referral_code);
          $('#your-referral-code-edit').hide();
          $('#your-referral-code').show();
        }
      }
    });
  });

  $('#account-billing-link').click(function() {
    hide_all_settings();
    $('#billing').show();
  });

  $('#example-skills').on('click', 'a.example-skill-link', function(e) {
    var tag_arr = ['previous', 'slc','hkn', 'res', 'ta', 'la'];
    if ($(this).children(':first').hasClass('active')){
      $(this).children(':first').removeClass('active');
      send_profile_update_ajax(tag_arr[$(this).index()], false);
    }
    else {
      $(this).children(':first').addClass('active');
      send_profile_update_ajax(tag_arr[$(this).index()], true);
    }
    $('#saved-tag').show();
    $('#saved-tag').delay(750).fadeOut('slow');
  });
  
  var verify_tutor = function() {
    var data = {'verify-tutor':true};
    $.ajax({
      type: "POST",
      contentType: 'application/json;charset=UTF-8',
      url: '/validation/' ,
      data: JSON.stringify(data),
      dataType: "json",
    });
  };

  $('#launch-profile-link').click(function() {
    var data = {'verify-tutor':true};
    $.ajax({
      type: "POST",
      contentType: 'application/json;charset=UTF-8',
      url: '/validation/' ,
      data: JSON.stringify(data),
      dataType: "json",
      success: function() {
        window.location.replace('/activity/');
      }
    });
  });

  $('#short-description').focus(function() {
    $('#profile-save-button').show();
  });

  $('#major-input').focus(function() {
    $('#save-btn-major').show();
  });

  $('#save-btn-major').click(function() {
    if (!$('#major-input').val()) {
      $('#alert-major-text').show();
    } else {
      if (!$('#default-photo').is(':visible') && $('#short-description').val()) {
        $('#prof-not-complete').hide();
      }
      $('#save-btn-major').hide();
      $('#saved-major').show();
      $('#saved-major').delay(750).fadeOut('slow');
      $('#major-input').css('border','1px solid grey');
      var major_text = $('#major-input').val();
      send_profile_update_ajax('major', major_text);
    }
  });

  $('#profile-save-button').click(function(){
    if (!$('#short-description').val().trim()) {
      $('#alert-rating-short-description').show();
    } else {
      $('#alert-rating-short-description').hide();
      $('#profile-save-button').hide();
      $('#short-description').css('border', '1px solid grey');
      $('#saved-introduction').show();
      $('#saved-introduction').delay(750).fadeOut('slow');
      if (!$('#default-photo').is(':visible') && $('#major-input').val()) {
        $('#prof-not-complete').hide();
      }
      send_profile_update_ajax('intro', $('#short-description').val());
    }
  });
  $('#discover-on').click(function(){
    $('#discover-on-span').attr('class','btn-toggle-on');
    $('#discover-off-span').attr('class','btn-toggle-off');
    $('#discover-label').text('ACTIVE');
    $('#saved-discover').show();
    $('#saved-discover').delay(750).fadeOut('slow');
    send_profile_update_ajax('discover', true);
  });
  $('#discover-off').click(function(){
    $('#discover-on-span').attr('class','btn-toggle-on-inactive');
    $('#discover-off-span').attr('class','btn-toggle-off-active');
    $('#discover-label').text('INACTIVE');
    $('#saved-discover').show();
    $('#saved-discover').delay(750).fadeOut('slow');
    send_profile_update_ajax('discover', false);
  });
  $('#email-on').click(function(){
    $('#email-on-span').attr('class','btn-toggle-on');
    $('#email-off-span').attr('class','btn-toggle-off');
    $('#saved-email').show();
    $('#saved-email').delay(750).fadeOut('slow');
    send_notification_ajax('email', true);
  });
  $('#email-off').click(function(){
    $('#email-on-span').attr('class','btn-toggle-on-inactive');
    $('#email-off-span').attr('class','btn-toggle-off-active');
    $('#saved-email').show();
    $('#saved-email').delay(750).fadeOut('slow');
    send_notification_ajax('email', false);
  });
  $('#text-off').click(function(){
    $('#text-on-span').attr('class','btn-toggle-on-inactive');
    $('#text-off-span').attr('class','btn-toggle-off-active');
    $('#saved-text').show();
    $('#saved-text').delay(750).fadeOut('slow');
    send_notification_ajax('text', false);
  });
  $('#text-on').click(function(){
    $('#text-on-span').attr('class','btn-toggle-on');
    $('#text-off-span').attr('class','btn-toggle-off');
    $('#saved-text').show();
    $('#saved-text').delay(750).fadeOut('slow');
    send_notification_ajax('text', true);
  });

  $("#settings-button").click(function() {
    $("#skills").hide();
    $("#profile").hide();
    $("#skills-button").removeClass('active');
    $("#profile-button").removeClass('active');
    $("#settings-button").addClass('active');
    $("#settings").show();
    $(".btn-logout").show();
  });
  $('#support-button').click(function() {
    $("#skills").hide();
    $("#profile").hide();
    $("#settings").hide();
    $("#skills-button").removeClass('active');
    $("#profile-button").removeClass('active');
    $("#settings-button").removeClass('active');
    $("#support-section").show();
    $(".btn-logout").hide();
  });
  $("#skills-button").click(function() {
    $("#settings").hide();
    $(".btn-logout").hide();
    $("#profile").hide();
    $("#settings-button").removeClass('active');
    $("#profile-button").removeClass('active');
    $("#skills-button").addClass('active');
    $("#skills").show();
  });
  $("#profile-button").click(function() {
    $("#settings").hide();
    $("#skills").hide();
    $(".btn-logout").hide();
    $("#skills-button").removeClass('active');
    $("#settings-button").removeClass('active');
    $("#profile-button").addClass('active');
    $("#profile").show();
  });

  $('#change-password-btn').click(function() {
    if ($('#change-password').is(":visible")) {
      $('#change-password').hide();
    } else {
      $('#change-password').show();
    }
  });

  $('#add-skill-btn').click(function() {
    if ($('#add-skill-input-settings').val()) {
      var skill_name = $('#add-skill-input-settings').val();
      if (autocomplete_json.indexOf(skill_name) == -1) {
        alert('Please only add things from the available options.');
        $('#add-skill-input-settings').val('');
      } else {
        $('.template-one-skill:first').clone().hide().attr('class', 'one-skill').appendTo('#current-skills');
        $('.one-skill:last .skill-name').text($('#add-skill-input-settings').val());
        $('.one-skill:last').show();
        $('#add-skill-input-settings').val('');
        $('.tt-hint').hide();
        update_skill_ajax('add',skill_name);
      }
    }
  });

  $('#add-skill-input-settings').keyup(function(e){
    if ($('#add-skill-input-settings').val()) {
      var skill_name;
      if (e.keyCode == 13) {
        if ($('#add-skill-input-settings').val()) {
          skill_name = $('#add-skill-input-settings').val();
          if (autocomplete_json.indexOf(skill_name) == -1) {
            alert('Please only add things from the available options.');
            $('#add-skill-input-settings').val('');
          } else {
            $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
            $('.skill-tag:last .skill-tag-text').text($('#add-skill-input-settings').val());
            $('.skill-tag:last').show();
            $('#add-skill-input-settings').val('');
            $('.tt-hint').hide();
            $('#my-skills').show();
            $('#tutor-register-div').show();
            update_skill_ajax('add',skill_name);
          }
        }
      }
      if (e.keyCode == 188) {
        if ($('#add-skill-input-settings').val()) {
          skill_name = $('#add-skill-input-settings').val().replace(',', '');
          if (autocomplete_json.indexOf(skill_name) == -1) {
            alert('Please only add things from the available options.');
            $('#add-skill-input-settings').val('');
          } else {
            $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
            $('.skill-tag:last .skill-tag-text').text(skill_name);
            $('.skill-tag:last').show();
            $('#add-skill-input-settings').val('');
            $('#my-skills').show();
            $('#tutor-register-div').show();
            update_skill_ajax('add',skill_name);
          }
        }
      }
    }
  });

$('#add-skill-apply-btn').click(function() {
  if ($('#add-skill-input-settings').val()) {
    var skill_name = $('#add-skill-input-settings').val();
    if (autocomplete_json.indexOf(skill_name) == -1) {
      alert('Please only add things from the available options.');
      $('#add-skill-input-settings').val('');
    } else {
      $('.template-one-skill:first').clone().hide().attr('class', 'skill-tag').appendTo('#register-skills');
      $('.skill-tag:last .skill-tag-text').text($('#add-skill-input-settings').val());
      $('.skill-tag:last').show();
      $('#add-skill-input-settings').val('');
      $('.tt-hint').hide();
      $('#my-skills').show();
      $('#tutor-register-div').show();
      update_skill_ajax('add',skill_name);
    }
  }
});

$('#tutor-application-submit').click(function() {
  if (!$('#former-experience').val() || ($('.skill-tag').length < 2)) {
    $('#add-one-skill-alert').show();
  } else {
    $('#add-one-skill-alert').hide();
    data = {
      'complete-tutor-signup':$('#former-experience').val(),
      'student-convert':true
    };
    $.ajax({
      type: "POST",
      contentType: 'application/json;charset=UTF-8',
      url: '/validation/',
      data: JSON.stringify(data),
      dataType: "json",
      success: function(result) {
        window.location.replace('/settings/');
      }
    });
  }
});

$('#add-skill-input-settings').keyup(function(e){
  if ($('#add-skill-input-settings').val()) {
    if (e.keyCode == 13) {
      if ($('#add-skill-input-settings').val()) {
        var skill_name = $('#add-skill-input-settings').val();
        if (autocomplete_json.indexOf(skill_name) == -1) {
          alert('Please only add things from the available options.');
          $('#add-skill-input-settings').val('');
        } else {
          $('.template-one-skill:first').clone().hide().attr('class', 'one-skill').appendTo('#current-skills');
          $('.one-skill:last .skill-name').text($('#add-skill-input-settings').val());
          $('.one-skill:last').show();
          $('#add-skill-input-settings').val('');
          $('.tt-hint').hide();
          update_skill_ajax('add',skill_name);
        }
      }
    }
  }
});

$('#submit-support-ticket').click(function() {

  if (!$('#support-detail').val()) {
    $('#support-section-alert').text('Please fill in all fields');
    $('#support-section-alert').show();
    return;
  } else {
    $('#support-section-alert').hide();
  }

  data = {
    'selected-issue':$('#selected-issue').text(),
    'detail':$('#support-detail').val()
  };

  $.ajax({
    type: "POST",
    contentType: 'application/json;charset=UTF-8',
    url: '/api/support',
    data: JSON.stringify(data),
    dataType: "json",
    success: function(result) {
      $('#support-section-alert').text("Your issue has been submitted! We'll get back to you soon");
      $('#support-section-alert').show();
    }
  });
});

$('#issue-dropdown').on('click', '.dropdown-menu li a', function() {
  var selected_text = $(this).text();
  $('#selected-issue').text(selected_text);
});

$('#current-skills').on('click', '.boxclose', function(e){
  e.preventDefault();
  var skill_name = $(this).parent().siblings('.default-text:first').children('.skill-name').text();
  $(this).parent().parent().parent().remove();
  update_skill_ajax('remove',skill_name);
});

$('#register-skills').on('click', '.skill-tag-remove', function(e){
  e.preventDefault();
  var skill_name = $(this).siblings('.skill-tag-text').text();
  $(this).parent().remove();
  update_skill_ajax('remove',skill_name);
});

update_skill_ajax = function(add_or_remove, skill_name) {
  var data = {};
  if (add_or_remove == 'add') {
    data['add'] = skill_name;
  } else {
    data['remove'] = skill_name;
  }
  $.ajax({
    type: "POST",
    contentType: 'application/json;charset=UTF-8',
    url: '/update-skill/' ,
    data: JSON.stringify(data),
    dataType: "json"
  });
};

var send_notification_ajax = function(email_or_text, value) {
  var data = {};
  if (email_or_text == 'email') {
    data['email'] = value;
  } else {
    data['text'] = value;
  }
  $.ajax({
    type: "POST",
    contentType: 'application/json;charset=UTF-8',
    url: '/notification-settings/' ,
    data: JSON.stringify(data),
    dataType: "json"
  });
};

var numbers = new Bloodhound({
  datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 3,
  prefetch: {
    url: '/static/data/autocomplete.json',
    filter: function(list) {
      return $.map(list, function(course) { return { name: course }; });
    }
  },
  sorter: function compare(a,b) {
    if (a > b) {
      return 1;
    }
    if (b < a) {
      return -1;
    }
    return 0;
  }
});

numbers.initialize();
$('#skills .typeahead').typeahead(null, {
  displayKey: 'name',
  source: numbers.ttAdapter()
});
});
