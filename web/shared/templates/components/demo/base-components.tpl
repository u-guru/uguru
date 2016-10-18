<div class="full-xy flex absolute full-xy top-0 left-0 flex-vertical-center">
    <ul class="flex-vertical-center p15-grid full-xy">
        <li class='full-x' ng-click='root.window.open("/dev/components/custom")'>
            <item class='flex-wrap' >
                <text y="95" fill="white" font-size="10" fill="black">Base</text>
                <text y="56.25" fill="white" font-size="18" fill="black">or</text>
                <text fill="white" font-size="10" fill="black" y="10" x="50">Custom Item</text>
            </item>
        </li>
        <li class='full-x' ng-click='root.window.open("/dev/components/icon")'>
            <item class='flex-wrap'>
                <text fill="white" font-size="20" fill="black">Graphic</text>
                <span>Icon</span>
            </item>

        </li>
        <li class='full-x' ng-click='root.window.open("/shared/dev/components/media")'>
            <div class='overflow-hidden'>
                <media type='bg' url="ui/static/gif/sample.gif">
                </media>
            </div>
        </li>
        <li class='full-x flex-wrap-center' ng-click='root.window.open("/dev/components/text")'>

                <word keep class='full-x' delay="25" type='typing'>This</word>
                <word keep class='full-x' delay="25" type='typing'>is</word>
                <word keep class='full-x' delay="25" type='typing'>animated</word>
                <word keep class='full-x' delay="25" type='typing'>text!</word>
        </li>
        <li class='full-x flex-wrap-center' ng-click='root.window.open("/#/dev/components/demo/input")'>
            <item class='flex-wrap'>
                <text fill="white" font-size="20" fill="black">Inputs</text>
            </item>
        </li>
    </ul>
</div>