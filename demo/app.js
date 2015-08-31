riot.tag('demo-app', '<h1>{ router.current.name }</h1> <button onclick="{ goWelcome }">Welcome</button> <button onclick="{ goAbout }">About</button> ', function(opts) {var _this = this;

this.mixin('rg.router');

this.router.on('go', function (state) {
	console.log(state);
	_this.update();
});

this.router.add({
	name: 'welcome',
	opts: {
		a: 1
	}
});
this.router.add({
	name: 'about',
	url: 'about',
	opts: {
		z: 26
	}
});
this.router.add({ name: 'contact' });
this.router.remove('home');
this.router.remove('contact');
this.router.remove('home');
this.router.add({ name: 'terms' });

this.goWelcome = function (stateName) {
	_this.router.go('welcome');
};

this.goAbout = function (stateName) {
	_this.router.go('about');
};

console.log(this.router.current);
});
