<div class='full-xy flex-wrap-center flex-stretch p20xy'>
    <h1 class='weight-700 font-4'>{{header}}</h1>
    <ul>
        <li ng-repeat='step in steps'>
            <h4 class='p10y weight-600' ng-bind-html='($index + 1) + ". " +  step.title'></h4>
            <p class='weight-300' ng-bind-html='step.description'></p>
        </li>
    </ul>
</div>