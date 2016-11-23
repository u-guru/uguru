<div class="perspective-container full-xy flex-center p15xy" types='single, stack'>

	<div style="min-width: 300px" ng-show='activeType === "single"'
		u init-with="p:[op:0, tro:center bottom]"
		on-init="s:[pf-card-init:self, pf-card-single-init:children:500]"
		when-pf-card-init="a:[zoom-enter:800:linear:0:1:f]">
		<div class="pf-card pf-card-photography">
			<div class="pf-card-top">
				<ul u on-init="s:[strip-enter:children:500]">
					<li u init-with="p:[op:0]"
						when-strip-enter="a:[opacity:0:1:800:(.8,.1,1,.05):0:1:f]">Gabrielle's Shop</li>
					<li u init-with="p:[op:0]"
						when-strip-enter="a:[fadeInRight:800:(.8,.1,1,.05):250:1:f]">
						<span><span data-rank="25">25</span>&nbsp;Percentile</span>
					</li>
				</ul>
				<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"
					u init-with="p:[transform:scale(0)]"
					when-pf-card-single-init="a:[icon-enter:1000:linear:150:1:f]"></span>
			</div>
			<div class="pf-card-main">
				<h1 class="verified"
					u init-with="p:[op:0]"
					when-pf-card-single-init="a:[opacity:0:1:800:easeOutQuart:0:1:f]">
					<span class="inline">Gabrielle Wee</span>
					<span class="inline">
						<graphic url='shared/templates/components/svg/other/verified.html'></graphic>
					</span>
				</h1>
				<h2 class="pf-school"
					u init-with="p:[op:0]"
					when-pf-card-single-init="a:[opacity:0:1:800:(.8,.1,1,.05):0:1:f]">UC Berkeley</h2>
				<ul class="pf-rating" data-rating="4" data-half="true"
					u on-init="s:[rating-1:children:easeInExpo-750]:+500">
					<li u init-with="p:[op:0, tro:center center]"
						when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:0:1:f]">
						 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
					</li>
					<li u init-with="p:[op:0, tro:center center]"
						when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:100:1:f]">
						 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
					</li>
					<li u init-with="p:[op:0, tro:center center]"
						when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:200:1:f]">
						<graphic url='shared/templates/components/svg/other/star.html'></graphic>
					</li>
					<li u init-with="p:[op:0, tro:center center]"
						when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:300:1:f]">
						 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
					</li>
					<li u init-with="p:[op:0, tro:center center]"
						when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:400:1:f]">
						 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
					</li>
				</ul>
				<span class="pf-review-amt"
					u init-with="p:[op:0]"
					when-pf-card-single-init="a:[opacity:0:1:1000:(.8,.1,1,.05):1000:0:1:f]">3 Reviews</span>
				<ul class="pf-card-thumbs"
					u init-with="p:[op:0]"
					when-pf-card-single-init="a:[zoom-enter:1200:linear:0:1:f]:delay-1000]">
					<li>
						<a>
							<span></span>
							<svg class="square" viewBox="0 0 100 100">
								<rect x="0" y="0" width="100" height="100"></rect>
							</svg>
						</a>
					</li>
					<li>
						<a>
							<span></span>
							<svg class="square" viewBox="0 0 100 100">
								<rect x="0" y="0" width="100" height="100"></rect>
							</svg>
						</a>
					</li>
					<li>
						<a>
							<span></span>
							<svg class="square" viewBox="0 0 100 100">
								<rect x="0" y="0" width="100" height="100"></rect>
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<ul class="pf-card-stack slate" ng-show='activeType === "stack"'>
		<li u init-with="p:[tr:translateY(-30px) scale(0.8)]">
			<div style="min-width: 300px"
				u init-with="p:[tr:scale(0), tro:center bottom]"
				when-pf-card-3-init="a:[back-stack:1000:linear:0:1:f]">
				<!-- pf-card-3-init:depth(0) -->
				<div class="pf-card pf-card-household"
					u init-with="p:[op:0.5]">
					<div class="pf-card-top">
						<ul>
							<li>Gabrielle's Shop</li>
							<li>
								<span><span data-rank="25">25</span>&nbsp;Percentile</span>
							</li>
						</ul>

						<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
					</div>
					<div class="pf-card-main">
						<h1 class="verified">
							<span class="inline">Gabrielle Wee</span>
							<span class="inline">
								<graphic url='shared/templates/components/svg/other/verified.html'></graphic>
							</span>
						</h1>
						<h2 class="pf-school">UC Berkeley</h2>
						<ul class="pf-rating" data-rating="4" data-half="true">
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
						</ul>
						<span class="pf-review-amt">3 Reviews</span>
						<ul class="pf-card-thumbs">
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</li>

		<li u init-with="p:[tr:translateY(-18px) scale(0.9)]">
			<div style="min-width: 300px"
				u init-with="p:[tr:scale(0), tro:center bottom]"
				when-pf-card-2-init="a:[back-stack:1000:linear:0:1:f]">
				<!-- pf-card-2-init:depth(0) -->
				<div class="pf-card pf-card-athletic"
					u init-with="p:[op:0.75]">
					<div class="pf-card-top">
						<ul>
							<li>Gabrielle's Shop</li>
							<li>
								<span><span data-rank="25">25</span>&nbsp;Percentile</span>
							</li>
						</ul>
						<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"></span>
					</div>
					<div class="pf-card-main">
						<h1 class="verified">
							<span class="inline">Gabrielle Wee</span>
							<span class="inline">
								<graphic url='shared/templates/components/svg/other/verified.html'></graphic>
							</span>
						</h1>
						<h2 class="pf-school">UC Berkeley</h2>
						<ul class="pf-rating" data-rating="4" data-half="true">
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li>
								<graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
						</ul>
						<span class="pf-review-amt">3 Reviews</span>
						<ul class="pf-card-thumbs">
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</li>

		<li>
			<div style="min-width: 300px"
				u init-with="p:[op:0, tro:center bottom]"
				on-init="s:[pf-card-1:self, pf-card-1-init:children, pf-card-2-init:public:1000, pf-card-3-init:public:1500]"
				when-pf-card-1="a:[zoom-enter:800:linear:0:1:f]">
				<div class="pf-card pf-card-photography">
					<div class="pf-card-top">
						<ul u on-init="s:[strip-card-1:children]">
							<li u init-with="p:[op:0]"
								when-strip-card-1="a:[opacity:0:1:800:(.8,.1,1,.05):0:1:f]">Gabrielle's Shop</li>
							<li u init-with="p:[op:0]"
								when-strip-card-1="a:[fadeInRight:800:(.8,.1,1,.05):250:1:f]">
								<span><span data-rank="25">25</span>&nbsp;Percentile</span>
							</li>
						</ul>
						<span class="user-icon" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=800);"
							u init-with="p:[transform:scale(0)]"
							when-pf-card-1-init="a:[icon-enter:1000:linear:150:1:f]"></span>
					</div>
					<div class="pf-card-main">
						<h1 class="verified"
							u init-with="p:[op:0]"
							when-pf-card-1-init="a:[opacity:0:1:800:easeOutQuart:0:1:f]">
							<span class="inline">Gabrielle Wee</span>
							<span class="inline">
								<graphic url='shared/templates/components/svg/other/verified.html'></graphic>
							</span>
						</h1>
						<h2 class="pf-school"
							u init-with="p:[op:0]"
							when-pf-card-1-init="a:[opacity:0:1:800:(.8,.1,1,.05):0:1:f]">UC Berkeley</h2>
						<ul class="pf-rating" data-rating="4" data-half="true"
							u on-init="s:[rating-1:children:easeInExpo-750]:+500">
							<li u init-with="p:[op:0, tro:center center]"
								when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:0:1:f]">
								 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li u init-with="p:[op:0, tro:center center]"
								when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:100:1:f]">
								 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li u init-with="p:[op:0, tro:center center]"
								when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:200:1:f]">
								 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li u init-with="p:[op:0, tro:center center]"
								when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:300:1:f]">
								 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
							<li u init-with="p:[op:0, tro:center center]"
								when-rating-1="a:[bounceIn-rotate-subtle:500:easeOutSine:400:1:f]">
								 <graphic url='shared/templates/components/svg/other/star.html'></graphic>
							</li>
						</ul>
						<span class="pf-review-amt"
							u init-with="p:[op:0]"
							when-pf-card-1-init="a:[opacity:0:1:1000:(.8,.1,1,.05):1000:0:1:f]">3 Reviews</span>
						<ul class="pf-card-thumbs"
							u init-with="p:[op:0]"
							when-pf-card-1-init="a:[zoom-enter:1200:linear:0:1:f]:delay-1000]">
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
							<li>
								<a>
									<span></span>
									<svg class="square" viewBox="0 0 100 100">
										<rect x="0" y="0" width="100" height="100"></rect>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
