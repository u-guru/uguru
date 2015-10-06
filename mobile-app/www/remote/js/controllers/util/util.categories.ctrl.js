angular.module('uguru.util.controllers')

.controller('CategoriesController', [

  //All imported packages go here
  '$scope',
  '$state',
  '$timeout',
  '$localstorage',
  '$ionicPlatform',
  '$cordovaKeyboard',
  '$ionicModal',
  '$ionicTabsDelegate',
  '$ionicSideMenuDelegate',
  '$ionicGesture',
  'uTracker',
  'Category',
  'Utilities',
  function($scope, $state, $timeout, $localstorage, $ionicPlatform,
    $cordovaKeyboard, $ionicModal,$ionicTabsDelegate,
    $ionicSideMenuDelegate, $ionicGesture, uTracker,
    Category, Utilities) {

    if (!img_base || !img_base.length) {
      $scope.categories_img_base = 'remote/';
    } else {
      $scope.categories_img_base = img_base + 'remote/';
    }


    $scope.categories = Utilities.sortArrObjByKey(Category.categories, 'name');
    $scope.active_category = {name:'Select category', active:false};

    $ionicModal.fromTemplateUrl(BASE + 'templates/category.skills.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.categorySkillsModal = modal;
    });

    $scope.onSwipeDown = function() {
      alert('user swiped down')
    }
    $scope.onDragDown = function() {
      alert('user swiped down')
    }

    $scope.launchCategoryModal = function(category) {

      if($scope.active_category!==category){
        $scope.active_category = category;
        updateMainBackground($scope.categories_img_base + category.background_url);
      }

      uTracker.track(tracker, 'Category Modal', {
        '$Category': category.name
      });
      $scope.active_category.active = true;

      if(category.name === 'Photography') {


        console.log("height: " + (window.innerHeight / 3) );
          var options = {
            "direction"        : "up", // 'left|right|up|down', default 'left' (which is like 'next')
            "duration"         :  2500, // in milliseconds (ms), default 400
            "slowdownfactor"   :   1000, // overlap views (higher number is more) or no overlap (1), default 4
            "iosdelay"         :  60, // ms to wait for the iOS webview to update before animation kicks in, default 60
            "androiddelay"     :  70, // same as above but for Android, default 70
            "winphonedelay"    :  200, // same as above but for Windows Phone, default 200,
            "fixedPixelsTop"   :  189, // the number of pixels of your fixed header, default 0 (iOS and Android)
            "fixedPixelsBottom":   0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
          };
          
          $state.go('.photography');
          window.plugins.nativepagetransitions.slide(
                  options,
                  function (msg) {console.log("success: " + msg)}, // called when the animation has finished
                  function (msg) {alert("error: " + msg)} // called in case you pass in weird values
                );




      } else {
        $scope.categorySkillsModal.show();  
      }
      
    }

    var updateMainBackground = function(url) {
      var headerElem = document.getElementById('category-skills');
      cssString = "#category-skills:before {background: url(" + url + ") no-repeat center center/cover !important;}";

      style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet){
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(document.createTextNode(cssString));
      }

      headerElem.appendChild(style);

    }

    $scope.skillsModalDrag = function(e) {
      if (e.gesture.deltaY > 175) {
        $scope.categorySkillsModal.hide();
      }
    }

    var mapGuruCoursesToCategoriesObj = function(guru_courses) {
      guruCategoryCourses = [];
      for (var i = 0; i < guru_courses.length; i++) {
        var guru_course = guru_courses[i];
        guruCategoryCourses.push({
          name: guru_course.short_name || guru_course.name, //old data
          id: guru_course.id,
          active: true
        });
      }
      return guruCategoryCourses;
    }

    $scope.updateCategoryCount = function(category, subcategory, index) {

      category.active_subcategories += 1;
      Category.categories = $scope.categories;
      $localstorage.setObject('categories', $scope.categories);

      if (subcategory.active) {
        addGuruSubcategory(subcategory);
      }
      //set to false
      else {
        removeGuruSubcategory(subcategory);
      }


    }
    var addGuruSubcategory = function(subcategory) {
      $scope.user.updateAttr('add_guru_subcategory', $scope.user, subcategory, null, $scope);
    }

    var removeGuruSubcategory = function(subcategory) {
      $scope.user.updateAttr('remove_guru_subcategory', $scope.user, subcategory, null, $scope);
    }


    // $scope.static.categories = [
    //   {
    //     name: 'Academic Courses',
    //     db_name: 'academic',
    //     _class: 'bg-cerise',
    //     active:true,
    //     active_skills_count:0,
    //     skills: mapGuruCoursesToCategoriesObj($scope.user.guru_courses),
    //     bg_url: categories_img_base +'./img/categories/bg/academic.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/academic.svg'
    //   },
    //   {
    //     name: 'Freelancing',
    //     db_name: 'freelancing',
    //     _class: 'bg-orange',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Design", "Interview Help", "Resume Building", "Skill Building",
    //     "Website Building", "Professional Writing", "Programming Questions", "Internship Mentorship",
    //     "Beauty & Grooming"],
    //     bg_url: categories_img_base +'./img/categories/bg/consulting.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/consulting-small.svg'
    //   },
    //   {
    //     name: 'Baking',
    //     _class: 'bg-gold',
    //     db_name:'baking',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Cake", "Cupcakes", "Donuts", "Coffee", "Flan", "Cookies", "Brownies"],
    //     bg_url: categories_img_base +'./img/categories/bg/baking.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/baking-small.svg'
    //   },
    //   {
    //     name: 'Photography',
    //     db_name:'photography',
    //     _class: 'bg-moola',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Graduation Photos", "Professional Headshots", "Athletic & Action Images", "Outdoor & Scenery"],
    //     bg_url: categories_img_base +'./img/categories/bg/photography.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/photography-small.svg'
    //   },
    //   {
    //     name: 'Household',
    //     _class: 'bg-shamrock',
    //     db_name:'household',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Laundry", "Vacuuming", "House Cleaning", "Dishes", "Build Ikea Furniture"],
    //     bg_url: categories_img_base +'./img/categories/bg/household.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/household-small.svg'
    //   },
    //   {
    //     name: 'Technology & IT',
    //     db_name:'tech',
    //     _class: 'bg-azure',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Wifi setup", "Phone Screen Repair", "Computer Repair", "Virus Removal", "Software Setup"],
    //     bg_url: categories_img_base +'./img/categories/bg/tech.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/technology-small.svg'
    //   },
    //   {
    //     name: 'Sports & Muscle',
    //     db_name:'sports',
    //     _class: 'bg-lake',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Moving Help", "Team Sports", "Personal Trainer", "Weight Training", "Yoga", "Cardio Activities"],
    //     bg_url: categories_img_base +'./img/categories/bg/sports.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/sports-small.svg'
    //   },
    //   {
    //     name: 'On-demand Delivery',
    //     db_name:'delivery',
    //     _class: 'bg-eggplant',
    //     active: false,
    //     active_skills_count:0,
    //     skills: ["Food Delivery",
    //     "Car Sharing", "Truck Borrow", "Walgreens Run", "Chipotle, etc Run", "School Supplies",
    //     "Late Night Snack/Coffee"],
    //     bg_url: categories_img_base +'./img/categories/bg/delivery.jpg',
    //     icon_url: categories_img_base + './img/categories/icon/delivery-small.svg'
    //   }
    // ];

    //temporary --> will send objects from server eventually
    var convertSkillsToClientObj = function(categories) {
      var allButFirstCategories = categories.slice(1, categories.length);
      for (var i = 0; i < allButFirstCategories.length; i ++) {
        category = allButFirstCategories[i];
        skillsObjArr = [];
        for (var j = 0; j < category.skills.length; j++) {
          var skill = category.skills[j];
          skillsObjArr.push({
            name: skill,
            active: false
          })
        }
        category.skills = skillsObjArr;
      }
    }

    //temporary --> will send objects from server eventually

    // convertSkillsToClientObj($scope.static.categories);

  }


])