/*

Evolutionary Algorithm modules, and supporting packages

2017 Christopher Polito v1.0

Implemented in a Frontend Angular web application, the Events and React Modules come in handy with respect to the web
application but are not related to the evolutionary algorithm, including them simply reduces dependency requirements

*/


(function (window) {



	/*

	
	Events and React modules are supporting packages and are not related to evolutionary algorithm
	

	*/

	
	var events = function () {


		var self = this;

		var events = {};

		// runs a saved simple callback
		self.dispatch = function (name) {

			var result;

			try {

				return self.events[name]();
			}
			catch (e) {

				return false;
			}

		}

		// saves a simple callback
		self.on = function (name, _event) {

			self.events[name] = _event;

		}

	}



	var react = function () {


		var self = this;


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


		self.subscribe = function (input) {

			if (r(input.name)) {
				saves[input.name].subscribe(input.callback);
			}
			else {
				saves[input.name] = new obs(input);
				saves[input.name].subscribe(input.callback);
				names[names.length] = input.name;
			}

		}

		self.push = function (input) {

			if (r(input.name)) {
				saves[input.name].setState(input.state);
			}
			else {
				console.log("no name at push (" + input.name + ")");
			}
		}

	}



	/*

	
	Evolutionary Algorithm modules begin here: Individual, Generation, and main Evolve module


	*/


	var individual = function (params) {
			
		var self = this;

		var pname = states.split();

		console.log(pname.program, "create organism");
		var pdata = data.get(pname.program);
		var program = programs.get(pdata.name);

		var i = 0;

		self.total = pdata.genome;
		self.dna = [];
		self.runs = [];
		self.fitness = 0;
		self.generation = params.gen;
		self.index;
		self.parents = [];
		var input = params.input;

		if (params && params.dna) {
			self.dna = params.dna;
			self.parents = params.parents;
		}
		else {
			i = 0;
			while (i < self.total) {
				self.dna[i] = program.gene();
				i++;
			}
		}

		var mutate = function (dna) {

			var i = 0;
			while (i < self.total) {
				if (Math.random() < 0.02) {
					dna[i] = program.gene();
				}
				i++;
			}

			return dna;

		}

		var createChild = function (dna, parents) {

			//console.log("create child");

			var child = {};

			var mIndex = Math.floor(Math.random()*parents.length);

			source = parents[mIndex].dna;

			if (dna.length < self.total) {
				dna  = dna.concat(source.slice(dna.length - 1, self.total-1));
			}
			else if (dna.length > self.total) {
				dna.splice(self.total-1, dna.length - self.total);
			}

			if (dna.length == self.total) {

				child = new individual({
					gen:self.generation + 1, 
					parents:parents, 
					dna:mutate(dna), 
					input:input
				});
			}
			else {
				console.log("wrong length");
			}

			return child;

		}

		var crossover = function (parents) {

			//console.log("crossover", parents.length);

			var dna = [];
			var mates = [];

			for (var k = 0; k < parents.length; k++) {
				dna[k] = [];
			}

			for (var k = 0; k < parents.length; k++) {
				mates[k] = k;
			}

			var c_num = Math.floor(Math.random()*10) + 2;
			var c_len = Math.floor(self.total/c_num);
			var i = 0;
			var j = 0;
			var dna_i = 0;

			while (i < c_num) {

				shuffle(mates);

				while (j < c_len) {

					dna_i = i*c_len + j;

					for (k in dna) {
						dna[k][dna_i] = parents[mates[k]].dna[dna_i];
					}

					j++;
				}

				i++;
				j = 0;

			}

			return dna;

		}

		self.reproduce = function (mates) {

			//console.log(mates)

			mates.push(self);

			//console.log("reproduce", parents);

			var dna = crossover(mates);

			var offspring = [];

			for (var i = 0; i < mates.length; i++) {
				offspring.push(createChild(dna[i], mates));
			}

			//console.log("offspring", offspring.length);

			return offspring;
		}

		self.run = function (complete) {

			//console.log("run org", self.index);

			program.run({
				gen:self.generation, 
				index:self.index, 
				input:input, 
				dna:self.dna
			}, function (x) {

				self.runs = x.runs;
				self.fitness = x.avg;
				self.success = x.success;

				complete();
			});
		}

	}


	var generation = function (params) {
			
		var self = this;

		var i = 0;
		var input = params.input;
		var task = input.goal;
		self.total = input.pop;
		self.pop = [];
		self.index = 1;
		
		if (params && params.pop) {
			//console.log("input generation", self.index, "pop", input.pop.length);
			self.pop = params.pop;
			self.total = params.pop.length;
			self.index = params.index;
		}
		else {
			i = 0;
			while (i < self.total) {
				self.pop[i] = new individual({gen:self.index, input:input});
				i++;
			}
		}

		i = 0;
		while (i < self.total) {
			self.pop[i].index = i;
			//self.pop[i].print();
			i++;
		}

		var runPop = function (complete) {

			var indi = 0;
			var running = true;

			console.log("run population");

			var runtimer = setInterval(function () {

				if (running) {

					running = false;

					// console.log("self.pop", self.pop, org);

					self.pop[org].run(function () {

						indi++;

						if (indi < self.total) {
							running = true;
						}
						else {
							clearInterval(runtimer);
							runtimer = {};
							runtimer = null;

							complete();
						}
					});
					
				}

			}, 10);
			
		}

		var rank = function () {

			self.pop.sort(function (a,b) {
				return (task == "min" ? a.fitness - b.fitness : b.fitness - a.fitness);
			});

			self.pop.forEach(function (value, index, array) {

				value.index = index;
			});

			//console.log(self.pop[0].fitness);
			//console.log(self.pop[self.total-1].fitness);

			return {
				best:self.pop[0],
				worst:self.pop[self.total-1]
			}
		}

		var getIndex = function (factor) {
			return Math.floor(Math.random()*self.total*factor);
		}

		var indexExists = function (index, array) {

			for (i in array) {

				if (index == array[i]) {
					return true;
				}
			}

			return false;
		}

		var getPIndex = function (pIndex, standard) {

			var index;

			do {
				index = getIndex(standard);
			} while (indexExists(index, pIndex));

			pIndex.push(index);

			return pIndex;

		}

		var select = function (num_parents) {

			var standard = self.total > 10 ? 0.2 : 0.5;

			var pIndex = [];
			var parents = [];

			for (var i = 0; i < num_parents; i++) {
				pIndex = getPIndex(pIndex, standard);
				parents.push(self.pop[last(pIndex)]);
			}

			return parents
		}

		var reproduce = function (num_parents) {

			var parents = [];
			var mates = [];
			var children = [];
			var offspring = [];

			
			// var num_parents = Math.min(_parents, Math.floor(self.total*standard/5));

			// var i = 0;
			// var more = true;
			while (children.length < self.total) {

				parents = select(num_parents);

				offspring = parents[0].reproduce([parents[1]]);
				children = children.concat(offspring);

			}

			children = children.slice(0, self.total);

			console.log("total children", children.length);

			return children;
		}

		self.turnover = function (complete) {

			console.log("turnover", self.index);

			runPop(function () {

				var ext = rank();

				console.log("push evdata");

				react.push({
					name:"ev." + input.name,
					state:{
						index:self.index,
						best:ext.best,
						worst:ext.worst
					}
				});

				var num_parents = 2;
				var children = reproduce(num_parents);

				complete({
					next:new generation({index:self.index + 1, input:input, pop:children})
				});

			});

		}
		
	}


	var evolveModule = function () {

		var self = this;


		var era = [];
		var now = 0;
		var input;
		
		this.step = function () {

			console.log(" ");
			console.log("evolve", now);

			era[now].turnover(function (x) {

				now++;

				era[now] = x.next;

				if (now < input.gens) {
					setTimeout(function () {
						self.step();
					}, input.evdelay);
				}
				else {
					//console.log("call complete", input.name);
					events.dispatch("evolve."+input.name+".complete");
				}

			});

		}

		this.set = function (_input) {

			input = _input;
		}

		this.initialize = function (_input) {

			console.log("initialize evolve");

			self.set(_input);

			now = 0;

			era.length = 0;
			era = null;
			era = [];

			era[0] = new generation({index:1, input:input});
		}

		this.run = function (_input) {

			console.log("run evolve");

			if (_input.goal != input.goal || _input.pop != input.pop) {
				console.log("restart evolve");
				self.initialize(_input);
				self.run(_input);
			}
			else {
				self.set(_input);
				self.step();
			}
		}

	}


	window.evolve = {
		module:evolveModule
	}




})(window);