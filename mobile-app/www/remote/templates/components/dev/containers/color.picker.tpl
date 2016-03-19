<div class="absolute full-xy top-0 left-0 flex-wrap-center" ng-show='showColorPicker'>
    <div class="color-picker full-x">
        <ul>
            <li ng-repeat="color_option in defaultColorOptions">
                <a class="bg-{{color_option}}" ng-click='setSelectedColor(color_option)' ng-class="{'active': color_option === selectedColor }"></a>
            </li>=
        </ul>
        <ul>
            <li><span></span></li><li><span></span></li><li><span></span></li>
            <li><span></span></li><li><span></span></li><li><span></span></li>
            <li><span></span></li><li><span></span></li><li><span></span></li>
        </ul>
        <button ng-click='saveAndClose()'>Save</button>
    </div>
</div>