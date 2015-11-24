riot.tag2('demo-app', '<button onclick="{startRouter}">Start</button> <button onclick="{stopRouter}">Stop</button> <button onclick="{usePushState}">Use PushState</button> <button onclick="{useLocationHash}">Use Location Hash</button> <hr> <pre><code>{JSON.stringify(router.current, null, 2)}</code></pre> <hr> <button onclick="{goHome}">Go Home</button> <button onclick="{goUnknown}">Unknown State</button> <button onclick="{goWelcome}">Welcome</button> <button onclick="{goAbout}">About</button> <button onclick="{goChild}">Child State</button> <button onclick="{goResolve}">Resolve</button> <button onclick="{goTemplateUrl}">Template Url</button> <button onclick="{goTemplateUrlWithId}">Template Url with Id</button>', '', '', function(opts) {
var _this = this;

this.mixin('rg.router');

this.router.add({
	name: 'home',
	url: ''
}).add({
	name: 'template',
	url: 'template/:collection/:id/:action'
}).add({
	name: 'template.child',
	title: 'Template Child'
}).add({
	name: 'page',
	url: 'page/:page',
	data: {
		a: 1
	}
}).add({
	name: 'page.child',
	subtitle: 'child state',
	moredata: {
		b: 2
	}
}).add({
	name: 'resolve',
	url: 'resolve/promise',
	message: 'Promise example',
	resolve: function resolve() {
		return new Promise(function (resolve) {
			window.setTimeout(resolve, 2000);
		});
	}
});

this.goHome = function (stateName) {
	return _this.router.go('home');
};
this.goUnknown = function (stateName) {
	return _this.router.go('unknown');
};

this.goWelcome = function () {
	return _this.router.go('page', { page: 'welcome', title: 'Welcome' });
};

this.goAbout = function () {
	return _this.router.go('page', { page: 'about', title: 'About Us' });
};
this.goChild = function () {
	return _this.router.go('page.child');
};
this.goResolve = function () {
	return _this.router.go('resolve');
};

this.goTemplateUrl = function () {
	return _this.router.go('template', { collection: 'biscuits' });
};
this.goTemplateUrlWithId = function () {
	return _this.router.go('template', {
		collection: 'biscuits',
		id: '470129',
		action: 'edit',
		whatever: 'youwant'
	});
};
this.goTemplateChild = function () {
	return _this.router.go('template.child');
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
