<div row x='center' y='center' width='100' height='10'>

    <!-- <set active-tab="true" active-index="1|num"> </set> -->
    <ul width='100' set="activeTab=0" x='center' y='center' nowrap>

        <logo text="tracy&nbsp;logo">
        </logo>

        {{headerData}}
        <tab u-list="tab in headerData.tabs" tab-data="tab" active-tab="vars.activeTab">
        </tab>


        <!-- <li grow='2'  x='end'  y='center'>

            <graphic url="vars.editable.nav.header.menu_url"/></graphic>
        </li> -->
    </ul>
</div>