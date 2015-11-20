<demo-app>

	<button onclick="{ goWelcome }">Welcome</button>
	<button onclick="{ goAbout }">About</button>
	<button onclick="{ startRouter }">Start</button>
	<button onclick="{ stopRouter }">Stop</button>
	<button onclick="{ goTemplateUrl }">Template Url</button>
	<button onclick="{ goTemplateUrlWithId }">Template Url with Id</button>
	<button onclick="{ usePushState }">Use pushState</button>
	<button onclick="{ useLocationHash }">Use location hash</button>

	<script>
		this.mixin('rg.router')

		this.router.add({
			name: 'home',
			url: ''
		})
		.add({
			name: 'about.template',
			url: '/about/:collection/:id/:action'
		})
		.add({
			name: 'page',
			url: 'page/:page',
			opts: {
				a: 1
			}
		})

		this.goWelcome = () => this.router.go('page', { page: 'welcome', title: 'Welcome' })
		this.goAbout = () => this.router.go('page', { page: 'about', title: 'About Us' })
		this.goTemplateUrl = () => this.router.go('about.template', { collection: 'biscuits' })
		this.goTemplateUrlWithId = () => this.router.go('about.template', { collection: 'biscuits', id: '470129', action: 'edit', whatever: 'youwant' })

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
