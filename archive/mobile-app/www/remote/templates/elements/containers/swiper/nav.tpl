<html>
<head>
    <script data-semver="1.2.26" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
    <script data-semver="0.2.11" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/137412/angular-ui-router.js"></script>
</head>

<body ng-app="uguruSandbox">
    <div ui-view="main" class='full-xy flex-center-wrap bg-slate'>
        <nav class="circle-nav">
            <ul>
                <li>
                    <a>
                        <svg class="activate" draw-shapes viewBox="0 0 100 100">
                            <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle class="bg" cx="50" cy="50" r="49" fill="#8CA4B2"></circle>
                                <circle class="activate bg-slate" class-on-activate="fadeOut:animOut" class-on-activate-delay="3000" cx="50" cy="50" r="49" fill="#40484b"></circle>
                                <g fill="none">
                                    <circle class="outer" cx="50" cy="50" r="36"></circle>
                                    <circle class="inner" cx="50" cy="50" r="31"></circle>
                                    <circle class="base" cx="50" cy="50" r="2.5"></circle>
                                    <path d="M50,52.5 C51.3807119,52.5 52.5,51.3807119 52.5,50 C52.5,48.6192881 51.3807119,47.5 50,47.5 L62,50 L50,52.5 L50,52.5 Z" class="hour"></path>
                                    <path d="M52.5,50 C52.5,48.6192881 51.3807119,47.5 50,47.5 C48.6192881,47.5 47.5,48.6192881 47.5,50 L50,30 L52.5,50 Z" class="minute"></path>
                                </g>
                            </g>
                            <circle class="fade" cx="50" cy="50" r="49" fill="#637074" fill-opacity="0.6"></circle>
                        </svg>
                    </a>
                </li>
                <li>
                    <a>
                        <svg class="activate" draw-shapes draw-delay="500" viewBox="0 0 100 100">
                         <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle class="bg" cx="50" cy="50" r="49" fill="#A7CB94"></circle>
                                <circle class="activate bg-slate" class-on-activate="fadeOut:animOut" class-on-activate-delay="3000" cx="50" cy="50" r="49" fill="#40484b"></circle>
                                 <g>
                                     <path d="M66,37 C66,25 53.9231771,23.0175781 50,23.0175781 C46.0768229,23.0175781 34,25 34,37 C34,44.2400004 40.233724,47.8486582 50,49.3199997 C59.766276,50.7913411 66,54.0800018 66,61.3199997 C66,73.3199997 53.9231771,75.3024216 50,75.3024216 C46.0768229,75.3024216 34,73.3199997 34,61.3199997" class="s"></path>
                                     <path d="M52.5,13.6315789 L52.5,84.3684211" class="right"></path>
                                     <path d="M47.5,13.6315789 L47.5,84.3684211" class="left"></path>
                                </g>
                            </g>
                            <circle class="fade" cx="50" cy="50" r="49" fill="#637074" fill-opacity="0.6"></circle>
                        </svg>
                    </a>
                </li>
                <li>
                    <a>
                        <svg class="activate" draw-shapes draw-delay="1000" viewBox="0 0 100 100">
                            <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle class="bg" cx="50" cy="50" r="49" fill="#ED74B9"></circle>
                                <circle class="activate bg-slate" class-on-activate="fadeOut:animOut" class-on-activate-delay="3000" cx="50" cy="50" r="49" fill="#40484b"></circle>
                                <g>
                                    <path d="M67.4100346,76.7272727 L78.6487889,76.7272727" class="line"></path>
                                    <path d="M67.0588235,67.818182 L70.4705882,73.7575759 L73.8823529,67.818182 L73.8823529,23.6969697 L67.0588235,23.6969697 L67.0588235,67.818182 Z" class="pencil"></path>
                                    <rect class="spiral-3" x="21" y="62.7272727" width="10.2352941" height="5.09090909" rx="2.7925885"></rect>
                                    <rect class="spiral-2" x="21" y="48.3030303" width="10.2352941" height="5.09090909" rx="2.7925885"></rect>
                                    <rect class="spiral-1" x="21" y="33.8787879" width="10.2352941" height="5.09090909" rx="2.7925885"></rect>
                                    <path d="M60.2293235,23.6969697 L28.6815882,23.6969697 C27.2554706,23.6969697 26.1176471,24.8373333 26.1176471,26.2432727 L26.1176471,33.8787879 L28.6781765,33.8787879 C30.0906471,33.8787879 31.2352941,35.0208485 31.2352941,36.4242424 C31.2352941,37.8301818 30.0906471,38.969697 28.6781765,38.969697 L26.1176471,38.969697 L26.1176471,48.3030303 L28.6781765,48.3030303 C30.0906471,48.3030303 31.2352941,49.4450909 31.2352941,50.8484848 C31.2352941,52.2544242 30.0906471,53.3939394 28.6781765,53.3939394 L26.1176471,53.3939394 L26.1176471,62.7272727 L28.6781765,62.7272727 C30.0906471,62.7272727 31.2352941,63.8693333 31.2352941,65.2727273 C31.2352941,66.6786667 30.0906471,67.8181818 28.6781765,67.8181818 L26.1176471,67.8181818 L26.1176471,75.453697 C26.1176471,76.8655758 27.2657059,78 28.6815882,78 L60.2293235,78 C61.6562941,78 62.7941176,76.8596364 62.7941176,75.453697 L62.7941176,26.2432727 C62.7941176,24.8313939 61.6460588,23.6969697 60.2293235,23.6969697 L60.2293235,23.6969697 Z" class="notebook"></path>
                                </g>
                            </g>
                            <circle class="fade" cx="50" cy="50" r="49" fill="#637074" fill-opacity="0.6"></circle>
                        </svg>
                    </a>
                </li>
                <li>
                    <a>
                        <svg class="activate" draw-shapes draw-delay="1500" viewBox="0 0 100 100">
                            <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle class="bg" cx="50" cy="50" r="49" fill="#F0917E"></circle>
                                <circle class="activate bg-slate" class-on-activate="fadeOut:animOut" class-on-activate-delay="3000" cx="50" cy="50" r="49" fill="#40484b"></circle>
                                <g>
                                    <rect class="box-top" x="27.5" y="40.2" width="45" height="6.375"></rect>
                                    <rect class="box-bottom" x="27.5" y="74.625" width="45" height="6.375"></rect>
                                    <path d="M27.5,22.7725359 C27.5,22.0697337 28.0663448,21.5 28.7763808,21.5 L45.754717,21.5 L45.754717,30 L28.7763808,30 C28.0714552,30 27.5,29.4290924 27.5,28.7274641 L27.5,22.7725359 L27.5,22.7725359 Z" class="grip-left"></path>
                                    <path d="M54.245283,21.5 L71.2236192,21.5 C71.9285448,21.5 72.5,22.0709076 72.5,22.7725359 L72.5,28.7274641 C72.5,29.4302663 71.9336552,30 71.2236192,30 L54.245283,30 L54.245283,21.5 L54.245283,21.5 Z" class="grip-right"></path>
                                    <path d="M45.754717,22.4258298 C45.754717,21.9145081 46.1314575,21.6885796 46.5934483,21.9198316 L49.1612687,23.2051684 C49.6244872,23.437035 50.3767405,23.4364204 50.8387313,23.2051684 L53.4065517,21.9198316 C53.8697702,21.687965 54.245283,21.9099727 54.245283,22.4258298 L54.245283,29.0741702 C54.245283,29.5854919 53.8535064,29.8431152 53.3861867,29.6559796 L50.8590964,28.6440204 C50.3846305,28.4540232 49.6082234,28.4568848 49.1409036,28.6440204 L46.6138133,29.6559796 C46.1393475,29.8459768 45.754717,29.5900273 45.754717,29.0741702 L45.754717,22.4258298 Z" class="grip-center"></path>
                                    <path d="M47.4528302,29.8052083 L47.4528302,40.1645833" class="line-left"></path>
                                    <path d="M52.5471698,29.8052083 L52.5471698,40.1645833" class="line-right"></path>
                                    <rect class="box" x="29.6226415" y="46.575" width="40.754717" height="28.05"></rect>
                                </g>
                            </g>
                            <circle class="fade" cx="50" cy="50" r="49" fill="#637074" fill-opacity="0.6"></circle>
                        </svg>
                    </a>
                </li>
                <li>
                    <a>
                        <svg class="activate" draw-shapes draw-delay="2000" viewBox="0 0 100 100">
                            <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle class="bg" cx="50" cy="50" r="49" fill="#96C9C0"></circle>
                                <circle class="activate bg-slate" class-on-activate="fadeOut:animOut" class-on-activate-delay="3000" cx="50" cy="50" r="49" fill="#40484b"></circle>
                                <g>
                                    <path d="M25.172341,32.2403101 C25.172341,32.2403101 27.1895619,31.3410853 32.5688176,31.3410853 C37.9480734,31.3410853 39.9652943,32.2403101 39.9652943,32.2403101 L40.4135656,37.6356589 C40.4135656,37.6356589 37.5545227,33.5825612 32.5688176,33.5891473 C27.5831126,33.5825612 24.7240697,37.6356589 24.7240697,37.6356589 L25.172341,32.2403101 Z" class="grad-brim"></path>
                                    <path d="M18,30.8914729 L32.5688176,21 C32.4372936,21.0335834 47.1376353,30.8914729 47.1376353,30.8914729 L40.4135656,37.6356589 C40.4135656,37.6356589 37.0559084,33.6097838 32.5688176,33.6097838 C27.818678,33.6097838 24.7240697,37.6356589 24.7240697,37.6356589 L18,30.8914729 Z" class="grad-cap"></path>
                                    <path d="M25.844748,50.6744186 L32.5688176,55.620155 L39.2928873,50.6744186" class="person-left-collar"></path>
                                    <path d="M32.5688176,55.8449612 L32.5688176,63.0387597" class="person-left-buttons"></path>
                                    <path d="M18.4482713,79 C18.4482713,58.0352849 21.1363863,52.8868283 25.9166526,50.6526775 C24.0309797,48.8500449 22.8448857,46.2980553 22.8448857,43.4630269 C22.8448857,38.0185892 27.195606,33.5891473 32.5432832,33.5891473 C37.8909604,33.5891473 42.2416806,38.0185892 42.2416806,43.4630269 C42.2416806,46.2980553 41.0555867,48.8500449 39.1699138,50.6526775 C43.95018,52.8868283 46.6382951,57.4629512 46.6382951,79" class="person-left"></path>
                                    <path d="M61.7064529,50.6744186 L68.4305226,55.620155 L75.1545922,50.6744186" class="person-right-collar"></path>
                                    <path d="M68.4305226,55.8449612 L68.4305226,63.0387597" class="person-right-buttons"></path>
                                    <path d="M54.3099762,79 C54.3099762,58.0352849 56.9980913,52.8868283 61.7783575,50.6526775 C59.8926846,48.8500449 58.7065907,46.2980553 58.7065907,43.4630269 C58.7065907,38.0185892 63.0573109,33.5891473 68.4049881,33.5891473 C73.7526653,33.5891473 78.1033856,38.0185892 78.1033856,43.4630269 C78.1033856,46.2980553 76.9172916,48.8500449 75.0316187,50.6526775 C79.811885,52.8868283 82.5,57.4629512 82.5,79" class="person-right"></path>
                                </g>
                            </g>
                            <circle class="fade" cx="50" cy="50" r="49" fill="#637074" fill-opacity="0.6"></circle>
                        </svg>
                    </a>
                </li>
                <li>
                    <a>
                        <svg class="activate" draw-shapes draw-delay="2500" viewBox="0 0 100 100">
                            <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle class="bg" cx="50" cy="50" r="49" fill="#EACA8C"></circle>
                                <circle class="activate bg-slate" class-on-activate="fadeOut:animOut" class-on-activate-delay="3000" cx="50" cy="50" r="49" fill="#40484b"></circle>
                                <g>
                                    <path d="M57.7361111,31.4607843 L57.7361111,72.127451" class="3-left"></path>
                                    <path d="M57.7361111,31.4607843 L73.7083333,31.4607843" class="3-top"></path>
                                    <path d="M73.7083333,31.4607843 L73.7083333,72.127451" class="3-right"></path>
                                    <path d="M60.1319444,31.4607843 C60.1319444,29.3534358 61.2203471,27.2782619 63.1558499,26.377749 C62.3923516,25.651167 61.9121088,24.6225438 61.9121088,23.4798368 C61.9121088,21.2853627 63.6736909,19.5 65.8389352,19.5 C68.0041796,19.5 69.7657617,21.2853627 69.7657617,23.4798368 C69.7657617,24.6225438 69.2855189,25.651167 68.5220206,26.377749 C70.4575234,27.2782619 71.545926,29.1227469 71.545926,31.4607843" class="3-person"></path>
                                    <path d="M25.7916667,31.4607843 L25.7916667,72.127451" class="2-left"></path>
                                    <path d="M25.7916667,31.4607843 L41.7638889,31.4607843" class="2-top"></path>
                                    <path d="M41.7638889,31.4607843 L41.7638889,72.127451" class="2-right"></path>
                                    <path d="M28.1875,31.4607843 C28.1875,29.3534358 29.2759026,27.2782619 31.2114055,26.377749 C30.4479071,25.651167 29.9676644,24.6225438 29.9676644,23.4798368 C29.9676644,21.2853627 31.7292465,19.5 33.8944908,19.5 C36.0597351,19.5 37.8213172,21.2853627 37.8213172,23.4798368 C37.8213172,24.6225438 37.3410745,25.651167 36.5775761,26.377749 C38.513079,27.2782619 39.6014816,29.1227469 39.6014816,31.4607843" class="2-person"></path>
                                    <path d="M41.7638889,31.4607843 L41.7638889,72.127451" class="1-left"></path>
                                    <path d="M41.7638889,31.4607843 L57.7361111,31.4607843" class="1-top"></path>
                                    <path d="M57.7361111,31.4607843 L57.7361111,72.127451" class="1-right"></path>
                                    <path d="M44.1597222,31.4607843 C44.1597222,29.3534358 45.2481248,27.2782619 47.1836277,26.377749 C46.4201294,25.651167 45.9398866,24.6225438 45.9398866,23.4798368 C45.9398866,21.2853627 47.7014687,19.5 49.866713,19.5 C52.0319573,19.5 53.7935394,21.2853627 53.7935394,23.4798368 C53.7935394,24.6225438 53.3132967,25.651167 52.5497984,26.377749 C54.4853012,27.2782619 55.5737038,29.1227469 55.5737038,31.4607843" class="1-person"></path>
                                    <path d="M21,72.127451 L78.5,72.127451 L78.5,80.5 L21,80.5 L21,72.127451 L21,72.127451 Z" class="platform"></path>
                                </g>
                            </g>
                            <circle class="fade" cx="50" cy="50" r="49" fill="#637074" fill-opacity="0.6"></circle>
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>

        <div class="activate txt-center m30top full-x flex-center">
            <button class="activate btn-ghost-shamrock" ng-click='refreshDraw()'>
                <i class='icon ion-refresh'> </i>
            </button>
        </div>
    </div>
</body>
</html>