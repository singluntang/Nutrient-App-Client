# Nutrient App - An App that is built from a React Native Framework

## Table of Contents

* [OverView](#OverView)
* [Setup Environment](#Setting-Environment)
* [Buiding Up the Andorid App](#Build-Andriod)
* [Buiding Up the IOS App](#Build-IOS)
* [Installation Middle Ware Server](#MiddleWare-Server)
* [Setting a public domain address / IP Address](#Domain-Address-IP)
* [Project Reference Sources Or Links](#references)

## OverView

This project aims to build an app that allows user to create menus which automatically calculates the total nutritions base on the selected ingredients.
Users must first create the ingredients and filled up all the neccessary nutrients values. Base on the ingredients created, users will then create their own menus. The menus requires users to select the ingredients they created, users needs to provide the portions for each ingredients, and then the system will automatically calculates the poportion base on the menu portions by the ingredients they created.  

For data manupulation and storage, we will use mySQL datbase. For handling SQL transactions / Http requests, we will create a nutrient Server which acts as an RestAPI server. You can thought of mySQL database as a backend server, the RestAPI as an middle tier and the App as the frontend. Detailed of setting up the development environment and setting up the backend, middlet tier, frontend will be clearly explain below.

React Native is a framework which write the code once and can builds 2 different types of App platform (Android and IOS). 

## Setting-Environment

 * Operating System
    1. This project is built from Windows 11 Operating System.
   
 * MySQL Server
    1. To setup a MySQL server database, we will adopt a freeware Xammp (which can be download from this site: https://www.apachefriends.org/download.html).
    Xammp is an all in one freeware, which includes apache web server, mySQL database, ftp server and so on. It also supports serveral programming lanugaues such as php and perl. We will use the web browser (using Tom Cat Apache Server) to manupulate the mySQL database. 
    2. When downloaded, just install it, follow the instruction steps, it requires you to select the requrie products. For this project, please select mySQL, Tom Cat and phpMyAdmin. When finish installing, you need to startup each services. The Xampp provides a control pannel which controls which services that needs to be start. The control pannel is an executable file which can be found in the directory `c:\xampp\xampp-control.exe`
    3. Click start for the Apache and mySQL server. This will turn on the services.
    4. We need to create a database and user for this project. For this demo, we will create a `demoUser` and a `nutrient` database. Open a browser, and type in the link `http://localhost/phpmyadmin/index.php`. This will direct you to the mySQL database main page. One thing to remind you this version of Xammp, doesn't have a logOut button, which is required. To make the logout appears, please follow the below resources link below.
    5. In case you have logout, to login type `root` as the username and a blank password.
    6. On the mySQL main page, click `database`, type in the database name `nutrient` and click create.
    7. On the toppest, click the `server 127.0.0.1`` to take you back the home screen.
    8. Click `User Accounts` , click the link `add user account`, on the user name type `demoUser`. Fill up the password. Scroll to the bottom and type `Go`.
    9. On the privileges page, check all for `Data` and `Structure` and click `Go`.
    10. As you notice, if you follow the above steps, you are still on the `privileges` page, at the top, please select `database`. Select the database `nutrient` and click `Go`. Now you are ready to logout.
    11. Click the logout button on the left upper menu items.
    12. Login the user you just create. 
    13. To create the nutrient tables and feed in some demo data. Please click the 'nutrient' database on the left side. Then select the SQL tap on the right side. 
    14. From the root directory, navigate to the folder `db`. Open the file `dbscript.txt`. Copy all the contents, by clicking `ctl-a`. Paste it on the SQL blank area. At the bottom click `Go`. This finishes up the creating the nutrient database structure and feeding in demo data.



 * Nodejs
    1. As we are using react native as our framework, we will use Nodejs to build up our framework. To download Nodejs, please go to this site: `https://nodejs.org/en/download`. In this project we will use the version v18.18.0. When installing it requries you to choose whether or not to install the `chocolate` package installer, please select it, as we need it to build up the IOS app.

 * Android Studio:
    1. Android Studio although is optional, but is the fastest way to initialize our development environment, also it provides an emulator (incase you do not have an android phone). You can download from this web site: https://developer.android.com/studio. For this project we will use the version `Android Studio Giraffe`. 

 * Git:
    1. As we are using Git Hub for version controlling. Therefore we need to install git, to download please go to the site: `https://git-scm.com/downloads/`

    
## Build-Andriod

* There are 2 ways to build the Android app, one is from the command line (Window Command Prompt), another is from the Android Studio. 

   * Build From Android Studio

    1. At the `D:\` drive, type in the command: `git clone https://github.com/singluntang/Nutrient-App-Client.git` to clone the project repository.
    2. Navigate to the project root direcotry `D:\NutrientAppComplete`
    3. Install the Package by typing `npm install`
    4. Open the android studio
    5. Open the project from the folder `D:\NutrientAppComplete\Android`, then android stuido will download all the relavant packages, plug-in(s) and gradles. Wait till build completes.
    6. As android google play store supports signed apk file format, we need to build a signed apk. To build it select `Build` from the menubar. Then select `Generate Signed APK / Bundle`. A dialog box pops up requires you to choose `APK bundle` or `APK`. Please select `APK`, then select for the key store path, choose `Create New`. For the key store path, assigned a location for it, we will choose `D:\KeyStore` and for the filename `NutrientApp.jks`.
    Filled up all the require fields including passwords, certificate information. For the key Alias, please left it as it is. Click next. Then the next screen requires you to select which type of APK you need to build. Up to your chocie, if you want to build a production build to submit to google play store, please select `release`. Wait till the building process completes. 
    7. The release build is located at folder `D:\NutrientAPPComplete\android\app\release`

    


   * Build From Command Line

      * As we build from command line, which is a seperate environment from the Android Studio. We need to initialize some of the environment variables. To setup the environment variables, from window OS please Start -> Settings -> System, from the right side scroll to the bottom, select "About". For the "Device Secificaton" section, select "Advance System Settings". From the dialog box, at the bottom, click "Environment Variables".

      * Below are the enviroment variables we need to initialize:
         - ANDROID_HOME = "C:\Users\alanm\AppData\Local\Android\Sdk"
         - PATH
            - %ANDROID_HOME%\platform-tools
            - %ANDROID_HOME%\build-tools
            - %ANDROID_HOME%\emulator

         1. From the root directory `D:\NutrientAppComplete`, navigate to the folder `android`. The type in the command `gradlew assembleRelease` .
            Wait till the build finishes.
         2. The release build is located at the folder `D:\NutrientAPPComplete\android\app\build\outputs\apk\release` 


## Build-IOS

* As we are using windows, we need to use iMac Operating system plus X-Code inorder to build the nutrient app for the IOS platform. Please remind we can only build the App and view on a Iphone simulator. To install it on a phsical devices, you need to have an ios developer account and archive to submit to App store. This is out of the project scope and will not be demonstrate here.

    1. Open the terminal, at your home directory, create a directory `development`, navigate to the development directory. Type in the command: `git clone https://github.com/singluntang/Nutrient-App-Client.git` to clone the project repository.
    3. From the root folder `~/NutrientAppComplete`. Type `npm install` to install all the requrie packages.
    3. From the root folder navigate to the folder `ios`. Install the Package by typing `Pod install`
    4. If errors occurs which requires to acknowledge the X-code license. Type in `sudo xcodebuild -license`, then type in `agree`.
    5. When finish install, open the file `NutrientApp.xcworkspace` from the `ios` folder 
    6. The nutrient app uses `react-native-vector-icons` for the app's icons. Therefore we need to bundle it together when building the app.
    7. From the root folder, navigate to `node_modules`, navigate to the package folder `react-native-vector-icons`. From the `react-native-vector-icons` root directory, copy the whole items in the `Fonts` directory.
    8. From the XCode, on the left hand side, on the top most click the folder icon. Expand the folder `NutrientApp`, inside this folder there is another  folder with the same name. Expand it, then right click to add a new group, name it `Fonts`, copy all the items to this group you just copied from the node modules. 
    9. We need to bundle this `Fonts` folder when building the project. Please click the `NutrientApp`, on the topmost folder. On the right hand side will display all the settings and properties for the project. Please click on the `Build Phases` tap. Expand the `Copy Bundle Resources`, click the `+` sign to add the fonts. Browse the `Fonts` group. Then select the fonts (with the extension ttf). 
    10. Incase you don't see the `Copy Bundle Resources` or by mistake delete it. To add it, click the `+` sign on the top most. Then select `New Copy Bundle Resources Phase` to add it.
    11. Now everthing has setup. You can make a build and run on a iPhone simulator. To run click the `Product` from the menubar, and select `Run`. 
    12. For detail steps how to do it, check the below resource links.


## Middleware-Server

* The middleware server acts as an restAPI server which routes the SQL transactions and http requests to the backend SQL server. To start up the nutrient restAPI server please follow the below steps:

   1. At the `D:\` drive, type in the command: `git clone https://github.com/singluntang/Nutrient-Server.git` to clone the project repository.
   2. Navigate to the project root directory `D:\NutrientServer`
   3. Install the Package by typing `npm install`
   4. There are some configurations settings you need to filled in. From the root directory, open the file `server.js`. Fill in your configuration settings for mySQL server from line 31 to 36. For the server port, open the file config.js, to set the server port.


## Domain-Address-IP

* We need to config how our apps connects to our middleware server. There are 2 methods to use. One is by using a static IP, another is by a domain name.

* Static Ip
   1. If your company has the resources that owns a static IP. Then you can directly config the app to point to this static address where the server resides. To get the static IP of the server just type in `ipconfig` from the command prompt. 
   2. From the root directory `D:\NutrientAppComplete`, navigate to the directory `utils`. open the config.ts file. from the parameter `apiAddress`, fill in the static IP, fill in the server port also.

* Domain Address Staic IP Address
   1. If you want to use domain name to route the http requests to the middleware server. First thing you need a domain name and a static/dynamic IP address.
   2. For This project, I use a free domain name services provider `no-ip`, the link for the this site is `https://www.noip.com/`. This provider not only provides free domain names services, but also has a services of mapping domain names to IP address. 
   3. When you login the website, from the dashboard home page, on the left hand side, click the item `Dynamic DNS`, and then select `no-ip Hostname`.
   4. From the pop up window, fill in the hostname `nutrientapp` and the static IP address. Click create.
   5. From the project root direcotry, navigate to the folder `utils`, open the file `config.js`, fill in the parameter `apiAddress` of the value `nutrientapp.ddns.net`, also provides the server port.

* Domain Address dynamic IP Address
   1. If you are using a dynamic IP address, I assume you might be using a router. There are some steps to do in order to route the Http requests from the outside to your inside network. Each brand of router has different settings. But the main concept is `port-forwarding`. You can search the google or bing website of how to set the `port-forwarding` for your router.
   2. This settings is mainly to the router. you need to connect to your router and set the IP address including the port. For example if your dynamic IP address for your inside nutrient server network is `192.168.68.111:8088`, then you need to provide it for your router.
   3. For the no-ip website, you need to change acordingly, for the `nutrientapp.ddns.net`, please fill in the public IP address assigned by your ISP provider. To check your public IP address, type `what is my ip` in google search. 
   4. When the domain name is created. It maps to the public IP address you just created for the domain. When the router receive Https requests from the nutrient App, it figures out the port, by `port-forwarding`, through the router it transfer all the outside Https request to the internal network port that the server resides. That is how the `port-forwarding` works. One thing to mention, port must be unique through out your internal network.

    
## References

* Code References
    * [Udacity](https://www.udacity.com/)
    * [GitHub](https://github.com/)
    * [Nodejs](https://nodejs.org/en)
    * [Android Studio](https://developer.android.com/studio)
    * [Xammp](https://www.apachefriends.org/download.html)
    * [Xammp no Logout Button](https://stackoverflow.com/questions/16873448/logging-out-of-phpmyadmin)
    * [no-ip](https://www.noip.com/)
    * [Port Forwarding For Deco TP-Link Router](https://www.tp-link.com/hk/support/faq/1797/)
    * [React Native Vector Icons](https://www.npmjs.com/package/react-native-vector-icons)  
    * [How to use vector icons in your ios Project - React native](https://medium.com/@vimniky/how-to-use-vector-icons-in-your-react-native-project-8212ac6a8f06)  
