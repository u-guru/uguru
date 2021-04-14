 <view type='mobile:ios'>
    <imports>
        <import-dict key='components' url="https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/wind/index.json">

        </import-dict>
    </imports>
    <!-- <loader duration="10000ms">
        Yo
    </loader> -->
    <loader size='100' x='center' y='center' ms='3500'>
        <svg fill="none"  init-with="p:[opacity:0]" on-init="p:[opacity:1]"  class="width-128 height-128" viewBox="0 0 128 128" u when-counter-finished="a:[scale:1:100:1000:easeInOutElastic:0:1:f,background:rgba(0,0,0,1):rgba(255,255,255,1):500:linear:0:1:f]">
            <rect x="2" y="2" width="124" height="124" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" rx="2"
                u init-with="p:[stroke:#55A4B7]"></rect>
            <text text-anchor="middle" x="64" y="84" font-size="32" stroke="none" fill="white" u on-init="a:[counter:0:100:2500:easeOutCirc:0:1:f]|s:[counter-finished:public]:+2500">00
            </text>
        </svg>
    </loader>
    <components>
        <wind-icon wind-svg="var" offset-x="var" offset-y="var" colors="var" duration="var" timing-func="var" url="https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/wind/components/icons/wind.tpl">
        </wind-icon>

        <control editor url="https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/wind/components/controls.tpl">
        </control>
    </components>
    <main size='100' replace-with="https://s3-us-west-1.amazonaws.com/users.ui.guru/users/cfbd5d8f2d3b1f2d725db540225c1a3b/projects/clients/freelancer/orinocoomi1979/views/wind/main.tpl" >
    </main>
    <utility type="footer" ng-if='view.data.components.wind' fixed>

        <controls>

        </controls>

    </utility>
</view>
