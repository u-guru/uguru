<div class='full-xy'>

<import-view  src="shared/templates/components/demo/vibes/view1.vibes.tpl"> </import-view>


<view layer="3" type='row'>
    <item bg="eggplant" width="90" height="90" align="center center">
        <item class="absolute" style="top:60px; right:90px;" align="right top" height="8">
            <graphic height="100" class='svg-stroke-4 stroke-white' src='shared/templates/components/svg/main/times.html'>
            </graphic>
        </item>
        <item align="center center" height="92">
            <item class="p30x">
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'>
                    All the Vibes
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'>
                    Sad Drake
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'>
                    Hustlin'
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'>
                    The Nicest
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'>
                    Chillout
                </txt>
            </item>
            <item class="p30x">
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'>
                    Summer Groovin'
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'>
                    Get on Up
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'>
                    What's Luv?
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'>
                    All Night
                </txt>
                <txt font-size="42px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'>
                    Go Hard
                </txt>
            </item>
        </item>
    </item>
</view>

<view layer="2" type='row'>
    <!-- center bottom -->
    <item m-bg="gold" class='uppercase' width='100' height='20' align='center top' padding="30">
        <item align="center center" padding="15" class='border-5'>
            <txt class='weight-900 margin-0 txt-center' font-size="36px" letter-spacing='0.3em' line-height='1.2'>
                VIBES.CLUB
            </txt>
        </item>
    </item>

    <item width='100' height='10' align='center bottom'>
        <txt font-size="28px" width='100' weight='500' line-height="1.2" class='flex-vertical-center' align="center bottom">
            LIVE
        </txt>
    </item>


    <item class='p15y' width='100' height='25' align='center center'>
        <item width='100' align='center center'>
            <txt font-size="72px" letter-spacing='0.3em' width='100' line-height="1.2" class='weight-700 flex-vertical-center'>
                PLAYLIST NAME
            </txt>
        </item>
    </item>

    <!-- <item align="center top" padding="15" class='border-2-top border-2-right border-2-bottom border-1-left'>
        <svg class="absolute" width="48px" height="48px" viewBox="0 0 90 90">
            <rect x="550" y="500" width="90" height="90"/>
        </svg>
        <graphic class='relative svg-stroke-3 stroke-white' height="18" src='shared/templates/components/svg/main/fast-forward.html'> </graphic>
    </item> -->

    <item  width='100' height='15' align='center top'>
        <item width='15'  align='right bottom' class="p10x">
            <txt font-size="28px" weight='500' line-height="1.2">
                Now Playing:
            </txt>
        </item>
        <item width='30' align='left bottom' class="p10x">
            <txt font-size="28px" weight='500' line-height="1.2" t-d="underline">
                Artist Name - Song Name
            </txt>
        </item>
    </item>

    <item m-bg="gold" class='uppercase' width='100' height='15' align='center top'>
        <item align="center top" padding="15" class='border-2-top border-2-left border-2-bottom border-1-right'
            u on-mouseenter="s:[ff-hover:self]"
            init-with="p:[fill:none]"
            when-ff-hover="p:[fill:RGBA(1, 47, 161, 1.00)]">
            <svg class="absolute" width="90px" height="90px" viewBox="0 0 90 90">
                <rect x="550" y="500" width="90" height="90"/>
            </svg>
            <graphic class='relative svg-stroke-3 stroke-white' height="60" src='shared/templates/components/svg/main/play-basic.html'> </graphic>
        </item>
        <item align="center top" padding="15" class='border-2-top border-2-right border-2-bottom border-1-left'
            u on-mouseenter="s:[ff-hover:self]"
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