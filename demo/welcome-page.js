riot.tag2('welcome-page', '<div if="{router.current.name == \'welcome\'}"> <h1>Welcome</h1> <button onclick="{back}">Go Home</button> <button onclick="{unknown}">Go to unknown state</button> </div>', '', '', function(opts) {
var _this = this;

this.mixin('rg.router');

this.back = function (stateName) {
	_this.router.go('home');
};

this.unknown = function (stateName) {
	_this.router.go('unknown');
};
}, '{ }');
