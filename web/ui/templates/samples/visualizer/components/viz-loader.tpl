<div abs top="0" left-"0" x-center y-center w="100" h="100" z='1000' bg='sienna'
	u init-with="p:[tro:top center]"
	on-init="a:[scaleY:1:0.0075:500:easeOutSine:4000:1:f]">
	<div u init-with="p:[tro:center center]"
		on-init="a:[bounceOut-subtle:1000:linear:3500:1:f]">
		<ul y-center gutter="15px" class="p15-grid"
			u init-with="p:[tro:center center]"
			on-init="a:[rotate:0deg:1800deg:4000:linear:0:1:f]">
			<li u init-with="p:[op:0, tro:center center]"
				on-init="a:[bounceIn-subtle:500:linear:0:1:f]">
				<div width="15px" height="15px" rad="100%" bg="white"></div>
			</li>
			<li u init-with="p:[op:0, tro:center center]"
				on-init="a:[bounceIn-subtle:500:linear:100:1:f]">
				<div width="60px" height="60px" rad="100%" bg="white"></div>
			</li>
			<li u init-with="p:[op:0, tro:center center]"
				on-init="a:[bounceIn-subtle:500:linear:200:1:f]">
				<div width="15px" height="15px" rad="100%" bg="white"></div>
			</li>
		</ul>
	</div>
    <!-- <div width='10%' row y='end'>
        <div width='4px' p-x="1px"
			u-list='sample in [15, 20, 10, 13, 18, 19, 20, 13, 12, 9, 23, 20, 10, 13, 18, 19, 20, 13, 12, 9, 23]'>
            <div width="2px" height="{{sample * 5}}px" bg='white' rad="4px"
                u init-with="p:[tro:0 100%,transform:scaleY(0.5)]" on-init="a:[scaleY:0.5:1:250:bouncePast:5:a]:delay-{{$index * 20}}"  when-reverse-view="reverse:on-init"></div>
        </div>
    </div> -->
</div>
