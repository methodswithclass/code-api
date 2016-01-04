<html>
	<head>

		<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
	    <link rel="stylesheet" href="classes.css">
	    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

	    <script src="libs/jquery-1.11.3.min.js"></script>
	    <script src="libs/jquery.scrollto.js"></script>
	    <script src="libs/hammer.js"></script>
	    <script src="libs/angular.min.js"></script>
	    <script src="libs/angular-route.min.js"></script>
	    <script src="libs/angular.ui-router.min.js"></script>
	    <script src="libs/jquery.hammer.js"></script>

	</head>

	<body ng-app="app" ng-controller="controller as main">

		<div class="absolute fill scrollY touch" id="body">

			<div class="relative width height-600 border-white cutoff" parallax scroll="body" inner="inner" top="true">

				<div class="relative width height" id="inner">

					<div class="relative width80 height80 center">

						<div class="relative width height50">
							<div class="absolute width text-right top0 font-70">
								methods with<br>
								class
							</div>
						</div>

						<div class="relative width height50">
							<div class="absolute width text-right bottom0 font-40">
								code
							</div>
						</div>

					</div>

				</div>

			</div>

			<div class="relative width">

				<div ng-repeat="module in main.modules">

					<div class="relative width height-800 black-back">
						<div class="absolute width-800 height hcenter">
							<div class="absolute width80 height80 center white-back lowered">

								<div class="absolute width80 height80 center">
									<div class="relative width padding-v-20 font-40">
										{{module.name}}
									</div>

									<div class="relative width padding-v-20 font-20">
										{{module.description}}
									</div>

									<div class="relative width padding-v-20 font-20">

										versions:
									</div>

									<div ng-repeat="version in module.versions">

										<div class="relative width margin-v-20 height-50">

											<div class="absolute width30 height font-20">
												<div class="absolute center text-center">
													{{version.number}}
												</div>
											</div>

											<div class="absolute width30 height left30 font-20">
												<div class="relative center text-center">
													{{version.status}}
												</div>
											</div>

											<div class="absolute width40 height left60 font-20">
												<div class="absolute width height black-back white raised rounded10 pointer" download>
													<div class="absolute center text-center ">
														download
													</div>
												</div>
											</div>

										</div>

									</div>

								</div>

							</div>

						</div>
					</div>

				</div>

			</div>

			<div class="relative width height-400 cutoff" id="footerouter">

				<div class="absolute width height" id="footer">

					<div class="absolute width80 height-300 center" id="footerinner">
						<div class="absolute width-200 height-50 border rounded20 text-right top20 right0 pointer" link>
							<div class="absolute center">
								visit the main page
							</div>

						</div>

						<div class="absolute width text-right bottom0">
							&copy;2016 Methods with Class
						</div>
					</div>

				</div>

			</div>

		</div>


		<script src="app.js"></script>
		<script src="shared-2.js"></script>
		<script src="parallax-2.1.js"></script>

	</body>
</html>