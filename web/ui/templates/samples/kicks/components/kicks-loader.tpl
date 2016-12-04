<div abs top="0" left-"0" x-center y-center wrap w="100" h="100" z='100' bg="#F25A5B"
	u init-with="p:[tr:rotate(0deg) scale(1), tro:center bottom]"
	on-init="s:[kicks-counter:grandchildren:400, kicks-counter-end:grandchildren:2000, kicks-logo:grandchildren:2700, kicks-exit:children:3500] | a:[scale:1:0:500:easeOutCubic:4100:1:f]">
	<div u init-with="p:[tr:rotate(0deg) scale(1), tro:center center]"
		when-kicks-exit="a:[rotate:0deg:360deg:500:easeInOutSine:0:1:f]">
		<div width="100" x-center m-top="-150px" z="10">
			<div u init-with="p:[op:0, tr:translateX(550px) translateY(-300px) rotate(30deg), tro:center center]"
				when-kicks-counter-end="p:[op:1] | a:[translateX:550px:0px:300:easeOutBack:0:1:f, translateY:-300px:75px:300:easeOutBack:0:1:f,rotate:30deg:0deg:300:easeOutBounce:0:1:f]"
				when-kicks-logo="a:[translateY:75px:0px:300:easeOutBack:0:1:f, rotate:-5deg:0deg:300:easeOutBack:0:1:f]">
				<graphic width="100%" url="ui/templates/samples/kicks/components/sneaker.html"></graphic>
			</div>
		</div>
		<div width="100" x-center>
			<!-- <h2 p="20px 30px" border="6px solid white" rad="2px" font-size="60px" f-w="900" letter-spacing='0.3em' line-height='1.2'>Kicks Calendar</h2> -->
			<div font-size="60px" f-w="900" letter-spacing='0.3em' line-height='1.2'
			 	u init-with="p:[op:0, tr:scaleY(1), tro:center bottom]"
				on-init="a:[opacity:0:1:300:linear:0:1:f]"
				when-kicks-counter="a:[counter:1980:2016:1500:easeInCirc:0:1:f]"
				when-kicks-counter-end="a:[scaleY:1:0:500:bouncePast:100:1:f]">1980</div>
			<div abs font-size="60px" f-w="900" letter-spacing='0.3em' line-height='1.2' class="txt-center"
				u init-with="p:[tr:scaleY(0), tro:center bottom]"
				when-kicks-counter-end="a:[scaleY:0:1:500:easeOutBack:700:1:f]">
				<div>Kicks</div>
				<div>Calendar</div>
			</div>
		</div>
	</div>
</div>
