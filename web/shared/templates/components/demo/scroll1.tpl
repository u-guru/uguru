<view>
    <main grow='1' height='100%' width='100%' x='center' y='center' column nowrap>
        <content grow='1'  x='center' overflow-hidden y='center' size='100' column relative>
            <div size='100' row wrap scroll-y  scrollable="content|y" id='scroll-container'>
                <div grow='1' width='100' x='center' fixed height='10%' bg='charcoal' f-s='24' u init-with="p:[transition:all 500ms ease]" when-scroll-content-changes-y="p:[height:5%:10%,height:10%:-10%,background:rgba(255,255,255,0.8):10%,color:rgba(255,255,255,0.9):-10%,color:black:10%,font-size:12px:10%,font-size:24px:-10%]" >
                    Nav
                </div>
                <div column wrap x='center' y='center' height='190%' width='100'>
                    <div bg='slate' grow='1' width='100' x='center' y='center' u init-with="p:[transition: transform 500ms ease]" when-scroll-content-changes-y="p:[transform:scale(0) rotate(1080deg):10%]">
                            Yo
                    </div>
                    <div bg='moola' width='100' grow='1' x='center' y='center' scrollable="content-two|x" scroll-x relative>
                        <div width='1000px' height='100px' abs left='0'>
                            <div bg='charcoal' txt='smoke' abs left='50%' width='50px'> Ay </div>
                        </div>
                    </div>
                </div>
            </div>
            <div fixed bottom='0' right='0' bg='slate' p='20px' op='0' u init-with="p:[transform:translateX(100%)]" when-scroll-content-changes-y-pos="a:[fadeInLeft:250:linear:0:1:f]"> footer </div>

        </content>
    </main>
</view>