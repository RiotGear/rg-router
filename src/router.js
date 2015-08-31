;
(() => {
  let _config = {}
  let _states = []
  let findStateByName = name => _states.find(state => {
    if (state.name == name) return state
  })

  const router = {
    config: config => _config = config,

    add: (state) => {
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
      if (!router.active) return
        // Match the state in the list of states, if no state available console.error
      const _state = findStateByName(name)
      if (!_state) {
        console.error(`State '${name}' has not been configured`)
        return
      }

      // TODO: Resolve the resolve function then
      // TODO: Update the URL if one was provided (HTML5 history API)
      if (typeof history.pushState != 'undefined' && !popped) {
        history.pushState(_state, null, `#/${_state.url || ''}`)
      }

      router.current = _state
      router.trigger('go', _state)
    },

    start: () => {
      // TODO: Check states for the matching URL and call go() with the matching state name

      window.addEventListener('popstate', e => router.go(e.state.name, true))
      router.active = true
      router.trigger('start')
    },

    stop: () => {
      window.removeEventListener('popstate', e => router.go(e.state.name, true))
      router.active = false
      router.trigger('stop')
    },

    current: undefined,
    active: true
  }

  riot.observable(router)
  riot.mixin('rg.router', {
    router
  })
  router.start()
})()
