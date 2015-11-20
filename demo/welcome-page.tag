<welcome-page>

	<div if={ router.current.name == 'page' && router.current.params.page == 'welcome' }>
		<h1>Welcome</h1>
		<button onclick={ back }>Go Home</button>
		<button onclick={ unknown }>Go to unknown state</button>
	</div>

	<script>
		this.mixin('rg.router')

		this.back = stateName => {
			this.router.go('home')
		}

		this.unknown = stateName => {
			this.router.go('unknown')
		}
	</script>

</welcome-page>
