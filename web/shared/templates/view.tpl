<div width='100' height='100'>
    <div ng-transclude="debug"></div>
    <ng-transclude ng-transclude-slot="loader"></ng-transclude>

    <ui-view ng-transclude ng-transclude-slot="main"></ui-view>
    <div ng-transclude="external"></div>


<div>
