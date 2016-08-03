<div class="full-xy flex">
	<aside class="sidebar-list bg-lake"
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[slideInLeft:set:(dur:250ms#func:ease-in):in]">
		<header class="sidebar-list-header bg-white-90p">
			<h2 class="txt-charcoal">Ways to Super Student&nbsp;Stardom</h2>
		</header>
		<ul>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-75p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]"
				on-mouse-enter="p:[background:rgba(255#255#255#0.75), t:all 150ms ease-out] | send:[email-mouse-enter:public]"
				on-mouse-leave="p:[background:rgba(64#72#75#0.75), t:all 150ms ease-in]"
				on-click="p:[background:rgba(64#72#75#0), t:all 150ms]">
				<h3 class="txt-24 semibold"
					when-email-mouse-enter="p:[color:rgba(80#165#221#1), t:all 150ms ease-out]">Validate Email</h3>
				<div class="svg-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"></div>
			</li>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-50p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]">
				<h3 class="txt-24 semibold">Validate Email</h3>
				<div class="svg-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"></div>
			</li>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-25p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">
				<h3 class="txt-24 semibold">Validate Email</h3>
				<div class="svg-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"></div>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-moxie">
		<header class="sidebar-list-header bg-charcoal-25p">
			<h2>Payment History</h2>
		</header>
		<ul class="sidebar-list-dividers">
			<li class="flex-center-vertical-space-between">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg-charcoal uppercase">Pending</span>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between">
				<div>
					<h3 class="txt-20 semibold"><b class="black">CS10</b> Session with <b class="black">Amrita</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg-charcoal uppercase">$34.00</span>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg-charcoal uppercase">Approved</span>
				</span>
				<hr/>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-lake">
		<header class="sidebar-list-header bg-slate-50p">
			<h2 class="txt-left">My Gurus</h2>
		</header>
		<ul class="sidebar-list-messaging">
			<li>
				<a class="flex-center-vertical p15xy">
					<span class="user-icon-36 margin-none m15right"></span>
					<h3 class="txt-24 semibold">Brian</h3>
				</a>
			</li>
			<li>
				<a class="flex-center-vertical p15xy">
					<span class="user-icon-36 margin-none m15right"></span>
					<h3 class="txt-24 semibold">Brian</h3>
				</a>
			</li>
			<li>
				<a class="flex-center-vertical p15xy">
					<span class="user-icon-36 margin-none m15right"></span>
					<h3 class="txt-24 semibold">Brian</h3>
				</a>
			</li>
		</ul>
	</aside>
</div>
