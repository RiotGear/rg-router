<about-page>

	<div if={ router.current.name.startsWith('about') }>
		<h1>About</h1>

		<button onclick={ back }>History Back</button>

		<button onclick={ showMore }>More...</button>

		<h2 if={ router.current.name == 'about.more' }>More info</h2>
	</div>

	<script>
		this.mixin('rg.router')

		this.router.add({
			name: 'about.more'
		})

		this.back = stateName => {
			history.back()
		}

		this.more = false
		this.showMore = () => {
			this.router.go('about.more')
		}
	</script>

</about-page>
