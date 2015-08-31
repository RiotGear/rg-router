<demo-app>

	<h1>{ router.current.name }</h1>

	<button onclick="{ goWelcome }">Welcome</button>
	<button onclick="{ goAbout }">About</button>
	<!--button onclick={ router.go('about') }>About</button>
	<button onclick={ router.go('terms') }>Terms</button>
	<button onclick={ router.go('contact') }>Contact</button-->

	<script>
		this.mixin('rg.router')

		this.router.on('go', state => {
			console.log(state)
			this.update()
		})

		this.router.add({
			name: 'welcome',
			opts: {
				a: 1
			}
		})
		this.router.add({
			name: 'about',
			url: 'about',
			opts: {
				z: 26
			}
		})
		this.router.add({ name: 'contact' })
		this.router.remove('home')
		this.router.remove('contact')
		this.router.remove('home')
		this.router.add({ name: 'terms' })

		this.goWelcome = stateName => {
			this.router.go('welcome')
		}

		this.goAbout = stateName => {
			this.router.go('about')
		}

		console.log(this.router.current)
	</script>

</demo-app>
