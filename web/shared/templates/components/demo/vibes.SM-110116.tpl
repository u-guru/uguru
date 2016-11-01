<div class='full-xy'>

<view layer="3" type='row' bg="robin" u on-init="s:[loader-fade:self:4000]" ng-if='false'
    when-loader-fade="a:[opacity:1:0:500:easeOutSine:0:1:f]">
    <!-- on-init="s:[loader-fade:self:2000]" -->

    <!-- align='center bottom' -->
    <!-- center bottom -->
    <item bg="robin" m-bg="gold" class='uppercase' width='100' height='33%' align='center bottom'>
        <banner name='vibes.cl'>
        </banner>
        <item align="center center" padding="15" class='border-10'
            u init-with="p:[tr:scale(0.5) rotate(15deg) translateY(50px), tro:center center]"
            on-init="a:[scale:0.5:1:250:easeOutBack:0:1:f, rotate:15deg:0deg:250:easeOutSine:100:1:f, translateY:50px:100px:500:easeInSine:0:1:f] | s:[logo-up:depth(0):1000, load-enter:depth(0):1000]"
            when-logo-up="a:[translateY:100px:0px:450:easeInOutExpo:0:1:f]">
            <txt class='weight-900 margin-0 txt-center' font-size="64px" letter-spacing='0.3em' line-height='1.2'>
                VIBES.CLUB
            </txt>
        </item>
    </item>

    <item class='bg-robin p30y' width='100' height='15' align='center top'>
        <item width='100' align='center center'
            u init-with="p-op"
            when-load-enter="a:[fadeInUp:500:linear:0:1:f]">
            <txt font-size="28px" letter-spacing='0.3em' width='100' weight='500' line-height="1.2" class='flex-vertical-center'>
                Ready for all the vibes?
            </txt>
        </item>
    </item>

    <!-- flip: center top -->
    <item class='bg-robin' width='100' height='40' align='center top'>
        <item padding='20px 0'   u init-with="p:[tr:scaleY(0), tro:center center]" when-load-enter="a:[scaleY:0:1:1000:easeOutQuint:200:1:f]">
            <svg width="280px" height="40px" viewBox="0 0 280 40">
                <g class="visualizer" stroke-width="3" stroke="#FFFFFF" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M272.5,6.5 L272.5,33.5"></path>
                    <path d="M266.5,6.5 L266.5,33.5"></path>
                    <path d="M260.5,6.5 L260.5,33.5"></path>
                    <path d="M254.5,6.5 L254.5,33.5"></path>
                    <path d="M248.5,6.5 L248.5,33.5"></path>
                    <path d="M242.5,6.5 L242.5,33.5"></path>
                    <path d="M236.5,6.5 L236.5,33.5"></path>
                    <path d="M230.5,6.5 L230.5,33.5"></path>
                    <path d="M224.5,6.5 L224.5,33.5"></path>
                    <path d="M218.5,6.5 L218.5,33.5"></path>
                    <path d="M212.5,6.5 L212.5,33.5"></path>
                    <path d="M206.5,6.5 L206.5,33.5"></path>
                    <path d="M200.5,6.5 L200.5,33.5"></path>
                    <path d="M194.5,6.5 L194.5,33.5"></path>
                    <path d="M188.5,6.5 L188.5,33.5"></path>
                    <path d="M182.5,6.5 L182.5,33.5"></path>
                    <path d="M176.5,6.5 L176.5,33.5"></path>
                    <path d="M170.5,6.5 L170.5,33.5"></path>
                    <path d="M164.5,6.5 L164.5,33.5"></path>
                    <path d="M158.5,6.5 L158.5,33.5"></path>
                    <path d="M152.5,6.5 L152.5,33.5"></path>
                    <path d="M146.5,6.5 L146.5,33.5"></path>
                    <path d="M140.5,6.5 L140.5,33.5"></path>
                    <path d="M134.5,6.5 L134.5,33.5"></path>
                    <path d="M128.5,6.5 L128.5,33.5"></path>
                    <path d="M122.5,6.5 L122.5,33.5"></path>
                    <path d="M116.5,6.5 L116.5,33.5"></path>
                    <path d="M110.5,6.5 L110.5,33.5"></path>
                    <path d="M104.5,6.5 L104.5,33.5"></path>
                    <path d="M98.5,6.5 L98.5,33.5"></path>
                    <path d="M92.5,6.5 L92.5,33.5"></path>
                    <path d="M86.5,6.5 L86.5,33.5"></path>
                    <path d="M80.5,6.5 L80.5,33.5"></path>
                    <path d="M74.5,6.5 L74.5,33.5"></path>
                    <path d="M68.5,6.5 L68.5,33.5"></path>
                    <path d="M62.5,6.5 L62.5,33.5"></path>
                    <path d="M56.5,6.5 L56.5,33.5"></path>
                    <path d="M50.5,6.5 L50.5,33.5"></path>
                    <path d="M44.5,6.5 L44.5,33.5"></path>
                    <path d="M38.5,6.5 L38.5,33.5"></path>
                    <path d="M32.5,6.5 L32.5,33.5"></path>
                    <path d="M26.5,6.5 L26.5,33.5"></path>
                    <path d="M20.5,6.5 L20.5,33.5"></path>
                    <path d="M14.5,6.5 L14.5,33.5"></path>
                    <path d="M8.5,6.5 L8.5,33.5"></path>
                </g>
            </svg>
        </item>
    </item>
</view>

<view layer="2" type='row'>
    <!-- center bottom -->
    <item m-bg="gold" class='uppercase' width='100' height='15' align='center bottom'>
        <item align="center center" padding="15" class='border-10'>
            <txt class='weight-900 margin-0 txt-center' font-size="36px" letter-spacing='0.3em' line-height='1.2'>
                VIBES.CLUB
            </txt>
        </item>
    </item>

    <!-- center top -->
    <item class='p30y' width='100' height='15' align='center top'>
        <item width='100' align='top center'>
            <txt font-size="28px" width='100' weight='500' line-height="1.2" class='flex-vertical-center'>
                LIVE
            </txt>
        </item>
    </item>


    <!-- center top -->
    <item class='p30y' width='100' height='15' align='center top'>
        <item width='100' align='center center'>
            <txt font-size="72px" letter-spacing='0.3em' width='100' line-height="1.2" class='weight-700 flex-vertical-center'>
                PLAYLIST NAME
            </txt>
        </item>
    </item>
    <item class='p30y' width='100' height='15' align='center top'>
        <item width='15' align='bottom right'>
            <txt font-size="28px" width='100' weight='500' line-height="1.2">
                Now Playing:
            </txt>
        </item>
        <item width='30' align='bottom left'>
            <!-- @text-decoration = t-d -->
            <txt font-size="28px" width='100' weight='500' line-height="1.2" t-d="underline">
                 <!-- text-decoration="underline" -->
                Artist Name - Song Name
            </txt>
        </item>
    </item>

    <!-- center bottom -->
    <item m-bg="gold" class='uppercase' width='100' height='15' align='center bottom'>
        <item align="center center" padding="15" class='border-2-top border-2-left border-2-bottom border-1-right'
            u on-mouseenter="s:[ff-hover:self]"
            init-with="p:[fill:none]"
            when-ff-hover="p:[fill:RGBA(1, 47, 161, 1.00)]">
            <svg class="absolute" width="90px" height="90px" viewBox="0 0 90 90">
                <rect x="550" y="500" width="90" height="90"/>
            </svg>
            <graphic u on-mouseenter="p:[fill:white]" u class='relative svg-stroke-3 stroke-white' height="60" src='shared/templates/components/svg/main/play-basic.html'> </graphic>
        </item>
        <item align="center center" padding="15" class='border-2-top border-2-right border-2-bottom border-1-left'
            u on-mouseenter="s:[ff-hover:self]|p:[opacity:0.5]"
            init-with="p:[fill:none]"
            when-ff-hover="p:[fill:RGBA(1, 47, 161, 1.00)]">
            <svg class="absolute" width="90px" height="90px" viewBox="0 0 90 90">
                <rect x="550" y="500" width="90" height="90"/>
            </svg>
            <graphic class='relative svg-stroke-3 stroke-white' height="60" src='shared/templates/components/svg/main/fast-forward.html'> </graphic>
        </item>
    </item>

    <item  m-bg="gold" class='uppercase' width='100' height='15' align='center center' align-self="bottom center">
        <item align="center center" padding="15" class='border-2 radius-2'>
            <txt class='weight-500 margin-0 txt-center' font-size="28px" letter-spacing='1px' line-height='1.2'>
                Switch Vibes
            </txt>
        </item>
    </item>
</view>

<view layer="1" type='row' bg="auburn"
    u on-init="s:[record-start:children:4400]">
     <!-- bg="#CA004E" -->
    <item m-bg="gold" class='uppercase' width='100' height='100' align='center center' align-self="center center"
        u init-with="p:[tro:center center]"
        when-record-start="a:[rotate:0deg:360deg:10000:linear:0:i:f]">
        <svg class="absolute" width="640px" height="640px" viewBox="0 0 640 640">
            <circle stroke="none" fill="#2D2D2D" fill-rule="evenodd" cx="320" cy="320" r="320"></circle>
            <circle id="Oval-Copy" fill="#FFFFFF" opacity="0.2" cx="319.665001" cy="319.665001" r="106.665001"></circle>
        </svg>
        <item class='relative round' width="213px" height="213px" bg-url='http://www.etonline.com/news/2016/09/24271863/1280_theweeknd_album_twitter.jpg'> </item>
    </item>
</view>
</div>
