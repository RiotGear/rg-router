riot.tag('demo-app', '<button onclick="{ goWelcome }">Welcome</button> <button onclick="{ goAbout }">About</button>', function(opts) {var _this = this;

this.mixin('rg.router');

this.router.add({
	name: 'welcome',
	url: 'welcome',
	opts: {
		a: 1
	}
});
this.router.add({
	name: 'about',
	url: 'about',
	opts: {
		title: 'About us'
	}
});

this.goWelcome = function (stateName) {
	_this.router.go('welcome');
};

this.goAbout = function (stateName) {
	_this.router.go('about');
};

this.startRouter = function () {
	return _this.router.start();
};
this.stopRouter = function () {
	return _this.router.stop();
};

console.log(this.router.current);
});
