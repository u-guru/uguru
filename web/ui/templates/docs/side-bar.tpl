<ul column-reverse x='center' y='center' width='100'>
    <side-bar-item ng-repeat='(sectionName, value) in docs.data.content track by $index' custom> </side-bar-item>
    <!-- <li  ng-click='docs.data.vars.activeTab = sectionName'>
        {{sectionName}}
    </li> -->
</ul>