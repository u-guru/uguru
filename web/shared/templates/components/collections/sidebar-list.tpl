<div class="perspective-container full-xy flex" types='email, payment, message' default-type="email">

	<aside class="sidebar-list bg-lake" ng-if='activeType === "email"'
		u init-with="p-op"
		on-init="s:[sidebar-list-init-1:children] |a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-100%:0%:250:easeOutQuint:0:1:f]"
		on-exit="a:[opacity:1:0:450:easeOutSine:0:1:f]">
		<header class="sidebar-list-header bg-white-90p"
			u init-with="p-op"
			when-sidebar-list-init-1="a:[translateY:-100%:0%:250:easeOutQuint:0:1:f, opacity:0:1:250:easeOutQuint:0:1:f]">
			<h2 class="txt-charcoal">Ways to Super Student&nbsp;Stardom</h2>
		</header>
		<ul u on-init="s:[list-1-init:children:linear-450]">
			<li u init-with="p-op"
				when-list-1-init="a:[bounceInUp-subtle:1000:linear:0:1:f]">
				<a class="flex-center-vertical-space-between p15xy height-96 bg-slate-75p"
					u on-mouse-enter="a:[background:rgba(64,72,75,0.75):rgba(255,255,255,0.75):150:easeOutSine:0:1:f] | send:[email-mouse-enter:public]"
					on-mouse-leave="a:[background:rgba(255,255,255,0.75):rgba(64,72,75,0.75):150:easeInSine:0:1:f] | send:[email-mouse-leave:public]"
					on-click="a:[background:rgba(255,255,255,0.75):rgba(64,72,75,0):50:easeOutSine:0:1:f] | send:[email-click:public]">
					<h3 class="txt-24 semibold"
						u
						when-email-mouse-enter="a:[color:#ffffff:#50a5dd:150:easeOutSine:0:1:f]"
						when-email-mouse-leave="a:[color:#50a5dd:#ffffff:150:easeInSine:0:1:f]"
						when-email-click="a:[color:#50a5dd:#ffffff:50:easeOutSine:0:1:f]">Validate Email</h3>
					<div class="list-icon-white svg-48 svg-stroke-6"
						u init-with="p:[s:#ffffff]"
						when-email-mouse-enter="a:[stroke:#ffffff:#50a5dd:150:easeOutSine:0:1:f]"
						when-email-mouse-leave="a:[stroke:#50a5dd:#ffffff:150:easeInSine:0:1:f]"
						when-email-click="a:[stroke:#50a5dd:#ffffff:50:easeOutSine:0:1:f]">
						<svg viewBox="0 0 100 100">
	    					<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
				</a>
			</li>
			<li u init-with="p-op"
				when-list-1-init="a:[bounceInUp-subtle:1000:linear:0:1:f]">
				<a class="flex-center-vertical-space-between p15xy height-96 bg-slate-50p"
					u on-mouse-enter="a:[background:rgba(64,72,75,0.75):rgba(255,255,255,0.75):150:easeOutSine:0:1:f] | send:[email-mouse-enter-2:public]"
					on-mouse-leave="a:[background:rgba(255,255,255,0.75):rgba(64,72,75,0.5):150:easeInSine:0:1:f] | send:[email-mouse-leave-2:public]"
					on-click="a:[background:rgba(255,255,255,0.75):rgba(64,72,75,0):50:easeOutSine:0:1:f] | send:[email-click-2:public]">
					<h3 class="txt-24 semibold"
						u
						when-email-mouse-enter-2="a:[color:#ffffff:#50a5dd:150:easeOutSine:0:1:f]"
						when-email-mouse-leave-2="a:[color:#50a5dd:#ffffff:150:easeInSine:0:1:f]"
						when-email-click-2="a:[color:#50a5dd:#ffffff:50:easeOutSine:0:1:f]">Validate Email</h3>
					<div class="list-icon-white svg-48 svg-stroke-6"
						u init-with="p:[s:#ffffff]"
						when-email-mouse-enter-2="a:[stroke:#ffffff:#50a5dd:150:easeOutSine:0:1:f]"
						when-email-mouse-leave-2="a:[stroke:#50a5dd:#ffffff:150:easeInSine:0:1:f]"
						when-email-click-2="a:[stroke:#50a5dd:#ffffff:50:easeOutSine:0:1:f]">
						<svg viewBox="0 0 100 100">
	    					<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
				</a>
			</li>
			<li u init-with="p-op"
				when-list-1-init="a:[bounceInUp-subtle:1000:linear:0:1:f]">
				<a class="flex-center-vertical-space-between p15xy height-96 bg-slate-25p"
					u on-mouse-enter="a:[background:rgba(64,72,75,0.75):rgba(255,255,255,0.75):150:easeOutSine:0:1:f] | send:[email-mouse-enter-3:public]"
					on-mouse-leave="a:[background:rgba(255,255,255,0.75):rgba(64,72,75,0.5):150:easeInSine:0:1:f] | send:[email-mouse-leave-3:public]"
					on-click="a:[background:rgba(255,255,255,0.75):rgba(64,72,75,0):50:easeOutSine:0:1:f] | send:[email-click-3:public]">
					<h3 class="txt-24 semibold"
						u
						when-email-mouse-enter-3="a:[color:#ffffff:#50a5dd:150:easeOutSine:0:1:f]"
						when-email-mouse-leave-3="a:[color:#50a5dd:#ffffff:150:easeInSine:0:1:f]"
						when-email-click-3="a:[color:#50a5dd:#ffffff:50:easeOutSine:0:1:f]">Validate Email</h3>
					<div class="list-icon-white svg-48 svg-stroke-6"
						u init-with="p:[s:#ffffff]"
						when-email-mouse-enter-3="a:[stroke:#ffffff:#50a5dd:150:easeOutSine:0:1:f]"
						when-email-mouse-leave-3="a:[stroke:#50a5dd:#ffffff:150:easeInSine:0:1:f]"
						when-email-click-3="a:[stroke:#50a5dd:#ffffff:50:easeOutSine:0:1:f]">
						<svg viewBox="0 0 100 100">
	    					<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
						</svg>
					</div>
				</a>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-moxie" ng-if='activeType === "payment"'
		u init-with="p-op"
		on-init="s:[sidebar-list-init-2:children] |a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-100%:0%:250:easeOutQuint:0:1:f]"
		on-exit="a:[opacity:1:0:450:easeOutSine:0:1:f]">
		<header class="sidebar-list-header bg-charcoal-25p"
			u init-with="p-op"
			when-sidebar-list-init-2="a:[translateY:-100%:0%:250:easeOutQuint:0:1:f, opacity:0:1:250:easeOutQuint:0:1:f]">
			<h2>Payment History</h2>
		</header>
		<ul class="sidebar-list-dividers" u on-init="s:[list-2-init:children:linear-450]">
			<li class="flex-center-vertical-space-between"
				u init-with="p-op"
				when-list-2-init="a:[bounceIn-subtle:1000:linear:0:1:f]">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<a class="chip bg bg-charcoal uppercase">Pending</a>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between"
				u init-with="p-op"
				when-list-2-init="a:[bounceIn-subtle:1000:linear:0:1:f]">
				<div>
					<h3 class="txt-20 semibold"><b class="black">CS10</b> Session with <b class="black">Amrita</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg bg-charcoal uppercase">$34.00</span>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between"
				u init-with="p-op"
				when-list-2-init="a:[bounceIn-subtle:1000:linear:0:1:f]">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg bg-charcoal uppercase">Approved</span>
				</span>
				<hr/>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-lake" ng-if='activeType === "message"'
		u init-with="p-op"
		on-init="s:[sidebar-list-init-3:depth(1)] |a:[opacity:0:1:250:easeOutSine:0:1:f, translateX:-100%:0%:250:easeOutQuint:0:1:f]"
		on-exit="a:[opacity:1:0:450:easeOutSine:0:1:f]">
		<header class="sidebar-list-header bg-slate-50p"
			u init-with="p-op"
			when-sidebar-list-init-3="a:[translateY:-100%:0%:250:easeOutQuint:0:1:f, opacity:0:1:250:easeOutQuint:0:1:f]">
			<h2 class="txt-left">My Gurus</h2>
		</header>
		<ul class="sidebar-list-messaging"
			u on-init="s:[list-3-init:children:linear-750]">
			<li class="relative overflow-hidden"
				u init-with="p-op"
				when-list-3-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-mouse-enter="send:[brian-mouse-enter:public]"
				on-mouse-leave="send:[brian-mouse-leave:public]"
				on-click="send:[brian-click:public]">
				<a class="flex-center-vertical p15xy"
					u
					on-click="a:[background:rgba(255,255,255,0):rgba(123,187,230,1):150:easeInOutSine:0:1:f]:delay-250 | send:[brian-blur-2:public, brian-blur-3:public]"
					when-brian-blur="p:[background:rgba(123,187,230,1):rgba(255,255,255,0):150:easeInOutSine:0:1:f]">
					<div class="sidebar-link-bg bg-white-25p"
						u init-with="p:[tr:scale(0)]"
						when-brian-click="a:[scale:0:128:250:easeInSine:0:1:f] | t-exit"
						on-exit="a:[scale:128:0:250:easeInSine:0:1:f]:delay-275"
						when-brian-blur="a:[scale:128:0:250:easeInSine:0:1:f]"></div>
					<span class="user-icon-36 margin-none m15right"
						u
						when-brian-mouse-enter="a:[border-color:#ffffff:#2b2324:150:easeInCirc:0:1:f]"
						when-brian-click="a:[border-color:#2b2324:#ffffff:150:easeInCirc:0:1:f]"
						when-brian-mouse-leave="a:[border-color:#2b2324:#ffffff:150:easeInCirc:0:1:f]"></span>
					<h3 class="txt-24 semibold"
						u
						when-brian-mouse-enter="a:[color:#ffffff:#2b2324:150:easeInSine:0:1:f]"
						when-brian-click="a:[color:#2b2324:#ffffff:150:easeInSine:0:1:f]"
						when-brian-mouse-leave="a:[color:#2b2324:#ffffff:150:easeInSine:0:1:f]">Brian</h3>
				</a>
			</li>
			<li class="relative overflow-hidden"
				u init-with="p-op"
				when-list-3-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-mouse-enter="send:[brian-mouse-enter-2:public]"
				on-mouse-leave="send:[brian-mouse-leave-2:public]"
				on-click="send:[brian-click-2:public]">
				<a class="flex-center-vertical p15xy"
					u
					on-click="a:[background:rgba(255,255,255,0):rgba(123,187,230,1):150:easeInOutSine:0:1:f]:delay-250 | send:[brian-blur:public, brian-blur-3:public]"
					when-brian-blur-2="p:[background:rgba(123,187,230,1):rgba(255,255,255,0):150:easeInOutSine:0:1:f]">
					<div class="sidebar-link-bg bg-white-25p"
						u init-with="p:[tr:scale(0)]"
						when-brian-click-2="a:[scale:1:128:250:easeInSine:0:1:f] | t-exit"
						on-exit="a:[scale:128:0:250:easeInSine:0:1:f]:delay-275"
						when-brian-blur-2="a:[scale:128:0:250:easeInSine:0:1:f]"></div>
					<span class="user-icon-36 margin-none m15right"
						u
						when-brian-mouse-enter-2="a:[border-color:#ffffff:#2b2324:150:easeInCirc:0:1:f]"
						when-brian-click-2="a:[border-color:#2b2324:#ffffff:150:easeInCirc:0:1:f]"
						when-brian-mouse-leave-2="a:[border-color:#2b2324:#ffffff:150:easeInCirc:0:1:f]"></span>
					<h3 class="txt-24 semibold"
						u
						when-brian-mouse-enter-2="a:[color:#ffffff:#2b2324:150:easeInSine:0:1:f]"
						when-brian-click-2="a:[color:#2b2324:#ffffff:150:easeInSine:0:1:f]"
						when-brian-mouse-leave-2="a:[color:#2b2324:#ffffff:150:easeInSine:0:1:f]">Brian</h3>
				</a>
			</li>
			<li class="relative overflow-hidden"
				u init-with="p-op"
				when-list-3-init="a:[bounceInUp-subtle:1000:linear:0:1:f]"
				on-mouse-enter="send:[brian-mouse-enter-3:public]"
				on-mouse-leave="send:[brian-mouse-leave-3:public]"
				on-click="send:[brian-click-3:public]">
				<a class="flex-center-vertical p15xy"
					u
					on-click="a:[background:rgba(255,255,255,0):rgba(123,187,230,1):150:easeInOutSine:0:1:f]:delay-250 | send:[brian-blur:public, brian-blur-2:public]"
					when-brian-blur-3="p:[background:rgba(123,187,230,1):rgba(255,255,255,0):150:easeInOutSine:0:1:f]">
					<div class="sidebar-link-bg bg-white-25p"
						init-with="p:[tr:scale(0)]"
						when-brian-click-3="a:[scale:1:128:250:easeInSine:0:1:f]| t-exit"
						on-exit="a:[scale:128:0:250:easeInSine:0:1:f]:delay-275"
						when-brian-blur-3="a:[scale:128:0:250:easeInSine:0:1:f]"></div>
					<span class="user-icon-36 margin-none m15right"
						u
						when-brian-mouse-enter-3="a:[border-color:#ffffff:#2b2324:150:easeInCirc:0:1:f]"
						when-brian-click-3="a:[border-color:#2b2324:#ffffff:150:easeInCirc:0:1:f]"
						when-brian-mouse-leave-3="a:[border-color:#2b2324:#ffffff:150:easeInCirc:0:1:f]"></span>
					<h3 class="txt-24 semibold"
						u
						when-brian-mouse-enter-3="a:[color:#ffffff:#2b2324:150:easeInSine:0:1:f]"
						when-brian-click-3="a:[color:#2b2324:#ffffff:150:easeInSine:0:1:f]"
						when-brian-mouse-leave-3="a:[color:#2b2324:#ffffff:150:easeInSine:0:1:f]">Brian</h3>
				</a>
			</li>
		</ul>
	</aside>

</div>
