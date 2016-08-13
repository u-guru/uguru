<div class="radio-container">
	<div>
		<input type="radio" id="radio-item" ng-model="radio.value" on-change="onChange && onChange()"/>
		<span>
			<svg viewBox="0 0 100 100">
				<path d="M14,54.2352941 L35.1764706,75.4117647 L86,24.5882353"></path>
			</svg>
		</span>
	</div>
	<label for="radio-item">{{label}}</label>
</div>