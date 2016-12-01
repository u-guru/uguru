<div abs top="0" left="0" w="100%" h="100%">
	<div width="100">
		<h1 p="15px 15px 0" f-w="600">anim/send + siblings</h1>
		<ul p="7.5px" row>
			<li p="7.5px"
				u init-with="p:[tr:scaleY(0), tro:center bottom]"
				on-init="a:[scaleY:0:1:1000:easeOutBounce:0:1:f] | s:[build-house-siblings:siblings:500]">
				<div x-center y-center w='48px' h='48px' bg='sienna' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-siblings="a:[scaleY:0:1:500:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='sienna' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-siblings="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='sienna' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-siblings="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='sienna' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-siblings="a:[scaleY:0:1:750:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='sienna' border='2px solid white' rad='2px'></div>
			</li>
		</ul>
	</div>

	<div width="100">
		<h1 p="15px 15px 0" f-w="600">anim/send + depth(0)</h1>
		<ul p="7.5px" row>
			<li p="7.5px"
				u init-with="p:[tr:scaleY(0), tro:center bottom]"
				on-init="a:[scaleY:0:1:1000:easeOutBounce:0:1:f] | s:[build-house-depth:depth(0):500]">
				<div x-center y-center w='48px' h='48px' bg='copper' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-depth="a:[scaleY:0:1:500:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='copper' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-depth="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='copper' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-depth="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='copper' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-depth="a:[scaleY:0:1:750:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='copper' border='2px solid white' rad='2px'></div>
			</li>
		</ul>
	</div>

	<div width="100">
		<h1 p="15px 15px 0" f-w="600">send + siblings</h1>
		<ul p="7.5px" row>
			<li p="7.5px"
				u on-init="s:[build-house-anim:siblings:500]">
				<div x-center y-center w='48px' h='48px' bg='neptune' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-anim="a:[scaleY:0:1:500:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='neptune' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-anim="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='neptune' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-anim="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='neptune' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-anim="a:[scaleY:0:1:750:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='neptune' border='2px solid white' rad='2px'></div>
			</li>
		</ul>
	</div>

	<div width="100">
		<h1 p="15px 15px 0" f-w="600">anim/send + public</h1>
		<ul p="7.5px" row>
			<li p="7.5px"
				u init-with="p:[tr:scaleY(0), tro:center bottom]"
				on-init="a:[scaleY:0:1:1000:easeOutBounce:0:1:f] | s:[build-house-public:public:500]">
				<div x-center y-center w='48px' h='48px' bg='olive' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-public="a:[scaleY:0:1:500:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='olive' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-public="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='olive' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-public="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='olive' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-public="a:[scaleY:0:1:750:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='olive' border='2px solid white' rad='2px'></div>
			</li>
		</ul>
	</div>

	<div width="100">
		<h1 p="15px 15px 0" f-w="600">send + children + anim</h1>
		<ul p="7.5px" row u on-init="s:[build-house-children:children:500]">
			<li p="7.5px"
				u init-with="p:[tr:scaleY(0), tro:center bottom]"
				on-init="a:[scaleY:0:1:1000:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='rose' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-children="a:[scaleY:0:1:500:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='rose' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-children="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='rose' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-children="a:[scaleY:0:1:750:easeOutQuad:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='rose' border='2px solid white' rad='2px'></div>
			</li>
			<li p="7.5px"
				u init-with="p:[tro:center bottom, tr:scaleY(0)]"
				when-build-house-children="a:[scaleY:0:1:750:easeOutBounce:0:1:f]">
				<div x-center y-center w='48px' h='48px' bg='rose' border='2px solid white' rad='2px'></div>
			</li>
		</ul>
	</div>
</div>
