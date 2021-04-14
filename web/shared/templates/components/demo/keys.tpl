<div class="full-xy flex-wrap-center">
    <ul class="flex-wrap-center p15-grid full-x">
        <li>
            <div class="relative width-64 height-64 border-1 border-solid flex-center" u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="esc">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">esc</h1>
            </div>
        </li>
        <li ng-repeat='letter in "`1234567890-="' class='width-64 height-64'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
        <li>
            <div class="relative width-64 height-64 border-1 border-solid flex-center" u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="backspace">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">delete</h1>
            </div>
        </li>
    </ul>
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
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-click="send:[key-press:self]" on-mouseenter="p:[opacity:0.5]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="{{letter}}">
                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
        <li style='width-128'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="enter">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">Enter</h1>
            </div>
        </li>

    </ul>
    <ul class="flex-wrap-center p15-grid">
        <li style='width-128'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="shift">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">Shift</h1>
            </div>
        </li>
        <li ng-repeat='letter in "zxcvbnm,./"' class='width-64 height-64'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r, opacity:0.5:1:750:linear:0:1:r]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
        <li style='width-128'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="shift">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">Shift</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid full-x">
        <li style='width:25%;' class='flex-vertical-center'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="ctrl">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">ctrl</h1>
            </div>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="alt">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">option</h1>
            </div>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="cmd">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">cmd</h1>
            </div>
        </li>
        <li style='width:50%;'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="space">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">Space</h1>
            </div>
        </li>
        <li style='width:25%;'>
            <div class='flex-vertical-center'>
                <div class="relative border-1 border-solid flex-center"
                    u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="up">

                    <h1 class="relative z-index-2 txt-7 semibold txt-center">up</h1>
                </div>
            </div>
            <div class='flex-vertical-center'>
                <div class="relative border-1 border-solid flex-center"
                    u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="left">

                    <h1 class="relative z-index-2 txt-7 semibold txt-center">left</h1>
                </div>
                <div class="relative border-1 border-solid flex-center"
                    u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="down">

                    <h1 class="relative z-index-2 txt-7 semibold txt-center">down</h1>
                </div>

                <div class="relative border-1 border-solid flex-center"
                    u on-init="p:[transform:scale(0.5), opacity:0.5]|s:[portal-hover:public]" on-key-press="a:[rotate:0deg:360deg:750:easeOutQuint:0:1:f,scale:0.5:1.25:750:bouncePast:0:1:f,opacity:0.5:1:750:linear:0:1:f]" on-key-up="a:[scale:0.5:1.25:750:bouncePast:0:1:r]" ng-attr-accept-keys="right">

                    <h1 class="relative z-index-2 txt-7 semibold txt-center">right</h1>
                </div>
            </div>
        </li>
    </ul>
</div>
