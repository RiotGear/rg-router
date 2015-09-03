<demo-app>

	<button onclick="{ goWelcome }">Welcome</button>
	<button onclick="{ goAbout }">About</button>
	<button onclick="{ startRouter }">Start</button>
	<button onclick="{ stopRouter }">Stop</button>

	<script>
		this.mixin('rg.router')

		this.router.add({
			name: 'home',
			url: ''
		})
		this.router.add({
			name: 'welcome',
			url: 'welcome',
			opts: {
				a: 1
			}
		})
		this.router.add({
			name: 'about',
			url: 'about',
			title: 'About us'
		})

		this.goWelcome = () => {
			this.router.go('welcome')
		}

		this.goAbout = () => {
			this.router.go('about')
		}

		this.startRouter = () => this.router.start()
		this.stopRouter = () => this.router.stop()

		this.router.on('go', (curr, prev) => console.log(curr, prev))
		this.router.on('start', () => console.log('started'))
		this.router.on('stop', () => console.log('stopped'))
		this.router.on('add', state => console.log('added', state))
		this.router.on('remove', state => console.log('removed', state))
	</script>

</demo-app>
