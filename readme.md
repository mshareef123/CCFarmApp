How to build the code
=====================
* Import project to eclipse workspace as an existing project (this version was developed with eclipse luna, download luna or latest) 
* Get and install node.js from nodejs.org (restart may be needed after install).
* Get the latest version of the code.
* Run a command shell in Administrator mode from the root directory of the project
* Add Global Environment Variable under advanced system settings by adding variable 
*	name:NODE_PATH value:AppData%\npm\node_modules
* In command shell call: npm i (it will install node js required modules under nod_modules directory)
* Run a command shell in Administrator mode and call gulp (from the root directory of the project).
* Create log  on top level (under src) to see jsHint output files
* All dev code is under src/webapp/ui all server deplyed code is under src/webapp/dist  so you always make your changes under dev code, and gulp will automatically update dist folder.

How to run the code
===================

* The project does not depend on a particular IDE. You can even use notepad to make your changes. Just make sure to run gulp in background to see your changes instantly.
* Or alternatively you can use node.js' Express web server which is available to download from npm.
* Setup local Apache Tomcat server preferably Apache Tomcat 8.0 server with port 8080 for local development
you can download it from  http://tomcat.apache.org/
* Run Tomcat and open http://localhost:8080 you should see welcome page
you can also find sample rest service response at http://localhost:8080/controller/listing

How to work with Git
===================

* Download tortoise git from https://code.google.com/p/tortoisegit/
* To checkout project git clone: https://github.com/mshareef123/CCFarmApp.git
* Always pull code beforue pushing to git
* If you have local changes save them into stash before pulling
* After puling if you have stashed changes pop the stash and apply it if you have any conflicts resolve them before pushing
* To submit your changes to repository "push" your changes

DEV life server
===================

* weekly changes will be uploaded to test server located here http://52.24.208.79/foodbankfarm/