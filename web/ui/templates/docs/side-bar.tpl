<aside class="docs-nav overflow-y no-scrollbar">
	<nav>
	    <ul class="docs-nav-list">
	        <side-bar-item ng-repeat='(sectionName, value) in docs.data.content track by $index' custom>
				<!-- error with links, see side-bar-item.tpl -->
			</side-bar-item>

	        <!-- <li>
	            <h1><a u on-click="c:[selected:add]">Directives</a></h1>
	            <ul>
	                <li>
	                    <h2><a u on-click="c:[selected:add]">Send</a></h2>
	                    <ul>
	                        <li>
	                            <h3><a u on-click="c:[selected:add]">Structure</a></h3>
	                        </li>
	                        <li>
	                            <h3><a u on-click="c:[selected:add]">:public</a></h3>
	                        </li>
	                        <li>
	                            <h3><a u on-click="c:[selected:add]">:self</a></h3>
	                        </li>
	                        <li>
	                            <h3><a u on-click="c:[selected:add]">:children</a></h3>
	                        </li>
	                    </ul>
	                </li>
	            </ul>
	        </li> -->
	    </ul>
	</nav>
</aside>
