<div width='100%' height='100%' abs top='0' left='0'>
    <div ng-transclude="debug"></div>
    <ui-view abs width='100%' height='100%' ng-transclude ng-transclude-slot="loader"></ui-view>

    <ui-view ng-transclude ng-transclude-slot="main"></ui-view>
    <div ng-transclude="external"></div>


<div>
