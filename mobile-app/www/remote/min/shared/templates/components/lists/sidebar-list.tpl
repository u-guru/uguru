<div class="full-xy flex">
	<aside class="sidebar-list bg-lake"
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[slideInLeft:set:(dur:250ms#func:ease-in):in]"
		on-exit="a:[fadeOut:set:(dur:450ms#func:ease-out):out]">
		<header class="sidebar-list-header bg-white-90p">
			<h2 class="txt-charcoal">Ways to Super Student&nbsp;Stardom</h2>
		</header>
		<ul>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-75p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]"
				on-mouse-enter="p:[background:rgba(255#255#255#0.75), t:all 150ms ease-out] | send:[email-mouse-enter:public]"
				on-mouse-leave="p:[background:rgba(64#72#75#0.75), t:all 150ms ease-in] | send:[email-mouse-leave:public]"
				on-click="p:[background:rgba(64#72#75#0), t:all 150ms]">
				<h3 class="txt-24 semibold"
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]">Validate Email</h3>
				<div class="svg-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]"></div>
			</li>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-50p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]"
				on-mouse-enter="p:[background:rgba(255#255#255#0.5), t:all 150ms ease-out] | send:[email-mouse-enter:public]"
				on-mouse-leave="p:[background:rgba(64#72#75#0.5), t:all 150ms ease-in] | send:[email-mouse-leave:public]"
				on-click="p:[background:rgba(64#72#75#0), t:all 150ms]">
				<h3 class="txt-24 semibold"
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]">Validate Email</h3>
				<div class="svg-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]"></div>
			</li>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-25p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]"
				on-mouse-enter="p:[background:rgba(255#255#255#0.25), t:all 150ms ease-out] | send:[email-mouse-enter:public]"
				on-mouse-leave="p:[background:rgba(64#72#75#0.25), t:all 150ms ease-in] | send:[email-mouse-leave:public]"
				on-click="p:[background:rgba(64#72#75#0), t:all 150ms]">
				<h3 class="txt-24 semibold"
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]">Validate Email</h3>
				<div class="svg-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]"></div>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-moxie"
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[slideInLeft:set:(dur:250ms#func:ease-in):in]"
		on-exit="a:[fadeOut:set:(dur:450ms#func:ease-out):out">
		<header class="sidebar-list-header bg-charcoal-25p">
			<h2>Payment History</h2>
		</header>
		<ul class="sidebar-list-dividers">
			<li class="flex-center-vertical-space-between"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg-charcoal uppercase"
						on-mouse-enter="p:[background:#ffffff, color:#2b3234, t:all 150ms ease-in]"
						on-mouse-leave="p:[background:#2b3234, color:#ffffff, t:all 150ms]">Pending</span>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]">
				<div>
					<h3 class="txt-20 semibold"><b class="black">CS10</b> Session with <b class="black">Amrita</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg-charcoal uppercase"
					on-mouse-enter="p:[background:#ffffff, color:#2b3234, t:all 150ms ease-in]"
					on-mouse-leave="p:[background:#2b3234, color:#ffffff, t:all 150ms]">$34.00</span>
				</span>
				<hr/>
			</li>
			<li class="flex-center-vertical-space-between"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">
				<div>
					<h3 class="txt-20 semibold">You cashed out to <b class="black">**0092</b></h3>
					<h4 class="txt-16 semibold opacity-75p">11/13/15</h4>
				</div>
				<span>
					<span class="chip bg-charcoal uppercase"
					on-mouse-enter="p:[background:#ffffff, color:#2b3234, t:all 150ms ease-in]"
					on-mouse-leave="p:[background:#2b3234, color:#ffffff, t:all 150ms]">Approved</span>
				</span>
				<hr/>
			</li>
		</ul>
	</aside>

	<aside class="sidebar-list bg-lake"
		init-with="p-op"
		on-init="t-enter"
		on-enter="a:[slideInLeft:set:(dur:250ms#func:ease-in):in]"
		on-exit="a:[fadeOut:set:(dur:450ms#func:ease-out):out">
		<header class="sidebar-list-header bg-slate-50p">
			<h2 class="txt-left">My Gurus</h2>
		</header>
		<ul class="sidebar-list-messaging">
			<li
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-150]">
				<a class="flex-center-vertical p15xy">
					<span class="user-icon-36 margin-none m15right"></span>
					<h3 class="txt-24 semibold">Brian</h3>
				</a>
			</li>
			<li
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]">
				<a class="flex-center-vertical p15xy">
					<span class="user-icon-36 margin-none m15right"></span>
					<h3 class="txt-24 semibold">Brian</h3>
				</a>
			</li>
			<li
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]">
				<a class="flex-center-vertical p15xy">
					<span class="user-icon-36 margin-none m15right"></span>
					<h3 class="txt-24 semibold">Brian</h3>
				</a>
			</li>
		</ul>
	</aside>
</div>
