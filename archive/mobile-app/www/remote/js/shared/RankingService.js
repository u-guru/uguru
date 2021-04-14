angular
.module('sharedServices')
.factory("RankingService", [
	RankingService,
		]);

function RankingService() {
  var isInit, progressCircle, recentlyUpdated,
  guruHomeProgressCircle, calcCredibility, calcProfile;
  var options = {};

	return {
		calcRanking: calcRanking,
		calcCredibility: calcCredibility,
		calcProfile: calcProfile,
		showPopover: showPopover,
    refreshRanking: refreshRanking,
		recentlyUpdated: recentlyUpdated,
    isInit: isInit,
    progressCircle: progressCircle,
    guruHomeProgressCircle: guruHomeProgressCircle,
    options:options
	}

	function showPopover(start, end) {
    var homeCenterComponent = document.getElementById('guru-home');
        var uguruPopup = document.getElementById('guru-ranking-popup');
       	var reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
            function (modal){
              modal.classList.add('show');
              recentlyUpdated = false;
              setTimeout(function() {
              	var spanPreviousInput = document.querySelector('#previous-guru-ranking');
                var spanCurrentInput = document.querySelector('#current-guru-ranking');
                spanPreviousInput.innerHTML = Math.round(start, 2) + 'th';
                spanCurrentInput.innerHTML = Math.round(end, 2) + 'th';
                initAndAnimateProgress('#guru-ranking-popup-progress-bar', start, end);
              }, 250);
            }
          );

        setTimeout(function() {
            var closeGuruRankingPopoverLinks = document.querySelectorAll('.close-guru-ranking-modal-link');
            for (var i = 0; i < closeGuruRankingPopoverLinks.length; i ++) {
                var indexLink = closeGuruRankingPopoverLinks[i];
                indexLink.addEventListener('click', function() {
                    var uguruPopup = document.getElementById('guru-ranking-popup');
                    uguruPopup.classList.remove('show');
                })
            }
        }, 500)


	}

	function initProgress(selector, start) {
		if (progressCircle) {
      return progressCircle;
    }

    elem = document.querySelector('#guru-ranking-progress-bar')
    if (elem) {
      return;
    }

    var circle = new ProgressBar.Circle(selector, {
              color: '#2B3234',
              strokeWidth: 8,
              trailWidth: 8,
              trailColor:'#69B3A5',
              duration: 1000,
              text: {
                  value: '0'
              },
              step: function(state, bar) {
                    var val = (bar.value() * 100).toFixed(0);
                    bar.setText(val);
              }
          });
		circle.text = document.getElementById('popup-percentile-ranking');
		circle.set(start / 100.0);
    progressCircle = circle;
		return circle;
	}

	function initAndAnimateProgress(selector, start, end) {
		var progressCircle = initProgress(selector, start);
		var index = start
          setInterval(function() {
              if (index >= end) {
                return
              }
              progressCircle.animate(index / 100, function() {

              });
              index ++
          }, 20);
	}

	function refreshRanking(user) {
    this.options.previousGuruRanking = Math.round(user.current_guru_ranking, 2);
    this.options.currentGuruRanking = Math.round(calcRanking(user), 2);

    if (this.options.previousGuruRanking !== this.options.currentGuruRanking) {
      if (guruHomeProgressCircle) {
        guruHomeProgressCircle.set(this.options.currentGuruRanking);
      }
      recentlyUpdated = true;
      user.current_guru_ranking = this.options.currentGuruRanking;
    }
  }

  function calcRanking(user) {
        var base = 25;
        var max_points = 100;

        // if (user.current_credibility_percent) {
            newCredibility = Math.round((calcCredibility(user) / 400.0), 2);
            base += newCredibility;
        // }
        // if (user.current_profile_percent) {
            newProfile = Math.round(calcProfile(user), 2)
            base += Math.round((newProfile / 2), 2);
        // }
        // cant ever get a hundo (unless premium ;) LOL
        if (base === 100) {
          base = 99;
        }
        return base;
    }

	function calcCredibility(user) {
        var base = 0;
        var num_items = 5;
        var default_item_weight = 20;
        var max_points = 100;
        if (user.fb_id) {
            base += default_item_weight;
        }
        if (user.transcript_file && user.transcript_file.url && user.transcript_file.url.length) {
            base += default_item_weight;
        }
        if (user.guru_experiences && user.guru_experiences.length) {
            base += default_item_weight;
        }
        if (user.school_email_confirmed) {
            base += default_item_weight;
        }
        if (user.phone_number_confirmed) {
            base += default_item_weight;
        }
        var percentage = parseInt((base  / (max_points * 1.0)) * 100);
        return percentage;
    }

	function calcProfile(user) {
        var default_url = "https://graph.facebook.com/10152573868267292/picture?width=100&height=100";
        var base = 0; //40%
        var num_items = 10;
        var default_item_weight = 10;
        var max_points = 100;

        // 1. university (Freebie)
        // 2. name (Freebie)
        // 3. Profile photo x2
        // 4. Guru Courses
        // 5. Departments
        // 6 Previous experiences
        // 7. Skills x2 (x1 for one category)
        // 8. Languages

        if (!user.is_a_guru) {
            return 0;
        }

        if (user.name && user.name.length) {
          base += default_item_weight;
        }

        if (user.university && user.university_id) {
          base += default_item_weight;
        }

        if (user.profile_url && (user.profile_url !== default_url)) {
          base += (2* default_item_weight);
        }
        if (user.guru_courses && user.guru_courses.length > 0) {
            base += default_item_weight;
        }
        if (user.majors && user.majors.length) {
            base += default_item_weight;
        }
        if (user.guru_experiences && user.guru_experiences.length) {
            base += default_item_weight;
        }
        if (user.subcategories && user.subcategories.length >= 2) {
            base += (2*default_item_weight);
        } else if (user.subcategories && user.subcategories.length === 1) {
            base += default_item_weight;
        }
        if (user.guru_languages && user.guru_languages.length) {
            base += default_item_weight
        }

        var percentage = parseInt((base  / (max_points * 1.0)) * 100);
        //update the home credibility progress if it exists
        return percentage;
    }


}
