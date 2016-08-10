<div class="perspective-container full-xy flex-center" reference="http://codepen.io/teamuguru/pen/3d51f2394a6a0dbe38646612aa3e3759?editors=1100">
	<!-- @jeselle (delete when completed)
		- If you can't get all the states to work (i.e. you might have problems with the different between :unchecked:hover and :checked:hover), let me know and we can figure it out. Worst case, you'll just put the states in with the appropriate properties and we'll ask Samir how to activate them properly.
	-->
	<div class="radio-container">
		<div>
			<input type="radio" id="radio-item" />
			<span>
				<svg viewBox="0 0 24 24">
					<circle class="border" cx="12" cy="12" r="9.5"
						init-with="p:[sda:59.7, sdo:59.7, op:0]"></circle>
					<circle class="bg" cx="12" cy="12" r="9"></circle>
					<circle class="check" cx="12" cy="12" r="9"
						init-with="p:[tr:scale(0)]"></circle>
				</svg>
			</span>
		</div>
		<label for="radio-item">Radio Item</label>
	</div>

	<!-- this is the deprecated version of the checkbox - you can use it for reference -->
	<!-- <div class="radio-container old">
		<div>
			<input type="radio" id="radio-item" />
			<span>
				<svg viewBox="0 0 100 100">
					<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
				</svg>
			</span>
		</div>
		<label for="radio-item">Radio Item</label>
	</div> -->
</div>
