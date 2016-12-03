<div abs top="0" left-"0" x-center y-center w="100" h="100" z='1000' bg='sienna'
	u init-with="p:[tro:top center]"
	on-init="a:[scaleY:1:0.0075:500:easeOutSine:4000:1:f]">
	<div u init-with="p:[tro:center center]"
		on-init="a:[bounceOut-subtle:1000:linear:3500:1:f]">
		<div y-end>
			<div p-x="1px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				on-init="a:[scaleY:0:1:1000:easeOutElastic:0:1:f]:delay-{{$index * 20}}"
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
				on-init="a:[scaleY:0:1:1000:easeOutElastic:0:1:f]:delay-{{$index * 20}}">
	            <div width="2px" height="{{sample * 3}}px" bg='white-50p' rad="4px"
					u init-with="p:[tro:center top]"
					on-init="a:[scaleY:1:1.25:250:easeInOutSine:0:50:a]"></div>
	        </div>
		</div>
	</div>
</div>
