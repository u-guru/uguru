<div class="home-tiles-main home-tiles-container">
    <h1 class='p20xy'> {{header}} </h1>
    <div class="home-tiles-main-inside">
        <a class="home-tile" id='cta-box-student-request' ng-repeat='step in steps'>
            <div class="home-tile-inside">
                <div>
                    <span ng-include="step.img_base + step.icon_url"></span>
                    <h1 ng-bind-html>{{step.description}}</h1>
                    <h2 ng-bind-html="step.description">Your peers who aced<br/>your current courses!</h2>
                </div>
            </div>
        </a>
    </div>
</div>