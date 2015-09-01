'use strict';

;
(function () {
  var _states = [];
  var findStateByName = function findStateByName(name) {
    return _states.find(function (state) {
      if (state.name == name) return state;
    });
  };
  var findStateByUrl = function findStateByUrl(url) {
    return _states.find(function (state) {
      if (state.url == url) return state;
    });
  };
  var handlePop = function handlePop(e) {
    if (e.state) router.go(e.state.name, true);
  };

  var router = {
    add: function add(state) {
      if (!state || !state.name) {
        throw 'Please specify a state name';
        return;
      }
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
      // Match the state in the list of states, if no state available throw error
      var _state = findStateByName(name);
      if (!_state) {
        throw 'State \'' + name + '\' has not been configured';
        return;
      }

      // Merge the state options with the parent states
      var names = name.split('.'); // ["about", "more", "all"]
      names = names.map(function (name, i) {
        if (i > 0) {
          return names.slice(0, i).join('.') + '.' + name;
        } else {
          return name;
        }
      });
      names.forEach(function (name, i) {
        if (i < names.length) {
          var _parent = findStateByName(name);
          _state = Object.assign({}, _state, _parent);
        }
      });

      // TODO: Resolve the resolve function

      // If supported
      if (typeof history.pushState != 'undefined') {
        // New state
        if (!history.state || history.state.name != _state.name && !popped) {
          var url = _state.url ? '#/' + _state.url : null;
          history.pushState(_state, null, url);
        }
      }

      router.current = _state;
      router.trigger('go', _state);
    },

    start: function start() {
      if (window.location.hash) {
        var _state = findStateByUrl(window.location.hash.replace('#/', ''));
        if (_state) router.go(_state.name);
      }
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

  if (!window.rg) window.rg = {};
  window.rg.router = router;
})();
