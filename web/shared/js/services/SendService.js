angular.module('uguru.shared.services')
.factory("SendService", [
    '$timeout',
    SendService
        ]);

function SendService($timeout) {

  return {
    sendMsgToSelf: sendMsgToSelf,
    prepareToSendMessage: prepareToSendMessage
  }

  function prepareToSendMessage(msg_name, msg_str, scope) {
    scope.public.customStates.when[msg_name] = {elements: [], depth: 0};
    var msg_scope = msg_str.split(':')[1];
    if (msg_scope === 'siblings') {
      if (!scope.$parent.public) {
        scope.$parent.public = {customStates: {when: {}}};
      }
      scope.public.customStates.when[msg_name].depth = -0.5;
      scope.$parent.public.customStates.when[msg_name] = {elements: [], depth: -0.5};
      $timeout(function() {
        scope.$apply();
      })
    }
  }

  function sendMsgToSelf(element, scope, state_ref, msg_type) {
    msg_type = msg_type.trim();
    state_ref = state_ref.trim();
    if (['with', 'init', 'as'].indexOf(state_ref) > -1 || msg_type === 'when') {

      // if (state_ref && state_ref.length && typeof) {``

      //   internal_name = state_ref[0];
      // }
      var internal_name = state_ref;
      console.log(scope.states)
      if (scope.states[msg_type] && scope.states[msg_type].length) {
        scope.states[msg_type].forEach(function(state, i) {

          if (state.name.indexOf(state_ref) > -1 || msg_type === 'when') {
            state.exec(element, scope, null);
          }
          // if (on_state.name && on_state.name.indexOf())
        })
      }
    }
  }
}
