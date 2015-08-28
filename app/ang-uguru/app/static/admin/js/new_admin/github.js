GITHUB_TOKEN = "36d5d7c5dedd680e2a0244ab5f87358ca8d2d837";
BASE_URL = 'https://api.github.com/repos/sam1rm/uguru-mobile/'
AUTH_PORTION = 'access_token=36d5d7c5dedd680e2a0244ab5f87358ca8d2d837'
labels_dict = {};
var github = new Github({
    token: GITHUB_TOKEN,
    auth: "oauth"
});

// var g_repo = github.getRepo('sam1rm', 'uguru-mobile');

// g_repo.show(function(err, repo) {
//     var label_url = (repo.labels_url);
//     console.log(label_url);
// });

var get_labels_gh_api = function() {
    labels_url = BASE_URL + 'labels?' + AUTH_PORTION;

    $.ajax({
        url: labels_url,
        type: "GET",
        contentType: 'application/json',
        success: function(result) {
          filter_labels_and_process(result);
        }
    });
}

var get_issues_gh_api = function(callback) {
    labels_url = BASE_URL + 'issues?' + AUTH_PORTION;

    $.ajax({
        url: labels_url,
        type: "GET",
        contentType: 'application/json',
        success: function(result) {
          console.log(result);
          if (callback) {
            callback(result);
          }
        }
    });
}

var create_github_issue = function(options) {
    issues_url = BASE_URL + 'issues?' + AUTH_PORTION;
    options.body = 'Contributor:\n\n' + options.contributor.split(':')[1];
    options.body += '\n\n\nDescription:\n\n' + options.description.split(':')[1];
    options.body += '\n\n\nSuggestion:\n\n' + options.suggestion.split(':')[1];

    options.labels = [];
    options.labels.push(options.contributor, options.type,
        options.story, options.severity);

    options.labels = options.labels.concat(options.other);
    options.labels = options.labels.concat(options.platforms);

    payload = {
        title: options.title,
        body: options.body,
        labels: options.labels
    }

    $.ajax({
        url: issues_url,
        type: "POST",
        data: JSON.stringify(payload),
        contentType: 'application/json',
        success: function(result) {

            window.location.replace('/admin/bugs/view/')
        }
    });
}

var filter_labels_and_process = function(labels_arr) {
    labels_dict = {other:[]};
    for (var i = 0; i < labels_arr.length; i++) {
        var current_label = labels_arr[i];
        if (current_label.name.indexOf(':') !== - 1) {
            label_parts = current_label.name.split(':');
            label_header = label_parts[0];
            if (! labels_dict[label_header]) {
                labels_dict[label_header] = [current_label];
            } else {
                labels_dict[label_header].push(current_label);
            }
        } else {
            labels_dict.other.push(current_label);
        }
    }

    update_platform_dropdown(labels_dict.platform);
    update_story_dropdown(labels_dict.story);
    update_severity_dropdown(labels_dict.severity);
    update_type_dropdown(labels_dict.type);
    update_contributor_dropdown(labels_dict.contributor);
    update_other_tags(labels_dict.other);

    $('.btn-label').on('click', function() {
      if ($(this).hasClass('btn-primary')) {
        $(this).removeClass('btn-primary');
      } else {
        $(this).addClass('btn-primary');
      }
    });

}

var update_platform_dropdown = function(labels) {
    for (var i = 0; i < labels.length; i++) {
        var current_label = labels[i];
        label_parts = current_label.name.split(':');
        label_content = label_parts[1];
        $('#platforms-dropdown').append('<option>' + label_content + '</option>')
    }
}

var update_severity_dropdown = function(labels) {
    for (var i = 0; i < labels.length; i++) {
        var current_label = labels[i];
        label_parts = current_label.name.split(':');
        label_content = label_parts[1];
        $('#severity-dropdown').append('<option>' + label_content + '</option>')
    }
}

var update_type_dropdown = function(labels) {
    for (var i = 0; i < labels.length; i++) {
        var current_label = labels[i];
        label_parts = current_label.name.split(':');
        label_content = label_parts[1];
        $('#type-dropdown').append('<option>' + label_content + '</option>')
    }
}

var update_contributor_dropdown = function(labels) {
    for (var i = 0; i < labels.length; i++) {
        var current_label = labels[i];
        label_parts = current_label.name.split(':');
        label_content = label_parts[1];
        $('#contributor-dropdown').append('<option>' + label_content + '</option>')
    }
}

var update_story_dropdown = function(labels) {
    for (var i = 0; i < labels.length; i++) {
        var current_label = labels[i];
        label_parts = current_label.name.split(':');
        label_content = label_parts[1];
        $('#story-dropdown').append('<option>' + label_content + '</option>')
    }
}

var update_other_tags = function(labels) {
    for (var i = 0; i < labels.length; i++) {
        var current_label = labels[i];
        label_parts = current_label.name.split(':');
        label_content = label_parts[0];
        $('#other-labels').append('<a href="javascript:void(0);" class="btn btn-md btn-label margin">' + label_content + '</a>')
    }
}