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

  var router = {
    config: function config(_config2) {
      return _config = _config2;
    },

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
      if (!router.active) return;
      // Match the state in the list of states, if no state available console.error
      var _state = findStateByName(name);
      if (!_state) {
        console.error('State \'' + name + '\' has not been configured');
        return;
      }

      // TODO: Resolve the resolve function then
      // TODO: Update the URL if one was provided (HTML5 history API)
      if (typeof history.pushState != 'undefined' && !popped) {
        history.pushState(_state, null, '#/' + (_state.url || ''));
      }

      router.current = _state;
      router.trigger('go', _state);
    },

    start: function start() {
      // TODO: Check states for the matching URL and call go() with the matching state name

      window.addEventListener('popstate', function (e) {
        return router.go(e.state.name, true);
      });
      router.active = true;
      router.trigger('start');
    },

    stop: function stop() {
      window.removeEventListener('popstate', function (e) {
        return router.go(e.state.name, true);
      });
      router.active = false;
      router.trigger('stop');
    },

    current: undefined,
    active: true
  };

  riot.observable(router);
  riot.mixin('rg.router', {
    router: router
  });
  router.start();
})();
