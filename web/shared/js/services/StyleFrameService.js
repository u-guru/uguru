angular
.module('uguru.shared.services')
.factory("StyleService", [
  StyleService
    ]);

function StyleService() {
  return {
    templates: getBaseTemplates(),
    css: getCSSmodules()
  }

  function getBaseTemplates() {
    return {
      svg: '<svg style="flex-grow:1;" preserveAspectRatio="xMidYMid meet"  viewBox="0 0 100 100"> <rect stroke="#637074" stroke-width="3" x="1.5" y="1.5" width="97" height="97" rx="10" ></rect><g ng-transclude></ng-transclude></svg>',
      container: '<div style="display:flex" ng-transclude></div>',
      view: '<div style="display:flex; width:100%; height:100%;" ng-transclude></div>',
    }
  }

  function getCSSmodules() {
    return {
      flexItem: {'align-self': 'space-between'},
      column: {'display': 'flex', 'flex-direction': 'row', 'width': '100%', 'align-content': 'space-between', 'justify-content': 'center'},
      view: {'display': 'flex', 'flex-direction': 'column', 'justify-content':'center', 'align-items': 'space-between', 'width':'100%', 'height':'100%'}
    }
  }
}
