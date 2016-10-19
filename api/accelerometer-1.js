

(function () {

	window.accel_util = function () {

		var self = this;

		var factor = {
			global:1,
			session:0.5
		};

		var axis = {
			i:1,
			j:1
		}

		self.x = "i";
		self.y = "j";

		self.setFactor = function (type, _factor) {

			factor[type] = Math.abs(_factor);
		}

		self.getFactor = function (type) {

			if (type) return Math.abs(factor[type])
			else return Math.abs(factor.global*factor.session)
		}

		self.setAxis = function (_axis, value) {

			axis[_axis] = value >= 0 ? 1 : -1;

			console.log("utility set axis", _axis, value);

		}

		self.getAxis = function (_axis) {

			return axis[_axis] >= 0 ? 1 : -1;
		}

	}

	window.vector = function (x,y,time) {

		var self = this;

		self.x = x;
		self.y = y;
		self.time = time;
		
		self.len = function () {
			return Math.sqrt(self.x*self.x + self.y*self.y);
		}
		
		self.add = function (v) {
			return new vector(self.x+v.x, self.y+v.y, self.time);
		}
		
		self.subtract = function(v) {
			return new vector(self.x-v.x, self.y-v.y, self.time);	
		}
		
		self.multiply = function (scalar) {
			return new vector(self.x*scalar, self.y*scalar, self.time);	
		}
		
		self.unit = function () {
			
			if (self.len() > 0) {
				return self.multiply(1/self.len());
			}
			else {
				return new vector(0,0,0);	
			}

		}

		self.set = function (v) {

			self.x = v.x;
			self.y = v.y;
			self.time = v.time;
		}
		
		self.printValues = function () {
			return "x: " + self.x + " y: " + self.y + " t: " + self.time;
		}

	}

	window.object = function (input) {

		var self = this;

		var createCircle = function (obj, params) {

			radius = obj.size;

			obj.style.position = "absolute";
			obj.style.width = obj.size + "px";
			obj.style.height = obj.size + "px";
			obj.style.borderRadius = obj.size/2 + "px";
			obj.style.backgroundColor = params.color;

		}

		var createSquare = function (obj, params) {

			radius = obj.size;

			obj.style.position = "absolute";
			obj.style.width = obj.size + "px";
			obj.style.height = obj.size + "px";
			obj.style.backgroundColor = params.color;

		}

		var createCross = function (obj, params) {

			obj.style.position = "absolute";
			obj.style.backgroundColor = "transparent";

			var vertical = document.createElement("div");
			var horizontal = document.createElement("div");

			vertical.style.position = "absolute";
			vertical.style.top = 0;
			vertical.style.left = "50%";
			vertical.style.width = "2px";
			vertical.style.height = "100%";
			vertical.style.backgroundColor = params.color;

			horizontal.style.position = "absolute";
			horizontal.style.top = "50%";
			horizontal.style.left = 0;
			horizontal.style.width = "100%";
			horizontal.style.height = "2px";
			horizontal.style.backgroundColor = params.color;



			obj.append(vertical);
			obj.append(horizontal);

		}

		var container = input.object;
		var arena = $(container).parent();
		var relPos = {x:0, y:0};
		
		self.params = input.params;

		self.position = {x:0, y:0};
		self.velocity = {x:0, y:0};
		self.acceleration = {x:0, y:0};

		self.size = {
			x:$(container).width(), 
			y:$(container).height()
		}

		self.bounds = {
			x:$(arena).width()/2 - self.size.x/2,
			y:$(arena).height()/2 - self.size.y/2
		}

		self.radius = self.size.x/2;

		self.setShape = function () {

			console.log("set object shape");

			switch (self.params.shape) {

				case "circle":
					createCircle(container, self.params);
				break;

				case "square":
					createSquare(container, self.params);
				break;

				case "cross":
					createCross(container, self.params);
				break;
			}

		}

		self.el = function () {

			return container;
		}

		self.setPosition = function (pos) {

			relPos = pos;
			
			self.position = {x:self.bounds.x + relPos.x, y:self.bounds.y + relPos.y};
			
			container.style.left = util.truncate(self.position.x,0) + "px";
			container.style.top = util.truncate(self.position.y,0) + "px";
			
		}

		self.setVelocity = function (vel) {
			self.velocity = vel;
		}

		self.setAcceleration = function (acc) {
			self.acceleration = acc;
		}

		self.screenPos = function () {

			return {
				x:$(self.el()).offset().left,
				y:$(self.el()).offset().top
			}
		}

		self.relativePos = function () {
			return relPos;
		}

		self.absolutePos = function () {

			var screenPos = self.screenPos();

			return {
				x:screenPos.x - self.bounds.x,
				y:screenPos.y - self.bounds.y
			}
		}

		self.hide = function () {

			self.setPosition(relPos);

			$(self.el()).hide();
		}

		self.show = function() {

			self.setPosition(relPos);

			$(self.el()).show();
		}

	}


	window.accelerometer = function (input) {

		var self = this;

		var name = input.name || "none";
		var obj = input.object;
		var p = input.params || {};

		var filterBucket = [];

		var factor = p.factor || 1;
		var xDir = p.xDir || 1;
		var yDir = p.yDir || 1;
		var threshold = factor*0.5;
		var mu = p.mu || 0.5;
		var damp = p.damp || 0.5;
		var interval = p.interval || 10;
		var filterSize = p.filterSize || 3;
		var gravity = p.gravity || true;
		var bounce = p.bounce || true;
		
		var unfiltered = new vector(0,0,0);
		var accel1 = new vector(0,0,0);
		var accel0 = new vector(0,0,0);
		var vel0 = new vector(0,0,0);
		var vel1 = new vector(0,0,0);
		var pos0 = new vector(0,0,0);
		var pos1 = new vector(0,0,0);
		var raw = {x:0, y:0};
		var startTime = 0;

		var timer;
		var running = false;

		var bounce = function () {
			
			var sideX = pos1.x/Math.abs(pos1.x);
			
			var minVel = 12*(Math.abs(accel1.y)+Math.abs(accel1.x));
			
			if (Math.abs(pos1.x) >= obj.bounds.x) {

				pos1.x	= sideX*obj.bounds.x;
				vel1.x = -(1-damp)*vel1.x;
				if ((Math.abs(vel1.x) < minVel && gravity) || !bounce) {
					vel1.x = 0;	
				}
			}
			
			var sideY = pos1.y/Math.abs(pos1.y);

			if (Math.abs(pos1.y) >= obj.bounds.y) {
				pos1.y	= sideY*obj.bounds.y;
				vel1.y = -(1-damp)*vel1.y;
				if ((Math.abs(vel1.y) < minVel && gravity) || !bounce) {
					vel1.y = 0;
				}
			}
				
		}

		var friction = function () {
				
			if (accel1.len() == 0) {
				vel1 = vel1.multiply(1-mu);	
			}
		}

		var updateMotion = function (pos, vel, acc) {

			var event = new CustomEvent('accel', {'detail':{pos:pos, vel:vel, accel:acc}});
		}

		var integrate = function (accelArray) {
				
			accel1.set(util.average(accelArray));
			
			if (accel1.len() < threshold) {
				accel1.set(new vector(0,0,accel1.time));
			}
			
			var timeInterval = interval*filterSize;

			vel1.set(vel0.add(accel0.multiply(timeInterval)).add(accel1.subtract(accel0).multiply(0.5*timeInterval)));
			pos1.set(pos0.add(vel0.multiply(timeInterval)).add(vel1.subtract(vel0).multiply(0.5*timeInterval)));

			bounce();
			friction();
			
			updateMotion(pos1, vel1, accel1);
			
			pos0.set(pos1);
			vel0.set(vel1);
			accel0.set(accel1);
		}

		self.updateParams = function (p) {

			factor = p.factor || factor;
			xDir = p.xDir || xDir;
			yDir = p.yDir || yDir;
			threshold = factor*0.5 || threshold;
			mu = p.mu || mu;
			damp = p.damp || damp;
			interval = p.interval || interval;
			filterSize = p.filterSize || filterSize;
			gravity = p.gravity || gravity;

		}

		self.motion = function (e) {
			
			raw = {
				gravity:{
					x:e.accelerationIncludingGravity.x,
					y:e.accelerationIncludingGravity.y
				},
				abs:{
					x:e.acceleration.x,
					y:e.acceleration.y
				}
			}

			if (running) {

				if (gravity) {
					unfiltered.set(new vector(axis[x]*factor*raw.gravity.x, yDir*factor*raw.gravity.y, (e.timeStamp - startTime)/1000));
				}
				else {
					unfiltered.set(new vector(axis[y]*factor*raw.abs.x, yDir*factor*raw.abs.y, (e.timeStamp - startTime)/1000));
				}

				//console.log("unfiltered", "x", unfiltered.x, "y", unfiltered.y);
			}
		}

		self.start = function () {
				
			console.log("start accel");

			self.updateParams(p);
			
			running = true;
			
			startTime = (new Date()).getTime();
			
			timer = setInterval(function () {
				
				filterBucket[filterBucket.length] = unfiltered;
					
				if (filterBucket.length == filterSize) {
					
					integrate(filterBucket);
					
					filterBucket = [];	
				}
				
			}, interval);
		}
		
		self.stop = function () {
			
			console.log("stop accel");
			
			running = false;
			
			if (timer) {
				clearInterval(timer);
				timer = {};
				timer = null;
			}

		}

		self.reset = function () {
			
			filterBucket = [];
			
			unfiltered = new vector(0,0,0);
			accel0 = new vector(0,0,0);
			vel0 = new vector(0,0,0);
			pos0 = new vector(0,0,0);
			startTime = 0;
			
			updateMotion(pos0, vel0, accel0);	
		}
		
		self.getMotion = function (func) {
			
			window.addEventListener("accel", function (e) {
				func(e.detail.pos, e.detail.vel, e.detail.acc);
			}, false);
				
		}

		self.raw = function () {
			return raw;
		}

		self.unfiltered = function () {
			return unfiltered;
		}

	}


})(window);