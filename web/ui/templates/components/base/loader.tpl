<div x='center' y='center' z='1000' bg='charcoal'>
    <div>
		<h1 f-s="36px" f-w="600" row
			u init-with="p:[op:0]"
			on-init="a:[opacity:0:1:500:linear:0:1:f] | s:[dot-1:public:250]"
			when-dot-1="s:[dot-2:public:250]"
			when-dot-2="s:[dot-3:public:250]"
			when-dot-3="s:[dot:public:250]"
			when-dot="s:[dot-1:public:250]">
			<span>Loading</span>
			<span u init-with="p:[op:0]"
				when-dot="a:[opacity:1:0:50:linear:0:1:f]"
				when-dot-1="a:[opacity:0:1:50:linear:0:1:f]">.</span>
			<span u init-with="p:[op:0]"
				when-dot="a:[opacity:1:0:50:linear:0:1:f]"
				when-dot-2="a:[opacity:0:1:50:linear:0:1:f]">.</span>
			<span u init-with="p:[op:0]"
				when-dot="a:[opacity:1:0:50:linear:0:1:f]"
				when-dot-3="a:[opacity:0:1:50:linear:0:1:f]">.</span>
		</h1>
	</div>
</div>
