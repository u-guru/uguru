**Setup**
- % npm install -g protractor
- % npm install jasmine-spec-reporter --save-dev
- % web-driver update

**Running**
- Open 3 tabs
- First Tab:
 - % Run You Local Host
 	- EX: % ionic serve
- Second Tab:
 - $ ws 
- Thrid Tab ( the one u gonna use for start the protractor)
- add following command to your bash
 ```run_all() { 
  protractor e2e_test/config/mobile.config.js --suite=major,course,category,photo  --params.screenSize.w "$1"  --params.screenSize.h "$2" 
} ```

 - $ protractor "Your Config Location" [--suite] [suite case]
  - EX :
  	- $ protractor protractor e2e_test/config/mobile.config.js
  	- $ protractor protractor e2e_test/config/mobile.config.js --suite workflow  
