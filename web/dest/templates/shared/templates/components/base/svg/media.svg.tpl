<div class='round p15-grid flex-vertical-center'>
   <!--  <div class='overflow-auto z-index-0' ng-if='m.type === "bg"'>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <image ng-if='m.url' xlink:href="{{m.url}}" x="-37.5" y="-5" width="100" height="100" />
            <rect stroke="#637074" fill="none" fill-opacity="transparent"  x="1.5" y="1.5" width="97" height="97" rx="10" ></rect>
        </svg>
    </div> -->
    <div class='overflow-auto z-index-0' ng-if='m.type === "img"'>
        <div ng-include="m.loader.url" ng-if='m.loader.duration'>
        </div>
        <!-- <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <image ng-if='m.url' xlink:href="{{m.url}}" x="-37.5" y="-5" width="100" height="100" />
            <rect stroke="#637074" fill="none" fill-opacity="transparent"  x="1.5" y="1.5" width="97" height="97" rx="10" ></rect>
        </svg> -->
    </div>
</div>