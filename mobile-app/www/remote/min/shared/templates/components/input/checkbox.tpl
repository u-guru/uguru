<div class="perspective-container full-xy flex-center" reference="http://codepen.io/teamuguru/pen/a76dae2606469f818ac51ad37c0dc827?editors=1100">
	<!-- @jeselle (delete when completed)
		- :unchecked:hover and :unchecked:active are wrong - the checkmark (.check-under) should change to a semitransparent white, not a solid white
		- If you can't get all the states to work (i.e. you might have problems with the different between :unchecked:hover and :checked:hover), let me know and we can figure it out. Worst case, you'll just put the states in with the appropriate properties and we'll ask Samir how to activate them properly.
	-->
	<div class="checkbox-container"
		init-default
		on-init="s:[checkbox-init:public]">
		<div>
			<input type="checkbox" id="checkbox-item"/>
			<span>
				<svg viewBox="0 0 32 32">
					<line class="line-1" x1="1.25" y1="1.25" x2="30.75" y2="1.25"
						init-with="p:[sda:29.5, sdo:29.5]"/>
					<line class="line-2" x1="30.75" y1="1.25" x2="30.75" y2="30.75"
						init-with="p:[sda:29.5, sdo:29.5]"/>
					<line class="line-3" x1="30.75" y1="30.75" x2="1.25" y2="30.75"
						init-with="p:[sda:29.5, sdo:29.5]"/>
					<line class="line-4" x1="1.25" y1="30.75" x2="1.25" y2="1.25"
						init-with="p:[sda:29.5, sdo:29.5]"/>
					<circle fill="#D8D8D8" cx="12.3901367" cy="22.03125" r="32"
						init-with="p:[tr:scale(0)]"></circle>
					<polyline class="check-under" points="7.24 17.0305882 12.3929412 22.1835294 24.76 9.81647059"></polyline>
					<polyline class="check-stroke" points="7.24 17.0305882 12.3929412 22.1835294 24.76 9.81647059"
						init-with="p:[sda:24.8, sdo:24.8]"></polyline>
				</svg>
			</span>
		</div>
		<label for="checkbox-item">Checkbox Item</label>
	</div>

	<!-- this is the deprecated version of the checkbox - you can use it for reference -->
	<!-- <div class="checkbox-container old">
		<div>
			<input type="checkbox" id="checkbox-item"/>
			<span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
		<label for="checkbox-item">Checkbox Item</label>
	</div> -->
</div>
