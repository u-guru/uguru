**Setup**
- % npm install -g protractor
- % npm install jasmine-spec-reporter --save-dev
- % web-driver update

**Running**
- Open 3 tabs
 - % zsh
 - % source ~/.bash_profile 
 - % um 
- First Tab:
 - % Run You Local Host
 	- EX: % ionic serve
- Second Tab:
 - $ ws 
- Thrid Tab ( the one u gonna use for start the protractor)
 - $ protractor "Your Config Location" [--suite] [suite case]
  - EX :
  	- $ protractor protractor e2e_test/config/mobile.config.js
  	- $ protractor protractor e2e_test/config/mobile.config.js --suite workflow  
**Thrid Tab ( the one u gonna use for start the protractor)**
-	

**Onboarding Test :**
- Commands : 
	- run enitered test :
		- %po
- Options (for running Specific test case)
 - Swipping Test :
	- %po --suite s               
 - Backgroud Test (Student, Professional, HS student):
	- %po --suite bg              
 - Manuel Choose University test:
	- %po --suite m               

**Log Test :**
- Commands : 
	- run enitered test :
		- %pe
- Options (for running Specific test case)
 - Log in Test :
	- %pe --suite l  
 - Sign up Test:  
	- %pe --suite s   

**Facebook Test :**
- Commands : 
	- run enitered test :
		- %pf
- Options (for running Specific test case)
 - Log in Test :
	- %pe --suite l  
 - Sign up Test:  
	- %pe --suite s   

 **Guru Edit Profile Test :**
- Commands : 
	- run enitered test :
		- %pgp
- Options (for running Specific test case)
 - CourseTest :
	- %pe --suite c  
 - Major Test:  
	- %pe --suite m   
 - Name Test:  
	- %pe --suite n   
 - Pay Test :
	- %pe --suite p  
 - Picture Test:  
	- %pe --suite pic   
 - Schoo; Test :
	- %pe --suite s  
 - Schedules Test:  
	- %pe --suite sch  

 **Workflow Test :**
- Commands : 
	- run enitered test :
		- %pw
- Options (for running Specific test case)
 - Workflow I & II : (It will run workflow I, After I is finish it will contiue run workflow II)
	- %pw --suite workflow
 - Workflow one : 
	- %pw --suite one
 - Workflow two : (If you just wanna test add new card and set it to default then just run this)  
	- %pw --suite two