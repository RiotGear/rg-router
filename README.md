## In development!
### TODO

- Read the URL **Onload** and fire `go` with the state name
- Call the **resolve** function and resolve it before calling `go`
- Handle **URL parameters**

## Install

```
npm install riotgear-router --save
```

Include the router in any tag you want to access the router from by mixin it in like so:

```javascript
this.mixin('rg.router')
```


## API

After adding the router your tag will have access to the `router` via `this.router`.


### `.add()`

You can add states at any point in time, on mount, on update, on click, on resolve of a promise...whenever.

```javascript
this.router.add({
  name: 'about',
  url: '/about',
  resolve: () => new Promise(function (resolve, reject) {
    // ...
  })
})
```
- `name` is required, is the name of the state and the identifier to use when calling [go()](#go)
- `url` is optional. It will update the browser URL on state change
- `resolve` is optional. The router will wait for `.then()` on the resolve function before going to the next state

If you do not specify a `url` the browser back and forward buttons will still work.

States names need to be unique. You can add a state with the same name but it will overwrite the state stored by the router.

You can add whatever you want to a state and get access to it via `this.rounter.current` from within your tag.

### `.remove()`

```javascript
this.router.remove('about')
```
Just as with adding, you can remove states whenever you want in the lifecycle of your application.


### `.go()`

```javascript
this.router.go('about')
```
Call `go()` if you want to change state. Calling go will update the current state, and if a URL is specified will update the URL on the browser.

If you specify a state name that doesn't exist the router will throw you an error.

### `.stop()`

```javascript
this.router.stop()
```
If you want to stop the router and switch to use a different one this function will remove the event listeners and set `active` to false.

### `.start()`

```javascript
this.router.start()
```
If you've stopped the router and you want to restart it.

### `.current`

```javascript
this.router.current
```
Current state the router is in. This will contain everything specified on the state as part of the `add()` function.

### `.active`

```javascript
this.router.active
```
Check to see if the router is running or whether it has been stopped. The router starts automatically.

### `.on('add remove go start stop')`

```javascript
this.router.on('go', state = > console.log(state))
```
The router is an observable and will trigger an event for each of the above API calls.
