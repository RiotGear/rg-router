<demo-app>

	<button onclick="{ startRouter }">Start</button>
	<button onclick="{ stopRouter }">Stop</button>
	<button onclick="{ usePushState }">Use PushState</button>
	<button onclick="{ useLocationHash }">Use Location Hash</button>
	<hr>
	<pre><code>{JSON.stringify(router.current, null, 2)}</code></pre>
	<hr>
	<button onclick="{ goHome }">Go Home</button>
	<button onclick="{ goUnknown }">Unknown State</button>
	<button onclick="{ goWelcome }">Welcome</button>
	<button onclick="{ goAbout }">About</button>
	<button onclick="{ goChild }">Child State</button>
	<button onclick="{ goResolve }">Resolve</button>
	<button onclick="{ goTemplateUrl }">Template Url</button>
	<button onclick="{ goTemplateUrlWithId }">Template Url with Id</button>

	<script>
		this.mixin('rg.router')

		this.router.add({
				name: 'home',
				url: ''
			})
			.add({
				name: 'template',
				url: 'template/:collection/:id/:action'
			})
			.add({
				name: 'template.child',
				title: 'Template Child'
			})
			.add({
				name: 'page',
				url: 'page/:page',
				data: {
					a: 1
				}
			})
			.add({
				name: 'page.child',
				subtitle: 'child state',
				moredata: {
					b: 2
				}
			})
			.add({
				name: 'resolve',
				url: 'resolve/promise',
				message: 'Promise example',
				resolve: () => new Promise(function (resolve) {
					window.setTimeout(resolve, 2000)
				})
			})

		this.goHome = stateName => this.router.go('home')
		this.goUnknown = stateName => this.router.go('unknown')

		this.goWelcome = () => this.router.go('page', { page: 'welcome', title: 'Welcome' })

		this.goAbout = () => this.router.go('page', { page: 'about', title: 'About Us' })
		this.goChild = () => this.router.go('page.child')
		this.goResolve = () => this.router.go('resolve')

		this.goTemplateUrl = () => this.router.go('template', { collection: 'biscuits' })
		this.goTemplateUrlWithId = () => this.router.go('template', {
			collection: 'biscuits',
			id: '470129',
			action: 'edit',
			whatever: 'youwant'
		})
		this.goTemplateChild = () => this.router.go('template.child')

		this.startRouter = () => this.router.start()
		this.stopRouter = () => this.router.stop()
		this.usePushState = () => this.router.hash = ''
		this.useLocationHash = () => this.router.hash = '#!'

		this.router.on('start', () => console.log('started'))
		this.router.on('stop', () => console.log('stopped'))
		this.router.on('add', state => console.log('added', state))
		this.router.on('remove', state => console.log('removed', state))
		this.router.on('go', (curr, prev) => console.log(curr, prev))
	</script>

</demo-app>
