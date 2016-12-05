<div class="perspective-container full-xy flex-center p15xy"
	u on-init="s:[record-tile-init:depth(>1):250]">
	<div class="record-tile-container">
		<a class="record-tile">
			<svg viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100"></rect>
			</svg>
			<div class="record-tile-back"
				u init-with="p:[tr:translateX(-7.5%)]"
				when-record-tile-init="a:[translateX:-7.5%:0%:1000:easeOutSine:0:1:f]:delay-500">
				<div u init-with="p:[tro:center center, tr:rotate(0)]"
					when-record-tile-init="a:[rotate:0deg:40deg:1000:easeOutBack:0:1:f]:delay-1500">
					<svg viewBox="0 0 320 320" u init-with="p:[op:0]"
						when-record-tile-init="a:[opacity:0:1:500:easeOutQuint:0:1:f]">
						<defs>
							<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="vinyl-shine">
								<feGaussianBlur stdDeviation="8" in="SourceGraphic"></feGaussianBlur>
							</filter>
						</defs>
						<g fill="none" fill-rule="evenodd">
							<circle class="rim" stroke="#423942" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#191919" cx="160" cy="160" r="150"></circle>
							<circle class="micro-groove" fill="#423942" cx="160" cy="159.0625" r="60.9375"></circle>
							<circle class="label" fill="#CE8FCF" cx="160" cy="159.0625" r="28.125"></circle>
							<path d="M160,187.1875 L160,130.9375 C144.466991,130.9375 131.875,143.529491 131.875,159.0625 C131.875,174.595509 144.466991,187.1875 160,187.1875 Z" class="label-half" fill="#347DD0"></path>
							<circle class="groove-1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="160" cy="159.0625" r="93.75"></circle>
							<circle class="groove-2" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="160.46875" cy="159.53125" r="83.90625"></circle>
							<circle class="groove-3" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="160" cy="160" r="103.125"></circle>
							<path d="M161.963396,272.482866 C224.085967,271.398512 273.567219,220.159176 272.482866,158.036604 C271.398512,95.9140329 220.159176,46.4327808 158.036604,47.5171343 C95.9140329,48.6014878 46.4327808,99.8408244 47.5171343,161.963396 C48.6014878,224.085967 99.8408244,273.567219 161.963396,272.482866 L161.963396,272.482866 Z" class="groove-4" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M162.127012,281.856438 C229.426464,280.681722 283.031154,225.17244 281.856438,157.872988 C280.681722,90.5735357 225.17244,36.9688458 157.872988,38.1435622 C90.5735357,39.3182785 36.9688458,94.8275597 38.1435622,162.127012 C39.3182785,229.426464 94.8275597,283.031154 162.127012,281.856438 L162.127012,281.856438 Z" class="groove-5" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M162.290628,291.23001 C234.766962,289.964931 292.495089,230.185705 291.23001,157.709372 C289.964931,85.2330384 230.185705,27.5049109 157.709372,28.76999 C85.2330384,30.0350691 27.5049109,89.8142951 28.76999,162.290628 C30.0350691,234.766962 89.8142951,292.495089 162.290628,291.23001 L162.290628,291.23001 Z" class="groove-6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<circle class="groove-7" fill="#211720" cx="160" cy="159.0625" r="4.6875"></circle>
							<polygon class="shine" fill-opacity="0.5" fill="#FFFFFF" filter="url(#vinyl-shine)" points="160.804837 159.804837 66.8040405 277.228968 43.0172439 253.442172 160.441375 159.441375 254.442172 42.0172439 278.228968 65.8040405 160.804837 159.804837"></polygon>
						</g>
					</svg>

				</div>
			</div>
			<div class="record-tile-front"
				u init-with="p:[tr:translateX(7.5%)]"
				when-record-tile-init="a:[translateX:7.5%:0%:1000:easeOutSine:0:1:f]:delay-750">
				<div class="record-tile-bg"
					u init-with="p:[op:0]"
					when-record-tile-init="a:[opacity:0:1:250:easeOutSine:0:1:f]:delay-50"></div>
				<div class="record-tile-border">
					<div u init-with="p:[tr:scaleX(0)]"
						when-record-tile-init="a:[scaleX:0:1:500:easeOutExpo:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-record-tile-init="a:[scaleY:0:1:500:easeOutExpo:0:1:f]"></div>
					<div u init-with="p:[tr:scaleX(0)]"
						when-record-tile-init="a:[scaleX:0:1:500:easeOutExpo:0:1:f]"></div>
					<div u init-with="p:[tr:scaleY(0)]"
						when-record-tile-init="a:[scaleY:0:1:500:easeOutExpo:0:1:f]"></div>
				</div>
				<div class="record-art"
					style="background-image:url(https://consequenceofsound.files.wordpress.com/2016/08/blonde-alternative.jpg?w=806&h=806);"
					u init-with="p:[op:0]"
					when-record-tile-init="a:[opacity:0:0.5:250:easeOutSine:0:1:f]:delay-250"></div>
				<h1 class="record-label"
					u init-with="p:[op:0]"
					when-record-tile-init="a:[slideInUp-subtle:1000:linear:1000:1:f]">Top 40</h1>
			</div>
		</a>
		<div class="record-info">
			<h3 u init-with="p:[op:0]"
				when-record-tile-init="a:[slideInUp-subtle:1000:linear:1000:1:f]">Top 40 - 2016</h3>
		</div>
	</div>
</div>
