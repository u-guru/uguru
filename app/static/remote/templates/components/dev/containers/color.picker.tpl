<div class="absolute full-xy top-0 left-0 flex-center-wrap">
    <div class="color-picker">
        <ul>
            <li ng-repeat="color_option in defaultColorOptions">
                <a class="bg-{{color_option}}" ng-click='setSelectedColor(color_option)' ng-class="{'active': color_option === selectedColor }"></a>
            </li>

<!--             <li><a class="bg-orange"></a></li>
            <li><a class="bg-gold"></a></li><li><a class="bg-moola"></a></li>
            <li><a class="bg-shamrock"></a></li><li><a class="bg-azure"></a></li>
            <li><a class="bg-lake"></a></li><li><a class="bg-cobalt active"></a></li>
            <li><a class="bg-eggplant"></a></li>
            <li><a class="bg-campus"></a></li><li><a class="bg-taupe"></a></li>
            <li><a class="bg-slate"></a></li><li><a class="bg-charcoal"></a></li> -->
        </ul>
        <ul>
            <li><span></span></li><li><span></span></li><li><span></span></li>
            <li><span></span></li><li><span></span></li><li><span></span></li>
            <li><span></span></li><li><span></span></li><li><span></span></li>
        </ul>
        <button ng-click='saveAndClose()'>Save</button>
    </div>
</div>