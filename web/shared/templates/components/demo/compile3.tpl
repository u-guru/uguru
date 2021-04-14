<view size='100' abs top='0' left='0' width='100%' height='100%'>
    <!-- uncomment this below to get loader -->


    <!-- main has a full page loader as well, not sure if its needed..  it imports from     ui/templates/components/base/main.tpl or you can provide your own view.

    Think of the loader use case for the main element to be the "entrance" && assume that the loader='' imported URL could be the same size
    -->
    <!-- url='./ui/templates/samples/visualizer/components/viz-bar-components.tpl' -->



    <imports>

        <import-dict>
            {
                "logo": "shared/static/images/logo.png",
                "tabs": ["about", "programs", "story", "clients", "shop", "more"],
                "tabIndex": 1,
                "section1logo": "http://www.iheartmylife.com/wp-content/uploads/2016/08/homepage-2.jpg",
                "modalBg": "http://www.iheartmylife.com/wp-content/uploads/2016/08/subscribe-1.jpg",
                "rgbaPurp": "rgba(98, 24, 114, 1)",
                "rgbaPurpLite": "rgba(98, 24, 114, 0.4)",
                "sidebar": {
                    "top": {
                        options: ["Story", "Programs", "Shop", "Clients", "#IHEARTMYLIFE", "Blog", "Press"]
                    },
                    "bottom": {
                        "options": ["FAQ", "Member Login", "Become a Member", "Privacy + Terms", "Contact"]
                    }
                }
            }

        </import-dict>
        <!-- <import-fonts f-f="CervoW01-Medium" url="s3-us-west-1.amazonaws.com/ui-guru/fonts/Cervo-W01-Medium" ext="eot,eot?#iefix|embedded-opentype,woff2,woff,ttf|truetype,svg#cervow01-Medium|svg"></import-fonts> -->
        <import-font f-f="Cervo Light" url="s3-us-west-1.amazonaws.com/ui-guru/fonts/cervo/light/Cervo-W01-Light.woff2" ext="eot,eot?#iefix|embedded-opentype,woff2,woff,ttf|truetype,svg#cervow01-Medium|svg"></import-font>
        <import-font f-f="brandon-grotesque" url="s3-us-west-1.amazonaws.com/ui-guru/fonts/brandon_g/BrandonGrotesque-Medium.woff" ext="eot,eot?#iefix|embedded-opentype,woff2,woff,ttf|truetype,svg#cervow01-Medium|svg"></import-font>
        <attr-value-set font="font-family:'brandon-grotesque', Helvetica, Arial, sans-serif;letter-spacing:1px;font-size:11px;font-weight:600;color:rgba(0,0,0,0.766); as nav-text"> </attr-value-set>

        <attr-value-set txt="text-transform:uppercase;letter-spacing:1px;padding:8px 0px;font-size:12px as sz-one"> </attr-value-set>
        <attr-value-set txt="text-transform:uppercase;letter-spacing:1px;padding:8px 0px;font-size:12px as sz-one-bold"> </attr-value-set>
        <attr-value-set txt="text-transform:uppercase;line-height:1.5;font-family:Cervo Light;letter-spacing:1px;font-size:24px as sz-two"> </attr-value-set>
        <attr-value-set color="color:rgba(98,24,114,0.4); as purp-lite"> </attr-value-set>
        <attr-value-set bg="background:#621872; as purp"> </attr-value-set>
        <attr-value-set bg="background:#621872;opacity:0.5 as purp-lite"> </attr-value-set>
    </imports>



    <components>
        <background-img image='var' width='string' list='bool' >
            <div width='{{width}}' grow='10' x='left' f-w='900' pointer  u init-with="p:[opacity:0]" on-init="a:[fadeInDown:750:linear:50:1:f]" height='100%' x-stretch y='center' height='80%' bg-image="{{image}}"> </div>
        </background-img>
        <tab item="string" index='number' >
            <li  pointer font-nav-text class='uppercase' scroll-ref="#{{item}}" txt-sz-one-bold opacity='0.5'  x='center' init-with="p:[opacity:0]|e:[set:view.data.tabWidth:me.rect.width]"  u on-init="a:[fadeInDown:1000:linear:{{index * 50 + 400}}:1:f]" on-mouseleave="p:[color:unset]" on-mouseover="p:[color:rgba(98, 24, 114,0.8)]" when-view-loader-complete="p:[opacity:0.5]" on-click="e:[set:view.data.tabIndex:{{index}}]|s:[tab-index-changed:public]"> {{item}} </li>
        </tab>
        <heart-icon>
            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="{{color}}">
                <path d="M30.5307935,20.4928007 C26.3063917,20.4928007 22.0809823,22.1374151 18.849194,25.3409869 C12.383602,31.8055712 12.383602,42.2385939 18.849194,48.6749618 L27.2425724,57.0663247 L49.4146352,79.2948203 C49.7270313,79.5779923 50.2661665,79.5779923 50.5493385,79.2948203 L72.7788419,57.065317 L81.1712125,48.673954 C87.6095958,42.2375862 87.6095958,31.8045635 81.1712125,25.3399792 C74.707636,18.9046191 64.301822,18.9046191 57.83623,25.3399792 L50.0102033,33.1932146 L42.1841765,25.3399792 C38.9523883,22.1374151 34.756203,20.4928007 30.5307935,20.4928007 L30.5307935,20.4928007 L30.5307935,20.4928007 Z" stroke="rgba(108,24,124, 0.5)" fill="rgba(108,24,124, 0.5)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
            </svg>
        </heart-icon>
        <close-icon>
            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" init-with="p:[transform:rotate(90deg)]">
                <g stroke="#FFFFFF" stroke-width="3" fill="#FFFFFFF" stroke-linecap="round" stroke-linejoin="round">
                    <polyline stroke-width="5px" points="26 38 50 14 74 38"></polyline>
                </g>
            </svg>
        </close-icon>
        <close-modal-icon>
            <div size='50px' abs right='0' top='0' m='25px' pointer>
                <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" init-with="p:[transform:rotate(90deg)]">
                    <g stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline stroke-width="6px" points="25 38 50 14"></polyline>
                        <polyline stroke-width="6px" points="50 38 26 14"></polyline>
                    </g>
                </svg>
            </div>
        </close-modal-icon>

        <guide-icon>
            <div z='4' size='60px' z='1000' fixed height='50px' width='50px' class='round' right='25px' bg-purp bottom='50px' u init-with="p:[transform:rotate(180deg)]" style='box-shadow: -3px -3px 6px rgba(0, 24, 114, 0.5)' on-click="s:[tab-index-changed:public]" scroll-ref="#{{view.data.tabs[view.data.tabIndex]}}" pointer on-mouseover="p:[opacity:0.5]"  ng-click="view.data.tabIndex=(view.data.tabIndex+1)%5" when-scroll-content-changes="a:[rotate:180deg:{{360*view.data.tabIndex*180%180}}deg:250:linear:1000:1:f]" on-mouseleave="p:[opacity:1]" >
                <svg viewBox="0 -15 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline stroke-width="5px" points="26 38 50 14 74 38"></polyline>
                    </g>
                </svg>
            </div>
        </guide-icon>
        <modal-input label="string" placeholder="string">
                <div class="p20x radius-2 bg-white" grow='1'
                                    u init-with="p-op">
                    <fieldset class="input-basic border-1-bottom border-solid border-charcoal">
                        <label class="txt-taupe uppercase">
                            {{label}}</label>
                        <input bg='smoke' class='txt-charcoal' type="text" placeholder="{{placeholder}}"/>
                    </fieldset>
                </div>
        </modal-input>
        <title-text header='string'>
            <div grow='1' m-y='20' y='center' f-f="Cervo Light" f-s='36px' l-h="1.5em">
                {{header}}
            </div>
        </title-text>

        <view-loader>
            <div abs width='100' z='100' bg='white' height='100' x='center' y='center' u on-init="a:[opacity:1:0:1250:easeOutQuint:2500:1:f,z-index:100:-1:1:linear:3000:1:f]|send:[ease-out-loader:depth(1):1750]">
                <div height='5%' width='5%'   m-width='100px' m-height='100px'  u on-init="a:[scale:1:1.1:200:easeOutSine:0:10:a]" when-ease-out-loader="a:[scale:1:0:750:easeOutQuint:500:1:f]|s:[view-loader-complete:public]:+3500">
                    <heart-icon> </heart-icon>
                </div>
            </div>
        </view-loader>
        <cursive-signature url='string'>
            <div grow='1' x='center' y='center' width='100' u init-with='p:[transform:scale(0.6)]' bg-image="{{url}}" basis="25%">
            </div>
        </cursive-signature>
    </components>

    <main grow='1' height='100%' width='100%' x='center' y='center' column nowrap>
            <!-- <view-loader></view-loader> -->

             <nav x='center' y='center' id='main-nav' bg='smoke'  class='txt-charcoal' height='15%' width='100%' relative>

                <ul row width='100' u when-view-loader-complete="s:[animate-nav:depth(1)]" relative>

                        <background-img z='0' scroll-ref="main"  image='view.data.logo' > </background-img>



                        <div grow='10'  row x='center' y='center' column wrap>

                            <div grow='10' x='center' y='center' row  width='100'>
                                <tab item='{{tab}}' grow='1' desktop column y='center' x='end'  class='tab-{{$index}}' index='{{$index}}' u-list="tab in view.data.tabs"> </tab>
                            </div>

                        </div>


                    <li f-w='700' f-s='18px' class='uppercase' opacity='0.5' grow='4' x='center'>
                        <div grow='3' f-s='14'  x='right' column pointer u  on-mouseover="p:[color:rgba(98, 24, 114,0.8)]|s:[draw-underline-cta:children]" on-mouseleave="p:[color:unset]|s:[draw-out-cta:children]"  on-click="s:[open-modal:public]">
                            <span grow='9' p-y='10px' u init-with="p:[opacity:0]" on-init="a:[fadeInDown:1000:linear:800:1:f]" l-s="1px" txt-sz-one-bold f-w="700">Become a Member</span>
                            <span relative height='2px' width='50%'>
                                <span abs height='100' width='100' left='0' when-draw-underline-cta="a:[scaleX:0:1:250:easeOutCubic:0:1:f]"
                                    when-draw-out-cta="a:[scaleX:1:0:250:easeInCubic:0:1:f]"
                                 u init-with="p:[transform:scaleX(0)]" bg-purp-lite>
                                </span>
                            </span>
                        </div>
                        <div height='30px' init-with="p:[opacity:0]|e:[set:sideBarActive:0]" u width='30px' m-right='20px' pointer on-click="s:[open-sidebar:public]"  on-init="a:[fadeInDown:1250:linear:850:1:f]" pointer on-mouseover="s:[menu-mouseover:depth(1)]" on-mouseleave="s:[menu-mouseleave:depth(1)]">
                            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" u when-menu-mouseleave="p:[stroke:black]" stroke="black" when-menu-mouseover="p:[stroke:rgba(98, 24, 114,0.8)]">
                                <g fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14,23 L86,23"></path>
                                    <path d="M14,50 L86,50"></path>
                                    <path d="M14,77 L86,77"></path>
                                </g>
                            </svg>
                        </div>
                    </li>
                </ul>
            </nav>
            <content grow='1' bg='white'  x='center' overflow-hidden y='center' max-height='85%' width='100%' column u >
                <div size='100' scroll-y  scrollable="content|y" id='scroll-container'>
                    <section width='100' id='{{view.data.tabs[0]}}' txt='charcoal' x='center' height='92.5' y='center' relative>
                        <background-img abs height='100%' width='100%' on-init='a:[translateX:500px:0px:500:linear:1000:1:f, opacity:0:1:500:linear:1000:1:f]' image='view.data.section1logo'> </background-img>
                        </background-img>

                        <div abs z='1' bg="transparent" height='100' width='100%' left='0' top='0'>
                            <div grow='1'  column class='txt-charcoal' width='50%' p='5%' column wrap>
                                <div y='center' width='200px' height='120px'  bg-image="http://www.iheartmylife.com/wp-content/themes/ihml/img/logo@2x.png">
                                </div>
                                <div x='start' p='10%'  basis='50%'>
                                    <div grow='1' m-y='20' y='center' f-f="Cervo Light" class='uppercase' f-s='48px' l-h="1.5em">
                                        Create a life and business better than your dreams
                                    </div>

                                </div>
                                <div x='start' p='0% 10%'>
                                    <div class='uppercase' grow='1' width='100%' init-with="p:[opacity:0]" u on-init="a:[translateX:-100%:0%:250:easeInCirc:1000:1:f, opacity:0:1:250:easeOutCirc:2000:1:f]" txt-sz-one f-w='700' f-s='18'>
                                        Get Started Now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- quote-->
                    <section width='100' id='{{::view.data.tabs[1]}}' height='100' relative  bg='white' p='40px' relative desktop>

                            <div  z='0' size='100' bg='charcoal' bg-image="http://www.iheartmylife.com/wp-content/uploads/2016/08/Emily_about.jpg">
                            </div>
                            <div z='1' abs bg='transparent' size='100' p='6.6% 10%'  right='0' top='0' row-reverse>
                                <div basis='33%' p-x='3.3%'  column x='center' y='center' bg='white' class='txt-charcoal'>
                                    <div grow='1' x='center' y='end' p='10px'>
                                        <heart-icon desktop height='30px' width='30px'></heart-icon>
                                        <heart-icon mobile height='30px' width='30px'></heart-icon>
                                    </div>
                                    <div grow='1' class='uppercase' f-f="Cervo Light" f-s='36px' color='black' f-w='semibold' x='center' y='center'>
                                        I heart my life
                                    </div>
                                    <div grow='1' x='center' y='center'>
                                        <span txt-sz-one class='txt-center'>
                                            I’M EMILY WILLIAMS, AND I’M JUST A GIRL FROM OHIO WITH REALLY BIG DREAMS.
                                        </span>
                                    </div>
                                    <div grow='1' x='center' y='center' f-f='"SavoyRoman", Georgia, serif' f-s='14px'>
                                        I’m also a Leading Success Coach and the Founder of I Heart My Life, a 7-figure coaching business where I work with extraordinary female entrepreneurs just like you. My mission is to support you in making more money, attracting more clients
                                    </div>

                                    <div grow='1' x='right' y='center' column width='100'>
                                        <button width='66' x='center' bg-purp basis='10%' on-mouseover=""  f-s='14px' l-s='1px' f-w='600' class='launch-modal uppercase txt-white'>Launch</button>
                                    </div>
                                </div>
                            </div>
                    </section>
                    <section width='100' txt='charcoal' bg='smoke' height='90' x='center' id='{{::view.data.tabs[1]}}' u relative>
                        <div column wrap x='center' y='stretch' height='60' u on-init='s:[anim-content-in:children:linear-500]' >
                            <div grow='1' x='center' y='start' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                <heart-icon  desktop height='50px' width='50px'></heart-icon>
                                <heart-icon column mobile height='30px' width='30px'></heart-icon>
                            </div>
                            <header f-s='40px' desktop m-f-s="18px" m-l-h="1em" l-h='2em' grow='4' m-grow='6' column class='uppercase text-center txt-charcoal' column x='center' y='center' >
                                <line u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                    “I’VE TRIPLED MY EMAIL LIST, AND I EARNED $15K
                                </line>
                                <line u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                    LAST MONTH! I CAN’T EVEN BELIEVE THAT THIS IS MY
                                </line>
                                <line u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                    REALITY.”
                                </line>
                            </header>
                            <header mobile  f-s="16px" f-w='600' l-h="1em" l-h='2em' grow='4' column class='uppercase text-center txt-charcoal' column x='center' y='center' op='0.8'>
                                <line u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                    “I’VE TRIPLED MY EMAIL LIST, AND I EARNED $15K LAST MONTH!
                                </line>
                                <br>
                                <br>
                                <line u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                    I CAN’T EVEN BELIEVE THAT THIS IS MY. REALITY.
                                </line>
                            </header>
                            <div grow='3' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]" class='uppercase text-center' x='center' y='top' op='0.8' m-f-s='14px'>
                                - Rachel McMichael, The TechSpert
                            </div>
                        </div>
                    </section>
                    <!-- <section width='100' id='{{::view.data.tabs[1]}}' height='110' relative  bg='slate' desktop>
                        <div width='100' x='center' y='center' column>
                            <div grow='1' height='60' width='100%' x='center' y='center' p='5% 5% 0% 5%' row u init-with='p:[opacity:0, transformX(-500%)]' on-init="a:[opacity:0:1:250:easeInSine:0:1:f, transformX:-500%:0%:250:easeInSine:0:1:f]">
                                <div grow='2' bg-image="http://www.iheartmylife.com/wp-content/uploads/2016/08/Brooke-Rash.jpg" bg='charcoal-20p' column x='center' y='center' height='100' u init-with="p:[opacity:0]" on-init="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]" p='5%' l-h="2em" f-s="24px">
                                </div>

                                <div grow='3'  x='center' y='center' column height='100' u on-init="s:[anim-content-in:children]" max-width='40%' class='txt-right uppercase'>
                                    <line grow='1' y='end' u on-init="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]" p='5%' l-h="2em" f-s="24px">
                                        “MY LIFE AND BUSINESS HAVE COMPLETELY TRANSFORMED. I’M MORE CONFIDENT THAN EVER AND ON TRACK FOR MY FIRST 6-FIGURE YEAR!”
                                    </line>
                                    <div grow='5' y='start' row wrap width='100' x='end' y='center' p='5%' u on-init="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]" p='5%' l-h="2em" f-s="24px">
                                        <div f-s='14px' x='right'>
                                            Brooke Rash, Social Media Marketing
                                        </div>
                                    </div>
                                    <div grow='5' y='start' row wrap width='100' x='end' y='center' p='5%'>
                                    </div>
                                </div>
                            </div>
                            <div grow='1' height='60' width='100%' x='center' y='center' row-reverse p-x='5%' p-y='0% 5%' row nowrap m-top='-10%' u init-with='p:[opacity:0]' u init-with='p:[opacity:0, transformX(-500%)]' on-init="a:[opacity:0:1:250:easeInSine:0:1:f, transformX:-500%:0%:500:easeInSine:0:1:f]">
                                <div grow='2' bg-image="http://www.iheartmylife.com/wp-content/uploads/2016/08/Brooke-Rash.jpg" bg='charcoal-20p' column x='center' y='center' height='100' u init-with="p:[opacity:0]" on-init="a:[opacity:0:1:250:easeInSine:0:1:f, translateX: 300px:0:750:easeOutSine:0:1:f]" p='5%' l-h="2em" f-s="24px">
                                </div>

                                <div grow='3'  x='center' y='center' column height='100' u on-init="s:[anim-content-in:children]" max-width='40%' class='txt-left uppercase'>

                                    <line grow='3' y='end'  p='5%' l-h="2em" f-s="16px" class='lowercase' u on-init="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]" p='5%' l-h="2em" f-s="24px">
                                        “When I signed up for Emily’s I Heart Coaching program, I was unemployed, broke and had over $20,000 in credit card debt. Within two weeks of starting I Heart Coaching, my monthly salary became my weekly income and by 90 days, I made over $23,000!”
                                    </line>
                                    <div grow='3' y='start'  row wrap width='100' x='end' y='center' u on-init="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]" p='5%' l-h="2em" f-s="24px" p-x='7.5%'>
                                        <div f-s='14px' x='right'>
                                            Brooke Rash, Social Media Marketing
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    <section width='100' height='90' id='programs' relative x='start' y='center' bg='charcoal'>

                        <div x-start width='25' z='1' u pointer on-click='s:[activate-modal:public]'>
                            <button class='launch-modal bg-cerise txt-white'>Launch</button>
                        </div>
                        <div abs top='0' z='0' bg='cerise' init-with="p:[t:all 250ms ease]" u when-activate-modal="p:[z-index:1,width:100%,height:100%]"   resize='select:.launch-modal:[w,h]' on-click="p:[width:{{resize.width}},height:{{resize.height}},z-index:0]" x='center' y='center'>
                            <div pointer> Close Me </div>
                        </div>
                    </section>



                    <section width='100' id="{{::view.data.tabs[2]}}" txt='charcoal' bg='slate' x='center' height='90' y='center' u relative>
                        <div z='100' grow='1' p-x='5%' abs class='bg-cerise' height='100'  column u on-init='s:[anim-content-in:children:linear-1000]:+2000'>
                            <div grow='5' m-grow='3' mp-p-top='10px' p-top='20px' x='center' y='center' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                <heart-icon desktop height='50px' width='50px'></heart-icon>
                                <heart-icon mobile height='30px' width='30px'></heart-icon>
                            </div>
                            <div grow='3' m-f-s="24px" x='center' p-y='20px' m-p-y='10px' class='text-center' f-s='40px' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                I HEART MY LIFE </p>
                            </div>
                            <div grow='3' x='center' m-f-s="16px" f-s='20px' m-l-h="16px" l-h="24px" m-l-s='0.5px' l-s='1px' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                <p style='text-align:center'>
                                    I'M EMILY WILLIAMS, AND I'M JUST A GIRL FROM OHIO WITH WITH REALLY BIG
                                    DREAMS
                                </p>
                            </div>
                            <div grow='7' m-grow='10' x='center' f-s='18px' m-f-s='12px' m-l-h="1.5em" m-p-x='12px' l-h='2em' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                I’m also a Leading Success Coach and the Founder of I Heart My Life, a 7-figure coaching business where I work with extraordinary female entrepreneurs just like you. My mission is to support you in making more money, attracting more clients and getting the mega success you’ve always wanted in your business and your life…
                            </div>
                            <div grow='5'  row x='center' u init-with="p:[transform:translateX(-300px), opacity:0]" when-anim-content-in="a:[opacity:0:1:250:easeInSine:0:1:f, translateX:-300px:0:750:easeOutSine:0:1:f]">
                                <button width='75%' desktop bg='smoke' uppercase txt='cerise' color='rgba(255,255,255,1)'>Get started</button>
                                <button width='75%' m-m-y='8px' mobile m-f-s='14px' m-p="10px" txt='cerise' height='48px' bg='smoke' color='rgba(255,255,255,1)'>Get Started</button>
                            </div>

                            &nbsp;
                        </div>
                    </section>
                    <section width='100' id="{{::view.data.tabs[3]}}" txt='charcoal' bg='slate' x='center' height='90' y='center' u relative>
                        Section 4
                    </section>
                    <section width='100' id="{{::view.data.tabs[4]}}" txt='charcoal' bg='slate' x='center' height='90' y='center' u relative>
                        Section 5
                    </section> -->
                    <footer desktop width='100%' height='10%' txt='charcoal' bg='slate' x='center' y='center' u relative class='txt-white uppercase' f-s='10px' f-w='600' opacity='0.8' row>
                        <div grow='2' x='center'>
                            <div grow='1' x='center'>
                                <div grow='1' x='center'> </div>
                                <div grow='1' x='center'>
                                    Terms
                                </div>
                                <div grow='1' x='center'>
                                    Privacy
                                </div>
                                <div grow='1' x='center'>
                                    Purchase and refund policty
                                </div>
                            </div>

                        </div>
                        <div grow='4'>
                        </div>
                        <div grow='4' row y='end' x='end'>
                            <div grow='1' s-a x='end'>
                                I heart my life limited 2016
                            </div>
                            <div grow='1' s-a x='end'>
                                Design
                            </div>
                            <div grow='1' s-a  x='end'>
                                Development by gadabout creative
                            </div>
                            <div grow='0.5'>
                            </div>
                        </div>
                    </footer>
                </div>
                &nbsp;
            </content>
            <guide-icon> </guide-icon>


            <div u init-with="p:[transform:translateX(100%)]"  fixed top="0" bg='transparent' grow='1' width='25%' right='0%' when-open-sidebar='a:[translateX:100%:0%:400:easeOutCubic:0:1:f]' when-close-sidebar="a:[translateX:0%:100%:400:easeInCubic:0:1:f]"   z='100'  bg='cerise' height='100' z='5' y='center'>

                <div column p='0 5%' bg='rgba(0,0,0,1)' bg='charcoal' x='center' y='center' height='100%' width='100%' nowrap>

                    <div grow='6' u on-click='s:[close-sidebar:public]' x='end' class='capital' column wrap y='center' width='100%'>

                        <div abs right='0' top='0' m='20px' p='3px' pointer >
                            <close-icon desktop height='40px' width='40px'></close-icon>
                            <close-icon mobile height='30px' width='30px'></close-icon>
                        </div>
                        <div top='-20px' uppercase column x='left' wrap width='100%' p='5% 15%'>
                            <div width='100%' f-w='700' class='uppercase' txt-sz-two p-y='15px' u-list="option in view.data.sidebar.top.options" y='center'>{{option}}</div>
                        </div>
                    </div>
                    <div grow='4' u on-click='s:[close-sidebar:public]' x='center' class='capital' column wrap y='start' width='100%' txt-sz-one>
                        <div grow='1' m-y='10px' width='100' p='0% 15%'>
                            <div height='1px' grow='1' bg='white'> </div>
                        </div>
                        <div grow='6' column wrap width='100%' p='5% 15%'>
                            <div width='100%' f-w='700' p-y='8px' u-list="option in view.data.sidebar.bottom.options" y='center'>{{option}}</div>
                        </div>
                    </div>
                    <div grow='1'>

                    </div>
                </div>
            </div>
            <div u init-with="p:[opacity:0]"  fixed bg='charcoal-80p' grow='1' width='100%' left='0%' when-open-modal="a:[fadeInDown:250:easeTo:0:1:f]|p:[z-index:100]|s:[enter-modal:depth(>1)]"   bg='cerise' height='100' z='-1' y='center' on-key-up="s:[close-modal:self]" when-close-modal="a:[fadeInDown:750:easeTo:200:1:r,z-index:100:-1:50:linear:500:1:f]|s:[exit-modal:depth(>1)]" ng-attr-accept-keys="esc">
                <!-- on-init="send:[open-modal:self]"  -->

                <div grow='1' column wrap size='100' x='center' y='center'>

                    <close-modal-icon u on-click="s:[close-modal:public]"></close-modal-icon>
                    <div size='80 60' x='center' y='center' bg='smoke' row u init-with="p:[translateY:-50%, opacity:0]" when-open-modal="a:[fadeInUp:500:easeTo:250:1:f]" when-exit-modal="a:[fadeInUp:250:easeTo:0:1:r]" row wrap>

                        <div relative height='80%' width='100%'>
                            <background-img abs size='100' z='0' image='view.data.modalBg'> </background-img>
                            <div abs right='0' top='0' width='50%' p='5% 7.5% 5% 10%' height='100%'>
                                <div grow='1' column z='100' size='100' right='0' x='center' y='center' class='txt-charcoal'>
                                    <div grow='1' m-y='20' y='center' f-f="Cervo Light" f-s='36px' l-h="1.5em">
                                        YOU’RE MEANT FOR SOMETHING BIG, AND IT STARTS HERE
                                    </div>
                                    <div grow='1' f-f='"SavoyRoman", Georgia, serif' f-s='14px' l-h='1.75'>
                                        Become a member today and enjoy my new free download “6 Secrets to Your Dream Brand.” Learn what it takes to go from a girl with a dream to a 6-figure (or even 7-figure) stand-out brand!
                                    </div>
                                    <cursive-signature url="http://www.iheartmylife.com/wp-content/themes/ihml/img/signature@2x.png"> </cursive-signature>
                                </div>

                            </div>
                        </div>

                        <div width='100' x='center' y='center' bg='white' class='txt-charcoal' p='20px' min-height='20%' row>
                            <modal-input label="name" placeholder="full name">
                            </modal-input>
                            <modal-input label="email" placeholder="awesome@you.com">
                            </modal-input>

                            <div grow='1' x='right' y='center' column>
                                <button x='center' bg='rgba(0,0,0,0.9)' on-mouseover=""  f-s='14px' l-s='1px' column grow='1' m-bottom='-5px' basis='10%' class='launch-modal uppercase txt-white'>Launch</button>
                            </div>
                        </div>
                </div>

            </div>
            <!-- <modal resize-to="">
            </modal> -->
        <!-- </hidden> -->


    </main>

</view>
