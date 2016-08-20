<div class='absolute full-x' style='z-index:1000;height:65px;'  ng-repeat='player in root.inspector.players track by $index' ng-if='root.inspector.activePlayer === player'>
    <ul class='flex-wrap grid absolute right-0 grid full-x bg-charcoal-80p absolute left-0' style='bottom:65px;' ng-if='player.state.properties.length && player.prefs.showOptions ' >
        <li class='full-x relative flex-vertical-wrap bg-azure-20p p15-grid border-2-bottom border-charcoal txt-2 weight-700' style='max-height:75px;' ng-repeat='property in player.state.properties track by $index'>
            <div style='margin-top:-5px;' class='width-10p  uppercase flex-wrap-center text-left'>
                <div class='full-x'>
                    <h1 class='uppercase m05y txt-4 text-left'> {{property.name}} </h1>
                </div>
                <span class='mtop05 bg-charcoal txt-1 p20x border-azure border-1 border-solid'> {{property.easing}} </span>
            </div>
            <div class='player flex-wrap p15-grid flex-start relative p10x' style='width:70%;'>
                <div class='p20x relative flex-vertical-center flex-wrap' style='width:90%'>
                    <hr class='full-x relative' id='property-bar-{{$index}}'>
                    <div class='left-0 m20x m10y round bg-{{player.prefs.ballColor || "azure"}} z-index-99 top-0 absolute p15-grid' id='property-ball-{{$index}}'> </div>
                    <div id='property-value-{{$index}}' class='absolute right-0 flex-vertical-center txt-1 p20x weight-600 top-50p' style='margin-right:-15%'> </div>
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
                <div class="top-0 flex-vertical-center ugrid-6 p15-grid absolute full-x right-0">
                    <h1 class='p20x p10y full-x border-azure txt-smoke text-center border-2 border-dashed'>
                        Play controls in progress
                    </h1>
                </div>
                <ul class='top-0 flex-vertical-center ugrid-6 p15-grid absolute full-x right-0 opacity-30p'>
                    <li ng-click='player.stepTo("reverse", property)'>
                        <span  class='svg-24 svg-stroke-6 radius-2 bg stroke-smoke'>
                            <svg style='transform:rotate(-180deg)' viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M68.3635106,20.0921155 C68.3635106,16.727533 71.0974015,14 74.454538,14 L74.454538,14 C77.8185196,14 80.5455654,16.7345657 80.5455654,20.0921155 L80.5455654,79.9078845 C80.5455654,83.272467 77.8116745,86 74.454538,86 L74.454538,86 C71.0905565,86 68.3635106,83.2654343 68.3635106,79.9078845 L68.3635106,20.0921155 Z M65.6106483,47.0463201 C66.5720751,47.8852207 67.3635106,48.7075094 67.3635106,50.0226176 C67.3635106,51.3349572 66.8005882,52.132328 65.6106483,52.9961465 L23.5085114,85.7243441 C22.8090385,86.2005517 20.0362277,86.4054318 20,83.3433062 L20,16.6991604 C20.0027867,13.8668327 22.5359376,13.6425721 23.5085114,14.3208911 L65.6106483,47.0463201 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                    </li>
                    <li ng-click="player.play(property)" >
                        <span class='svg-24 svg-stroke-4 radius-2 stroke-smoke' ng-class="{'opacity-50p':player.state.active}"  ng-include='"shared/templates/components/svg/main/play.html"'></span>
                    </li>
                    <li ng-click='player.pause(property)' ng-class="{'opacity-50p':!player.state.active}">
                        <span class='svg-24 svg-stroke-4 radius-2 stroke-smoke'  ng-include='"shared/templates/components/svg/main/pause.html"'></span>
                    </li>
                    <li ng-click='player.reset(player, property)' ng-if='!root.player.state.active'>
                        <span class='svg-24 svg-stroke-4 radius-2 stroke-smoke' ng-include='"shared/templates/components/svg/main/sync.html"'></span>
                    </li>
                    <li ng-click='player.stepTo("forwards", property)'>
                        <span class='svg-24 svg-stroke-4 radius-2 bg stroke-smoke'  ng-include='"shared/templates/components/svg/main/skip.html"'></span>
                    </li>
                    <li>
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
        <li ng-click='player.prefs.showOptions = !player.prefs.showOptions' ng-if='false'>
            <span class='svg-32 svg-stroke-6 radius-2 bg stroke-smoke'  ng-include='"shared/templates/components/svg/main/arrow.html"'></span>
        </li>
    </ul>
    <div class='m10y player absolute' style='width:75%;left:2.5%; top:10%;' ng-mouseup="player.jumpTo($event)">
        <hr class='full-x relative' inspector-bar>
        <div class='m05y round bg-{{player.prefs.ballColor || "azure"}} z-index-99 top-0 absolute p15-grid' inspector-ball> </div>
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