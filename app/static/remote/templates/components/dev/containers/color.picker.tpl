<div class="color-picker" ng-show='showColorPicker'>
    <ul>
        <li ng-repeat="color_option in defaultColorOptions">
            <a class="bg-{{color_option}}" ng-click='setSelectedColor(color_option)' ng-class="{'active': color_option === selectedColor }"></a>
        </li>
    </ul>
    <ul class="bg-{{selectedColor}}">
        <li><span></span></li><li><span></span></li><li><span></span></li>
        <li><span></span></li><li><span></span></li><li><span></span></li>
        <li><span></span></li><li><span></span></li><li><span></span></li>
    </ul>
    <button class="bg-{{selectedColor}}" ng-click='saveAndClose()'>Save</button>
</div>