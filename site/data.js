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
			full:[
				"Parallax scrolling gives the impression that a website has depth, it allows elements to scroll at different rates than the document itself. This module is designed for images and any other html element. It is an AngularJS directive that can be added to any div in an Angular project. jQuery is a dependency.",
				"Parallax changes the scroll rate of the element in question from the scroll rate of the document. That rate difference is calculated based on a number of factors in real time. The default is to move the child in the same direction as the document scroll, but at a reduced rate. Use the 'factor' directive (see below) to adjust the quantity of this rate difference."
			],
		},
		versions:[
		{
			number:"2",
			src:"parallax-2.js",
			status:depricated
		},
		{
			number:"2.1",
			src:"parallax-2.1.js",
			status:production
		}
		],
		current:"2.1",
		doc:[
		{
			name:"modules",
			items:[
			{
				type:modtypes["directive"],
				id:"parallax",
				name:"parallax",
				body:[
					"To use this directive, scrolling must be handled by a parent element with the overflow-y set to scroll, body scrolling alone will not work. The reason is that the a primary mechanism is to measure the position of the parallax element compared to the window. Currently the way to acheive this is to maintain an element as a reference. Making it the scrolled element is a convenenience.",
					"Images are handled automatically, there is no need for an <img> tag within the parent object. This is the main use of parallax. Simply add the source to the 'src' directive. If you want to apply parallax scrolling to a specified child element, add it's id to the 'inner' directive. Only one child element can have the parallax effect applied at a time, 'src' or 'inner'.",
					"The parallax directive will handle resizing images when the window is resized so your content will always be shown correctly. It will also adjust the rate difference of scrolling to keep the edges of images from showing.",
					"This module is under development, check back regularly for the most current version."
				],
				sets:[
				{
					id:"variables",
					name:{
						text:"variables",
						size:"font-30"
					},
					items:[
					{
						name:"scroll",
						type:vartypes["string"],
						required:reqtypes["required"],
						valid:[
							{value:"element id"}
						],
						d:[
							"refers to element with overflow-y set to scroll. parallax functionality is bound to this element's scroll event. can't guarentee good result if 'scroll' is not an ancestor of parallax element."
						]
					},
					{
						name:"src",
						type:vartypes["string"],
						required:reqtypes["optional"],
						valid:[
							{value:"img source"}
						],
						d:[
							"image is automatically added to parallax element. required if inner not defined, can only define one."
						]
					},
					{
						name:"inner",
						type:vartypes["string"],
						required:reqtypes["optional"],
						valid:[
							{value:"element id"}
						],
						d:[
							"'inner' is the child element that will be parallax scrolled. must be larger than parent to work properly. must define one of 'src' or 'inner', but not both."
						]
					},
					{
						name:"top",
						type:vartypes["bool"],
						required:reqtypes["optional"],
						valid:[
							{value:"true"},
							{value:"false"}
						],
						d:[
							"intended to be used for element with zero offset from scroll element on page load. if true, parallax child will not scroll with page, but be moved down opposite of scrolling. appears stationary. has the effect that a top element is being covered by the rest of the document when scrolling down."
						]
					},
					{
						name:"factor",
						type:vartypes["number"],
						required:reqtypes["optional"],
						valid:[
							{value:">=0"},
							{value:"<=1"}
						],
						d:[
							"this is a multiplier on scroll rate of the child to be added on a per case basis. it is a percentage given as a number between 0 and 1.",
							"==1, if absent, this value defaults to 1. changes nothing.",
							">1, for every pixel that the document scrolls, the child will scroll more than a pixel. will cause the edges of an image to show.",
							"==0, turns off parallax. child will be left vertically centered in parent element.",
							"<0, the child will be scrolled in the opposite direction of the document. less than -1 will cause the edges of an image to show."
						]
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
			l:"a flat css library that provides individual classes for each style point. this allows for an element to carry whatever classes it needs and reduces the burden on extensive singleton classes or heavy-duty css document engineering.",
			full:[
				"This css library contains single style css classes that are added in combination to each element to complete the total syling. It allows more development for the layout and less development on the css structures that will make the layout work. Doing classes this way allows for quick changes to be made without having to think about how to make the changes within the css hiearchical structure already put in place. It is a continuously expanding set, and will have very seldom retractions, so you can use this and all future versions without fear of anything you have breaking."
			]
		},
		versions:[
		{
			number:"1",
			src:"classes.css",
			status:production
		}
		],
		current:"1",
		doc:[
		{
			name:"modules",
			items:[
			{
				type:modtypes["css"],
				id:"classes",
				name:"classes",
				body:[
					".absolute {position:absolute;}",
					".relative {position:relative;}",
					".width {width:100%;}",
					".width-100 {width:100px;}",
					".top50 {top:50%;}",
					".top-50 {top:50px;}",
					".rounded10 {border-radius:10px}",
					".border {border:1px solid black;}",
					".border-white {border:1px solid white;}",
					".center -> centers div inside parent, works on divs with no defined width or height",
					".hcenter -> horizontally centers div inside parent, works on divs with no defined width or height",
					".golden -> aligns center of child 30% from top of parent, can be combined with hcenter",
					"in addition to countless positioning, colors, fonts, borders, and more."
				]
			}
			]
		}
		]
	},
	{
		name:"shared",
		copy:{
			s:"general utility for a web app",
			l:"contains several services for any angular project. an events service to call functions from other parts of an app, a service to send and receive generic kinds of objects or data to different parts of an app",
			full:[
				"this module offers several services that can used globally in a project. services for chekcing device state, declaring a function and then firing it from a different point in the app at a later time, accumulating several callbacks that can fired in succession in the order you dictate, and saving data at runtime to a central location to be retrieved from anywhere in the app at a later time."
			]
		},
		versions:[
		{
			number:"1",
			src:"shared-1.js",
			status:depricated
		},
		{
			number:"2",
			src:"shared-2.js",
			status:production
		}
		],
		current:"2",
		doc:[
		{
			name:"modules",
			items:[
			{
				type:modtypes["factory"],
				id:"global",
				name:"global",
				body:[
					"this service deals with device state and some other global functions."
				],
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"isMobile",
						d:[
							"checks if the device is a mobile device."
						],
						input:{
							name:{
								text:"inputs",
								size:"font-20"
							},
							items:[
							{
								name:"na",
								d:[
									"this function takes no input."
								]
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
								type:vartypes["bool"],
								d:[
									"if device is mobile, this will return true."
								]
							}
							]
						}
					},
					{
						name:"isPortrait",
						d:[
							"compares window width and height. useful to check orientation of mobile device."
						],
						input:{
							name:"inputs",
							items:[
							{
								name:"na",
								type:vartypes["na"],
								d:[
									"this function takes no input."
								]
							}
							]
						},
						output:{
							name:"returns",
							items:[
							{
								type:vartypes["bool"],
								d:[
									"if width is less than height, returns true"
								]
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
				body:[
					"the service manages callbacks"
				],
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"on"
					},
					{
						name:"dispatch"
					}
					]
				}
				]	
			},
			{
				type:modtypes["factory"],
				id:"send",
				name:"send",
				body:[
					"this service centralizes runtime data that can be retrieved anywhere in the app."
				],
				sets:[
				{
					id:"functions",
					name:"functions",
					items:[
					{
						name:"setup"
					},
					{
						name:"retreive"
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
			full:[
				"Debugging for mobile devices can be difficult because reading console logs is difficult. This module places console logs squarly in your view when viewing a development site on a mobile device. Entries made with javascript, and some native error messages will show in a black box in the lower third of the screen. The logs are scrollable. Only a 1000 messages are kept in the history to maintain performance. The directive can be easily shown or hidden with an HTML parameter, no need to use comments or flush the cache."
			]
		},
		versions:[
		{
			number:"1",
			src:"console-1.js",
			status:production
		}
		],
		current:"1",
		doc:[
		{	
			name:"modules",
			items:[
			{
				type:modtypes["directive"],
				id:"console",
				name:"console",
				body:[
					"Place this directive in your root body tag below your content. The element is absolutly positioned at the bottom of the screen with a high z-index so that it remains visible."
				],
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
						d:[
							"shows and hides the console"
						]

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

	var getModuleByName = function (name) {

		for (i in modules) {

			if (name == modules[i].name) {

				return modules[i];
			}
		}

		return {name:"none"};
	}

	return {
		modules:modules,
		getModuleByName:getModuleByName
	}

});