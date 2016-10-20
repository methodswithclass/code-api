<!doctype html>
<html>
<head>

	<link rel="stylesheet" href="site/css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="api/classes.css">
    <link rel="stylesheet" href="site/css/styles.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <script src="site/libs/jquery-1.11.3.min.js"></script>
    <script src="site/libs/jquery.scrollto.js"></script>
    <script src="site/libs/hammer.js"></script>
    <script src="site/libs/angular.min.js"></script>
    <script src="site/libs/angular-route.min.js"></script>
    <script src="site/libs/angular.ui-router.min.js"></script>
    <script src="site/libs/jquery.hammer.js"></script>
    <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

    <base href="/">

    <script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-85962895-4', 'auto');
		ga('send', 'pageview');

	</script>

</head>

<body ng-app="app">

	<div class="absolute fill scrollY touch museo" id="body">

		<div ui-view=""></div>

		<div class="relative width height-400 cutoff" id="footerouter">

			<div class="absolute width height" id="footer">

				<div class="absolute width80 height-300 center font-25" id="footerinner">
					<div class="absolute width-300 height-50 border rounded20 text-right top20 right0 pointer" main-page>
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


	<script src="site/app.js"></script>
	<script src="api/shared-2.js"></script>
	<script src="api/parallax-2.2.js"></script>
	<script src="site/data.js"></script>
	<script src="site/directives.js"></script>
	<script src="site/state/stateModule.js"></script>
	<script src="site/state/runtimeState.js"></script>
	<script src="site/state/states.js"></script>

</body>
</html>