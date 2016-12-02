<li column x='stretch' y='center' padding='20px' f-s="16px" class="uppercase">
    <set active-tab="1|num"> </set>
    <ul width='100%' x='stretch' y='center' row relative>
        <li grow='1' x='center' y='center'
            u-list="tab in tabInfo"
            u when-var-active-tab-is-index="prop:[font-weight:900]" when-var-active-tab-isnt-index="prop:[font-weight:400]" ng-click="vars.activeTab=index">
            {{tab}}
        </li>
        <hr abs l='0' b='-20px' h='5px' border="0" m="0" w='{{100/tabInfo.length}}%' bg='azure'
            u init-with="p:[t:all 150ms ease-out]"
            when-var-active-tab-changes="p:[transform:translateX({{(vars.activeTab-1)*100}}%)]"/>
    </ul>
</li>
