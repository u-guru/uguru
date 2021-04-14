<view size='100' abs top='0' left='0' width='100%' height='100%' scrollable="main|y">
    <!-- uncomment this below to get loader -->


    <!-- main has a full page loader as well, not sure if its needed..  it imports from     ui/templates/components/base/main.tpl or you can provide your own view.

    Think of the loader use case for the main element to be the "entrance" && assume that the loader='' imported URL could be the same size
    -->
    <!-- url='./ui/templates/samples/visualizer/components/viz-bar-components.tpl' -->

    <!-- <data-bindings>
    </data-bindings> -->

   <!--  <loader z='100' size='100%' abs height='100%' width='100%' url='./ui/templates/samples/visualizer/components/loader.tpl'>

    </loader> -->

    <components>
        <container size="string">

        </container>
        <gr-it title="string" grow='string'>
            <div bg='white' txt='charcoal'  f-s='12px' f-w='700' class='uppercase' style='align-self:stretch'>
                {{title}}
            </div>
        </gr-it>

    </components>

    <main grow='1' height='100%' width='100%' x='center' y='center' column nowrap>

        <content bg='charcoal' stretch>
            <div x='start' y='center'  border='1px solid white' row>
                <gr-it title='1'>

                </gr-it>
                <gr-it title='2'>
                </gr-it>
                <gr-it title='2' >
                </gr-it>
                <gr-it title='4' >
                </gr-it>
            </div>
            <div size='150px' x='flex-start' y='center' border='1px solid white' z='-1'>
                <gr-it title='center'>
                </gr-it>
            </div>
        </content>

    </main>

</view>
