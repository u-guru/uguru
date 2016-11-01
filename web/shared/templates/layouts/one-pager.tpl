<div class='full-xy bg-smoke'>
<view layer="2" loader type='row' bg="smoke" width='100' height='100' align='center center' when-fade-out-loader="a:[slideOutDown-subtle:2000:linear:0:1:f]" u>
    <item width='100' height='50' align='bottom center'>
        <graphic u init-with="p:[perspective-origin:50% 50%,p:opacity:0]" on-init="a:[slideInDown:2000:easeOutCirc:0:1:f, rotateY:-1080deg:0deg:2000:easeOutCirc:0:1:f, scale:0:1:2000:easeOutCirc:0:1:f]" height='25' width='25' class='flex-grow svg-stroke-5 stroke-cerise fill-cerise' height='50' src='shared/templates/components/svg/main/heart.html'>
        </graphic>
    </item>
    <item width='100' height='50' align='top center' margin='2.5%' init-with='p:[opacity:0]' on-init="a:[opacity:0:1:1000:easeInCirc:0:1:f]|send:[init-tag:children:500, fade-out-loader:public:2000]" u>
        <item width='100' align='center center' class='flex-wrap'>
            <div class='full-x'>
                <h1 class='txt-cerise flex-vertical-center uppercase weight-400 space-2 txt-24'>
                    <letter type='squishBounce'>W</letter>
                    <letter type='squishBounce'>E</letter>
                    <letter type='squishBounce'>L</letter>
                    <letter type='squishBounce'>C</letter>
                    <letter type='squishBounce'>O</letter>
                    <letter type='squishBounce'>M</letter>
                    <letter type='squishBounce'>E</letter>
                    &nbsp;
                    <letter type='squishBounce'>to</letter>
                </h1>
            </div>
            <div class='full-x' >
                <h1 class='txt-cerise flex-vertical-center txt-64 uppercase weight-600 space-2'>
                    <letter type='squishBounce'>_</letter>
                    <letter type='squishBounce'>_</letter>
                    <letter type='squishBounce'>_</letter>
                    <letter type='squishBounce'>_</letter>
                    <letter type='squishBounce'>_</letter>
                    <letter type='squishBounce'>'</letter>
                    <letter type='squishBounce'>_</letter>
                    <letter type='squishBounce'>&nbsp;</letter>
                    <letter type='squishBounce'>S</letter>
                    <letter type='squishBounce'>I</letter>
                    <letter type='squishBounce'>T</letter>
                    <letter type='squishBounce'>E</letter>
                </h1>
            </div>
        </item>
    </item>
</view>
<view layer='1' class='bg-smoke txt-charcoal' bg-url='http://41.media.tumblr.com/ae90b8caeba47c980d343fedfc547b55/tumblr_n9v9gbigA21sciteso1_500.png'>
    <item  height='10'    align="center left" width='100' class='bg-transparent'>
        <item align='center right' width='20' height='100' class='bg-charcoal-20p'>
            <graphic class='flex-grow svg-stroke-5 stroke-cerise fill-cerise' height='50' src='shared/templates/components/svg/main/heart.html'> </graphic>
            <txt font-size='14' letter-spacing='1px' class='text-left weight-600 uppercase flex-grow text-center'> Become a member </txt>

        </item>
        <item align='center center' width='60' height='100' class='bg-transparent-20p'>
            <ul class='flex full-xy flex-grow txt-2 uppercase  weight-600 uppercase text-center'>
                <li class='flex-grow bg-charcoal-50p text-center'> Link 1 </li>
                <li class='flex-grow bg-charcoal-20p text-center'> Link 2 </li>
                <li class='flex-grow bg-slate-20p text-center'> Link 3 </li>
                <li class='flex-grow bg-charcoal-10p text-center'> Link 4 </li>
                <li class='flex-grow bg-transparent text-center'> Link 5 </li>
            </ul>
        </item>
        <item align='center right' width='20' height='100' class='bg-charcoal-50p'>
            <h1 class='flex-grow text-center'> Become a member </h1>
            <graphic class='flex-grow svg-stroke-5 stroke-smoke' width='25' height='25' src='shared/templates/components/svg/main/menu.html'> </graphic>
        </item>
    </item>
    <item class='bg-charcoal-20p' fixed height='10' align-self="bottom right" align="center center" width='10' class='bg-transparent'>
        <graphic class='flex-grow svg-stroke-5 stroke-smoke' u init-with="p:[transform:rotate(180deg)]"  height='40' src='shared/templates/components/svg/main/arrow.html'> </graphic>
    </item>
</view>
</div>

<!-- Todo: Later resolve main bg color-->
<!-- Todo: inherit -->