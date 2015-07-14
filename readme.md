How to build the code
=====================
* Import project to eclipse workspace as an existing project (this version was developed with eclipse luna, download luna or latest) 
* Get and install node.js from nodejs.org (restart may be needed after install).
* Get the latest version of the code.
* Run a command shell in Administrator mode from the root directory of the project
* Add Global Environment Variable under advanced system settings by adding variable 
*	name:NODE_PATH value:AppData%\npm\node_modules
* In command shell call: npm i (it will install node js required modules under node_modules directory)
* Run a command shell in Administrator mode and run "gulp" command in command line (from the root directory of the project).
* Create log  on top level (under src) to see jsHint output files
* All dev code is under src/webapp/ui all server deployed code is under src/webapp/dist  so you always make your changes under dev code, and gulp will automatically update dist folder.

How to run the code
===================

* The project does not depend on a particular IDE. You can even use notepad to make your changes. Just make sure to run gulp in background to see your changes instantly.
* Or alternatively you can use node.js' Express web server which is available to download from npm.
* Setup local Apache Tomcat server preferably Apache Tomcat 8.0 server with port 8080 for local development
you can download it from  http://tomcat.apache.org/
* Run Tomcat and open http://localhost:8080 you should see welcome page
you can also find sample rest service response at http://localhost:8080/controller/listing
* Added from Jared: I recommend you get Eclipse for this so you can easily deploy the code to your tomcat server.  To set up your server, go to the server tab in Eclipse and click the add button - just give it the install directory for tomcat and it will do the rest.  Now import your git project into eclipse, and right click on com.foodbankfarm.  We want to go to Maven - Update.  Once you've done this you'll have a deployment target for the website.  Go back to your server tab, right click on your tomcat server, and click on 'Add or Remove'.  Add our project to the server.  One last step you need to do is go to Project -> Properties -> Web Project Settings and make sure you see / in the Context Root box.  If you don't, make it that.  Once you've done this you'll be able to launch your server and things will work smoothly!

How to work with Git
===================

* Download tortoise git from https://code.google.com/p/tortoisegit/
* To checkout project git clone: https://github.com/mshareef123/CCFarmApp.git
* Always pull code before pushing to git
* If you have local changes save them into stash before pulling
* After pulling if you have stashed changes pop the stash and apply it if you have any conflicts resolve them before pushing
* To submit your changes to repository "push" your changes
* Do not check in files under /dist folder, and any changes that are related to node_modules or eclipse settings

Third party JS libraries
===================

* you can find list of third party JS libraries under src/webapp/lib folder and search internet for more information about each one of them, below some discription about most usefull ones.

* AngularJS (http://angularjs.org/) - HTML enhanced for web apps!

* Lodash javascript library (https://lodash.com/) - A JavaScript utility library delivering consistency, modularity, performance, & extras. Useful working with list/arrays.

* Angular Google Maps (http://angular-ui.github.io/angular-google-maps/) - Angular Google Maps is a set of directives (part of angular-ui) written in CoffeeScript and Javascript which integrate Google Maps in an AngularJS applications.

DEV life server
===================

* weekly changes will be uploaded to test server located here http://52.24.208.79/foodbankfarm/