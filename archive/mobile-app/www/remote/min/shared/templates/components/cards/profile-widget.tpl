<div class="perspective-container full-xy flex-center p15xy">
	<div class="pf-aside-widget"
		init-with="p:[background:rgba(99#112#116#0), t:background 700ms ease-in-out]"
		on-init="s:[pf-widget-init:public] | p:[background:rgba(99#112#116#0.3):delay-700]">
		<div class="top"
			init-with="p:[tr:scale(0), tro:center center]"
			when-pf-widget-init="p:[tr:scale(1), t:transform 500ms ease-out]:delay-150"></div>
		<div class="left"
			init-with="p:[tr:scale(0), tro:left top]"
			when-pf-widget-init="p:[tr:scale(1), t:transform 500ms ease-out]:delay-450"></div>
		<div class="right"
			init-with="p:[tr:scale(0), tro:right top]"
			when-pf-widget-init="p:[tr:scale(1), t:transform 500ms ease-out]:delay-450"></div>
		<div class="bot-left"
			init-with="p:[tr:scale(0), tro:left center]"
			when-pf-widget-init="p:[tr:scale(1), t:transform 500ms linear]:delay-750"></div>
		<div class="bot-right"
			init-with="p:[tr:scale(0), tro:right center]"
			when-pf-widget-init="p:[tr:scale(1), t:transform 500ms linear]:delay-750"></div>
		<span class="user-icon" style="background-image: url('http://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=256');"
			init-with="p-op"
			when-pf-widget-init="p:[tro:center center] | a:[icon-enter:set:(dur:1000ms#func:ease-out):in]"></span>
		<div>
			<h1 class="pf-name verified"
				init-with="p-op"
				when-pf-widget-init="a:[fadeIn:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-150]">
				<span>Gabrielle Wee</span>
				<span>
					<svg preserveAspectRatio="xMidYMax meet" width="100px" height="100px" viewBox="0 0 100 100">
						<path d="M95.588027,38.378 C97.014027,35.692 97.112027,32.487 95.858027,29.716 C94.603027,26.944 92.136027,24.922 89.189027,24.248 C85.056027,23.304 82.013027,19.762 81.674027,15.504 C81.433027,12.467 79.797027,9.716 77.255027,8.069 C74.712027,6.422 71.554027,6.065 68.714027,7.105 C64.730027,8.563 60.272027,7.242 57.704027,3.845 C55.871027,1.423 53.021027,0 50.000027,0 C46.978027,0 44.129027,1.423 42.296027,3.846 C39.728027,7.242 35.268027,8.563 31.287027,7.105 C28.446027,6.065 25.286027,6.422 22.745027,8.069 C20.202027,9.716 18.567027,12.466 18.325027,15.504 C17.986027,19.762 14.942027,23.303 10.811027,24.248 C7.86302696,24.922 5.39602696,26.944 4.14102696,29.717 C2.88502696,32.488 2.98502696,35.692 4.41102696,38.379 C6.40902696,42.146 5.74602696,46.784 2.77702696,49.831 C0.659026961,52.005 -0.331973037,55.05 0.0990269614,58.067 C0.529026961,61.083 2.33002696,63.723 4.97002696,65.208 C8.67002696,67.288 10.601027,71.55 9.737027,75.731 C9.121027,78.713 9.921027,81.815 11.900027,84.12 C13.879027,86.423 16.811027,87.663 19.828027,87.472 C24.057027,87.204 27.966027,89.738 29.480027,93.728 C30.562027,96.574 32.898027,98.746 35.798027,99.605 C38.697027,100.464 41.829027,99.908 44.264027,98.103 C47.678027,95.574 52.326027,95.574 55.738027,98.103 C58.175027,99.908 61.304027,100.464 64.205027,99.605 C67.104027,98.746 69.441027,96.574 70.522027,93.728 C72.037027,89.738 75.947027,87.205 80.175027,87.472 C83.191027,87.663 86.122027,86.423 88.101027,84.12 C90.081027,81.815 90.880027,78.714 90.265027,75.731 C89.401027,71.549 91.330027,67.288 95.031027,65.208 C97.672027,63.724 99.474027,61.083 99.902027,58.067 C100.331027,55.049 99.341027,52.004 97.221027,49.83 C94.253027,46.784 93.591027,42.145 95.588027,38.378 Z" fill="#000000"></path>
						<path d="M66.75725,32.75725 L41.35225,58.16125 L33.24225,50.05125 C30.89925,47.70825 27.10025,47.70825 24.75725,50.05125 C22.41425,52.39425 22.41425,56.19325 24.75725,58.53625 L37.11025,70.88925 C39.45325,73.23225 43.25225,73.23225 45.59525,70.88925 L75.24225,41.24225 C77.58525,38.89925 77.58525,35.10025 75.24225,32.75725 C72.89925,30.41425 69.10025,30.41425 66.75725,32.75725 Z" fill="#FFFFFF"></path>
					</svg>
				</span>
			</h1>
			<h2 class="pf-school-name"
				init-with="p-op"
				when-pf-widget-init="a:[fadeIn:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-150]">Ex'pression College for Digital Arts</h2>
			<ul class="pf-rating rating-stars" data-rating="4" data-half="true">
				<li init-with="p-op"
					when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-800]">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li init-with="p-op"
					when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-900]">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li init-with="p-op"
					when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-1000]">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li init-with="p-op"
					when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-1100]">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
				<li init-with="p-op"
					when-pf-widget-init="a:[bounceIn-rotate-subtle:set:(dur:500ms#func:ease-out):in:delay-1200]">
					<svg viewBox="0 0 100 100">
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14 60.5801345 35.4376941 84.2380346 38.8753882 67.1190173 55.5623059 71.1602691 79.1246118"></polygon>
						<polygon points="50 68 28.8397309 79.1246118 32.8809827 55.5623059 15.7619654 38.8753882 39.4198655 35.4376941 50 14"></polygon>
					</svg>
				</li>
			</ul>
			<h3 class="pf-reviews"
				init-with="p-op"
				when-pf-widget-init="a:[fadeIn:set:(dur:1000ms#func:cubic-bezier(.8#.1#1#.05)):in:delay-1100]"><span>72</span> reviews</h3>
		</div>
		<div init-with="p:[op:0, tro:center center]"
			when-pf-widget-init="a:[split-button:set:(dur:1200ms#func:linear):in:delay-500]">
			<button class="bg-moola normal">
				<span init-with="p:[op:0, t:opacity 500ms ease-in-out]"
					when-pf-widget-init="p:[op:1:delay-700]">Contact Guru</span>
			</button>
		</div>
	</div>
</div>
