'use strict';

;
(function () {
  var _config = {};
  var _states = [];
  var findStateByName = function findStateByName(name) {
    return _states.find(function (state) {
      if (state.name == name) return state;
    });
  };
  var handlePop = function handlePop(e) {
    if (e.state) router.go(e.state.name, true);
  };

  var router = {
    add: function add(state) {
      var _state = findStateByName(state);
      if (_state) _state = state;else _states.push(state);
      router.trigger('add');
    },

    remove: function remove(name) {
      var _state = undefined;
      _states = _states.filter(function (state) {
        if (state.name != name) return state;else _state = state;
      });
      router.trigger('remove', _state);
    },

    go: function go(name, popped) {
      if (!router.active || !name) return;
      // Match the state in the list of states, if no state available console.error
      var _state = findStateByName(name);
      if (!_state) {
        console.error('State \'' + name + '\' has not been configured');
        return;
      }

      // TODO: Resolve the resolve function

      if (typeof history.pushState != 'undefined') {
        if (history.state.name != _state.name && !popped) {
          // New state
          var url = _state.url ? '#/' + _state.url : null;
          history.pushState(_state, null, url);
        }
      }

      router.current = _state;
      router.trigger('go', _state);
    },

    start: function start() {
      // TODO: Onload: check states for the matching URL and call go() with the matching state name

      window.addEventListener('popstate', handlePop);
      router.active = true;
      router.trigger('start');
    },

    stop: function stop() {
      window.addEventListener('popstate', handlePop);
      router.active = false;
      router.trigger('stop');
    },

    current: undefined,
    active: true
  };

  riot.observable(router);
  riot.mixin('rg.router', {
    init: function init() {
      this.router.on('go', this.update);
    },
    router: router
  });
  router.start();
})();
