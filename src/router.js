;
(() => {
  // Polyfills
  Array.prototype.find = Array.prototype.find || (Array.prototype.find = function(r) {
    if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
    if ("function" != typeof r) throw new TypeError("predicate must be a function");
    for (var t, n = Object(this), e = n.length >>> 0, o = arguments[1], i = 0; e > i; i++)
      if (t = n[i], r.call(o, t, i, n)) return t;
    return void 0
  });

  let _states = []

  const router = {
    hash: '#!',
    add(state) {
        if (!state || !state.name) {
          throw 'Please specify a state name'
          return
        }
        let _state = findStateByName(state)
        if (_state) _state = state
        else {
          if (state.url && state.url[0] == '/') state.url = state.url.substr(1)
          _states.push(state)
        }
        router.trigger('add', _state)
        return this
      },

      remove(name) {
        let _state = undefined
        _states = _states.filter(state => {
          if (state.name != name) return state
          else _state = state
        })
        router.trigger('remove', _state)
        return this
      },

      go(name, params, popped) {
        if (!router.active || !name) return
          // Match the state in the list of states, if no state available throw error
        let _state = findStateByName(name)
        if (!_state) {
          throw `State '${name}' has not been configured`
          return
        }
        if (params) _state.params = params

        // Merge the state options with the parent states
        let names = name.split('.') // ["about", "more", "all"]
        names = names.map((name, i) => {
          if (i > 0) {
            return names.slice(0, i).join('.') + '.' + name
          } else {
            return name
          }
        })
        names.forEach((name, i) => {
          if (i < names.length) {
            const _parent = findStateByName(name)
            _state = Object.assign({}, _parent, _state)
          }
        })

        // Resolve the resolve function
        if (typeof _state.resolve == 'function') {
          let promise = _state.resolve()
          if (typeof promise.then == 'function')
            promise.then(() => changeState(_state, popped))
        } else {
          changeState(_state, popped)
        }
        return this
      },

      start() {
        router.active = true
        if (window.location.hash) {
          const _state = findStateByUrl(window.location.hash.replace(`${router.hash}/`, ''))
          if (_state) router.go(_state.name)
        } else if (router.hash === '') { // we are using pushState
          var _state = findStateByUrl(window.location.pathname.slice(1));
          if (_state) router.go(_state.name);
        }
        window.addEventListener('popstate', handlePop)
        router.trigger('start')
        return this
      },

      stop() {
        router.active = false
        window.removeEventListener('popstate', handlePop)
        router.trigger('stop')
        return this
      },

      current: undefined,
      active: false
  }

  function findStateByName(name) {
    return _states.find(state => state.name == name)
  }

  function findStateByUrl(url) {
    // Search states based on url pattern
    const state = _states.find(state => state.url == url)
    if (state) return state

    return _states.find(state => {
      if (!state.url) return false
      // e.g. /:collection/:id/:action
      const templateParams = state.url.split('/')
      const urlParams = url.split('/')
      state.params = state.params || {}
      for (var i = 0; i < templateParams.length; i++) {
        const sp = templateParams[i]
        const up = urlParams[i]
        if (sp[0] == ':') {
          state.params[sp.substr(1)] = up
        } else if (sp != up) {
          return false
        }
      }
      return true
    })
  }

  function handlePop(e) {
    if (e.state) router.go(e.state.name, e.state.params, true)
  }

  function changeState(state, popped) {
    // If supported
    if (typeof history.pushState != 'undefined' && state.history != false) {
      // New state
      if (!history.state || !popped) {
        history.pushState(state, null, buildURL(state))
      }
    }
    const prevState = router.current
    router.current = state
    router.trigger('go', state, prevState)
  }

  function buildURL(state) {
    if (state.params) {
      const template = state.url.split('/')
      const url = template.map(function (param) {
        if (param[0] != ':') return param
        return state.params[param.substr(1)]
      }).filter(seg => seg ? true : false).join('/')
      return `${router.hash}/${url}`
    }
    return state.hasOwnProperty('url') ? `${router.hash}/${state.url}` : null
  }

  riot.observable(router)
  riot.mixin('rg.router', {
    init: function() {
      this.router.on('go', () => this.update())
    },
    router
  })

  if (!window.rg) window.rg = {}
  window.rg.router = router
})()
