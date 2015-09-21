## rgRouter

<img src="https://raw.githubusercontent.com/RiotGear/rg-router/master/demo/img/icon.png" width="180px" />

RiotGear Router provides Riot apps with state based routes and URL management via the HTML History API.

## Install

```
npm install riotgear-router --save
```

Include the router in any tag you want to access the router from by "mixin" it in like so:

```javascript
this.mixin('rg.router')
```

Once you are happy to start the router call the [start()](#start) function from either a tag:

```javascript
this.router.start()
```

or via the `rg` object:

```javascript
rg.router.start()
```

 **The router does not start automatically.**

## API

After adding the router your tag will have access to the `router` via `this.router`.

### Fluent API Interface

If you want you can chain function calls together. For example:

```javascript
rg.router.add().start().go()
```

### To #! or to not #!

By default the router uses `#!`, however you can change this easily by setting `rg.router.hash` to some other value.

### `.add()`

You can add states at any point in time, on mount, on update, on click, on resolve of a promise...whenever.

```javascript
this.router.add({
  name: 'about',
  url: '/about',
  history: false,
  resolve: () => new Promise(function (resolve, reject) {
    window.setTimeout(resolve, 2000)
  })
})
```
- `name` is required, is the name of the state and the identifier to use when calling [go()](#go)
- `url` is optional. It will update the browser URL on state change
- `history` is optional. Set it to `false` to prevent the state from being added to your browser history
- `resolve` is optional. The router will wait for `.then()` on the resolve function before going to the next state

If you do not specify a `url` the browser back and forward buttons will still work.

States names need to be unique. You can add a state with the same name but it will overwrite the state stored by the router.

### `/:state/:parameters`

You can use template patterns like this:

```javascript
rg.router.add({
  name: 'rest',
  url: '/:collection/:id/:action'
})
```

When the router starts it matches the URL with a state.

`/users/470129/edit` will match against `'/:collection/:id/:action'`

If successful the router will create a `params` object on the state and copy the values across which you can gain access to via the `go` event.

e.g.

```javascript
this.router.on('go', state = > {
  state.params.collection // users
  state.params.id         // 470129
  state.params.edit       // edit
})
```

The template can be anything you'd like, for instance `/about/:page` or `/alerts/:type/viewable`.

A parameter is prefixed with `:`.

When you call `go()` you can pass the state a params object that the router uses to construct the URL.

### `inherit.state.data`

You can add whatever you want to a state and get access to it via `this.router.current` from within your tag, for example:

```javascript
this.router.add({
  name: 'about',
  title: 'About our website' // this.router.current.title
})
```

You can also inherit the data from parent states by using dot notation in the state name:

```javascript
this.router.add({
  name: 'about.people'
})
```

When you go to `about.people` you will still have the title value available via `this.router.current.title` that was set on the `about` state.

The `history` option is also inherited so if you want a child state to be part of the browser history reset it to true.

Beware that the `resolve` function is also inherited. So if you navigate to a state whose parent is set to wait for a promise to resolve then the child will wait too. You can overwrite this by setting resolve to null on the child.

### `.remove()`

```javascript
this.router.remove('about')
```
Just as with adding, you can remove states whenever you want in the lifecycle of your application.


### `.go()`

```javascript
this.router.go('users', params)
```
Call `go()` if you want to change state. Calling go will update the current state, and if a URL is specified will update the URL on the browser.

If you specify a state name that doesn't exist the router will throw you an error.

The router will ignore attempts to go to the same state in succession.

**Calling `go()` will trigger an update on any tag the router is on via the mixin**

The router will update the URL based on the template URL on the state and the structure of the `params` object.

### `.stop()`

```javascript
this.router.stop()
```
If you want to stop the router and switch to use a different one this function will remove the event listeners and set `active` to false.

### `.start()`

```javascript
this.router.start()
```
On start the router will check the URL, match it with a state and call `go()`. **The router does not start automatically**. Refreshing the browser will only return you to a state that has a URL. URL-less states can't be refreshed.

### `.active`

```javascript
this.router.active
```
Check to see if the router is running or whether it has been stopped.

### `.current`

```javascript
this.router.current
```
Current state the router is in. This will contain everything specified on the state as part of the `add()` function.

### `.on('add remove go start stop')`

```javascript
this.router.on('add', state = > console.log(state))
this.router.on('remove', state = > console.log(state))
this.router.on('go', (current, previous) = > console.log(current, previous))
this.router.on('start')
this.router.on('stop')
```
The router is an observable and will trigger an event for each of the above API calls.
