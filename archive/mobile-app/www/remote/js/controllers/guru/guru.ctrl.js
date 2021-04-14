angular.module('uguru.guru.controllers', [])

//ALL student controllers
.controller('GuruController', [
  //All imported packages go here
  '$scope',
  '$state',
  '$ionicPlatform',
  '$cordovaStatusbar',
  '$timeout',
  '$q',
  'University',
  '$localstorage',
  '$ionicSideMenuDelegate',
  '$ionicBackdrop',
  '$ionicViewSwitcher',
  '$ionicActionSheet',
  'RankingService',
  'TipService',
  'ModalService',
  'PopupService',
  '$ionicSlideBoxDelegate',
  'DeviceService',
  'LoadingService',
  '$ionicModal',
  'TourService',
  'ContentService',
  'Content',
function($scope, $state, $ionicPlatform, $cordovaStatusbar,
  $timeout, $q, University, $localstorage,
  $ionicSideMenuDelegate, $ionicBackdrop, $ionicViewSwitcher,
  $ionicActionSheet, RankingService, TipService, ModalService, PopupService,
  $ionicSlideBoxDelegate, DeviceService, LoadingService, $ionicModal, TourService,
  ContentService, Content) {

  $scope.refreshTipsAndRanking = function(user) {
    TipService.currentTips = TipService.generateTips(user);
    RankingService.refreshRanking(user);
  };

  $scope.profile = {edit_mode:true, showCredibility:false};
  console.log("USER",$scope.user)
  $scope.activePortfolioItem = {};

  if (!$scope.user.id) {
    $scope.user.profile_url = 'https://www.uguru.me/static/remote/img/avatar.svg';
  }

  $timeout(function() {
    $scope.guideContent = Content.getAll($scope.user);
    $scope.sidebar_content = {search_text:'', active_section:$scope.guideContent[0]}
  }, 1500)

  var CTA_PARENT_DICT = {
    'cta-box-profile':'#desktop-guru-home',
    'cta-box-credibility':'#desktop-guru-home',
    'cta-box-students': '#desktop-guru-home',
    'cta-box-balance': '#desktop-guru-home',
    'cta-box-profile-contact': '.pf-type',
    'cta-box-profile-experiences': '.pf-tab-container',
    'cta-box-profile-languages': '.pf-tab-container',
    'cta-box-profile-pi-item': '.pf-tab-item',
    'cta-box-profile-skills': '.pf-type',
    'cta-box-referrals': '#desktop-guru-home',
    'cta-box-ranking': '#desktop-guru-home',
    'cta-box-rating' :'#desktop-guru-home',
    'cta-box-support': '#desktop-guru-home',
    'cta-box-signup': '#desktop-guru-home',
    'cta-box-payments': '#desktop-balance',
    'cta-box-billing': '#desktop-guru-home',
    'cta-box-tour': '#desktop-guru-home',
    'cta-box-content': '#desktop-guru-home',
    'cta-box-proposals': '#desktop-guru-home'
  }

  $scope.launchCtaDict = {};
  $scope.closeCTADict = {};

  var CTA_OPTIONS = {
        duration:0.5,
        extraTransitionDuration:1
    }



  $scope.data = {university_banner: $scope.img_base + "./img/guru/university-banner.png"};
  $scope.root.vars.guru_rank_initialized = false;
  $scope.showActive = true;
  $ionicSideMenuDelegate.canDragContent(false);

  if ($state.current.name === 'root.guru' && $scope.desktopMode && $scope.autoRedirects) {
    $state.go('^.guru-home')
  }

  if ($state.current.name === 'root.guru-home' && !$scope.desktopMode && $scope.autoRedirects) {
    $state.go('^.guru')
  }

  // if ((!$scope.user || !$scope.user.id) || (!$scope.user.university_id && !$scope.user.university.id && $scope.autoRedirects)) {
  //   LoadingService.showAmbig('No university detected.. redirecting..', 3000);
  //   $timeout(function() {
  //     $state.go('^.splash');
  //   }, 1000)
  // }

  var actualRankingValue = $scope.user.guru_ranking;
  $scope.user.guru_ranking = 0;

  $scope.launchCTASignup = function() {
    document.getElementById('cta-box-signup').click();
  }

 Intercom('hide');

 $scope.launchSupport = function() {
    Intercom('boot', {
        app_id: "yoz6vu28",
        widget: {"activator": "#Intercom"}
      })
    Intercom('show');
    Intercom('onHide', function() {
      Intercom('shutdown');
    })
  }

  if ($scope.user) {
    TipService.currentTips = TipService.generateTips($scope.user); //mastercopy
    $scope.guruHomeTips = TipService.currentTips; //local copy
  }

  ModalService.init('signup', $scope);

  $scope.closeModal = function(modalName) {
    ModalService.close(modalName);
  };


  $scope.shiftCTAUnderneathPI = function($event) {
      return;
  }

  $scope.root.vars.guru_mode = true;
  $scope.guru_mode = true;
  $scope.page = {guru_ranking: 0};
  $scope.user.guru_ranking = $scope.user.guru_ranking || 75;
  $scope.showDesktopTranscriptModal = false;

  $scope.openModal = function(modalName) {
    ModalService.open(modalName, $scope);
  };



  $scope.goToDesktopGuruProfile = function() {
    $ionicViewSwitcher.nextDirection('enter');
    $state.go('^.desktop-guru-profile')
  }

  $scope.goToDesktopGuruCredibility = function() {
    $ionicViewSwitcher.nextDirection('enter');
    $state.go('^.guru-credibility');
  }
        var initGuruRankProgress = function(selector, color, fillColor, setValue) {
          // if (!$scope.selector) {
          //   $scope.selector = selector;
          // } else {
          //   return;
          // }

          // elem = document.querySelector('#guru-ranking-progress-bar')
          // if (elem) {
          //   return;
          // }

          var circle = new ProgressBar.Circle(selector, {
              color: color || "rgba(255,255,255,1)",
              strokeWidth: 8,
              trailWidth: 8,
              trailColor:fillColor || "rgba(255,255,255,0.3)",
              duration: 1000,
              text: {
                  value: '0'
              },
              step: function(state, bar) {
                  var val = (bar.value() * 100).toFixed(0);
                  if (setValue) {
                    bar.setText(val);
                  } else {
                    bar.setText('');
                  }
              }
          });
          circle.text = document.getElementById('percentile-ranking');
          RankingService.guruHomeProgressCircle = circle;
          return circle;
        }

        /*
        START CTA FUNCTIONS
        */
        function addEventListenerToCTABox(box_elem, modal_elem_id, index) {
            $scope.launchCtaDict[box_elem.id] = function() {
                var modal_elem = document.querySelector('#' + modal_elem_id);
                console.log("CHECK ", modal_elem)

                var closeCTAModal = cta(box_elem, modal_elem, CTA_OPTIONS, function() {

                    $timeout(function() {
                        modal_elem.classList.add('show');
                    }, 200);
                      var close_icon = modal_elem.querySelector('.cta-modal-close');
                      if (close_icon) {
                          close_icon.addEventListener('click', function() {

                          //add callbacks here
                          modal_elem.classList.remove('show');
                          closeCTAModal();
                        });
                      }
                }, CTA_PARENT_DICT[box_elem.id]);

              }
            box_elem.addEventListener('click', $scope.launchCtaDict[box_elem.id]);
        }

        function initCTA() {
            var allCTABoxes = document.querySelectorAll('.cta-box') || [];
            var allCTAModels = document.querySelectorAll('.cta-modal') || [];
            for (var i = 0; i < allCTABoxes.length; i++) {
                var indexCTABox = allCTABoxes[i];
                var indexCTAModalID = getModalCTAElemID(indexCTABox);
                addEventListenerToCTABox(indexCTABox, indexCTAModalID, i)

            }
        }

         function getModalCTAElemID(cta_box_elem) {
            elem_id = cta_box_elem.id;
            modalID = elem_id.replace('box', 'modal');
            return modalID;
        }

        /* END CTA FUNCTIONS*/


        var animateProgressCircle = function(circle ,percentage) {
          if (!circle) {
            return;
          }
          $scope.guruRankingCircleInitialized = true;
          var index = 0
          value = 0;
          setInterval(function() {
              if (index > percentage) {
                return
              }
              var value = index / 100
              if (value >= 50) {
                return;
              }
              circle.animate(value, function() {
                  $scope.page.guru_ranking = index
              });
              index ++
          }, 20);
        }

        var animateProgressLine = function(line, percentage) {
          var index = 0;
          setInterval(function() {
              if (index > percentage) {
                return;
              }
              line.animate(index / 100);
              if (index === 10) {
                $scope.showLoaders = true;
              }
              index ++;
          }, 20);
        }

        var initGuruHorizontalProgress = function(selector, percentTextId) {
          var textElem = document.getElementById(percentTextId);

          var line = new ProgressBar.Line(selector, {
              color: "rgba(255,255,255,1)",
              strokeWidth: 10,
              trailWidth: 10,
              trailColor:"rgba(255,255,255,0.3)",
              duration: 1000,
              text: {
                  value: '0'
              },
              step: function(state, bar) {
                  var val = (bar.value() * 100).toFixed(0);
                  bar.setText(val)
                // bar.setText((bar.value() * 100).toFixed(0));
              }

          });
          line.text = document.getElementById(percentTextId);
          return line;
      }

      $scope.launchEditPortfolioItemModal = function(portfolio_item) {
        if (portfolio_item) {
          portfolio_item.visible = true;
        }
        $scope.editPortfolioItemModal.show();
      }

      $scope.closeProfileModal = function() {
        $scope.profileModal.hide();
      }

      $scope.$on('modal.shown', function() {
          if ($scope.editPortfolioItemModal.isShown()) {

            $scope.closeEditPortfolioItemModal = function(desktop_portfolio_item) {
              $scope.editPortfolioItemModal.hide();
            }

          }

      })

        $scope.initMobileModals = function() {

          $ionicModal.fromTemplateUrl(BASE + 'templates/billing.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.billingModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/referrals.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.referralsModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/profile.modal.edit.mobile.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.editPortfolioItemModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/content.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.sidebar_content.active_section = null;
            $scope.contentModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/balance.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.balanceModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/profile.public.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.profileModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/ranking.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.rankingModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/credibility.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.credibilityModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/messaging.mobile.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.messagesModal = modal;
          });

          $ionicModal.fromTemplateUrl(BASE + 'templates/signup.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.signupModal = modal;
          });


        }

        $ionicModal.fromTemplateUrl(BASE + 'templates/support.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.supportModal = modal;
        });

        $scope.goBackToBecomeGuru = function() {
          if ($scope.root.vars.becomeGuruRecentlyCompleted) {
            $ionicViewSwitcher.nextDirection('back');
            $state.go('^.become-guru')
          }
        }

        $scope.initializeHorizontalProgressBars = function() {

          var guruCredibilityLine = initGuruHorizontalProgress('#guru-credibility-progress-bar', 'credibility-percent')

          if (!$scope.user.current_credibility_percent) {
            $scope.user.current_credibility_percent = 0.0;
          }
        }


		$scope.goBackToBecomeGuru = function() {
			if ($scope.root.vars.becomeGuruRecentlyCompleted) {
				$ionicViewSwitcher.nextDirection('back');
				$state.go('^.become-guru')
			}
		}

    $scope.showEditPortfolioItem = function(portfolio_item) {
      $scope.root.vars.hide_edit_button = true;
        if ($scope.desktopMode) {
            $timeout(function() {
              $scope.$apply();
            }, 100)
            if (portfolio_item) {
              portfolio_item.visible = true;
            }
        } else {

          if (portfolio_item) {

            portfolio_item.visible = true;
            $scope.portfolio_item = portfolio_item;
          }

          $scope.launchEditPortfolioItemModal(portfolio_item);
        }

    }




		$scope.initializeHorizontalProgressBars = function() {

			var guruCredibilityLine = initGuruHorizontalProgress('#guru-credibility-progress-bar', 'credibility-percent')

			if (!$scope.user.current_credibility_percent) {
				$scope.user.current_credibility_percent = 0.0;
			}

			animateProgressLine(guruCredibilityLine, $scope.user.current_credibility_percent, 0);

			var guruProfileLine = initGuruHorizontalProgress('#guru-profile-progress-bar', 'profile-percent');

			$scope.user.current_profile_percent = RankingService.calcProfile($scope.user);
			animateProgressLine(guruProfileLine, $scope.user.current_profile_percent || 40);

			var guruHourlyLine = initGuruHorizontalProgress('#guru-hourly-progress-bar', 'hourly-rate');
			animateProgressLine(guruHourlyLine, $scope.user.current_hourly || 10);

		}


		var haveProgressBarsBeenInitialized = function() {
			return document.querySelectorAll('.progressbar-text').length > 1;
		}


		var initAndLaunchWelcomePopup = function() {

			var openPopover = function() {

				function callback() {
					PopupService.close('welcomeGuru');
				}

				PopupService.open('welcomeGuru', callback, document.querySelector('.guru-tip-of-day-slide-box'));


			}

			PopupService.init('welcomeGuru', 'guru-uguru-popup', openPopover);

		}

		var checkIsFirstTimeGuruMode = function(is_first_time) {
			if (is_first_time) {
				appOnboardingObj = {
					guruWelcome: true
				}

				$timeout(function() {
					initAndLaunchWelcomePopup();
				}, 1000);
				$localstorage.setObject('appOnboarding', appOnboardingObj);

			} 
		}


		$scope.goToStateWithTransition = function(state_name, transition) {
			if (!$scope.user.id) {
				LoadingService.showAmbig();

				//make it feel like its coming... when really its just signup ;)
				$timeout(function() {
					$scope.openModal('signup');
					LoadingService.hide(100);
				}, 1000)
				return;
			}
			$ionicViewSwitcher.nextDirection(transition);
			$state.go(state_name);
		}



		$scope.showBalanceModal = function() {
			if ($scope.user && $scope.user.id) {
				$scope.balanceModal.show()
			} else {
				LoadingService.showMsg('You need an account to do that!', 2500,
					function() {
						$scope.signupModal.show()
					}
				)
			}
		}

		$scope.showProfileModal = function() {
			if ($scope.user && $scope.user.id) {
				$scope.profileModal.show();
			} else {
				LoadingService.showMsg('You need an account to do that!', 2500)
			}
		}
    $scope.showRankingModal = function(){
      if($scope.user && $scope.user.id){
        $scope.rankingModal.show();
      }else{
        LoadingService.showMsg('You need an account to do that!', 2500)
      }
    }

		$scope.showCredibilityModal = function() {
			if ($scope.user && $scope.user.id) {
				$scope.credibilityModal.show();
			} else {
				LoadingService.showMsg('You need an account to do that!', 2500)
			}
		}
    $scope.showBillingModal = function()
    {
      if ($scope.user && $scope.user.id) {
        $scope.billingModal.show();
      } else {
        LoadingService.showMsg('You need an account to do that!', 2500)
      }
    }
		$scope.$on('$ionicView.loaded', function() {
			$scope.root.vars.showDesktopSettings = false;
		})

		$scope.$on('$ionicView.enter', function() {
			$scope.root.vars.showDesktopSettings = false;

			$timeout(function() {
				if ($scope.desktopMode) {
					initCTA();
				}
			}, 0)

			$timeout(function() {
				if ($scope.desktopMode && !$scope.guruRankingCircle) {
					$scope.guruRankingCircle = initGuruRankProgress('#guru-ranking-progress-bar', null, null, true);
					$timeout(function() {
						if (!$scope.guruRankingCircleInitialized) {
							animateProgressCircle($scope.guruRankingCircle, $scope.user.guru_ranking);
						}
					}, 2500)
				}

			}, 0)

			//desktop version but not loggedd in
			$timeout(function() {
				if ($scope.desktopMode) {
					appOnboardingObj = $localstorage.getObject('appOnboarding');
					if (!appOnboardingObj) {
						$scope.launchCtaDict['cta-box-tour']();
						appOnboardingObj = {
							guruWelcome: true
						}
						$localstorage.setObject('appOnboarding', appOnboardingObj);
					}
					// $timeout(function() {
					//   if (!$scope.root.vars.page_cache.showSignupCTA) {
					//     $scope.root.vars.page_cache.showSignupCTA = true;
					//     $scope.launchCtaDict['cta-box-signup']();
					//     $localstorage.setObject('page_cache', $scope.root.vars.page_cache);
					//   }
					//   LoadingService.hide();
					// }, 2000)
				}
			}, 250)


			$timeout(function() {
				if (!$scope.desktopMode) {
					$timeout(function() {
						$scope.initMobileModals();
					}, 1500)
					$timeout(function() {
						$scope.guruRankingCircle = initGuruRankProgress('#guru-ranking-progress-bar', null, null, true);
						animateProgressCircle($scope.guruRankingCircle, $scope.user.guru_ranking);
					}, 1500)
				}
			});
		});

		// $timeout(function() {$scope.contentModal.show()}, 3000);

		var launchWelcomeToGuruMode = function() {
			$timeout(function() {
				appOnboardingObj = $localstorage.getObject('appOnboarding');
				if (!appOnboardingObj) {
					checkIsFirstTimeGuruMode(true);
				}
			}, 250)
		}


	}

]);