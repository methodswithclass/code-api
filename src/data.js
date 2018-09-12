var depricated = "depricated";
var production = "production";
var development = "development";

var reqtypes = {
	required:{
		value:"required",
		color:"red",
		back:"red-back"
	},
	optional:{
		value:"optional",
		color:"green4",
		back:"green-back"
	}
};

var modtypes = {
	directive:{
		value:"directive",
		color:"green4",
		back:"blue-back"
	},
	factory:{
		value:"factory",
		color:"blue2",
		back:"blue-back"
	},
	provider:{
		value:"provider",
		color:"blue2",
		back:"blue-back"
	},
	css:{
		value:"css",
		color:"pink",
		back:"pink-back"
	}
};

var vartypes = {
	string:{
		value:"string",
		color:"yellow",
		back:"yellow-back"
	},
	number:{
		value:"number",
		color:"blue2",
		back:"blue-back"
	},
	bool:{
		value:"boolean",
		color:"pink",
		back:"pink-back"
	},
	object:{
		value:"object",
		color:"green4",
		back:"blue-back"
	},
	array:{
		value:"array",
		color:"purple",
		back:"blue-back"
	},
	function:{
		value:"function",
		color:"blue",
		back:"blue-back"
	}
};


app.factory("data", function () {

	var modules = [
	{
		name:"parallax",
		copy:{
			s:"parallax scrolls an image or HTML element",
			l:"angular module that scrolls an image or DOM element at reduced rate compared to document scroll. Takes image source or child element as input.",
			full:`

				Parallax scrolling gives the impression that a website has depth, it allows elements to scroll at different rates than the document iself. This module is designed for images and any other html element. It is an AngularJS directive that can be added to any div in an Angular project. jQuery is a dependency.<br><br>
				

				Parallax changes the scroll rate of the element in question from the scroll rate of the document. That rate difference is calculated based on a number of factors in real time. The default is to move the child in the same direction as the document scroll, but at a reduced rate. Use the 'factor' directive (see below) to adjust the quantity of this rate difference.

			`
		},
		versions:[
		{
			number:"2.0",
			src:"parallax.js",
			status:depricated
		},
		{
			number:"2.1",
			src:"parallax.js",
			status:depricated
		},
		{
			number:"2.2",
			src:"parallax.js",
			status:depricated
		},
		{
			number:"3.0",
			src:"parallax.js",
			status:depricated
		},
		{
			number:"4.0",
			src:"parallax.js",
			status:depricated
		},
		{
			number:"5.0",
			src:"parallax.js",
			status:production
		}
		],
		current:"5.0",
		doc:[
		{
			name:"modules",
			items:[
			{
				type:modtypes["directive"],
				id:"parallax",
				name:"parallax",
				body:`
					
					To use this directive, scrolling must be handled by a parent element with the overflow-y set to scroll, body scrolling alone will not work. The reason is that the a primary mechanism is to measure the position of the parallax element compared to the window. Currently the way to acheive this is to maintain an element as a reference. Making it the scrolled element is a convenenience.<br><br>
					

					Images are handled automatically, there is no need for an <img> tag within the parent object. This is the main use of parallax. Simply add the source to the 'src' directive. If you want to apply parallax scrolling to a specified child element, add it's id to the 'inner' directive. Only one child element can have the parallax effect applied at a time, 'src' or 'inner'.<br><br>
					

					The parallax directive will handle resizing images when the window is resized so your content will always be shown correctly. It will also adjust the rate difference of scrolling to keep the edges of images from showing.<br><br>
					

					This module is under development, check back regularly for the most current version.

				`,
				sets:[
				{
					id:"variables",
					name:{
						text:"variables",
						size:"font-30"
					},
					items:[
					{
						name:"name",
						type:vartypes["string"],
						required:reqtypes["optional"],
						valid:[
							{value:"descriptor"}
						],
						d:`
							for debugging purposes
						`
					},
					{
						name:"scroll",
						type:vartypes["string"],
						required:reqtypes["required"],
						valid:[
							{value:"element id"}
						],
						d:`
							the parallax module works only by using a parent element with css 'overflow-y' set to 'scroll'. It does not use the native window scroll feature. This allows more flexibility with the module. That element id is input here.
						`
					},
					{
						name:"adjustinner",
						type:vartypes["bool"],
						required:reqtypes["required"],
						valid:[
							{value:"true"},
							{value:"false"}
						],
						d:`
							
							this determines whether the image given by 'src' is adjusted for size to fit the element or not. Set this to 'true' to ensure that your image is always larger than the parent element and therefore it's edges will not show

						`
					},
					{
						name:"imgId",
						type:vartypes["string"],
						required:reqtypes["required"],
						valid:[
							{value:"element id"}
						],
						d:`
							this is the element id of the image given by the 'src' directive. required when 'src' provided.
						`
					},
					{
						name:"src",
						type:vartypes["string"],
						required:reqtypes["optional"],
						valid:[
							{value:"img source"}
						],
						d:`
							image is automatically added to parallax element. required if 'inner' not defined, can only define one of either.
						`
					},
					{
						name:"inner",
						type:vartypes["string"],
						required:reqtypes["optional"],
						valid:[
							{value:"element id"}
						],
						d:`
							'inner' is the child element that will be parallax scrolled. must be larger than parent to work properly. must define one of 'src' or 'inner', but not both.
						`
					},
					{
						name:"top",
						type:vartypes["bool"],
						required:reqtypes["optional"],
						valid:[
							{value:"true"},
							{value:"false"}
						],
						d:`
							set this to 'true' for an element that is at the very top of the page with zero offset from scroll element on page load. if true, parallax child will not scroll with page, but be moved down opposite of scrolling. appears stationary. has the effect that a top element is being covered by the rest of the document when scrolling down.
						`
					},
					{
						name:"factor",
						type:vartypes["number"],
						required:reqtypes["optional"],
						valid:[
							{value:"numerical, any"}
						],
						d:`

							this is a multiplier on scroll rate of the child to be added on a per case basis. it is a percentage given as a number recommended to be between 0 and 1.<br><br>

							==1, this value defaults to 1 if absent. changes nothing.<br><br>

							==0, turns off parallax. child will be left vertically centered in parent element and will scroll with element.<br><br>
							
							between 0 and 1 will slow the parallax effect relative to the scroll speed <br><br>

							> 1 will speed it up <br><br>

							< 0 will reverse it relative to scroll direction <br><br>

							the only recommended values for an intended effect are between 0 and 1, leave absent for best effect			

						`
					}
					]
				}
				]
			}
			]
		}
		]
	},
	{
		name:"classes",
		copy:{
			s:"the last css library you'll ever need",
			l:"a semantic css library that provides individual classes for each style point. this allows for an element to carry whatever classes it needs and reduces the burden on extensive singleton classes or heavy-duty css document engineering.",
			full:`
				This css library contains single style css classes that are added in combination to each element to complete the total syling. It allows more development for the layout and less development on the css structures that will make the layout work. Doing classes this way allows for quick changes to be made without having to think about how to make the changes within the css hiearchical structure already put in place. It is a continuously expanding set, and will have very seldom retractions, so you can use this and all future versions without fear of anything you have breaking.
			`
		},
		versions:[
		{
			number:"1.0",
			src:"classes.css",
			status:depricated
		},
		{
			number:"2.0",
			src:"classes.css",
			status:production
		}
		],
		current:"2.0",
		doc:[
		{
			name:"modules",
			items:[
			{
				type:modtypes["css"],
				id:"classes",
				name:"classes",
				body:`
					

					.absolute {position:absolute;}<br><br>
					

					.relative {position:relative;}<br><br>
					

					.width {width:100%;}<br><br>
					

					.width-100 {width:100px;}<br><br>
					

					.top50 {top:50%;}<br><br>
					

					.top-50 {top:50px;}<br><br>
					

					.rounded10 {border-radius:10px}<br><br>
					

					.border {border:1px solid black;}<br><br>
					

					.border-white {border:1px solid white;}<br><br>
					

					.center -> centers div inside parent, works on divs with no defined width or height<br><br>
					

					.hcenter -> horizontally centers div inside parent, works on divs with no defined width or height<br><br>
					

					.golden -> aligns center of child 30% from top of parent, can be combined with hcenter<br><br>
					

					in addition to countless positioning, colors, fonts, borders, and more

				`
			}
			]
		}
		]
	},
	{
		name:"shared",
		copy:{
			s:"general utility for a web app",
			l:"contains several services for any generic javascript app, unopinionated toward fraework (compatibable with Angular, React, Backbone, etc). Provides an events service to call functions from other parts of an app, a service to send and receive objects and data across an app, and more",
			full:`
				this module offers several services that can used globally in a project. services for chekcing device state, declaring a function and then firing it to locally from where it was delcared from a different point in the app at a later time, accumulating several callbacks that can fired in succession in the order you dictate, and saving data at runtime to a central location to be retrieved from anywhere in the app at a later time, among others.
			`
		},
		versions:[
		{
			number:"1.0",
			src:"shared.js",
			status:depricated
		},
		{
			number:"2.0",
			src:"shared.js",
			status:depricated
		},
		{
			number:"3.0",
			src:"shared.js",
			status:depricated
		},
		{
			number:"4.0",
			src:"shared.js",
			status:depricated
		},
		{
			number:"4.6.1",
			src:"shared.js",
			status:production
		}
		],
		current:"4.6.1",
		doc:[
		{
			name:"modules",
			items:[
			{
				type:modtypes["factory"],
				id:"global",
				name:"global",
				body:`
					this service deals with device state and some other global functions.
				`,
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"isMobile",
						d:`
							checks if the device is a mobile device.
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function takes no input.
								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"isMobile",
								type:vartypes["bool"],
								d:`
									if device is mobile, this will return true.
								`
							}
							]
						}
					},
					{
						name:"isPortrait",
						d:`
							compares window width and height. useful to check orientation of mobile device.
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function takes no input.
								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"isPortrait",
								type:vartypes["bool"],
								d:`
									if width is less than height, returns true
								`
							}
							]
						}
					}
					]
				}
				]
			},
			{
				type:modtypes["factory"],
				id:"events",
				name:"events",
				body:`
					the service manages callbacks
				`,
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"on",
						d:`
							sets an event to be fired later
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"name",
								type:vartypes["string"],
								required:reqtypes["required"],
								valid:[
									{value:"registration string"}
								],
								d:`
									name
								`
							},
							{
								name:"callback",
								type:vartypes["function"],
								required:reqtypes["required"],
								valid:[
									{value:"callback"}
								],
								d:`
									function to be called at later time with 'dispatch'
								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									returns no value
								`
							}
							]
						}
					},
					{
						name:"dispatch",
						d:`
							dispatches the event registered with 'on'
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"name",
								type:vartypes["string"],
								required:reqtypes["required"],
								valid:[
									{value:"registration string"}
								],
								d:`
									name (matching that registered with 'on')
								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"any",
								type:vartypes["object"],
								d:`
									returns any value
								`
							}
							]
						}
					}
					]
				}
				]	
			},
			{
				type:modtypes["factory"],
				id:"send",
				name:"send",
				body:`
					this service centralizes runtime data that can be retrieved anywhere in the app.
				`,
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"back",
						d:`
							for global data sharing when you need to backfill data with an accumulator
						`
					},
					{
						name:"back.setup()",
						d:`
							sets up the receiver
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"options",
								type:vartypes["object"],
								required:reqtypes["required"],
								valid:[
									{value:"options input"}
								],
								d:`
									this function takes a single object as input, with the keys: "name" and "receiver"<br><br>

									"name" is a registration string and "receiver" is an empty object {} to later be key/value pair assigned with data

								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function returns no value
								`
							}
							]
						}
					},
					{
						name:"back.add()",
						d:`
							adds data to the receiver
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"options",
								type:vartypes["object"],
								required:reqtypes["required"],
								valid:[
									{value:"options input"}
								],
								d:`
									this function takes a single object as input, with the keys: "name", "id", and "data"<br><br>

									"name" is the reference to the registration name, "id" is a an object key, and "data" is the data is the value in the key/value pair


								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function returns no value
								`
							}
							]
						}
					},
					{
						name:"save",
						d:`
							for global data sharing when you simply need to save data to an array and retrieve it later from elsewhere
						`,
					},
					{
						name:"save.add()",
						d:`
							this function adds data to an array to be retrieved later
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"options",
								type:vartypes["object"],
								required:reqtypes["required"],
								valid:[
									{value:"options input"}
								],
								d:`
									this function takes a single object as input, with the keys: "name" and "data"<br><br>

									"name" is a registration string and "data" is the data to be saved in the array


								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function returns no value
								`
							}
							]
						}
					},
					{
						name:"save.get()",
						d:`
							this function retrieves the data array up to that point of accumulation
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"options",
								type:vartypes["object"],
								required:reqtypes["required"],
								valid:[
									{value:"options input"}
								],
								d:`
									this function takes a single object as input with a "name" key<br><br>

									"name" is a reference to the registration name


								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"array",
								type:vartypes["array"],
								d:`
									this function returns the array of data
								`
							}
							]
						}
					}
					]
				}
				]	
			},
			{
				type:modtypes["factory"],
				id:"react",
				name:"react",
				body:`
					this service is a stripped down observables package, very simple subscribe and push data functions
				`,
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"subscribe",
						d:`
							this function subscribes a callback to a registration name
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"options",
								type:vartypes["object"],
								required:reqtypes["required"],
								valid:[
									{value:"options input"}
								],
								d:`
									this function takes a single object as input, with two key/value pairs<br><br>

									a registration "name" and a function "callback"<br><b>

									the callback takes a single input that all data during 'push' will be attached to, it can be retrieved here in the callback in any manner you see fit<br><br>

									like any Observable pattern, you may register as many different callbacks to the same name as you like throughout your application, and all subscribers of the same name receive whatever data is pushed<br><br>

									subscribers should be registered at application load time. Push calls should be made during appication run-time.<br><br>

									you may subscribe the callback after the 'push' has been fired. If no subscribers exist at the time data is attempted to be pushed, the data will be saved and will be pushed to your subscribers at the time of their subscription<br><br>

									this reverse functionality is a fallback. It is not for intended use. It is best practice to register your subscribers before you make the push calls


								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function returns no value
								`
							}
							]
						}
					},
					{
						name:"push",
						d:`
							this function pushes data to all subscribers of a given name
						`,
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"options",
								type:vartypes["object"],
								required:reqtypes["required"],
								valid:[
									{value:"options input"}
								],
								d:`
									this function takes a single object as input, with two key/value pairs<br><br>

									a reference to the subscribed "name" and "state" that refers to the data being pushed<br><br>

									subscribers should be registered at application load time. Push calls should be made during appication run-time.<br><br>

									if no subscribers exist at the time of push, the data in "state" is saved internally until a subscriber of "name" is registered, then that subscriber's callback is immediately fired with the corresponding "state" data<br><br>

									this reverse functionality is a fallback. Otherwise, it is best practice to subscribe the callback before firing the push function

								`
							}
							]
						},
						output:{
							name:{
								text:"returns",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:`
									this function returns no value
								`
							}
							]
						}
					}
					]
				}
				]	
			}
			]
		}
		]
	},
	{
		name:"console",
		copy:{
			s:"debug on mobile",
			l:"prints out the console to a visible area on screen. designed for mobile debugging. output is scrollable",
			full:`
				Debugging for mobile devices can be difficult because reading console logs is difficult. This module places console logs squarly in your view when viewing a development site on a mobile device. Entries made with javascript, and some native error messages will show in a black box in the lower third of the screen. The logs are scrollable. Only a 1000 messages are kept in the history to maintain performance. The directive can be easily shown or hidden with an HTML parameter, no need to use comments or flush the cache.
			`
		},
		versions:[
		{
			number:"1.0",
			src:"console.js",
			status:production
		}
		],
		current:"1.0",
		doc:[
		{	
			name:"modules",
			items:[
			{
				type:modtypes["directive"],
				id:"console",
				name:"console",
				body:`
					Place this directive in your root body tag below your content. The element is absolutly positioned at the bottom of the screen with a high z-index so that it remains visible.
				`,
				sets:[
				{
					id:"variables",
					name:"variables",
					items:[
					{
						name:"vis",
						type:vartypes["bool"],
						required:reqtypes["required"],
						valid:[
							{value:"true"},
							{value:"false"}
						],
						d:`
							shows and hides the console
						`

					}
					]
				}
				]
				
			}
			]
		}
		]
	}
	]


	var sortVersions = function () {

		modules.forEach(function (value, index) {

			value.versions.sort(function (a, b) {

				return parseFloat(b.number) - parseFloat(a.number);
			});
		})
	}

	var getModuleByName = function (name) {


		var found = modules.find(function (p) {

			return p.name == name;
		})

		return found ? found : {name:"none"};
	}

	var getItem = function (options) {

		var parseKey = function (key, p) {


			if (key.indexOf(".") != -1) {

				var keyArray = key.split(".");

				for (var i in keyArray) {

					p = p[keyArray[i]]
				}
			}
			else {
				p = p[key];
			}

			return p;
		}


		var findObj = function (obj, objectKey, dataKey, value) {


			var findObject = parseKey(objectKey, obj);


			return findObject.find(function (p) {

				var searchValue = parseKey(dataKey, p);

				return searchValue == value;
			})
		}


		var moduleValue = options.module;
		var dataKeys = options.dataKeys;
		var objectKeys = options.objectKeys;
		var values = options.values;

		var mod = getModuleByName(moduleValue);

		var found = findObj(mod, objectKeys[0], dataKeys[0], values[0]);

		for (var i = 1, k1 = 1, k2 = 1; i < values.length && k1 < dataKeys.length && k2 < objectKeys.length; i++, k1++, k2++) {

			// console.log("option", options[i], "key", keys1[k1], keys2[k2], found);

			var found = findObj(found, objectKeys[k2], dataKeys[k1], values[i]);

		}

		return found;
	}

	sortVersions();

	return {
		modules:modules,
		getModuleByName:getModuleByName,
		getItem:getItem
	}

});