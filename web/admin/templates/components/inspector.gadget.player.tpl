<div class='absolute full-x' style='z-index:1000;height:65px;' ng-repeat='player in root.inspector.players track by $index' id='gadget-player' ng-if='root.inspector.activePlayer === player' init-default when-show-state-active="p:[transform:translateY(0%):translateY(-100%):250:easeOutQuint]" when-show-state-inactive="p:[transform:translateY(-100%):translateY(0%):250:easeInQuint]">
    <div class='full-xy'>
        <ul class='flex-wrap grid absolute right-0 grid full-x bg-charcoal-80p absolute left-0' style='bottom:65px;' ng-if='player.state.properties.length && player.prefs.showProps '>
            <li class='full-x relative flex-vertical-wrap bg-azure-20p p15-grid border-2-bottom border-charcoal txt-2 weight-700' style='max-height:75px;' ng-if='property.active' ng-repeat='property in player.state.properties track by $index'>
                <div style='margin-top:-5px;' class='width-10p  uppercase flex-wrap-center text-left'>
                    <div class='full-x'>
                        <h1 class='uppercase m05y txt-4 text-left'> {{property.name}} </h1>
                    </div>
                    <span class='m05top bg-charcoal txt-1 p20x border-azure border-1 border-solid'> {{property.easing}} </span>
                </div>
                <div class='player flex-wrap p15-grid flex-start relative p10x' style='width:70%;'>
                    <div class='p20x relative flex-vertical-center flex-wrap' style='width:90%'>
                        <hr class='full-x relative' id='property-bar-{{$index}}'>
                        <div class='left-0 m20x m10y round bg-{{player.prefs.ballColor || "azure"}} z-index-99 top-0 absolute p15-grid' id='property-ball-{{$index}}'> </div>
                        <div class='absolute right-0 flex-wrap-center txt-1 p20x weight-600 top-50p' style='margin-right:-15%'>
                            <div class='full-x opacity-20p weight-900 text-right'>{{property.name}}</div>
                            <div class='full-x text-right' id='property-value-{{$index}}'> </div>
                        </div>
                    </div>
                    <div class='full-x absolute bottom-0 flex-wrap grid full-x m10x'>

                            <div ng-if='player.prefs.speed' class='txt-2 m10x'>
                                <span class='weight-900 opacity-70p'>
                                    Speed:
                                </span>
                                <span class='weight-900'>
                                    {{property.state.speed}}
                                </span>
                            </div>
                            <div ng-if='player.prefs.speed' class='txt-2 m10x'>
                                <span class='weight-900 opacity-70p'>
                                    Start:
                                </span>
                                <span class='weight-900'>
                                    {{property.start}}
                                </span>
                            </div>
                            <div ng-if='player.prefs.speed' class='txt-2 m10x'>
                                <span class='weight-900 opacity-70p'>
                                    End:
                                </span>
                                <span class='weight-900'>
                                    {{property.end}}
                                </span>
                            </div>
                    </div>

                </div>
                <div style='width:20%' class='flex-vertical-center relative'>
                    <ul class='top-0 flex-vertical-center ugrid-6 p15-grid absolute full-x right-0'>
                        <li ng-click='player.stepTo("reverse")' class='opacity-30p'>
                            <span  class='svg-24 svg-stroke-6 radius-2 bg stroke-smoke'>
                                <svg style='transform:rotate(-180deg)' viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <path d="M68.3635106,20.0921155 C68.3635106,16.727533 71.0974015,14 74.454538,14 L74.454538,14 C77.8185196,14 80.5455654,16.7345657 80.5455654,20.0921155 L80.5455654,79.9078845 C80.5455654,83.272467 77.8116745,86 74.454538,86 L74.454538,86 C71.0905565,86 68.3635106,83.2654343 68.3635106,79.9078845 L68.3635106,20.0921155 Z M65.6106483,47.0463201 C66.5720751,47.8852207 67.3635106,48.7075094 67.3635106,50.0226176 C67.3635106,51.3349572 66.8005882,52.132328 65.6106483,52.9961465 L23.5085114,85.7243441 C22.8090385,86.2005517 20.0362277,86.4054318 20,83.3433062 L20,16.6991604 C20.0027867,13.8668327 22.5359376,13.6425721 23.5085114,14.3208911 L65.6106483,47.0463201 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </li>
                        <li ng-click="property.player.play()" >
                            <span class='svg-24 svg-stroke-4 radius-2 stroke-smoke' ng-class="{'opacity-50p':player.state.active}"  ng-include='"shared/templates/components/svg/main/play.html"'></span>
                        </li>
                        <li ng-click='property.player.pause()' ng-class="{'opacity-50p':!player.state.active}">
                            <span class='svg-24 svg-stroke-4 radius-2 stroke-smoke'  ng-include='"shared/templates/components/svg/main/pause.html"'></span>
                        </li>
                        <li ng-click='property.player.reset()' ng-if='!root.player.state.active'>
                            <span class='svg-24 svg-stroke-4 radius-2 stroke-smoke' ng-include='"shared/templates/components/svg/main/sync.html"'></span>
                        </li>
                        <li ng-click='property.player.stepTo("forwards")'>
                            <span class='svg-24 svg-stroke-4 radius-2 bg stroke-smoke'  ng-include='"shared/templates/components/svg/main/skip.html"'></span>
                        </li>
                        <li ng-click='property.player.active = ! property.player.active'>
                            <span class='svg-24 svg-stroke-4 radius-2 bg stroke-smoke' ng-click='property.active = !property.active' ng-include='"shared/templates/components/svg/main/lock.html"'></span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <ul class='flex-wrap-center ugrid-6 absolute right-0 p15-grid' style='width:20%;' ng-if='player.play'>
            <li ng-click='player.stepTo("reverse")'>
                <span  class='svg-32 svg-stroke-6 radius-2 bg stroke-smoke'>
                    <svg style='transform:rotate(-180deg)' viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M68.3635106,20.0921155 C68.3635106,16.727533 71.0974015,14 74.454538,14 L74.454538,14 C77.8185196,14 80.5455654,16.7345657 80.5455654,20.0921155 L80.5455654,79.9078845 C80.5455654,83.272467 77.8116745,86 74.454538,86 L74.454538,86 C71.0905565,86 68.3635106,83.2654343 68.3635106,79.9078845 L68.3635106,20.0921155 Z M65.6106483,47.0463201 C66.5720751,47.8852207 67.3635106,48.7075094 67.3635106,50.0226176 C67.3635106,51.3349572 66.8005882,52.132328 65.6106483,52.9961465 L23.5085114,85.7243441 C22.8090385,86.2005517 20.0362277,86.4054318 20,83.3433062 L20,16.6991604 C20.0027867,13.8668327 22.5359376,13.6425721 23.5085114,14.3208911 L65.6106483,47.0463201 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>
            </li>
            <li ng-click="player.play()" >
                <span class='svg-32 svg-stroke-6 radius-2 stroke-smoke' ng-class="{'opacity-50p':player.state.active}"  ng-include='"shared/templates/components/svg/main/play.html"'></span>
            </li>
            <li ng-click='player.pause()' ng-class="{'opacity-50p':!player.state.active}">
                <span class='svg-32 svg-stroke-6 radius-2 stroke-smoke'  ng-include='"shared/templates/components/svg/main/pause.html"'></span>
            </li>
            <li ng-click='player.reset(player)' ng-if='!root.player.state.active'>
                <span class='svg-32 svg-stroke-6 radius-2 stroke-smoke' ng-include='"shared/templates/components/svg/main/sync.html"'></span>
            </li>
            <li ng-click='player.stepTo("forwards")'>
                <span class='svg-32 svg-stroke-6 radius-2 bg stroke-smoke'  ng-include='"shared/templates/components/svg/main/skip.html"'></span>
            </li>
            <li ng-click='player.prefs.showProps = !player.prefs.showProps'>
                <span class='svg-32 svg-stroke-6 radius-2 bg stroke-smoke'  ng-include='"shared/templates/components/svg/main/arrow.html"'></span>
            </li>
        </ul>
        <div style='width:10%' class='relative full-y txt-charcoal txt-24 uppercase'>
            <a init-default on-click="send:[show-state-active:public]" ng-click='player.prefs.showStates(player)' class='bg-charcoal-20p weight-600 full-y p15x flex-vertical-center txt-16 lowercase'>
                {{player.prefs.activeState}}
            </a>
        </div>
        <div class='m10y p15left player absolute' style='width:65%; left:10%; top:10%;' ng-mouseup="player.jumpTo($event)">
            <hr class='full-x relative' inspector-bar/>
            <hr class='full-x opacity-50p bg-transparent border-4 border-solid border-slate z-index-99 top-0 absolute right-0' style='max-width:98.5%;left:1.5%;' ng-if='player.delay.offset' inspector-end-early/>
            <hr class='full-x opacity-50p bg-transparent border-4 border-solid border-slate z-index-99 top-0 absolute right-0' style='max-width:98.5%;left:1.5%;' ng-if='player.delay.offset' inspector-delay />
            <div class='m05y round bg-smoke z-index-1000 top-0 absolute p15-grid' inspector-ball> </div>
            <div class='full-x flex-end'>
                <div class='z-index-99 top-0 m10y p10y right-0 absolute p15-grid weight-900 p05y' style='margin-right:-20px;'>
                    <span class='weight-900 txt-5 txt-white' inspector-time></span><span style='margin-left:-10px;' class='opacity-50p txt-3'>/{{player.tweenConfig.durationFormatted}} </span>
                </div>
                <div ng-if='player.prefs.speed' class='txt-2' style='margin-top:-5px; margin-right:10px;'>
                    <span class='weight-900 opacity-70p'>
                        Speed:
                    </span>
                    <span class='weight-900'>
                        {{player.prefs.speed}}x
                    </span>
                </div>
                <div ng-if='player.prefs.speed' class='txt-2 m10x' style='margin-top:-5px;'>
                    <span class='weight-900 opacity-70p'>
                        Step Size:
                    </span>
                    <span class='weight-900'>
                        {{player.prefs.stepSize}}ms
                    </span>
                </div>
                <div ng-if='player.prefs.speed' class='txt-2 m10x' style='margin-top:-5px;'>
                    <span class='weight-900 opacity-70p'>
                        Auto Play:
                    </span>
                    <span class='weight-900'>
                        {{player.prefs.autoPlay}}
                    </span>
                </div>
                <div ng-if='player.prefs.speed' class='txt-2 m10x' style='margin-top:-5px;'>
                    <span class='weight-900 opacity-70p'>
                        Logging:
                    </span>
                    <span class='weight-900'>
                        {{player.prefs.showLog}}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class='relative bg-slate-90p' style='height:65px!important;'>
        <ul class='overflow-x p15-grid full-xy flex-center-vertical-wrap txt-18'>
            <li init-default on-click='send:[show-state-inactive:public]'>
                <button class="txt-18 bg-charcoal height-36 radius-2 normal">Close</button>
            </li>
            <li ng-repeat='state in player.prefs.elemAnimStates' ng-click='player.prefs.switchStateTo(player, state)'>
				<!-- style='width:{{90/player.prefs.elemAnimStates.length}}%;' -->
                <span class='block txt-18 weight-600 full-x'> {{state.name}} </span>
                <span class='block txt-1'>{{state.value}}</span>
            </li>
        </ul>
    </div>
</div>
