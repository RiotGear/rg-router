<demo-app>

	<button onclick="{ goWelcome }">Welcome</button>
	<button onclick="{ goAbout }">About</button>

	<script>
		this.mixin('rg.router')

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

		this.goWelcome = stateName => {
			this.router.go('welcome')
		}

		this.goAbout = stateName => {
			this.router.go('about')
		}

		this.startRouter = () => this.router.start()
		this.stopRouter = () => this.router.stop()

		console.log(this.router.current)
	</script>

</demo-app>
