<view size='100'>
    <!-- uncomment this below to get loader -->



    <!-- main has a full page loader as well, not sure if its needed..  it imports from     ui/templates/components/base/main.tpl or you can provide your own view.

    Think of the loader use case for the main element to be the "entrance" && assume that the loader='' imported URL could be the same size
    -->
    <!-- url='./ui/templates/samples/visualizer/components/viz-bar-components.tpl' -->
    <imports>
      <!-- <import-dict as="tree">
        {
          "computers": {
            "laptops": {
              "ultrabooks": {},
              "macbooks": {},
            },
            "desktops": {
              "imac": {}
            },
            "tablets": {
              "pro": {},
              "mini": {}
            }
          },
          "printers": {
          }
        }
      </import-dict> -->
        <import-dict>
        {"categories": [
          {
            "title": "Computers",
            categories: [
              {
                "title": "Laptops",
                categories: [
                  {
                    "title": "Ultrabooks"
                  },
                  {
                    "title": "Macbooks"
                  }
                ]
              },

              {
                "title": "Desktops"
              },

              {
                "title": "Tablets",
                categories: [
                  {
                    "title": "Apple"
                  },
                  {
                    "title": "Android"
                  }
                ]
              }
            ]
          },

              {
                "title": "Printers"
              }

        ]
    }
        </import-dict>
    </import>
    <components>
        <filter-tag name="name|var">
            <li init-with="p:[opacity:0]"
                when-filter-enter="a:[bounceIn-subtle:1000:linear:0:1:f]">
                <button class="ui-gallery-filter-btn">{{name}}</button>
            </li>
        </filter-tag>
    </components>
    <main grow='1' size='100' column wrap>


        <content bg='slate' grow='8' x='center' y='center'>
            <!-- <tree-elem tree-data='view.data.categories'> </tree-elem> -->
        </content>


    </main>
    <!-- <external grow='1'>

    </external> -->

</view>
