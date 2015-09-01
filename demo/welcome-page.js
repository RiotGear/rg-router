riot.tag('welcome-page', '<div if="{ router.current.name == \'welcome\' }"> <h1>Welcome</h1> <button onclick="{ back }">Back</button> </div>', function(opts) {var _this = this;

this.mixin('rg.router');

this.back = function (stateName) {
	_this.router.go('home');
};
});
