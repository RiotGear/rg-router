<welcome-page>

	<div if={ router.current.name == 'welcome' }>
		<h1>Welcome</h1>
		<button onclick={ back }>Back (to unknown state)</button>
	</div>

	<script>
		this.mixin('rg.router')

		this.back = stateName => {
			this.router.go('home')
		}
	</script>

</welcome-page>
