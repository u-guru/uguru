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
				on-click="p:[background:rgba(64#72#75#0), t:all 50ms] | send:[email-click:public]">
				<h3 class="txt-24 semibold"
					init-default
					when-email-mouse-enter="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[color:#ffffff, t:all 150ms ease-in]"
					when-email-click="p:[color:rgba(64#72#75#0.75), t:all 50ms]">Validate Email</h3>
				<div class="list-icon-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"
					init-default
					when-email-mouse-enter="p:[stroke:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave="p:[stroke:#ffffff, t:all 150ms ease-in]"
					when-email-click="p:[color:rgba(64#72#75#0.75), t:all 50ms]"></div>
			</li>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-50p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-300]"
				on-mouse-enter="p:[background:rgba(255#255#255#0.5), t:all 150ms ease-out] | send:[email-mouse-enter-2:public]"
				on-mouse-leave="p:[background:rgba(64#72#75#0.5), t:all 50ms] | send:[email-mouse-leave-2:public]"
				on-click="p:[background:rgba(64#72#75#0), t:all 150ms] | send:[email-click-2:public]">
				<h3 class="txt-24 semibold"
					init-default
					when-email-mouse-enter-2="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave-2="p:[color:#ffffff, t:all 150ms ease-in]"
					when-email-click-2="p:[color:rgba(64#72#75#0.5), t:all 50ms]">Validate Email</h3>
				<div class="list-icon-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"
					init-default
					when-email-mouse-enter-2="p:[stroke:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave-2="p:[stroke:#ffffff, t:all 150ms ease-in]"
					when-email-click-2="p:[color:rgba(64#72#75#0.5), t:all 50ms]"></div>
			</li>
			<li class="flex-center-vertical-space-between p15xy height-96 bg-slate-25p"
				init-with="p-op"
				on-init="t-enter"
				on-enter="a:[bounceInUp-subtle:set:(dur:1000ms#func:linear):in:delay-450]"
				on-mouse-enter="p:[background:rgba(255#255#255#0.25), t:all 150ms ease-out] | send:[email-mouse-enter-3:public]"
				on-mouse-leave="p:[background:rgba(64#72#75#0.25), t:all 150ms ease-in] | send:[email-mouse-leave-3:public]"
				on-click="p:[background:rgba(64#72#75#0), t:all 150ms] | send:[email-click-3:public]">
				<h3 class="txt-24 semibold"
					init-default
					when-email-mouse-enter-3="p:[color:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave-3="p:[color:#ffffff, t:all 150ms ease-in]"
					when-email-click-3="p:[color:rgba(64#72#75#0.25), t:all 50ms]">Validate Email</h3>
				<div class="list-icon-white svg-48 svg-stroke-6" ng-include="root.base_url + 'shared/templates/components/svg/main/email.html'"
					init-default
					when-email-mouse-enter-3="p:[stroke:#50a5dd, t:all 150ms ease-out]"
					when-email-mouse-leave-3="p:[stroke:#ffffff, t:all 150ms ease-in]"
					when-email-click-3="p:[color:rgba(64#72#75#0.25), t:all 150ms ease-in]"></div>
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
					<div class="sidebar-link-bg bg-white-25p"></div>
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
