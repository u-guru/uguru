<div abs x-center y-center top="0" left="0" width="100%" height="100%"
	u init-with="p:[tro:center bottom, tr:scale(0)]"
	when-switch-vibes="a:[scale:0:1:800:easeOutBack:0:1:f] | p:[z-index:10]"
	when-exit-vibes="a:[scale:1:0:200:easeInBack:0:1:f]">

	<div x-center y-center relative width="calc(100% - 60px)" height="calc(100% - 60px)" rad="2px" bg="rose">
		<a abs flex top="0" right="0" width="64px" height="64px"
			u on-click="s:[exit-vibes:public]">
			<span class='svg-64 svg-stroke-5 stroke-white'>
				<replace with='shared/templates/components/svg/main/times.html'></replace>
			<span>
		</a>
		<div flex p="15px">
			<ul p="15px"
				u when-switch-vibes="s:[playlist-enter-left:children:linear-1000]:+400">

				<!-- <li rel p-y="10px" u-list='track in ["all the vibes", "sad drake", "hustlin", "the nicest", "chillout"]'
					u init-with="p:[op:0]"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[h-scale:children]"
					on-mouseleave="s:[h-shrink:children]">
					<a font-size="48px" line-height="1.2" f-w="700" class="caps block txt-right">
						<span>{{track}}</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:right center, op:0]"
							when-h-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-h-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li> -->

				<li p-y="10px" class="txt-right"
					u init-with="p:[op:0]"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[av-scale:children]"
					on-mouseleave="s:[av-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-right">
						<span>All the Vibes</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:right center, op:0]"
							when-av-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-av-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li>
				<li p-y="10px" class="txt-right"
					u init-with="p:[op:0]"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[sd-scale:children]"
					on-mouseleave="s:[sd-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-right">
						<span>Sad Drake</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:right center, op:0]"
							when-sd-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-sd-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li>
				<li p-y="10px" class="txt-right"
					u init-with="p:[op:0]"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[h-scale:children]"
					on-mouseleave="s:[h-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-right">
						<span>Hustlin'</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:right center, op:0]"
							when-h-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-h-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li>
				<li p-y="10px" class="txt-right"
					u init-with="p:[op:0]"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[tn-scale:children]"
					on-mouseleave="s:[tn-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-right">
						<span>The Nicest</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:right center, op:0]"
							when-tn-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-tn-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li>
				<li p-y="10px" class="txt-right"
					u init-with="p:[op:0]"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[co-scale:children]"
					on-mouseleave="s:[co-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-right">
						<span>Chillout</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:right center, op:0]"
							when-co-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-co-shrink="a:[scaleX:1:0:200:linear:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li>
			</ul>
			<ul p="15px"
				u when-switch-vibes="s:[playlist-enter-right:children:linear-1000]:+300">

				<!-- <li rel p-y="10px" u-list='track in ["summer groovin", "get on up", "whats luv?", "all night", "go hard"]'
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[h-scale:children]"
					on-mouseleave="s:[h-shrink:children]">
					<a font-size="48px" line-height="1.2" f-w="700" class="caps block txt-left">
						<span>{{track}}</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:left center, op:0]"
							when-h-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f, opacity:0:1:10:linear:0:1:f]"
							when-h-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f, opacity:1:0:100:linear:200:1:f]"/>
					</a>
				</li> -->
				<li p-y="10px" class="txt-left"
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[sg-scale:children]"
					on-mouseleave="s:[sg-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-left">
						<span>Summer Groovin'</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:left center]"
							when-sg-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
							when-sg-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</a>
				</li>
				<li p-y="10px" class="txt-left"
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[gu-scale:children]"
					on-mouseleave="s:[gu-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-left">
						<span>Get on Up</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:left center]"
							when-gu-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
							when-gu-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</a>
				</li>
				<li p-y="10px" class="txt-left"
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[wl-scale:children]"
					on-mouseleave="s:[wl-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-left">
						<span>What's Luv?</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:left center]"
							when-wl-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
							when-wl-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</a>
				</li>
				<li p-y="10px" class="txt-left"
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[an-scale:children]"
					on-mouseleave="s:[an-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-left">
						<span>All Night</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:left center]"
							when-an-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
							when-an-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</a>
				</li>
				<li p-y="10px" class="txt-left"
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[gh-scale:children]"
					on-mouseleave="s:[gh-shrink:children]">
					<a rel font-size="48px" line-height="1.2" f-w="700" class="caps inline-block txt-left">
						<span>Go Hard</span>
						<hr abs bottom="0" left="0" width="100" height="2px" m="0" rad="4px" border="0" bg="white"
							u init-with="p:[tr:scaleX(0), tro:left center]"
							when-gh-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
							when-gh-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
