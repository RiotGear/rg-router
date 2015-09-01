;
(() => {
  let _states = []
  let findStateByName = name => _states.find(state => {
    if (state.name == name) return state
  })
  let findStateByUrl = url => _states.find(state => {
    if (state.url == url) return state
  })
  let handlePop = e => {
    if (e.state) router.go(e.state.name, true)
  }

  const router = {
    add: (state) => {
      if (!state || !state.name) {
        throw 'Please specify a state name'
        return
      }
      let _state = findStateByName(state)
      if (_state) _state = state
      else _states.push(state)
      router.trigger('add')
    },

    remove: name => {
      let _state = undefined
      _states = _states.filter(state => {
        if (state.name != name) return state
        else _state = state
      })
      router.trigger('remove', _state)
    },

    go: (name, popped) => {
      if (!router.active || !name) return
        // Match the state in the list of states, if no state available throw error
      let _state = findStateByName(name)
      if (!_state) {
        throw `State '${name}' has not been configured`
        return
      }

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
          _state = Object.assign({}, _state, _parent)
        }
      })

      // If supported
      if (typeof history.pushState != 'undefined' && _state.history != false) {
        // New state
        if (!history.state || (history.state.name != _state.name && !popped)) {
          const url = _state.url ? `#/${_state.url}` : null
          history.pushState(_state, null, url)
        }
      }

      // TODO: Resolve the resolve function

      router.current = _state
      router.trigger('go', _state)
    },

    start: () => {
      if (window.location.hash) {
        const _state = findStateByUrl(window.location.hash.replace('#/', ''))
        if (_state) router.go(_state.name)
      }
      window.addEventListener('popstate', handlePop)
      router.active = true
      router.trigger('start')
    },

    stop: () => {
      window.addEventListener('popstate', handlePop)
      router.active = false
      router.trigger('stop')
    },

    current: undefined,
    active: true
  }

  riot.observable(router)
  riot.mixin('rg.router', {
    init: function() {
      this.router.on('go', this.update)
    },
    router
  })

  if (!window.rg) window.rg = {}
  window.rg.router = router
})()
