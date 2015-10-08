angular
.module('sharedServices')
.factory("RankingService", [
	RankingService,
		]);

function RankingService() {
	var recentlyUpdated = false;
	
	return {
		calcRanking: calcRanking,
		calcCredibility: calcCredibility,
		calcProfile: calcProfile,
		showPopover: showPopover,
		recentlyUpdated: recentlyUpdated
	}

	function showPopover(start, end) {
		var homeCenterComponent = document.getElementById('guru-home');
        var uguruPopup = document.getElementById('guru-ranking-popup');
       	var reverseAnimatePopup = cta(homeCenterComponent, uguruPopup, {duration:1},
            function (modal){
              modal.classList.add('show');
              setTimeout(function() {
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
		console.log('update .. attempting to set to', start / 100.0);
		circle.set(start / 100.0);
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

	function calcRanking(user) {
        var base = 25; //40%
        var num_items = 5;
        var max_points = 100;
        var guru_ranking;

        if (user.default_transfer_card) {
            base += 6
        }
        if (user.current_credibility_percent) {
            base += ((user.current_credibility_percent / 100.0) * 16);
        }
        if (user.current_profile_percent) {
            base += ((user.current_profile_percent / 100.0) * 22);
        }
        if (user.push_notifications || user.text_notifications) {
            base += 20;
        }
        if (user.deposit_confirmed) {
            base += 11;
        }
        return base - 1;
    }

	function calcCredibility(user) {
        var base = 0; //40%
        var num_items = 5;
        var default_item_weight = 20;
        var max_points = 100;

        if (user.fb_id) {
            base += default_item_weight;
        }
        if (user.transcript_file && user.transcript_file.url && user.transcript_file.url.length) {
            base += default_item_weight;
        }
        if (user.tutoring_platforms_description) {
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
        var base = 60; //40%
        var num_items = 8;
        var default_item_weight = 10;
        // var mini_item_weight = 2;
        var max_points = 170; //base (60) + (9 * 10) + (3 * 10)

        if (!user.is_a_guru) {
            return 0;
        }

        if (user.profile_url && (user.profile_url !== default_url)) {
            base += (2 * default_item_weight);
        }
        if (user.university_id && user.university.title) {
            base += default_item_weight;
        }
        if (user.majors && user.majors.length) {
            base += default_item_weight
        }
        if (user.guru_courses && user.guru_courses.length) {
            base += (2 * default_item_weight)
        }
        if (user.skype_friendly || user.facetime_friendly || user.hangouts_friendly || user.messenger_friendly || user.phone_friendly || user.text_friendly || user.email_friendly) {
            base += default_item_weight;
        }
        if (user.guru_languages && user.guru_languages.length) {
            base += default_item_weight;
        }
        if (user.guru_experiences && user.guru_experiences.length) {
            base += (2 * default_item_weight)
        }
        if (user.guru_introduction && user.guru_introduction.length) {
            base += default_item_weight;
        }
        var percentage = parseInt((base  / (max_points * 1.0)) * 100);

        return percentage;
    }


}
