<div class="full-xy flex-center p15xy" types='span, link, image, input' default-type="link">
	<span class="chip bg-moxie" ng-if='activeType === "span"'>moxie tag</span>
	<a class="chip chip-link bg bg-cobalt" ng-if='activeType === "link"'>cobalt tag</a>
	<a class="chip chip-link bg bg-moola" ng-if='activeType === "image"'>
		<span class="user-icon-32" style="background-image: url(https://en.gravatar.com/userimage/5102999/c223080350b67306f21725b6cf57920a.jpg?size=32);"></span>
		<span>cobalt tag</span>
	</a>
	<input tabindex="1" ng-model='innerText' class='chip chip-input bg-slate txt-white' placeholder="tag input" size="7" ng-if='activeType === "input"'/>
</div>
