<view id='scroll-container' x='center' y='center' size='100%'>
    <!-- scrollable="demo|y" -->

    <main grow='1' height='100%' width='100%' x='center' column nowrap>
        <nav height='15%' x='center' y='center'>
            Nav bar

        </nav>
        <content grow='1' bg='slate'  x='center' overflow-hidden y='center' max-height='85%' width='100%' column >
            <div size='100' scroll-y  scrollable="content|y" id='scroll-container'>
                <section size='100' relative>
                    <div grow='1' y='center' height='100' u on-scroll-content="a:[translateX:0px:1000px:1000:linear:20:1:f]">
                        Section 1
                    </div>
                </section>
                <section size='100' x='center y='center bg='charcoal'>
                    <div>
                        Section 2
                    </div>
                </section>

            </div>
            <!-- <div u init-with="p:[transform:translateX(-50%)]" on-scroll-content="a:[translateX:0%:100%:1000:linear:0:1:f]" height='50%' width='50%' bg='auburn' x='center' y='center'>
                  <span height='50%' width='50%'> scroll me </span>
                </div> -->
    </main>

</view>
