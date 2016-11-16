<li stretch grow='1' width='100' x='center' ng-repeat='(sectionName, value) in docs.data.content track by $index' ng-click='docs.data.vars.activeTab = sectionName'>
    {{sectionName}}
</li>