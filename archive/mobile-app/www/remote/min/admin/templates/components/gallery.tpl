<div class='bg-charcoal full-x p15-grid  absolute'>
    <header class='full-x p15-grid flex-wrap-center'>
        <h1 class='txt-32'>
            <span class='weight-700'>&nbsp;{{name}} </span>
            <span >{{type}}</span>
        </h1>
    </header>
    <div class='flex-vertical-center'>
        <ul class='full-x p15-grid ugrid-3'>
            <li ng-repeat='comp in components' class='flex-wrap-center'>
                <a target='_blank' href="{{comp.url}}">
                    <div class='p15-grid text-center flex-wrap-center'>
                        <h1 class='txt-5 text-center full-x weight-900'>{{comp.name}}</h1>
                        <div class='txt-1'>
                            Browser Url <br>
                            {{comp.url}}
                        </div>
                        <div class='txt-1'>
                            File Path: <br>
                            {{comp.file_path}}
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</div>