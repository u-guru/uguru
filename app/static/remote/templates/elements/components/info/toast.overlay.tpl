<div class="toast toast-icon toast-hover">
	<div class="toast-overlay">
		<ul>
			<li>
				<button>Reply</button>
			</li>
			<li>
				<button>Send Location</button>
			</li>
		</ul>
	</div>
	<user-icon class="toast-svg" size="48"></user-icon>
	<div>
		<p>{{toast.content}}</p>
		<q ng-if="toast.quote">{{toast.quote}}</q>
	</div>
	<a class="close-icon">
		<svg viewBox="0 0 100 100">
			<path d="M50,50 L50,14 L50,50 L14,50 L50,50 Z M50,50 L50,86 L50,50 L86,50 L50,50 Z"></path>
		</svg>
	</a>
</div>