<li column x='stretch' y='center' padding='20px' f-s="16px" class="uppercase">
    <set active-tab="1|num"> </set>
    <ul width='100%' x='stretch' y='center' row relative>

        <span u-list="tab in tabInfo" grow='1' x='center' y='center' u when-var-active-tab-is-index="prop:[font-weight:900]" when-var-active-tab-isnt-index="prop:[font-weight:400]" ng-click="vars.activeTab=index">
            {{tab}}
        </span>
        <div height='10px' left='0'
            u
            init-with="p:[t:left 250ms ease-out]"
            when-var-active-tab-changes="p:[left:{{100/tabInfo.length * (vars.activeTab-1)}}%]"
            bottom='-20px'
            abs
            column
            width='{{100/tabInfo.length}}' bg='azure'>
        </div>
    </ul>


</li>