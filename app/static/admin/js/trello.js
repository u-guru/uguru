var DEFAULT_UGURU_ORG_API_KEY = "55cae5986c21ffa5233412ff"

all_trello_list_id_objs = [];
var uguruPrioritizedTeamBoards;
var total_sum = 0;
var total_items_complete= 0;
var total_lists = 0;
var memberDict = {};
var projectLookup = {};
var currentMember;
var startRenderMainProgress = false;
var labelsMap = {
  'urgent': 'red',
  'Morning Skills': 'yellow'
}


    var getAllActiveBoards = function(organization_id) {

       Trello.get("organizations/"+ organization_id + "/boards", function(boards) {
        uguruPrioritizedTeamBoards = boards;
        starredBoards = processAllPrioritizedBoards(uguruPrioritizedTeamBoards);


       });
    }


    var getTotalChecklistItems = function (board_id) {
      Trello.get('boards/' + board_id + '/' + 'cards', {"filter": "visible", "checkItemStates":true, "checklists":"all", "fields":"labels"}, function(cards) {
        index = 0;
        var allCheckItems = [];
        sum_complete = 0;
        sum_incomplete = 0
        for (var i =0 ; i <cards.length; i++) {
          var indexCard = cards[i]
          if (indexCard.checklists && indexCard.checklists.length) {
            var indexCheckItems = indexCard.checklists[0].checkItems;
            for (var j =0 ; j < indexCheckItems.length; j++) {
              var item = indexCheckItems[j];
              if (item.state === "incomplete") {
                sum_incomplete += 1;
              } else {
                sum_complete += 1;
              }
            }

          }
        }
      });
    }

    var processAllPrioritizedBoards = function(boards) {
      var starredBoards = []
      for (var i = 0; i < boards.length; i ++ ) {
        var indexBoard = boards[i];
        if (indexBoard.starred && !indexBoard.closed) {
          starredBoards.push(indexBoard);
          getTotalChecklistItems(indexBoard.id);

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
      memberDict[member.fullName] = {
        id: member.id,
        tasks: {completed:0, remaining:0},
        projects:{}
      };
      Trello.get("boards/" + board_id + '/members/' + member.id + '/cards', {list_fields: "all", list:"true", checklists:"all"}, function(cards) {
        sum = 0;
        var allItems = [];

          correct = 0;
          //
          for (var i =0; i < cards.length; i ++) {
            memberDict[member.fullName].projects[cards[i].list.name] = true;
            card_checklists = cards[i].checklists;
            // iterate through cards
            for (var j = 0; j < card_checklists.length; j++) {
              checklist = card_checklists[j].checkItems;
              checklist.sort(function(item_one, item_two) {
                  return !(item_one.pos <= item_two.pos);
              })
              for (var k = 0; k < checklist.length; k++) {
                checklist[k].checklist_id = card_checklists[j].id;
                checklist[k].card_index = k;
                checklist[k].labels = cards[i].labels;
                checklist[k].label_names = checklist[k].labels.slice().map(function(label) {return label.name});
                checklist[k].label_name_strings = checklist[k].label_names.join(" ");
                checklist[k].card = cards[i].name;
                checklist[k].project = cards[i].list.name;
                checklist[k].value = checklist[k].state === "complete";
                allItems.push(checklist[k]);
                if (checklist[k].state === "complete") {
                  correct += 1;
                  memberDict[member.fullName].tasks.completed += 1;
                } else {
                  memberDict[member.fullName].tasks.remaining += 1;
                }
              }
              sum += checklist.length;
            }
          }
          totalTodos = sum;
          totalCompleted = correct;





          //         console.log(checklist[k].name, checklist[k], checklist[k].label_names);
          // }

          var todoListDiv = createCreateTodoListDiv(member, totalTodos, totalCompleted, allItems)

            if (member.id !== currentMember.id) {
              $('#members-container').append(todoListDiv);
            } else {
              $('#current-members-container').append(todoListDiv);
            }

            setTimeout(function() {
              initiCheckPlugin();
            }, 1000);
            setTimeout(function() {
              showLabels();
            }, 2000);
            setTimeout(function() {
              $('.box-footer').css('display', 'none');
            }, 4000);

      })
    }

    var showLabels = function() {

      var allCheckLabels = document.querySelectorAll('small.check-item-label');
      for (var i =0 ; i < allCheckLabels.length; i++) {
        allCheckLabels[i].className += ' show';

        var projectName = allCheckLabels[i].innerHTML;
        allCheckLabels[i].className += ' bg-' + projectLookup[projectName];
        if (!startRenderMainProgress) {
          showMainProgress()
          startRenderMainProgress = true;
        }

      }

    }

    var showMainProgress = function() {
      var progressText = document.querySelector('#total-progress-percent-txt')
      if (!progressText || !progressText.innerHTML.length) {
        var percentage = ((total_items_complete / total_sum) * 100).toFixed(1);
        $('#total-progress-percent-txt').html(percentage + '%').css('font-size','24px');
        $('#total-progress-percent').css('width', percentage + '%');
        $('h3.box-title').html('Current Progress:<strong>   ' + percentage + '%<strong>');
      }
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
          var successCallback = function() {
            window.location.replace(location.href);
          }
          var checkItemId = this.context.className.split('-')[3];
          var checkListId = this.context.className.split('-')[2];
          var checkItemName = this.context.className.split('-')[1];
          updateTrelloChecklist(checkListId, checkItemId, true, checkItemName, successCallback)
        },
        onUncheck: function (ele) {
          var successCallback = function() {
            window.location.replace(location.href);
          }
          var checkItemId = this.context.className.split('-')[3];
          var checkListId = this.context.className.split('-')[2];
          var checkItemName = this.context.className.split('-')[1];
          updateTrelloChecklist(checkListId, checkItemId, false, checkItemName, successCallback)
        }
      });

    }

    var updateTrelloChecklist = function(checklistId, checkItemId, val, _name, successCallback) {
      Trello.delete("/checklists/" + checklistId + "/checkItems/" + checkItemId, {}, successCallback);
      Trello.post("/checklists/" + checklistId + "/checkItems", {checked:val, name:_name}, successCallback);
    }

    var initAndAppendDayProject = function(project_name, total_items, total_complete, index) {
      var div = createDayProjectDiv(project_name, total_items, total_complete, index);
      $('#projects-wrapper').append(div);
        if ($('#projects-wrapper').children().length === total_lists) {
          var div = createFullDayDiv(total_sum);
          $("#full-progress-wrapper .col-md-12").append(div);
        }
    }

    var colors = ['olive', 'teal', 'maroon', 'orange', 'navy', 'black'];
    var chooseRandomDivColor = function(index) {
      var projectColor = colors[index]
      return projectColor
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
      projectLookup[project_name] = randomColor;
      if (total_complete == 0) {
        percentage = 0;
      } else {
        percentage = Math.round(floatNum * 100);
      }



      var div = $("<div class='row'><div class='col-md-12'><div class='clearfix'><span class='pull-left'><h4><small class='label check-item-label bg-" + randomColor +"'>"+ project_name + " </small> &nbsp;&nbsp;&nbsp;<strong style='text-transform:uppercase;position:absolute; left:7px; padding:10px; color:"+randomColor+"; font-weight:700;'>" +  total_complete +' of ' + total_items  +"</strong></h4></span><small class='pull-right' style='font-size:18px; right:10%; top:3.5%;'>" +percentage +"%</small></div><div class='progress xs'><div class='progress-bar progress-bar-green bg-" + randomColor + "' id='total-progress-percent' style=' width:" + percentage+"% ;'></div></div></div>");

      // var div = $('<div class="col-md-4"><div class="info-box bg-' + randomColor +'"><span class="info-box-icon"><i class="fa fa-thumbs-o-up"></i></span><div class="info-box-content"><span style="font-size:24px; font-weight:700;text-transform:uppercase;"class="info-box-text">\
      //   ' + project_name +'</span><span class="info-box-number">' + percentage + '%</span><div class="progress">\
      //   <div class="progress-bar" style="width: ' +  percentage + '%"></div></div><span class="progress-description"><strong>\
      //   ' + total_complete + '/' + total_items + '</strong> completed</span></div><!-- /.info-box-content --></div> </div>');
      return div;
    }


    var createTodoListItemElem = function(checkItem, localColor) {
      var checkVal = "";
      if (checkItem.value) {
        checkVal = "checked";
      }
      var label_str = ''
      if (checkItem.labels.length) {
        label_str = '<span style="position:absolute;right:5%;font-size:10px;">';
        for (var i = 0; i < checkItem.label_names.length; i ++) {
          indexLabel = checkItem.label_names[i];
          label_str += '<small style="display:inline-block !important; padding: 2px 6px;" class="check-item-label hide bg-' + [indexLabel] + '">' + indexLabel + '</small>'
        }
        label_str += '</span>'
      }


      var projectDiv = label_str + '<small class="label check-item-label hide bg-' + projectLookup[checkItem.project]  +'" style="position:absolute; right:5%; margin-top:-2%;font-size:14px;"></i>'+checkItem.project+'</small>'
      return $('<li style="position:relative; width:100%;"><span class="handle"><i class="fa fa-ellipsis-v"></i><i class="fa fa-ellipsis-v"></i>\
        </span><input class="check-' + checkItem.name + '-' + checkItem.checklist_id + '-' + checkItem.id + '" type="checkbox" value="" name="" '+  checkVal + '><span style="padding-right:15%; overflow:wrap;">&nbsp;&nbsp;&nbsp;<strong>' + checkItem.card + '</strong><br><span class="text">' + checkItem.name + projectDiv + '</span></span></li>')
    }

    var createCreateTodoListDiv = function(member, total_items, correct, items_arr) {

      var divElem = $('<div class="col-md-6 member-todo" style="min-height:250px;"><div class="box-body"></div></div>');

      var ulElem = $('<ul class="todo-list"></ul>');
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
       });
    }


    var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();
    getAllActiveBoards(DEFAULT_UGURU_ORG_API_KEY);

    Trello.members.get("me", function(member){
        currentMember = member;
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
            success: onAuthorize,
            scope: {
              read: true,
              write: true
            }
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
