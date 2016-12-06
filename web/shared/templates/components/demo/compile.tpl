
<view size='100' render-after-ext-scripts>
    <!-- <main-view size='100' abs> -->
    <loader height='100' width='100' min-ms="3000" import='ui/templates/loader.html'> </loader>
    <logic>
        <!-- import scripts -->
        <!-- <data import="random">
        </data> -->
        <components>
            <component name="visualizer" points="list|random.list(100)">
            </component>
        </components>
    </logic>

    <main abs width='100' height='100' z='10'>

        <header>
            {{view}}
        </header>
        <content>
        </content>
        <nav class="ui-gallery-filter-bar" style="margin-top:-15px;"
            u init-with="p:[op:0]"
            on-init="p:[op:1]:delay-100">
        </nav>
        <footer></footer>
    </main>

    <external>
        <sidebar>
        </sidebar>
        <!-- <view>
        </view> -->
    </external>

</view>
