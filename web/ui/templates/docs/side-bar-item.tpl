<li ng-repeat='(sectionName, value) in docs.data.content track by $index' ng-click='docs.data.vars.activeTab = sectionName'>
	<!-- error with links, moving ng-click to <a> causes the link not to render -->
    <h1><a u on-click="c:[selected:add]">{{sectionName}}</a></h1>
</li>
