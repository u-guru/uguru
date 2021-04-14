<main-view class='full-xy block overflow-auto absolute top-0 left-0 flex-wrap-center no-scrollbar flex-wrap bg-smoke' u link-data access-code='71ab4' on-init='s:[init-view-1:depth(>1):2500]'>
    {{bgColor = "rgba(108,24,124,0.5)"}}
    {{bgColor}}

    <view layer="3" type='row' bg="smoke" width='100' height='100' align='center center' when-fade-out-loader="a:[slideOutDown-subtle:2000:linear:0:1:f]" on-init='s:[fade-out-loader:self:2000]' u>
        <item width='100' height='50' align='bottom center'>
            <graphic u init-with="p:[perspective-origin:50% 50%,p:opacity:0]" on-init="a:[slideInDown:2000:easeOutCirc:0:1:f, rotateY:-1080deg:0deg:2000:easeOutCirc:0:1:f, scale:0:1:2000:easeOutCirc:0:1:f]" height='25' width='25' class='flex-grow svg-stroke-5 stroke-cerise fill-cerise' height='50' url='shared/templates/components/svg/main/heart.html'>
            </graphic>

        </item>
    </view>

    <tabs layer='5' fixed init-with="p:[opacity:0]" u when-init-view-1="a:[fadeInDown:1250:easeOutCirc:500:1:f]" height='10' import="shared/templates/components/base/tabs.tpl" on-click='s:[modal-lead-init-requested:depth(2)]'> </tabs>


    <view layer='4'  type='row' ng-class='{"bg-slate-20p":!vData.classes,  "bg-smoke": !vData.classes && index % 2 === 1}' bg="smoke" class='relative' width='100' height='100' align='center center' u init-with="p:[opacity:0]" when-init-view-1="a:[fadeInUp:1250:easeOutCirc:500:1:f]" align='center top'>
        <item class='full-xy'  bg-url='http://www.iheartmylife.com/wp-content/uploads/2016/08/homepage-2.jpg' >
        </item>
    </view>
    <view layer='4'  type='row' ng-class='{"bg-slate-20p":!vData.classes,  "bg-smoke": !vData.classes && index % 2 === 1}' bg="smoke" class='relative' width='100' height='100' align='center center' >
        <calendar>
        </calendar>
    </view>
    <view u init-with='p:[opacity:0]' on-init='a:[fadeIn:1000:linear:250:1:f]' height='100' width='100' layer='4' type='row' align='right center' style='border: white solid 40px'>
        <item layer='-1' absolute padding='10' bg-url='http://www.iheartmylife.com/wp-content/uploads/2016/08/about.jpg' height='100' width='100' align='center center'>
        </item>
        <item class='bg-smoke' width='30' m-width='90' height='70' margin='5%'>
        </item>
    </view>
    <view u init-with='p:[opacity:0]' on-init='a:[fadeIn:1000:linear:250:1:f]' height='100' width='100' layer='4' type='row' align='right center' style='border: white solid 40px'>
        <item layer='-1' absolute padding='10' bg-url='http://www.iheartmylife.com/wp-content/uploads/2016/08/about.jpg' height='100' width='100' align='center center'>
        </item>
        <item class='bg-smoke txt-charcoal' width='30' m-width='90' height='70' margin='5%'>
            <item width='100' height='15' align='center center'>
                <graphic u init-with="p:[perspective-origin:50% 50%,p:opacity:0]" padding='5%' class='flex-grow svg-stroke-5 stroke-cerise fill-cerise' height='50' url='shared/templates/components/svg/main/heart.html'>
                </graphic>
            </item>
            <item width='100' class='relative' height='60' class='flex-wrap-center'>

                <txt height='10' width='100' align='center center' font-size='36px' class='flex-grow uppercase'>I HEAERT MY LIFE</txt>
                <txt height='10' class='flex-grow uppercase' width='100' align='center center' font-size='20px' class='weight-500 uppercase'>Where can i get some</txt>
                <txt height='40' padding='10%' width='100' align='center center' font-size='20px'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</txt>
            </item>
            <item align='center center' height='25' padding='15% 25%'>
                <button class='bg-cerise txt-white txt-2 radius-2 weight-700 uppercase'> Learn More</button>
            </item>
        </item>
    </view>

   <!-- TODO: Testimonials: Image -->
   <!--  <view u height='100' width='100' layer='4' type='row' align='right center' style='border: pink solid 40px'>


    </view> -->

    <!-- TODO: Finish external view -->
    <view u init-with='p:[opacity:0]' on-init='a:[fadeIn:1000:linear:250:1:f]' height='100' width='100' layer='4' type='row' align='right center' style='border: white solid 40px'>
        <item layer='-1' absolute padding='10' bg-url='http://www.iheartmylife.com/wp-content/uploads/2016/08/about.jpg' height='100' width='100' align='center center'>
        </item>
        <item class='bg-smoke' width='30' m-width='90' height='70' margin='5%'>
        </item>
    </view>
    <modal  position='top' class='bg-charcoal-50p' bg='charcoal-80p' init-with='p:[opacity:0]' when-modal-lead-init-requested='a:[slideInDown-subtle:1000:linear:0:1:f]' when-modal-lead-close="a:[slideOutUp-subtle:1000:linear:0:1:f]|send:[set-transform-after-anim:self:1100]" when-set-transform-after-anim='p:[transform:translateY(-1000%)]' padding='10%' height='100%' width='100%' layer='4' type='row' align='center center'>
        <graphic u absolute  on-click='s:[modal-lead-close:public]' class="flex-grow svg-stroke-10 top-0 right-0 stroke-white flex-center svg-white svg-32 svg-stroke-8 close-icon" init-with='p:[transform:rotate(45deg)]' height='10' width='10' margin='2.5%' url="shared/templates/components/svg/main/plus.html"> </graphic>
        <item layer='-1' padding='10' bg-url='http://www.iheartmylife.com/wp-content/uploads/2016/08/about.jpg' height='100' width='100' align='center center'>
            <item class='bg-smoke' width='30' m-width='90' height='70' margin='5%'>
                <u-input type='light'> </u-input>
            </item>
        </item>
    </modal>
</main-view>
