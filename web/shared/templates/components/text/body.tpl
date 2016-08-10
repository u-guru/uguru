<div class="perspective-container full-xy flex-center p15xy" types='default, short' default-type="default" reference="http://codepen.io/teamuguru/pen/b96acb7823f68a8dadc95e01abea94a6?editors=1100">
	<div class="body-text" number="3" ng-if='activeType === "default"'>
		<div class="body-text-loader">
			<span><span></span></span><span><span></span></span>
			<span><span></span></span><span><span></span></span>
			<span><span></span></span><span><span></span></span>
			<span><span></span></span><span><span></span></span>
			<span><span></span></span><span><span></span></span>
		</div>
		<span>Lorem ipsum dolor sit amet.</span>
		<span>Consectetuer adipiscing elit eget nisl.</span>
		<span>Nam at tortor quis ipsum tempor.</span>
	</div>

	<div class="body-text state-short" ng-if='activeType === "short"'>
		<span>Lorem&nbsp;ipsum&nbsp;dolor&nbsp;sit&nbsp;amet.</span>
		<span>Consectetuer&nbsp;adipiscing&nbsp;elit&nbsp;eget&nbsp;nisl.</span>
		<span>Nam&nbsp;at&nbsp;tortor&nbsp;quis&nbsp;ipsum&nbsp;tempor.</span>
	</div>
</div>
