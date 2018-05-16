# Methods with Class Code Repository



This repository contains all supporting code packages for an application with their subsequent versions. I use all of these lilbraries, modules, and tools in my portfolio sites at various version levels depending on their maintanence level, hence the meticulous version system. This is the first time I am refactoring this site and removing old code.

	***If your application depends on any of these modules, please read the following to ensure a smooth migration to the new code sources***


	This repo generates a site at the following url https://code.methodswithclass.com, it contains the urls to the code for <script> tags, downloadable versions of the code for local usee, and documentation


As of June 2018, the "shared," "evolve," and "accelerometer" packagess located here will be depricated and soon after no longer supported. They will most likely be removed from the site entirely shorly thereafter. The intent with all of these modules is to make them framework ambivalent and only written in native JavaScript to remain portable and lightweight. 


The "parallax," "classes," and "console" packages will remain available here because there is no way of getting around them being Angular specific. The console module may be migrated one day, however. 

	

The packages being removed will be available as a dependency install from the public registries npm and bower


To install the new packages into your project, the commands are as follows: 

	
	npm install mc-shared --save  |  bower intsall mc-shared --save

	npm install mc-evolve --save  |  bower install mc-evolve --save

		(for better perforance of your evolution application, build your the evolution related modules on the backend where you should also install the mc-evolve algorithm with npm. It will work on the front end just as easily with a bower install, but you'll pay a heavy performnce cost)

	npm install accelerometer --save | bower install accelerometer

		(this package should be installed with bower on the front end and integrate with the rest of your application, any api calls made to the backend to retrieve calculated accelerometer data from the package would just reduce performance, but it can be installed on the backend all the same and you can experiment - let me know how it goes :-) )  


The code base for all the registry packages are identical whether installed with npm or bower. It's the same source, and the the modules themselves detect their location in the system and act accordingly, whether frontend or backend (a NodeJS backend that is - all of these packages are JavaScript, there is no Java support at this time)



