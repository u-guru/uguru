angular.module('uguru.shared.services')
.factory("SendService", [
    '$timeout',
    SendService
        ]);

function SendService($timeout) {

  return {
    sendMsgToSelf: sendMsgToSelf
  }

  function sendMsgToSelf(element, scope, state_ref, msg_type) {
    if (msg_type === 'on') {
      var internal_name = '';
      if (state_ref && state_ref.length) {
        internal_name = state_ref[0];
      }
      if (scope.states.on && scope.states.on.length) {
        scope.states.on.forEach(function(on_state, i) {

          if (on_state.name.indexOf(internal_name) > -1) {
            on_state.exec(element, scope, null);
          }
          // if (on_state.name && on_state.name.indexOf())
        })
      }
    }
  }
}
