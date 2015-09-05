"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

;(function () {
  // Polyfills
  Array.prototype.find = Array.prototype.find || (Array.prototype.find = function (r) {
    if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");if ("function" != typeof r) throw new TypeError("predicate must be a function");for (var t, n = Object(this), e = n.length >>> 0, o = arguments[1], i = 0; e > i; i++) if ((t = n[i], r.call(o, t, i, n))) return t;return void 0;
  });

  var _states = [];

  var router = {
    add: function add(state) {
      if (!state || !state.name) {
        throw 'Please specify a state name';
        return;
      }
      var _state = findStateByName(state);
      if (_state) _state = state;else _states.push(state);
      router.trigger('add', _state);
      return this;
    },

    remove: function remove(name) {
      var _state = undefined;
      _states = _states.filter(function (state) {
        if (state.name != name) return state;else _state = state;
      });
      router.trigger('remove', _state);
      return this;
    },

    go: function go(name, popped) {
      if (!router.active || !name) return;
      // Match the state in the list of states, if no state available throw error
      var _state = findStateByName(name);
      if (!_state) {
        throw "State '" + name + "' has not been configured";
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
          _state = _extends({}, _parent, _state);
        }
      });

      // Resolve the resolve function
      if (typeof _state.resolve == 'function') {
        var promise = _state.resolve();
        if (typeof promise.then == 'function') promise.then(function () {
          return changeState(_state, popped);
        });
      } else {
        changeState(_state, popped);
      }
      return this;
    },

    start: function start() {
      router.active = true;
      if (window.location.hash) {
        var _state = findStateByUrl(window.location.hash.replace('#!/', ''));
        if (_state) router.go(_state.name);
      }
      window.addEventListener('popstate', handlePop);
      router.trigger('start');
      return this;
    },

    stop: function stop() {
      router.active = false;
      window.removeEventListener('popstate', handlePop);
      router.trigger('stop');
      return this;
    },

    current: undefined,
    active: false
  };

  function findStateByName(name) {
    return _states.find(function (state) {
      return state.name == name;
    });
  }

  function findStateByUrl(url) {
    return _states.find(function (state) {
      return state.url == url;
    });
  }

  function handlePop(e) {
    if (e.state) router.go(e.state, true);
  }

  function changeState(state, popped) {
    // If supported
    if (typeof history.pushState != 'undefined' && state.history != false) {
      // New state
      if (!history.state || history.state.name != state.name && !popped) {
        var url = state.hasOwnProperty('url') ? "#!/" + state.url : null;
        history.pushState(state.name, null, url);
      }
    }
    var prevState = router.current;
    router.current = state;
    router.trigger('go', state, prevState);
  }

  riot.observable(router);
  riot.mixin('rg.router', {
    init: function init() {
      var _this = this;

      this.router.on('go', function () {
        return _this.update();
      });
    },
    router: router
  });

  if (!window.rg) window.rg = {};
  window.rg.router = router;
})();
