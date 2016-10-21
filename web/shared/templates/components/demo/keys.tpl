<div class="full-xy flex-wrap-center">
    <ul class="flex-wrap-center p15-grid full-x">
        <li ng-repeat='letter in "qwertyuiop[]"'>
            <div class="relative width-64 height-64 border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid">
        <li ng-repeat='letter in "asdfghjkl;"'>
            <div class="relative width-64 height-64 border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-click="send:[key-press:self]" on-mouseenter="p:[opacity:0.5]"     on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid">
        <li ng-repeat='letter in "zxcvbnm,./"'>
            <div class="relative width-64 height-64 border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r, opacity:0.5:1:750:linear:0:1:r]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid full-x">
        <li style='width:50%;'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="space">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">Space</h1>
            </div>
        </li>
    </ul>
</div>