<div class="perspective-container full-xy flex-center p15xy" types='mobile, icon-hover, icon-input, icon-input-button, cta, cta-icon' default-type="icon-hover">
	<div class="toast toast-mobile bg-smoke border-academic toast-icon toast-hover" ng-if='activeType === "mobile"'
		u init-with="p-op"
		on-init="s:[mobile-toast:self, mobile-content:children:350]"
		when-mobile-toast="a:[bounceInDown-subtle:800:linear:0:1:f]">
		<div class="toast-overlay" tabindex="1">
			<ul>
				<li>
					<button>Reply</button>
				</li>
				<li>
					<button>Send Location</button>
				</li>
			</ul>
		</div>
		<span class="toast-svg user-icon-48" style="background-image: url('http://en.gravatar.com/userimage/5102999/8d85d1b0830237f7baa8d92405449db7.jpg?size=800');"
			u init-with="p:[tr:scale(0), tro:center center]"
			when-mobile-content="a:[icon-enter:1000:linear:0:1:f]"></span>
		<div u init-with="p-op"
			when-mobile-content="a:[opacity:0:1:500:easeOutSine:0:1:f]">
			<p>Gabrielle sent you a new message!</p>
			<q>I'm at the library, where are you?</q>
		</div>
		<a class="close-icon">
			<svg viewBox="0 0 100 100">
				<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
			</svg>
		</a>
	</div>

	<div class="toast bg-smoke border-academic toast-icon toast-hover" ng-if='activeType === "icon-hover"'
		u init-with="p-op"
		on-init="s:[icon-hover:self, icon-hover-content:children:350]"
		when-icon-hover="a:[bounceInLeft-subtle:800:linear:0:1:f]">
		<div class="toast-overlay" tabindex="1">
			<ul>
				<li>
					<button>Reply</button>
				</li>
				<li>
					<button>Send Location</button>
				</li>
			</ul>
		</div>
		<span class="toast-svg user-icon-48" style="background-image: url('http://en.gravatar.com/userimage/5102999/8d85d1b0830237f7baa8d92405449db7.jpg?size=800');"
			u init-with="p:[tro:center center, tr:scale(0)]"
			when-icon-hover-content="a:[icon-enter:1000:linear:0:1:f]"></span>
		<div u init-with="p-op"
			when-icon-hover-content="a:[opacity:0:1:500:easeOutSine:0:1:f]">
			<p>Gabrielle sent you a new message!</p>
			<q>I'm at the library, where are you?</q>
		</div>
		<a class="close-icon">
			<svg viewBox="0 0 100 100">
				<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
			</svg>
		</a>
	</div>

	<div class="toast bg-slate border-moxie toast-input toast-icon" ng-if='activeType === "icon-input"'
		u init-with="p-op"
		on-init="s:[icon-input:self, icon-input-content:children:350]"
		when-icon-input="a:[bounceInLeft-subtle:800:linear:0:1:f]">
		<span class="toast-svg"
			u init-with="p-op"
			when-icon-input-content="a:[icon-enter:1000:linear:0:1:f]">
			<svg viewBox="0 0 100 100">
				<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451"></path>
			</svg>
		</span>
		<div u init-with="p-op"
			when-icon-input-content="a:[opacity:0:1:500:easeOutSine:0:1:f]">
			<p>Activate your account</p>
			<input placeholder="Add school email now"/>
		</div>
		<a class="close-icon">
			<svg viewBox="0 0 100 100">
				<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
			</svg>
		</a>
	</div>

	<div class="toast bg-smoke toast-input toast-icon" ng-if='activeType === "icon-input-button"'
		u init-with="p-op"
		on-init="s:[input-btn:self, input-btn-content:children:350]"
		when-input-btn="a:[bounceInLeft-subtle:800:linear:0:1:f]">
		<span class="toast-svg"
			u init-with="p:[tr:scale(0), tro:center center]"
			when-input-btn-content="a:[icon-enter:1000:linear:250:1:f]">
			<svg viewBox="0 0 100 100">
				<path d="M15,31.9968376 C15,27.5803062 18.579658,24 22.9957852,24 L77.0042148,24 C81.420165,24 85,27.5741706 85,31.9968376 L85,68.0031624 C85,72.4196938 81.420342,76 77.0042148,76 L22.9957852,76 C18.579835,76 15,72.4258294 15,68.0031624 L15,31.9968376 L15,31.9968376 Z M84.9111543,31.4941352 L49.9585003,55.0012225 L15.0058463,31.4941352 M42.8716789,50.2025451 L15.0946246,68.884039 L42.8716789,50.2025451 M57.2229457,50.2025451 L85,68.884039 L57.2229457,50.2025451"></path>
			</svg>
		</span>
		<div u init-with="p-op"
			when-input-btn-content="a:[opacity:0:1:500:easeOutSine:250:1:f]">
			<p>Activate your account</p>
			<div class="input-button">
				<input placeholder="Add school email now"/>
				<button>Add</button>
			</div>
		</div>
		<a class="close-icon">
			<svg viewBox="0 0 100 100">
				<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
			</svg>
		</a>
	</div>

	<div class="toast bg-smoke txt-moxie border-moxie toast-cta" ng-if='activeType === "cta"'
		u init-with="p-op"
		on-init="s:[cta-enter:depth(1)] |a:[bounceInLeft-subtle:800:linear:0:1:f]">
		<p u init-with="p-op"
			when-cta-enter="a:[opacity:0:1:500:easeOutSine]:delay-150">Your money is here! Update your bank preferences</p>
		<button u init-with="p-op"
			when-cta-enter="a:[bounceIn-subtle:1000:easeOutExpo:0:1:f] | p:[tro:right bottom]">Update Now</button>
		<a class="close-icon">
			<svg viewBox="0 0 100 100">
				<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
			</svg>
		</a>
	</div>

	<div class="toast bg-household toast-cta toast-icon" ng-if='activeType === "cta-icon"'
		u init-with="p-op"
		on-init="s:[cta-icon:self, cta-icon-content:children:250]"
		when-cta-icon="a:[bounceInLeft-subtle:800:linear:0:1:f]">
		<span class="toast-svg"
			u init-with="p:[tro:center center, tr:scale(0)]"
			when-cta-icon-content="a:[icon-enter:1000:linear:0:1:f]">
			<svg viewBox="0 0 100 100">
				<path d="M36.6840131,24.07712 C36.6840131,24.07712 36.0504131,27.52832 35.1739331,29.56064 C35.0587331,29.82848 34.7313731,30.08672 34.3838531,30.36128 C33.7704131,30.84608 32.9428931,31.5008 32.7105731,32.67296 C32.5128131,33.67808 32.8862531,34.58048 33.7099331,35.0864 C34.1928131,35.38304 34.8446531,35.53952 35.5934531,35.53952 C36.7579331,35.53952 37.9924931,35.16224 38.7364931,34.5776 C41.1028931,32.72672 42.2596931,29.75744 43.0795331,27.09824 C43.1121731,26.99456 43.2782531,26.43488 43.2782531,26.43488 M46.5652931,31.76 L46.1668931,31.76 C45.0964931,31.76 44.2401731,32.6192 44.2401731,33.67808 L44.2401731,39.44 L46.2868931,39.44 M59.0664131,39.44 L61.0401731,39.44 L61.0401731,33.67808 C61.0401731,32.61152 60.1771331,31.76 59.1134531,31.76 L58.3742531,31.76 M46.2868931,39.44 L46.1899331,42.09824 C46.1899331,46.53248 41.2478531,50.93408 38.5982531,52.04864 C35.0308931,53.55104 34.3560131,58.08128 34.3300931,58.27328 L33.6830531,82.74848 C33.6830531,84.53888 35.1441731,86 36.9403331,86 L60.9000131,86 C62.6971331,86 64.1572931,84.53888 64.1572931,82.74368 L64.1544131,55.16768 C64.1294531,54.84128 63.8808131,51.88448 62.7969731,49.39232 C62.3908931,48.46016 61.7928131,47.42528 61.2148931,46.42496 C60.3124931,44.86208 59.3016131,43.11104 59.3016131,42.18944 C59.3016131,42.11264 59.2065731,41.02208 59.0664131,39.44 M58.3742531,31.76 C58.0843331,28.55744 57.8376131,25.85888 57.8376131,25.85888 L57.9470531,25.81184 C58.5739331,25.54304 60.3720131,25.59296 61.5633731,25.62464 C64.0094531,25.6928 66.2836931,25.75424 67.3819331,24.55232 C67.6862531,24.2192 68.0318531,23.63552 67.9502531,22.75712 L67.9492931,22.05056 L57.4881731,14 L40.4203331,14.18432 L34.8888131,14.18432 C33.3163331,14.18432 32.0376131,15.464 32.0376131,17.03744 L32.0376131,19.96448 C32.0376131,21.56768 33.3105731,22.17824 34.2398531,22.62368 L36.9614531,23.59712 L43.5556931,25.95488 L46.7352131,27.09248 L46.5652931,31.76 M46.2868931,39.44 L59.0664131,39.44 M58.3742531,31.76 L46.5652931,31.76"></path>
			</svg>
		</span>
		<p u init-with="p-op"
			when-cta-icon-content="a:[opacity:0:1:500:easeOutSine:0:1:f]">You have <strong>12 Household</strong><br/>guru matches</p>
		<button u init-with="p-op"
			when-cta-icon-content="a:[bounceIn-subtle:1000:easeOutExpo:0:1:f]| p:[tro:right bottom]">View Now</button>
		<a class="close-icon">
			<svg viewBox="0 0 100 100">
				<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
			</svg>
		</a>
	</div>
</div>
