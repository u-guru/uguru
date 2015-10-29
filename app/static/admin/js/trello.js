var DEFAULT_UGURU_ORG_API_KEY = "55cae5986c21ffa5233412ff"

all_trello_list_id_objs = [];
var uguruPrioritizedTeamBoards;
var total_sum = 0;
var total_items_complete= 0;
var total_lists = 0;


    var getAllActiveBoards = function(organization_id) {
       Trello.get("organizations/"+ organization_id + "/boards", function(boards) {
        uguruPrioritizedTeamBoards = boards;
        starredBoards = processAllPrioritizedBoards(uguruPrioritizedTeamBoards);


       });
    }


    // var generateTodoList = function() {
    //   "<ul class="todo-list">

    //   </ul>"
    // }

    var processAllPrioritizedBoards = function(boards) {
      var starredBoards = []
      for (var i = 0; i < boards.length; i ++ ) {
        var indexBoard = boards[i];
        if (indexBoard.starred && !indexBoard.closed) {
          starredBoards.push(indexBoard);
          console.log(indexBoard);

          var processListsCallback = function(lists) {
            total_lists = lists.length;
            for (var i = 0; i < lists.length; i ++) {
              indexList = lists[i];
              var name = indexList.name;
              processList(name, indexList, i);
            }
          }

          var processMembersCallback = function(members) {
            for (var i = 0; i < members.length; i ++) {
              indexMember = members[i];
              processMembers(indexBoard.id ,indexMember)
            }
          }

          Trello.get("boards/" + indexBoard.id + "/lists", {cards:"all", card_fields:"all"}, processListsCallback);
          Trello.get("boards/" + indexBoard.id + "/members", processMembersCallback);
        }
      }

    }

    var processMembers = function(board_id, member) {
      Trello.get("boards/" + board_id + '/members/' + member.id + '/cards', {list_fields: "all", list:"true", checklists:"all"}, function(cards) {
        console.log('members complete from processing', cards);
        sum = 0;
        var allItems = []
          correct = 0;
          for (var i =0; i < cards.length; i ++) {
            card_checklists = cards[i].checklists;
            for (var j = 0; j < card_checklists.length; j++) {
              checklist = card_checklists[j].checkItems;
              for (var k = 0; k < checklist.length; k++) {
                allItems.push(checklist[k]);
                if (checklist[k].state === "complete") {
                  correct += 1;
                }
              }
              sum += checklist.length;
            }
          }
          totalTodos = sum;
          totalCompleted = correct;
          var todoListDiv = createCreateTodoListDiv(member, totalTodos, totalCompleted, allItems)

          $('#members-container').append(todoListDiv);
          setTimeout(function() {
            console.log('initiating the iCheck plugin');
            initiCheckPlugin();
          }, 1000);
      })
    }

    var initiCheckPlugin = function() {

      $('input[type="checkbox"]').iCheck({
          checkboxClass: 'icheckbox_flat-blue',
          radioClass: 'iradio_flat-blue'
      });


      $('.todo-list').sortable({
        placeholder: "sort-highlight",
        handle: ".handle",
        forcePlaceholderSize: true,
        zIndex: 999999
      });

      $(".todo-list").todolist({
        onCheck: function (ele) {
          console.log("The element has been checked")
        },
        onUncheck: function (ele) {
          console.log("The element has been unchecked")
        }
      });

    }

    var initAndAppendDayProject = function(project_name, total_items, total_complete, index) {
      var div = createDayProjectDiv(project_name, total_items, total_complete, index);
      $('#projects-wrapper').append(div);
      console.log($('#projects-wrapper').children().length, total_lists)
        if ($('#projects-wrapper').children().length === total_lists) {
          console.log('creating full day div...', total_sum);
          var div = createFullDayDiv(total_sum);
          $("#full-progress-wrapper .col-md-12").append(div);
        }
    }

    var colors = ['olive', 'teal', 'maroon', 'orange', 'navy'];
    var chooseRandomDivColor = function(index) {
      return colors[index]
    }

    function getRandomizer(bottom, top) {
      return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
      }
    }

    var createFullDayDiv = function(total_sum) {
      // div createDayProjectDiv('Total', total_sum, total_items_complete, -1);
    }

    var createDayProjectDiv = function(project_name, total_items, total_complete, index) {
      var floatNum = total_complete/total_items;
      total_items_complete += total_complete;
      total_sum += total_items;
      var percentage;
      var randomColor = chooseRandomDivColor(index);
      if (total_complete == 0) {
        percentage = 0;
      } else {
        percentage = Math.round(floatNum * 100);
      }
      var div = $('<div class="col-md-4"><div class="info-box bg-' + randomColor +'"><span class="info-box-icon"><i class="fa fa-thumbs-o-up"></i></span><div class="info-box-content"><span style="font-size:24px; font-weight:700;text-transform:uppercase;"class="info-box-text">\
        ' + project_name +'</span><span class="info-box-number">' + percentage + '%</span><div class="progress">\
        <div class="progress-bar" style="width: ' +  percentage + '%"></div></div><span class="progress-description"><strong>\
        ' + total_complete + '/' + total_items + '</strong> completed</span></div><!-- /.info-box-content --></div> </div>');
      return div;
    }


    var createTodoListItemElem = function(checkItem, localColor) {
      console.log(checkItem);
      return $('<li><span class="handle"><i class="fa fa-ellipsis-v"></i><i class="fa fa-ellipsis-v"></i>\
        </span><input type="checkbox" value="" name=""><span class="text">' + checkItem.name + '</span></li>')
    }

    var createCreateTodoListDiv = function(member, total_items, correct, items_arr) {

      var divElem = $('<div class="col-md-6 member-todo" style="min-height:250px;"><div class="box-body"></div></div>');

      var ulElem = $('<ul class="todo-list"></ul>');
      console.log(items_arr);
      for (var i = 0; i < items_arr.length; i++) {
        ulElem.append(createTodoListItemElem(items_arr[i]));
      }


      $(divElem).prepend($('<div class="body-header"><h3 style="text-align:center;">' + member.fullName +'</h3></div>'));
      $(divElem).children('.box-body:first').append(ulElem);
      return $(divElem);

    }



    var processList = function(name, list, index) {
      Trello.get("lists/" + list.id + '/cards', {fields:"name", checklists:"all"}, function(cards) {
          sum = 0;
          correct = 0;
          for (var i =0; i < cards.length; i ++) {
            card_checklists = cards[i].checklists;
            for (var j = 0; j < card_checklists.length; j++) {
              checklist = card_checklists[j].checkItems;
              for (var k = 0; k < checklist.length; k++) {
                if (checklist[k].state === "complete") {
                  correct += 1;
                }
              }
              sum += checklist.length;
              // total_sum += checklist.length;
            }
          }
          initAndAppendDayProject(name, sum, correct, index);
      })
    }


    var processListsAndCreateProgress = function(list) {

    }

    var getBoardMembers = function(arr_boards) {
      firstBoard = 0;
      Trello.get("organizations/" + organization_id + '/members', function(members) {
        console.log('members', members);
       });
    }


    var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();
    getAllActiveBoards(DEFAULT_UGURU_ORG_API_KEY);

    Trello.members.get("me", function(member){
        console.log('ALL ABOUT ME', member);
        $("#fullName").text(member.fullName);

        var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo("#output");

        // Output a list of all of the cards that the member
        // is assigned to
        Trello.get("members/me/cards", function(cards) {
            $cards.empty();
            $.each(cards, function(ix, card) {
                $("<a>")
                .attr({href: card.url, target: "trello"})
                .addClass("card")
                .text(card.name)
                .appendTo($cards);
                });
            });
        });
    };

    var updateLoggedIn = function() {
        var isLoggedIn = Trello.authorized();
        $("#loggedout").toggle(!isLoggedIn);
        $("#loggedin").toggle(isLoggedIn);
    };

    var logout = function() {
        Trello.deauthorize();
        updateLoggedIn();
    };

    // Trello.authorize({
    //     interactive:false,
    //     success: fireTrelloAuth
    // });


    $("#disconnect").click(logout);


    var fireTrelloAuth = function() {

      Trello.authorize({
            type: "popup",
            success: onAuthorize
      })

    }


    $(document).ready(function() {
        var postTrelloAuthCallback = function() {
          getAllActiveBoards("55cae5986c21ffa5233412ff");
        }


        // fire in case we haven't
        fireTrelloAuth(postTrelloAuthCallback)

        // //get all active boards for the organization


    })
