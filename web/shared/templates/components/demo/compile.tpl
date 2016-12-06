
<view size='100' render-after-ext-scripts>
    <!-- uncomment this below to get loader -->

    <!-- <loader height='100' width='100' min-ms="3000" url='ui/templates/loader.html'> </loader> -->

    <!-- main has a full page loader as well, not sure if its needed..  it imports from     ui/templates/components/base/main.tpl or you can provide your own view.

    Think of the loader use case for the main element to be the "entrance" && assume that the loader='' imported URL could be the same size

    -->
    <main grow='1' size='100' column wrap loader="" min-ms="2500">

        <header grow='1' x='center' y='center' bg='charcoal'>
            {{user.name}} <img src="{{user.profile}}"> </img>
        </header>
        <!-- u-list this to get several one pagers-->
        <content bg='slate' grow='8' x='center' y='center'>
            Main content
        </content>
        <footer bg='charcoal' grow='1'>
            Footer
        </footer>
        <!-- -->
        <!-- optional but ideall these should be internal to main because it should correlate to appearance to viewport? debatable, just a new proposal-->
        <fixed>
            <f-header> </f-header>
            <f-sidebar/></f-sidebar>
            <f-icon/></f-icon>
        </fixed>
        <modals>
            <modal with-size="#elem-ref"> </modal>
            <modal with-size="#elem-ref"> </modal>
            <modal with-size="#elem-ref"> </modal>
        </modals>
    </main>
    <!-- -->
    <external grow='1'>
        <!-- <view url='' loader ='' browser-url = ''>-->
    </external>

</view>
