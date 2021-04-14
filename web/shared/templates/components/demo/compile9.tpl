 <view type='mobile:ios'>
    <imports>
        <import-dict as="components" post="interpolate:root">
            {
                "dog": {
                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/dog.png",
                    "animation": {
                        "initWith": "transform:translateX(-200%)scale(0)",
                        "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                        "onInit": "::onEnter",
                        "onExit": "::onEnter:reverse"
                    },
                    "location": {
                        "image": {
                            "width":"66%",
                            "x": "10%",
                            "y": "10%"
                        },
                        "layer": 2,
                        "position": "absolute"
                    }
                },
                "welcome": {
                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/welcome.png",
                    "animation": {
                        "initWith": "transform:translateX(-200%)scale(0)",
                        "onEnter": "scale:0:1:1000:linear:0:1:f,translateX:-200%:0%:1000:easeInBounce:0:1:f",
                        "onInit": "::onEnter",
                        "onExit": "::onEnter:reverse"
                    },
                    "location": {
                        "image": {
                            "width":"31%",
                            "x": "51%",
                            "y": "26%"
                        },
                        "layer": 3,
                        "position": "absolute"
                    }
                },
                "background": {
                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/window_background.png",
                    "width": 100,
                    "height": 100,
                    "animation": {
                        "initWith": "transform:translateY(200%)",
                        "onEnter": "translateY:200%:0%:1000:easeInBounce:500:1:f",
                        "onInit": "::onEnter",
                        "onExit": "::onEnter:reverse"
                    },
                    "location": {
                        "image": {
                            "width":"100%",
                            "x": "0",
                            "y": "10%"
                        },
                        "layer": 0,
                        "position": "absolute"
                    }
                },
                "window": {
                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/window.png",
                    "animation": {
                        "initWith": "transform:translateY(200%)",
                        "onEnter": "translateY:200%:0%:1000:easeInBounce:500:1:f",
                        "onInit": "::onEnter",
                        "onExit": "::onEnter:reverse"
                    },
                    "location": {
                        "image": {
                            "width":"100%",
                            "x": "0",
                            "y": "0"
                        },
                        "layer": 1,
                        "position": "absolute"
                    }
                },
                "windIcon": {
                    "url": "https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/wind-icon.tpl",
                    "count": "25",
                    "animation": {
                        "initWith": "transform:translateX(200%)",
                        "onEnter": {
                            "animation": "translateY:500%:0%:1000:easeOutCirc:0:1:f]",
                        },
                        "onInit": "::onEnter",
                        "onExit": "::onEnter:reverse"
                    },
                    "location": {
                        "image": {
                            "width":"10%",
                            "x": "0",
                            "y": "0"
                        },
                        "layer": 0,
                        "position": "absolute"
                    },
                    "style": {
                        "transparency": 0.8
                    }
                },
                "nav": {
                    "tabs": {
                        "top": {

                        }
                    }
                }

            }
        </import-dict>
    </imports>
    <!-- <loader size='100' x='center' y='center' ms='1500'>
        <svg fill="none"  init-with="p:[opacity:0]" on-init="p:[opacity:1]"  class="width-128 height-128" viewBox="0 0 128 128" u when-counter-finished="a:[scale:1:100:1000:easeInOutElastic:0:1:f,background:rgba(0,0,0,1):rgba(255,255,255,1):500:linear:0:1:f]">
            <rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" rx="2"
                u init-with="p:[stroke:#55A4B7]"></rect>
            <text text-anchor="middle" x="64" y="84" font-size="32" stroke="none" fill="white" u on-init="a:[counter:0:100:2500:easeOutCirc:0:1:f]|s:[counter-finished:public]:+2500">00
            </text>
        </svg>
    </loader> -->
    <components>
        <wind-icon source='var' offset-x="string" offset-y="string">
            <div init-with="p:[transform:translateY(500%),margin-left:-8%,margin-top:-40px,margin-bottom:-40px]" grow='1' when-init-wind-icon="a:[{{::comp.source.animation.onEnter.animation}}]">
                <graphic grow='1' u when-start-moving-slowly="a:[translateX:0%:-5%:3000:easeOutSine:0:100:a,translateY:0%:-10%:3000:easeOutSine:0:100:a,scale:0.8:0.82:3000:linear:0:100:f]:+4000" flex style='transform:scale(0.8)' url="https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/slide1/components/wind-icon.tpl">
                </graphic>
            </div>
        </wind-icon>
        <img-svg source="var" window="var">
            <div u init-with="p:[z-index:{{comp.source.location.layer}},position:{{::comp.source.location.position}}]" inherit-h-w>
                <svg version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink= "http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMinYMid"
                    >
                        <image init-with="p:[width:{{::comp.source.location.image.width}},y:{{::comp.source.location.image.y}},x:{{::comp.source.location.image.x}},{{::comp.source.animation.initWith}}]" on-init="a:[{{::comp.source.animation.onEnter}}]"  u xlink:href="{{::comp.source.url}}"/>
                </svg>
            </div>
        </img-svg>
    </components>
    <main size='100' flex bg='white'>

        <div align-self='stretch' grow='1' column bg='smoke'>
            <div flex align-self='stretch' column wrap grow='1' size='100' u init-with="p:[opacity:0.5]" on-init="s:[init-wind-icon:depth(>1):linear-2000,start-moving-slowly:public:linear-10000]:+2500" when-self-msg="s:[start-moving-slowly:public:2500]">

                <wind-icon u-list="item in ::root.list.ofSizeRandInt(25,-10,10).slice()" source="view.data.components.windIcon" offset-x="item=root.randInt(-10,10)" offset-y="item=root.randInt(-10,10)">
                </wind-icon>
            </div>
            <div size='100' abs>
                <img-svg source="view.data.components.dog" window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.welcome" window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.background" window='root.window'>
                </img-svg>
                <img-svg source="view.data.components.window" window='root.window'>
                </img-svg>
            </div>
        </div>
    </main>
    <utility type="footer" ng-if='view.data.components.wind' fixed>

        <controls>

        </controls>

    </utility>
</view>
