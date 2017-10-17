

(function (window) {

	
	var saves = {};
	var names = [];

	var r = function (name) {

		for (i in names) {

			if (name == names[i]) {

				return true;
			}
		}

		return false;
	}

	var obs = function (input) {


		var self = this;
		var o = [];
		self.name = input.name || "";
		self.state = input.state || null;
		var subs = [];

		console.log(self.name, "observable")

		var notify = function () {

			//console.log(self.name, "notify");

			for (i in subs) {
				subs[i](self.state);
			}
		}

		self.subscribe = function (callback) {

			//console.log(self.name, "subscribe");

			subs.push(callback);

			//notify();
		}

		self.setState = function (state) {

			//console.log(self.name, "set state", state);

			self.state = state;

			notify();
		}

	}

	var observable = function (input) {

		if (!r(input.name)) {
			saves[input.name] = new obs(input);
			names[names.length] = input.name;
		}
		else {
			saves[input.name].setState(input.state);
		}
	}

	var subscribe = function (input) {

		if (r(input.name)) {
			saves[input.name].subscribe(input.callback);
		}
		else {
			saves[input.name] = new obs(input);
			saves[input.name].subscribe(input.callback);
			names[names.length] = input.name;
		}

	}

	var push = function (input) {

		if (r(input.name)) {
			saves[input.name].setState(input.state);
		}
		else {
			console.log("no name at push (" + input.name + ")");
		}
	}

	window.mcreact = {
		observable:observable,
		subscribe:subscribe,
		push:push
	}



})(window)