<aside class="docs-options">
	<ul>
		<li>
			<h3>Options:</h3>
		</li>
		<li ng-repeat='option in docs.data.content.css.subcategories[0].topics[1].options track by $index'>
			<a class="chip bg bg-robin"
				u on-click="c:[bg-sienna:add]">{{option.name}}</a>
		</li>
		<!-- <li>
			<a class="chip bg bg-robin"
				u on-click="s:[flex-dir-r:public]">row</a>
		</li>
		<li>
			<a class="chip bg bg-robin"
				u on-click="s:[flex-dir-rr:public]">row-reverse</a>
		</li>
		<li>
			<a class="chip bg bg-sienna"
				u on-click="s:[flex-dir-c:public]">column</a>
		</li>
		<li>
			<a class="chip bg bg-robin"
				u on-click="s:[flex-dir-cr:public]">column-reverse</a>
		</li> -->
	</ul>
</aside>
