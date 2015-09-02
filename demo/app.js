riot.tag('demo-app', '<button onclick="{ goWelcome }">Welcome</button> <button onclick="{ goAbout }">About</button> <button onclick="{ startRouter }">Start</button> <button onclick="{ stopRouter }">Stop</button>', function(opts) {var _this = this;

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
	title: 'About us'
});

this.goWelcome = function () {
	_this.router.go('welcome');
};

this.goAbout = function () {
	_this.router.go('about');
};

this.startRouter = function () {
	return _this.router.start();
};
this.stopRouter = function () {
	return _this.router.stop();
};

this.router.on('go', function (curr, prev) {
	return console.log(curr, prev);
});
this.router.on('start', function () {
	return console.log('started');
});
this.router.on('stop', function () {
	return console.log('stopped');
});
this.router.on('add', function (state) {
	return console.log('added', state);
});
this.router.on('remove', function (state) {
	return console.log('removed', state);
});
});
