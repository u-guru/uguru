<div class="university-place-marker bg-academic splash-hero-marker" ng-class="{'active': state === 2}" ng-click="onMarkerClick()">
    <div class="marker-normal" ng-class="{'move': state === 1, 'hidden': state === 2}">
        <svg class="marker-normal-window" width="92px" height="89px" viewBox="0 0 184 178">
            <g fill="none" stroke-width="4" stroke="#b4b8ba" stroke-linecap="round" stroke-linejoin="round">
                <path class="side" d="M92,176 L122,146 L171.991129,146 C177.518876,146 182,141.532461 182,136.002779 L182,11.9972208 C182,6.47590822 177.527924,2 172.009493,2 L142,2"></path>
                <path class="side" d="M92,176 L62,146 L12.0088711,146 C6.48112423,146 2,141.532461 2,136.002779 L2,11.9972208 C2,6.47590822 6.47207592,2 11.9905068,2 L42,2"></path>
                <path class="open" d="M12,2 L92,2"></path>
                <path class="open" d="M171,2 L91,2"></path>
            </g>
        </svg>
        <div class="marker-normal-content">
            <a class="marker-link">
                <svg viewBox="0 0 100 100">
                    <path d="M69.7423747,43.7777778 L70.9810759,33.2165522 C71.0454426,32.667759 70.6517105,32.2222222 70.1015564,32.2222222 L30.1208189,32.2222222 C29.5676537,32.2222222 29.1768904,32.6673989 29.2412993,33.2165522 L30.4800005,43.7777778 L69.7423747,43.7777778 Z M66.8232158,68.6666667 L65.3760032,81.00567 C65.3115943,81.5548233 64.8075957,82 64.2513656,82 L35.9710096,82 C35.4142983,82 34.9107387,81.5544633 34.846372,81.00567 L33.3991595,68.6666667 L66.8232158,68.6666667 Z M25.0204167,23.4177221 C25.1554325,22.8801957 25.7197841,22.4444444 26.2683259,22.4444444 L73.3810662,22.4444444 C73.9352516,22.4444444 74.493207,22.8771997 74.6289754,23.4177221 L76.596021,31.2489446 C76.7310368,31.786471 76.3896116,32.2222222 75.8330941,32.2222222 L23.8162979,32.2222222 C23.2599292,32.2222222 22.9176027,31.789467 23.0533711,31.2489446 L25.0204167,23.4177221 Z M32.0394423,18.9425524 C32.2321699,18.4219951 32.8379488,18 33.3853073,18 L65.9466044,18 C66.4971775,18 67.1012808,18.426152 67.2924694,18.9425524 L68.2400219,21.5018921 C68.4327495,22.0224494 68.1375919,22.4444444 67.5961491,22.4444444 L31.7357626,22.4444444 C31.1874338,22.4444444 30.9007012,22.0182924 31.0918897,21.5018921 L32.0394423,18.9425524 Z M28.3485134,44.7688106 C28.2930377,44.2214783 28.6950797,43.7777778 29.2434991,43.7777778 L70.9785758,43.7777778 C71.5283385,43.7777778 71.9280703,44.2310173 71.8735615,44.7688106 L69.5518056,67.6756339 C69.4963299,68.2229662 69.0035795,68.6666667 68.456331,68.6666667 L31.7657433,68.6666667 C31.2162051,68.6666667 30.7247776,68.2134272 30.6702688,67.6756339 L28.3485134,44.7688106 Z"></path>
                </svg>
            </a>
            <a class="marker-guru" ng-if="state === 1">
                <span class="user-icon" style="background-image: url('{{mGuru.profile_url}}')"></span>
                <span class="marker-guru-course">{{mGuru.course_name}}</span>
            </a>
        </div>
    </div>
    <div class="marker-expanded">
        <svg class="marker-expanded-window" width="262px" height="267px" viewBox="0 0 524 534">
             <g fill="none" stroke-width="4" stroke="#b4b8ba" stroke-linecap="round" stroke-linejoin="round">
                  <path class="sides" d="M262,532 L232,502 L22.0086422,502 C10.9581743,502 2,493.042549 2,481.993992 L2,22.006008 C2,10.9569949 10.9569966,2 21.9941986,2 L182,2"></path>
                  <path class="sides" d="M262,532 L292,502 L501.991358,502 C513.041826,502 522,493.042549 522,481.993992 L522,22.006008 C522,10.9569949 513.043003,2 502.005801,2 L342,2"></path>
             </g>
        </svg>
        <div class="marker-expanded-content active">
            <div class="marker-expanded-icon">
                <svg viewBox="0 0 100 100">
                <path d="M69.7423747,43.7777778 L70.9810759,33.2165522 C71.0454426,32.667759 70.6517105,32.2222222 70.1015564,32.2222222 L30.1208189,32.2222222 C29.5676537,32.2222222 29.1768904,32.6673989 29.2412993,33.2165522 L30.4800005,43.7777778 L69.7423747,43.7777778 Z M66.8232158,68.6666667 L65.3760032,81.00567 C65.3115943,81.5548233 64.8075957,82 64.2513656,82 L35.9710096,82 C35.4142983,82 34.9107387,81.5544633 34.846372,81.00567 L33.3991595,68.6666667 L66.8232158,68.6666667 Z M25.0204167,23.4177221 C25.1554325,22.8801957 25.7197841,22.4444444 26.2683259,22.4444444 L73.3810662,22.4444444 C73.9352516,22.4444444 74.493207,22.8771997 74.6289754,23.4177221 L76.596021,31.2489446 C76.7310368,31.786471 76.3896116,32.2222222 75.8330941,32.2222222 L23.8162979,32.2222222 C23.2599292,32.2222222 22.9176027,31.789467 23.0533711,31.2489446 L25.0204167,23.4177221 Z M32.0394423,18.9425524 C32.2321699,18.4219951 32.8379488,18 33.3853073,18 L65.9466044,18 C66.4971775,18 67.1012808,18.426152 67.2924694,18.9425524 L68.2400219,21.5018921 C68.4327495,22.0224494 68.1375919,22.4444444 67.5961491,22.4444444 L31.7357626,22.4444444 C31.1874338,22.4444444 30.9007012,22.0182924 31.0918897,21.5018921 L32.0394423,18.9425524 Z M28.3485134,44.7688106 C28.2930377,44.2214783 28.6950797,43.7777778 29.2434991,43.7777778 L70.9785758,43.7777778 C71.5283385,43.7777778 71.9280703,44.2310173 71.8735615,44.7688106 L69.5518056,67.6756339 C69.4963299,68.2229662 69.0035795,68.6666667 68.456331,68.6666667 L31.7657433,68.6666667 C31.2162051,68.6666667 30.7247776,68.2134272 30.6702688,67.6756339 L28.3485134,44.7688106 Z"></path>
            </svg>
            </div>
            <div class="marker-location">
                <h1>{{mPlace.name}}</h1>
                <h4>open now &middot; {{mPlace.distance}} miles</h4>
            </div>
            <a class="marker-guru">
                <span class="user-icon" style="background-image: url('{{mGuru.profile_url}}')"></span>
                <div>
                    <h1>{{mGuru.name}}</h1>
                    <h3>Active {{mGuru.last_active_time}}</h3>
                    <svg viewBox="0 0 100 100">
                        <path d="M32,86 L68,50 L32,14"></path>
                    </svg>
                </div>
            </a>
            <div class="marker-message">
                <p>{{mGuru.message.greeting}},<br/>{{mGuru.message.body}}</p>
            </div>
        </div>
    </div>
    <div class="marker-circle"></div>
</div>