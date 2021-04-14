<!-- linked-data: place data url, i.e. receipt.json-->
<!-- linked-data-name:  -->
<view class='full-xy block overflow-auto flex-wrap-center no-scrollbar flex-wrap' link-data="https://s3-us-west-1.amazonaws.com/ui-guru/samples/soundcloud.json" link-data-name="sc">
    <ul class="flex-vertical-center flex-wrap p15-grid full-x">
        <li class='relative flex-wrap-center m20x height-128 overflow-hidden width-128' ng-repeat='item in sc.collection' relative class='p15-grid flex-wrap relative flex-start' u on-init='send:[init-artwork-label:children:linear-2000, init-genre-text:depth(>1):linear-3000]'>


            <!-- <div>{{item.track.description}}</div> -->
            <item layer='-1'  init-with="p:[opacity:0]" u class='height-128 width-128 absolute' when-init-artwork-label="a:[scaleIn-BounceUp:250:easeOutQuint:0:1:f]|s:[init-genre-txt:depth(-0)]" style="background:url({{item.track.artwork_url}})"/>
            </item>
            <item layer='2' bg='charcoal-80p' absolute u class='height-32 bottom-0 flex-center txt-1 width-128 text-center' init-with="p:[opacity:0]" when-init-genre-text="a:[slideInUp-subtle:500:linear:0:1:f]">
                <txt font-size='10px' class='weight-900 txt-smoke opacity-80p'> {{item.track.genre}} </txt>
            </item>

            <!-- <span class='txt-1'>{{track.description}}</span> -->
        </li>
    </ul>
</view>