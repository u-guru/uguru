
<div class="p30xy radius-2 bg-slate full-x" style="max-width:460px">
    <div class="input-border"
            u
            on-init="s:[input-border-enter:public, input-invalid:public:1000]"

            when-input-invalid="p:[transform:translateY(0px):translateY(10px):100:linear:^:6:a]">
            <input class="input-border light" init-with="p:[opacity:0]" type="{{::input.iType}}"  required placeholder=""
                ng-model="input.text"
                on-valid="s:[input-valid:public]"
                on-invalid="s:[input-invalid:public]"
                on-focus="p:[z-index:10]"
                ng-blur="input.func.removeKeyListener(input.element, input.text, $event)"
                ng-focus="input.func.addKeyListener(input, input.text, $event)"
                on-blur="s:[input-blur:public]"
                on-mouse-enter="s:[input-hover:public]"
                on-mouse-leave="s:[input-leave:public]"/>
            <label   style='cursor:pointer;'>
                <svg class="input-icon email-icon" viewBox="0 0 100 100">
                    <g fill="none" stroke-linecap="round" stroke-linejoin="round"
                        u
                        when-input-valid="s:[input-valid-stroke:public]"
                        when-input-invalid="s:[input-invalid-stroke:public]"
                        when-input-valid-stroke="p:[s:#43cb9d]:delay-125"
                        when-input-invalid-stroke="p:[s:#d3242c]:delay-125">
                        <path d="M63.9709069,63.9709069 C60.39544,67.5463738 55.4559785,69.757846 50,69.757846 C39.088043,69.757846 30.242154,60.911957 30.242154,50 C30.242154,39.088043 39.088043,30.242154 50,30.242154 C55.4732289,30.242154 60.4266694,32.4676325 64.00478,36.063048 C66.4130625,38.4829778 68.1983075,41.5235021 69.0996581,44.9237641 C69.5290494,46.5436031 69.757846,48.2450824 69.757846,50 C69.757846,53.9347216 69.2262746,59.3417259 73.4417381,62.5812267 C77.4282262,65.6447644 82.9286479,65.1002753 85.6110917,62.5812267 C88.2935356,60.0621781 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="email"
                            u
                            init-with="p:[stroke-dashoffset:365.6]"
                            when-input-border-enter="a:[stroke-dashoffset:365.6:0:150:easeOutExpo:2500:1:f]"></path>
                        <path d="M24.18272,71.5721092 C24.4439592,69.3159316 24.9647013,67.1463112 25.7181261,65.1010462 C26.4973699,62.9856927 27.5255171,61.0033636 28.7728947,59.1958778 C31.3054434,55.5261424 34.7416842,52.5771306 38.83328,50.6988292 C35.65568,47.7151492 33.65696,43.4911492 33.65696,38.7986692 C33.65696,29.7871492 40.98848,22.4556292 50,22.4556292 C59.01152,22.4556292 66.34304,29.7871492 66.34304,38.7986692 C66.34304,43.4911492 64.34432,47.7151492 61.16672,50.6988292 C63.2270545,51.6446532 65.2045108,52.7827477 66.8690034,54.2723156 C70.4316406,57.4605484 70.9115219,61.4646492 75.1875,63.7439461 C78.8737891,65.708911 83.2367172,64.6296883 85.6110917,62.5812267 C88.397258,60.177497 89.2868458,57.3718152 89.8060548,53.9347216 C91.7706634,31.4800197 75.4920198,12.0798877 53.4860197,10.1546122 C31.4800197,8.22933664 12.0798877,24.5079802 10.1546122,46.5139803 C8.22933664,68.5199803 24.5079802,87.9201123 46.5139803,89.8453878 C57.5169803,90.8080256 67.8685133,87.2196836 75.7099557,80.6399321" class="name"
                            init-with="p:[sdo:365.6]"
                            when-input-border-enter="p:[stroke-dashoffset:365.6:0:150:easeOutExpo]:delay-100"
                            when-input-valid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"
                            when-input-invalid="p:[sdo:-145.3, tr:rotate(-67.5deg)]"></path>
                        <path d="M47,61 L81.5,24.5" class="success-2"
                            init-with="p:[op:0, sdo:50.3]"
                            when-input-valid="p:[op:1, sdo:4]:delay-375"
                            when-input-invalid="p:[op:0:delay-250, sdo:50.3]"></path>
                        <path d="M32.5,47.5 L47,61" class="success-1"
                            init-with="p:[op:0, sdo:19.9]"
                            when-input-valid="p:[op:1, sdo:0]:delay-250"
                            when-input-invalid="p:[op:0:delay-125, sdo:19.8]:delay-250"></path>
                        <path d="M36,36 L64,64" class="error-1"
                            init-with="p:[op:0, sdo:39.6]"
                            when-input-invalid="p:[op:1, sdo:0]:delay-250"
                            when-input-valid="p:[op:0:delay-175, sdo:39.6]"></path>
                        <path d="M64,36 L36,64" class="error-2"
                            init-with="p:[op:0, sdo:39.6]"
                            when-input-invalid="p:[op:1, sdo:0]:delay-375"
                            when-input-valid="p:[op:0:delay-175, sdo:39.6]:delay-250"></path>
                    </g>
                </svg>
                <div class="label flex-wrap flex-wrap-center" style="transform-origin:bottom center"><word delay="25" type='typing' text="input.placeholder"></word>
                </div>
                <span class="input full-x txt-32"
                     id='ghost-input-container'></span>
                <div class="underline" u
                    init-with="p:[transform:translateY(100px)]"
                    on-init="a:[translateY:100px:0px:2500:easeOutExpo:250:1:f]"
                    when-input-border-enter="a:[translateY:100px:0px:1000:easeOutExpo:0:1:f]">
                    <div u init-with="p:[scaleX:0]"
                        when-input-border-enter="a:[scaleX:0:1:250:easeOutExpo:0:1:f]"></div>
                    <div></div>
                </div>
                <div class="borders">
                    <div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d]:delay-500"
                            when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
                            when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
                    </div>
                    <div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d]:delay-500"
                            when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
                            when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
                    </div>
                    <div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d]:delay-500"
                            when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
                            when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
                    </div>
                    <div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d]:delay-500"
                            when-input-invalid="p:[bg:#d3242c]:delay-500"></div>
                        <div u
                            when-input-valid="p:[bg:#43cb9d, tr:none, op:1]"
                            when-input-invalid="p:[bg:#d3242c, tr:none, op:1]"></div>
                    </div>
                </div>
                <a>
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="36"
                            u
                            when-input-valid="p:[s:#43cb9d, f:#43cb9d]:delay-500"
                            when-input-invalid="p:[s:#d3242c, f:#d3242c]:delay-500"></circle>
                        <path d="M62.7279221,37.2720779 L37.2720779,62.7279221"
                            u
                            when-input-valid="p:[s:white]:delay-500"
                            when-input-invalid="p:[s:white]:delay-500"></path>
                        <path d="M37.2720779,37.2720779 L62.7279221,62.7279221"
                            u
                            when-input-valid="p:[s:white]:delay-500"
                            when-input-invalid="p:[s:white]:delay-500"></path>
                    </svg>
                </a>
            </label>
        </div>
    </div>
