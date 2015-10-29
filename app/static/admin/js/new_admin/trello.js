TRELLO_API_KEY = '5c2c46b0d7987a904b459330e2edd41a';
    all_trello_list_id_objs = [];
    {% if session.get('user') and session['user']['name'] %}
      var first_name = "{{session['user']['name'].split(" ")[0]|title}}";
    {% else %}
      var first_name = "guest account";
    {% endif %}
    //3. Check --> Post to trello
    //4. Visuals: Alignment + collapsable + photos

    $(document).ready(function() {
      $('section').on('click', '.todo-info-icon',function() {
        description_p_elem = $(this).parent().siblings('p')[0];
        if (description_p_elem) {
          if ($(description_p_elem).is(':visible')) {
            $(description_p_elem).hide();
          } else {
            $(description_p_elem).show();
          }
        }
      });

      var get_all_boards = function() {
        $.ajax({
            url: "https://api.trello.com/1/boards/XLbMWWEk?lists=open&list_fields=name&fields=name,desc&key=" + TRELLO_API_KEY,
            type: "GET",
            success: function(board){
              all_trello_list_id_objs = board.lists;
              process_list_objs(all_trello_list_id_objs);
            }
        });
      }

      var process_list_objs = function(list_objs) {
        if (!list_objs) {
          return;
        }
        for (var i = 0; i < list_objs.length; i ++) {
          get_one_list_item(list_objs[i]);
        }
      }

      var get_one_list_item = function(list_obj) {
        $.ajax({
            url: "https://api.trello.com/1/lists/" +list_obj.id + "?fields=name&cards=open&card_fields=name,labels,desc&key=" + TRELLO_API_KEY,
            type: "GET",
            success: function(list){
              list_obj.cards = list.cards;
              create_trello_list(list_obj);
            }
        });
      }

      var create_trello_list = function(list_obj) {
        user_name = list_obj.name.split(' ')[0];
        list_header = "<ul class='todo-list'><li><h5 class='box-title'><i class='ion ion-clipboard'></i> &nbsp;&nbsp;" + list_obj.name + "'s List</h5><img src='/static/img/admin/" + user_name.toLowerCase() + ".png' style='float: right;width: 25px;height: 25px;border-radius: 50%;margin-right: 10px;margin-top: -30px;'class='user-image' alt='User Image'></li>"

        list_body = "";
        for (var i = 0; i < list_obj.cards.length; i ++ ) {
          card = list_obj.cards[i];
          list_body += process_list_card_body(card);
        }
        list_footer = '</ul><br><br>'
        new_elem = $(list_header + list_body + list_footer);
        todo_list_instantiation(new_elem);
        if (list_obj.name.indexOf(first_name) !== -1) {
          $('#my-todo-list').append(new_elem);
        } else {
          $('#todo-lists').append(new_elem);
        }


      }

      var process_list_card_body = function(card) {
        list_body = "";

        //process card name
        list_body += process_list_card_header(card.name);

        //process list body labels
        labels = card.labels;
        if (labels && labels.length > 0) {
          list_body += process_list_card_labels(labels);
        }

        // check if description exists
        desc = card.desc;
        if (desc && desc.length > 0 && list_body.indexOf('private') === -1) {
          list_body += '<p style="display:none;padding-left:40px;" class="padding margin todo-description"><u>Description</u><br>' + desc + '</p>'
        }

        //process list_body_footer
        list_body += process_list_card_footer();

        return list_body;
      }

      var process_list_card_footer = function() {
        return "<div class='tools'><i class='todo-info-icon fa fa-info'></i></div></li>";
      }

      var process_list_card_header = function (card_name) {
        return "<li><span class='handle'><i class='fa fa-ellipsis-v'>&nbsp;</i><i class='fa fa-ellipsis-v'></i></span><input type='checkbox' value='' name=''/><span class='text' style='display:initial !important;'>" + card_name + "</span>";
      }

      var process_list_card_labels = function(labels) {
        list_body += '<li><input type="checkbox" value="" name=""/><span class="text">' + card.name + '</span>'
        label_str = "";
        for (var i = 0; i < labels.length; i ++) {
          label = labels[i];
          label_name = label.name;

          //if indexOf is == -1
          if (label.name.indexOf(':') !== -1) {
            label_str += '<small class="label" style="text-shadow: 0 0 5px rgba(0,0,0,.2),0 0 2px #000; font-size:10.5; background-color:'+ trello_color_map[label.color] + ';"><i class="fa fa-clock-o"></i>&nbsp;' + label_name.split(':')[1] + '</small>'
          }
          else {
            label_str += '<small class="label" style="font-size:10.5px;text-shadow: 0 0 5px rgba(0,0,0,.2),0 0 2px #000; background-color:'+ trello_color_map[label.color] + ';">' + label_name + '</small>'
          }
        }
        return label_str;
      }

      var todo_list_instantiation = function(elem) {
        elem.todolist({
          onCheck: function (ele) {
            console.log("The element has been checked")
          },
          onUncheck: function (ele) {
            console.log("The element has been unchecked")
          }
        });

        $(".todo-list").sortable({
          placeholder: "sort-highlight",
          handle: ".handle",
          forcePlaceholderSize: true,
          zIndex: 999999
        });
      }

      get_all_boards();

    } );

    trello_color_map = {
      orange: '#ff9f1a',
      green: '#70b500',
      yellow: '#F2D604',
      red: '#eb5a46',
      blue: '#0079bf',
      purple: '#c377e0'
    }