angular.module('uguru.admin')

.controller('AdminDocItemController', [
  '$scope',
  '$state',
  'RootService',
  '$timeout',
  function($scope, $state, RootService, $timeout) {

    var docItem = this;
    this.onSnippetClicked = onSnippetClicked(docItem);
    this.onStateClicked = onStateClicked(docItem);
    this.keywords = [];
    this.states = [];
    this.snippets = [];
    this.stateIndex = 0;
    this.snippetIndex = 0;
    RootService.appendDocItem(docItem);
    this.id = RootService.getDocItems().length;

    function onSnippetClicked(scope) {
        return function(index, event) {
            docItem.snippetIndex = index;
        }
    }
    function onStateClicked(scope) {
        return function(index, event) {
            var nextState = docItem.states[index];
            if (!docItem.states[index].inherit) {
                docItem.stateIndex = index;
                docItem.inheritedIndex = false;
                console.log(docItem.stateIndex, 'state index clicked');
            } else {
                // docItem.stateIndex = index;
                docItem.states[docItem.stateIndex].inheritedIndex = true;
                var dashedAttribute = nextState.title.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
                var selectedAttrElems = this.element[0].querySelectorAll('[' + dashedAttribute + ']');
                if (selectedAttrElems.length) {
                    for (var i = 0; i < selectedAttrElems.length; i++) {
                        if (dashedAttribute.split('activate').length > 1) {
                            selectedAttrElems[i].classList.add('activate');
                        } else {
                            selectedAttrElems[i].classList.add(dashedAttribute);
                        }
                    }
                }
                docItem.stateIndex = index;
            }
        }

    }

  }

])
