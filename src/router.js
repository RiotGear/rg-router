;
(() => {
  let _states = []
  let findStateByName = name => _states.find(state => {
    if (state.name == name) return state
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
      const _state = findStateByName(name)
      if (!_state) {
        throw `State '${name}' has not been configured`
        return
      }

      // TODO: Resolve the resolve function

      // If supported
      if (typeof history.pushState != 'undefined') {
        // New state
        if (!history.state || (history.state.name != _state.name && !popped)) {
          const url = _state.url ? `#/${_state.url}` : null
          history.pushState(_state, null, url)
        }
      }

      router.current = _state
      router.trigger('go', _state)
    },

    start: () => {
      // TODO: Onload: check states for the matching URL and call go() with the matching state name

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
  router.start()
})()
