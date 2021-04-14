<view size='100'>
    <!-- uncomment this below to get loader -->

    e

    <!-- main has a full page loader as well, not sure if its needed..  it imports from     ui/templates/components/base/main.tpl or you can provide your own view.

    Think of the loader use case for the main element to be the "entrance" && assume that the loader='' imported URL could be the same size
    -->
    <!-- url='./ui/templates/samples/visualizer/components/viz-bar-components.tpl' -->

    <components import_url >
        <td-item item="item|var">
            <div on-click='p:[opacity:0]' grow='1' y='center' u init-with="prop:[opacity:0,transform:translateX(-500%)]" on-init="anim:[opacity:0:1:1000:easeOutCirc:0:1:f,translateX:-500%:0:1000:bouncePast:0:1:f]">
                    {{index}}.{{item}}</div>
        </td-item>
    </components>

    <main grow='1' size='100' column wrap>


        <div x='center' y='center' height='100' width='100' abs grow='1' column>
            <td-item u-list="item in ['get money', 'eat', 'financials']" name="{{item}}"></td-item>
        </div>

    </main>

</view>
