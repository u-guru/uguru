<div class="full-xy flex-center" reference="http://codepen.io/teamuguru/pen/819ae8236d2546a80f7372d1c6872138?editors=1100">
	<figure class="figure-image"
		init-default
		on-init="s:[figure-image-init:public]"
		on-exit="p:[opacity:1:0:450:easeOutSine]:delay-150">
		<img src="http://41.media.tumblr.com/ae90b8caeba47c980d343fedfc547b55/tumblr_n9v9gbigA21sciteso1_500.png"/>
		<div class="figure-loading"
			init-with="p:[bg:#ced3d5]"
			when-figure-image-load="p:[opacity:1:0:450:easeOutSine, z-index:-10:delay-600]"
			when-figure-image-error="p:[background:rgba(206#211#213#1):rgba(211#36#44#1):150:easeOutSine]:delay-1350">
			<!-- ^ may need to put this for on-init instead of init-with -->
			<svg viewBox="0 0 100 100">
				<g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
					<g class="photo">
						<path d="M38.3633395,60.0766722 C36.6478321,57.2324103 33.8770088,57.2390917 32.1655313,60.0766722 L24.5930447,72.6316374 C22.8775374,75.4758992 24.1848498,77.7695312 27.5040079,77.7695312 L41.0271169,77.7695312 L74.9969009,77.7695312 C78.3179275,77.7695312 79.612528,75.4691426 77.9009946,72.6314693 L60.1121413,43.1380619 C58.397677,40.2955294 55.6256639,40.3003887 53.9141305,43.1380619 L41.030501,64.4987493 L38.3633395,60.0766722 Z"
							init-with="p:[op:1, sdo:0]"
							when-figure-image-error="p:[stroke-dashoffset:0:157.8:300:easeOutSine]:delay-600"></path>
						<rect x="15" y="15" width="70" height="70" rx="8"
							init-with="p:[op:1, sdo:0]"
							when-figure-image-error="p:[stroke-dashoffset:0:280:900:easeOutSine]:delay-900"></rect>
						<circle cx="28" cy="28" r="6"
							init-with="p:[op:1, sdo:0]"
							when-figure-image-error="p:[stroke-dashoffset:0:37.7:150:easeOutSine]:delay-750"></circle>
					</g>
					<g class="photo">
						<path d="M38.3633395,60.0766722 C36.6478321,57.2324103 33.8770088,57.2390917 32.1655313,60.0766722 L24.5930447,72.6316374 C22.8775374,75.4758992 24.1848498,77.7695312 27.5040079,77.7695312 L41.0271169,77.7695312 L74.9969009,77.7695312 C78.3179275,77.7695312 79.612528,75.4691426 77.9009946,72.6314693 L60.1121413,43.1380619 C58.397677,40.2955294 55.6256639,40.3003887 53.9141305,43.1380619 L41.030501,64.4987493 L38.3633395,60.0766722 Z"
							init-with="p:[sdo:157.8]"
							when-figure-image-init="p:[stroke-dashoffset:157.8:0:300:easeOutSine]:delay-150"
							when-figure-image-error="p:[stroke-dashoffset:0:157.8:300:easeOutSine]:delay-600"></path>
						<rect x="15" y="15" width="70" height="70" rx="8"
							init-with="p:[sdo:280]"
							when-figure-image-init="p:[stroke-dashoffset:280:0:900:easeOutSine]:delay-450"
							when-figure-image-error="p:[stroke-dashoffset:0:280:900:easeOutSine]:delay-900"></rect>
						<circle cx="28" cy="28" r="6"
							init-with="p:[sdo:37.7]"
							when-figure-image-init="p:[stroke-dashoffset:37.7:0:150:easeOutSine]:delay-300 | s:[figure-image-load:public:delay-1350]"
							when-figure-image-error="p:[stroke-dashoffse0:37.7:150:easeOutSine]:delay-750"></circle>
					</g>
					<g class="broken">
						<path d="M50,52 L57,60 L64,52 L71,60 L78,52 L85,60 L85,67.996098 L85,77.003902 C85,81.420025 81.420342,85 77.0042148,85 L50,85"
							init-with="p:[op:0, sdo:109.8]"
							when-figure-image-error="p:[opacity:0:1:50:easeOutSine, stroke-dashoffset:109.8:0:450:easeOutSine]:delay-1350"></path>
						<path d="M50,52 L43,60 L36,52 L29,60 L22,52 L15,60 L15,67.996098 L15,77.003902 C15,81.420025 18.579658,85 22.9957852,85 L50,85"
							init-with="p:[op:0, sdo:109.8]"
							when-figure-image-error="p:[opacity:0:1:50:easeOutSine, stroke-dashoffset:109.8:0:450:easeOutSine]:delay-1350"></path>
						<path d="M50,40 L43,48 L36,40 L29,48 L22,40 L15,48 L15,23.0094363 C15,18.5859468 18.579658,15 22.9957852,15 L50,15"
							init-with="p:[op:0, sdo:117.8]"
							when-figure-image-error="p:[opacity:0:1:50:easeOutSine, stroke-dashoffset:109.8:0:450:easeOutSine]:delay-1350"></path>
						<path d="M50,40 L57,48 L64,40 L71,48 L78,40 L85,48 L85,23.0094363 C85,18.5859468 81.420342,15 77.0042148,15 L50,15"
							init-with="p:[op:0, sdo:117.8]"
							when-figure-image-error="p:[opacity:0:1:50:easeOutSine, stroke-dashoffset:109.8:0:450:easeOutSine]:delay-1350"></path>
					</g>
				</g>
			</svg>
		</div>
	</figure>
</div>
