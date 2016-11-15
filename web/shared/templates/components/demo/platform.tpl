<div class="full-xy flex-center">
    <main-view  width='100' height='100' x='center' y='center'>

        <div  width='100' height='100' column x='center' wrap>
            <ul  y='center' row width='100' x="center" grow="1" class='txt-32'  bg="azure">
                <li grow='1' x='center' m-font-size="10px">
                    {{root.window.browser.name}}:
                    {{root.window.browser.size.orientation}}
                </li>
                <li grow='1' class='txt-32' x='center'>
                    {{root.window.browser.size.width}}
                    &nbsp;x&nbsp;
                    {{root.window.browser.size.height}}
                </li>
                <li grow='1' class='txt-32' x='center'>
                    {{root.window.browser.size.type}}
                </li>

            </ul>
            <div width='100' x="center" column y="center" grow="10" row-reverse>
                <div stretch wrap  x="center" grow='1'>
                    <h1 class='txt-64 txt-center' width='100'  >
                        platform
                    </h1>
                    <span wrap ng-repeat='(platform_key, value) in root.window.browser.platform' margin='20px'>

                        <div class='weight-900'>
                             {{platform_key}}
                        </div>
                        <div class='weight-400'>
                            {{value}}
                        </div>

                    </span>
                </div>
                <div stretch column  width='50' wrap bg="slate"  x="center" grow='1'>
                    <h1 class='txt-64 txt-center' width='100'  >
                        os info
                    </h1>
                    <span wrap ng-repeat='(os_key, value) in root.window.browser.os' margin='20px'>

                        <div class='weight-900'>
                             {{os_key}}:&nbsp;
                        </div>
                        <div class='weight-400'>
                            {{value}}:&nbsp;
                        </div>

                    </span>
                </div>

            </div>
        </div>


    </main-view>
</div>
