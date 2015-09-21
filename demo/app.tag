<demo-app>

	<button onclick="{ goWelcome }">Welcome</button>
	<button onclick="{ goAbout }">About</button>
	<button onclick="{ startRouter }">Start</button>
	<button onclick="{ stopRouter }">Stop</button>
	<button onclick="{ goTemplateUrl }">Template Url</button>
	<button onclick="{ goTemplateUrlWithId }">Template Url with Id</button>

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
			name: 'welcome',
			url: 'welcome',
			opts: {
				a: 1
			}
		})
		.add({
			name: 'about',
			url: 'about',
			title: 'About us'
		})

		this.goWelcome = () => this.router.go('welcome')
		this.goAbout = () => this.router.go('about')
		this.goTemplateUrl = () => this.router.go('about.template', { collection: 'biscuits' })
		this.goTemplateUrlWithId = () => this.router.go('about.template', { collection: 'biscuits', id: '470129', action: 'edit', whatever: 'youwant' })

		this.startRouter = () => this.router.start()
		this.stopRouter = () => this.router.stop()

		this.router.on('start', () => console.log('started'))
		this.router.on('stop', () => console.log('stopped'))
		this.router.on('add', state => console.log('added', state))
		this.router.on('remove', state => console.log('removed', state))
		this.router.on('go', (curr, prev) => console.log(curr, prev))
	</script>

</demo-app>
