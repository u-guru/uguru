<div width='100%' height='100%' abs top='0' left='0' class='view'>

    <div ng-transclude="imports">
    </div>

    <div ng-transclude="debug"></div>
    <div ng-transclude="loader"></div>

    <div size='100%' ng-transclude ng-transclude-slot="main"></div>
    <!-- <div ng-transclude="main"></div> -->
    <!-- <ui-view size='100%' x='center'  ng-transclude ng-transclude-slot="main"></ui-view> -->
    <div ng-transclude="hidden"></div>


<div>
