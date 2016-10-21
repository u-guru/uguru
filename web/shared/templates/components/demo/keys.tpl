<div class="full-xy flex-wrap-center">
    <ul class="flex-wrap-center p15-grid full-x">
        <li ng-repeat='letter in "qwertyuiop[]"'>
            <div class="relative width-64 height-64 border-1 border-solid flex-center"
                u on-init="s:[portal-hover:public]" on-key-press="p:[background-color:pink]" on-key-up="p:[background-color:transparent]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid">
        <li ng-repeat='letter in "asdfghjkl;"'>
            <div class="relative width-64 height-64 border-1 border-solid flex-center"
                u on-init="s:[portal-hover:public]" on-key-press="p:[background-color:pink]" on-key-up="p:[background-color:transparent]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid">
        <li ng-repeat='letter in "zxcvbnm,./"'>
            <div class="relative width-64 height-64 border-1 border-solid flex-center"
                u on-init="s:[portal-hover:public]" on-key-press="p:[background-color:pink]" on-key-up="p:[background-color:transparent]" ng-attr-accept-keys="{{letter}}">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">{{letter}}</h1>
            </div>
        </li>
    </ul>
    <ul class="flex-wrap-center p15-grid full-x">
        <li style='width:50%;'>
            <div class="relative border-1 border-solid flex-center"
                u on-init="s:[portal-hover:public]" on-key-press="p:[background-color:pink]" on-key-up="p:[background-color:transparent]" ng-attr-accept-keys="space">

                <h1 class="relative z-index-2 txt-7 semibold txt-center">Space</h1>
            </div>
        </li>
    </ul>
</div>