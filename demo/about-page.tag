<about-page>

	<div if={ router.current.name.startsWith('about') }>
		<h1>{ router.current.title }</h1>
		<h3>{ subtitle }</h3>

		<button onclick={ back }>History Back</button>

		<button onclick={ showMore }>More...</button>

		<h2 if={ router.current.name == 'about.more' }>More info</h2>
	</div>

	<script>
		this.mixin('rg.router')

		this.subtitle = opts.subtitle

		this.router.add({
			name: 'about.more',
			opts: {
				subtitle: 'Even more about us'
			}
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
