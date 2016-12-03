<div abs top="0" left-"0" x-center y-center wrap w="100" h="100" z='1000' bg="#619BB4"
	u init-with="p:[tro:top center]"
	on-init="a:[translateY:0%:-100%:500:easeOutExpo:5000:1:f] | s:[vibes-logo-enter:children, vibes-place:children:1500, vibes-viz:depth(>1):2500]">
	<div width="100" x-center
		u init-with="p:[tr:rotate(30deg) scale(0), tro:center center]"
		when-vibes-logo-enter="a:[rotate:30deg:0deg:250:easeInExpo:0:1:f, scale:0:1:250:easeInOutBack:0:1:f]"
		when-vibes-place="a:[translateY:0px:-150px:300:easeInBack:0:1:f, scale:1:0.6:300:easeInBack:0:1:f]">
		<h2 p="20px 30px" border="6px solid white" rad="2px" font-size="60px" f-w="900" letter-spacing='0.3em' line-height='1.2'>VIBES.CLUB</h2>
	</div>
	<div width="100" x-center
		u init-with="p:[op:0, tr:translateY(0px)]"
		when-vibes-place="a:[opacity:0:1:500:linear:50:1:f, translateY:0px:-100px:250:easeOutCubic:300:1:f]">
		<h2 rad="2px" font-size="36px" f-w="600" line-height='1.2' letter-spacing='0.3em' class="txt-center">Ready for all the vibes?</h2>
	</div>
	<div u init-with="p:[tro:center center]"
		when-vibes-viz="a:[bounceOut-subtle:1000:linear:3500:1:f]">
		<div y-end>
			<div p-x="1px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-vibes-viz="a:[scaleY:0:1:1000:easeOutElastic:0:1:f]:delay-{{$index * 20}}"
				u-list='sample in [15, 20, 10, 13, 18, 19, 20, 13, 12, 9, 23, 20, 10, 13, 18, 19, 20, 13, 12, 9, 23]'>
	            <div width="2px" height="{{sample * 5}}px" bg='white' rad="4px"
					u init-with="p:[tro:center bottom]"
					on-init="a:[scaleY:1:1.25:250:easeInOutSine:0:50:a]"></div>
	        </div>
		</div>
		<div y-start>
			<div p-x="1px"
				u-list='sample in [12, 23, 23, 19, 19, 18, 13, 15, 13, 20, 9, 12, 18, 9, 20, 20, 13, 13, 20, 10, 10]'
				u init-with="p:[tro:center top, tr:scaleY(0)]"
				when-vibes-viz="a:[scaleY:0:1:1000:easeOutElastic:0:1:f]:delay-{{$index * 20}}">
	            <div width="2px" height="{{sample * 3}}px" bg='white-50p' rad="4px"
					u init-with="p:[tro:center top]"
					when-vibes-viz="a:[scaleY:1:1.25:250:easeInOutSine:0:50:a]"></div>
	        </div>
		</div>
	</div>
</div>
