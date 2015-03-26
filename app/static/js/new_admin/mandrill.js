MANDRILL_API_KEY = "JgZAGUHchIAIlJmOCrE_4w";
var parse_mandrill_user_agent = function(ua_string) {
    var ua_tuple = [];
    if (ua_string.toLowerCase().indexOf('mobile') !== -1) {
        ua_tuple[0] = 'Mobile';
    } else {
        ua_tuple[0] = 'Desktop';
    }

    if (ua_string.toLowerCase().indexOf('chrome') !== -1) {
        ua_tuple[1] = 'Chrome';
    }
    else if (ua_string.toLowerCase().indexOf('safari') !== -1) {
        ua_tuple[1] = 'Safari';
    } else if (ua_string.toLowerCase().indexOf('firefox') !== -1) {
        ua_tuple[1] = 'Firefox';
    } else {
        ua_tuple[1] = 'Other';
    }

    return ua_tuple;
}

var getMandrillTemplateList = function() {

  $.ajax({
    url: "https://mandrillapp.com/api/1.0/templates/list.json",
    type: "POST",
    contentType: 'application/json',
    data: JSON.stringify({key: MANDRILL_API_KEY}),
    success: function(all_templates) {
      console.log(all_templates);
      $('#mailchimp-templates option:gt(0)').remove();
       $.each(all_templates, function(index, template) {
        var js_date = new Date(template.updated_at);
        $option = $("<option></option>")
          .attr("value", template.value)
          .html(template.name + "<span style='color:grey; font-weight:bold'> === (last updated @" + (js_date.getMonth() + 1) + '/'+ js_date.getDate() + " " + ((js_date.getHours() + 1) % 12) + ":" + js_date.getMinutes() + "</span>)");
        $option.attr('value', template.name);
        $('#mailchimp-templates').append($option);
      });
    }
  });

}