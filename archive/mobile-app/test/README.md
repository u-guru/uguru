**Setup**
- % npm install -g protractor
- % npm install jasmine-spec-reporter --save-dev
- % webdriver-manager update
- [For Safari Testing] Download SafariDriver
  - % http://selenium-release.storage.googleapis.com/2.45/SafariDriver.safariextz

- add following script to your bash

```
run_test() { 
	if [ "$1" != "" ] && [ "$2" != "" ];then
	  protractor e2e_test/config/mobile.config.js --suite=all --params.screenSize.w "$1"  --params.screenSize.h "$2" 
	else
	  protractor e2e_test/config/mobile.config.js --suite=all 
	fi
}

 ```


**Running**

Open 3 tabs
- First Tab:
 - % Run You Local Host
 	- EX: % ionic serve
- Second Tab:
 - $webdriver-manager start

- Thrid Tab ( the one u gonna use for start the protractor)
- Run Following Command (default Window Size 414 * 736)
   - % run_test() Width[Option] Height[Option] 

For Developer:
 - $ protractor "Your Config Location" [--suite] [suite case]
  - EX :
  	- $ protractor protractor e2e_test/config/mobile.config.js
  	- $ protractor protractor e2e_test/config/mobile.config.js --suite workflow  

**Performance Testing**

https://github.com/axemclion/protractor-perf
```
npm install -g protractor-perf
 ```
