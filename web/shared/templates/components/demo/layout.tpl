<div class="full-xy flex-center">
    <main-view width='100' height='100' x='center' y='center'>

        <div  width='100' height='100' column x='center' wrap>
            <div width='100' x="center" grow="1" class='txt-64' bg="azure">
                Height = 10%
            </div>
            <div width='100' x="center" y="center" grow="10" row-reverse>
                <!-- stretch vertically -->
                <span stretch  x="center" wrap>
                    1/4 column size, stretched, y-pos: center[default]
                </span>
                <span stretch  x="center" y-start bg='slate'>
                    2X column size, stretched, y-pos: top
                </span>
                <span stretch  x="center" y-end>
                    1/4 column size, stretched, y-pos: end[default]
                </span>
            </div>
        </div>


    </main-view>

</div>
