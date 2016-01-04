<!doctype html>
<html>
<head>

	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="api/classes.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <script src="libs/jquery-1.11.3.min.js"></script>
    <script src="libs/jquery.scrollto.js"></script>
    <script src="libs/hammer.js"></script>
    <script src="libs/angular.min.js"></script>
    <script src="libs/angular-route.min.js"></script>
    <script src="libs/angular.ui-router.min.js"></script>
    <script src="libs/jquery.hammer.js"></script>
    <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

    <base href="/">

</head>

<body ng-app="app" ng-controller="controller as main">

	<div class="absolute fill scrollY touch" id="body">

		<div ui-view=""></div>

	</div>


	<script src="app.js"></script>
	<script src="api/shared-2.js"></script>
	<script src="api/parallax-2.1.js"></script>
	<script src="data.js"></script>
	<script src="directives.js"></script>
	<script src="state/stateModule.js"></script>
	<script src="state/runtimeState.js"></script>
	<script src="state/states.js"></script>

</body>
</html>