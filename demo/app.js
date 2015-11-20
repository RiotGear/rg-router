riot.tag2('demo-app', '<button onclick="{goWelcome}">Welcome</button> <button onclick="{goAbout}">About</button> <button onclick="{startRouter}">Start</button> <button onclick="{stopRouter}">Stop</button> <button onclick="{goTemplateUrl}">Template Url</button> <button onclick="{goTemplateUrlWithId}">Template Url with Id</button> <button onclick="{usePushState}">Use pushState</button> <button onclick="{useLocationHash}">Use location hash</button>', '', '', function(opts) {
var _this = this;

this.mixin('rg.router');

this.router.add({
	name: 'home',
	url: ''
}).add({
	name: 'about.template',
	url: '/about/:collection/:id/:action'
}).add({
	name: 'page',
	url: 'page/:page',
	opts: {
		a: 1
	}
});

this.goWelcome = function () {
	return _this.router.go('page', { page: 'welcome', title: 'Welcome' });
};
this.goAbout = function () {
	return _this.router.go('page', { page: 'about', title: 'About Us' });
};
this.goTemplateUrl = function () {
	return _this.router.go('about.template', { collection: 'biscuits' });
};
this.goTemplateUrlWithId = function () {
	return _this.router.go('about.template', { collection: 'biscuits', id: '470129', action: 'edit', whatever: 'youwant' });
};

this.startRouter = function () {
	return _this.router.start();
};
this.stopRouter = function () {
	return _this.router.stop();
};
this.usePushState = function () {
	return _this.router.hash = '';
};
this.useLocationHash = function () {
	return _this.router.hash = '#!';
};

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
this.router.on('go', function (curr, prev) {
	return console.log(curr, prev);
});
}, '{ }');
