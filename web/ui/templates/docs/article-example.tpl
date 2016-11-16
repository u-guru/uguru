<div class="docs-example">
	<div>
		<nav>
			<ul>
				<li>
					<a class="selected" u on-click="c:[selected:add] | s:[docs-preview:public]">Example</a>
				</li>
				<li>
					<a u on-click="c:[selected:add] | s:[docs-html:public]">HTML</a>
				</li>
				<li>
					<a u on-click="c:[selected:add] | s:[docs-css:public]">CSS</a>
				</li>
			</ul>
			<a class="docs-example-run">Run</a>
		</nav>
		<section>
			<div class="docs-example-preview"
				u init-with="p:[z-index:10, op:1]"
				when-docs-preview="p:[z-index:10, op:1]"
				when-docs-html="p:[z-index:-10, op:0]"
				when-docs-css="p:[z-index:-10, op:0]">
				<ul class="p15-grid" style="display:flex"
					u init-with="p:[flex-direction:column]"
					when-flex-dir-r="p:[flex-direction:row]"
					when-flex-dir-rr="p:[flex-direction:row-reverse]"
					when-flex-dir-c="p:[flex-direction:column]"
					when-flex-dir-cr="p:[flex-direction:column-reverse]">
					<li><div class="flex-center width-48 height-48 bg-stone border-2 radius-2 txt-24 semibold">1</div></li>
					<li><div class="flex-center width-48 height-48 bg-cobalt border-2 radius-2 txt-24 semibold">2</div></li>
					<li><div class="flex-center width-48 height-48 bg-eggplant border-2 radius-2 txt-24 semibold">3</div></li>
				</ul>
			</div>
			<div class="docs-example-html"
				u init-with="p:[z-index:-10, op:0]"
				when-docs-preview="p:[z-index:-10, op:0]"
				when-docs-html="p:[z-index:10, op:1]"
				when-docs-css="p:[z-index:-10, op:0]">
				<textarea>&lt;ul class="p15-grid"&gt;
&lt;li&gt;&lt;div class="bg-stone"&gt;1&lt;/div&gt;&lt;/li&gt;
&lt;li&gt;&lt;div class="bg-cobalt"&gt;1&lt;/div&gt;&lt;/li&gt;
&lt;li&gt;&lt;div class="bg-eggplant"&gt;1&lt;/div&gt;&lt;/li&gt;
&lt;/ul&gt;</textarea>
			</div>
			<div class="docs-example-css"
				u init-with="p:[z-index:-10, op:0]"
				when-docs-preview="p:[z-index:-10, op:0]"
				when-docs-html="p:[z-index:-10, op:0]"
				when-docs-css="p:[z-index:10, op:1]">
				<pre>ul {
display: flex;
flex-direction: column;
}</pre>
				<!-- u init-with="p:[z-index:10, op:1]"
				when-flex-dir-r="p:[z-index:-10, op:0]"
				when-flex-dir-rr="p:[z-index:-10, op:0]"
				when-flex-dir-c="p:[z-index:10, op:1]"
				when-flex-dir-cr="p:[z-index:-10, op:0]"" -->
			</div>
		</section>
	</div>
</div>
