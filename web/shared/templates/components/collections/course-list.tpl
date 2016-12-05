<div class="perspective-container full-xy flex-center p15xy">
	<div class="course-list"
	 u on-init="s:[course-init:children:easeOutCirc-800]">
		<ul>
			<!-- @samir - <li> elements are being staggered in intervals of 100ms -->
			<!-- lines: 7, 18, 29, 40 -->
			<li u init-with="p:[op:0]"
				when-course-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-exit="a:[opacity:1:0:1000:easeInOutSine:0:1:f]">
				<a class="course-list-item">
					<div class="border">
						<div></div><div></div><div></div><div
							u init-with="p:[tr:scaleY(0), tro:center center]"
							on-init="a:[scaleY:0:1:450:easeInOutBack:100:1:f]"></div>
					</div>
					<h3>PHYS 202</h3>
					<h2>Vibration, Waves, and Optics</h2>
				</a>
			</li>
			<li u init-with="p:[op:0]"
				when-course-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-exit="a:[opacity:1:0:1000:easeInOutSine:0:1:f]">
				<a class="course-list-item">
					<div class="border">
						<div></div><div></div><div></div><div
							u init-with="p:[tr:scaleY(0), tro:center center]"
							on-init="a:[scaleY:0:1:450:easeInOutBack:100:1:f]:delay-100"></div>
					</div>
					<h3>PHYS 202</h3>
					<h2>Vibration, Waves, and Optics</h2>
				</a>
			</li>
			<li u init-with="p:[op:0]"
				when-course-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-exit="a:[opacity:1:0:1000:easeInOutSine:0:1:f]">
				<a class="course-list-item">
					<div class="border">
						<div></div><div></div><div></div><div
							u init-with="p:[tr:scaleY(0), tro:center center]"
							on-init="a:[scaleY:0:1:450:easeInOutBack:100:1:f]:delay-200"></div>
					</div>
					<h3>PHYS 202</h3>
					<h2>Vibration, Waves, and Optics</h2>
				</a>
			</li>
			<li u init-with="p:[op:0]"
				when-course-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-exit="a:[opacity:1:0:1000:easeInOutSine:0:1:f]">
				<a class="course-list-item">
					<div class="border">
						<div></div><div></div><div></div><div
							u init-with="p:[tr:scaleY(0), tro:center center]"
							on-init="a:[scaleY:0:1:450:easeInOutBack:100:1:f]:delay-300"></div>
					</div>
					<h3>PHYS 202</h3>
					<h2>Vibration, Waves, and Optics</h2>
				</a>
			</li>
		</ul>
	</div>
</div>
