<div abs x-center y-center top="0" left="0" width="100%" height="100%"
	u init-with="p:[op:0, z-index:-10]">
	<!-- u init-with="p:[tro:center bottom, tr:scale(0)]"
	when-switch-vibes="s:[playlist:depth(>1):800] | a:[scale:0:1:800:easeOutBack:0:1:f]"
	when-exit-vibes="a:[scale:1:0:200:easeInBack:0:1:f]" -->

	<div x-center y-center relative width="calc(100% - 60px)" height="calc(100% - 60px)" rad="2px" bg="rose">
		<a abs flex top="0" right="0" width="64px" height="64px"
			u on-click="s:[exit-vibes:public]">
			<graphic class='svg-64 svg-stroke-5 stroke-white' url='shared/templates/components/svg/main/times.html'></graphic>
		</a>
		<div flex>
			<item class="p30x"
				u when-playlist="s:[playlist-enter-left:children:linear-1000]:+400">
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'
					u init-with="p-op"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[av-scale:children]"
					on-mouseleave="s:[av-shrink:children]">
					All the Vibes
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:right center]"
						when-av-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-av-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'
					u init-with="p-op"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[sd-scale:children]"
					on-mouseleave="s:[sd-shrink:children]">
					Sad Drake
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:right center]"
						when-sd-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-sd-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'
					u init-with="p-op"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[h-scale:children]"
					on-mouseleave="s:[h-shrink:children]">
					Hustlin'
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:right center]"
						when-h-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-h-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'
					u init-with="p-op"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[tn-scale:children]"
					on-mouseleave="s:[tn-shrink:children]"
					on-click="p:[launch:ui.guru/#/]">
					The Nicest
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:right center]"
						when-tn-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-tn-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-right p10y'
					u init-with="p-op"
					when-playlist-enter-left="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[co-scale:children]"
					on-mouseleave="s:[co-shrink:children]">
					Chillout
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:right center]"
						when-co-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-co-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
			</item>
			<item class="p30x"
				u when-playlist="s:[playlist-enter-right:children:linear-1000]:+300">
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'
					u init-with="p:[op:0]"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[sg-scale:children]"
					on-mouseleave="s:[sg-shrink:children]">
					Summer Groovin'
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:left center]"
						when-sg-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-sg-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'
					u init-with="p-op"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[gu-scale:children]"
					on-mouseleave="s:[gu-shrink:children]">
					Get on Up
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:left center]"
						when-gu-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-gu-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'
					u init-with="p-op"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[wl-scale:children]"
					on-mouseleave="s:[wl-shrink:children]">
					What's Luv?
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:left center]"
						when-wl-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-wl-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'
					u init-with="p-op"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[an-scale:children]"
					on-mouseleave="s:[an-shrink:children]">
					All Night
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:left center]"
						when-an-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-an-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
				<txt font-size="48px" width='100' line-height="1.2" class='weight-700 uppercase txt-left p10y'
					u init-with="p-op"
					when-playlist-enter-right="a:[fadeInDown:850:easeOutExpo:0:1:f]"
					on-mouseenter="s:[gh-scale:children]"
					on-mouseleave="s:[gh-shrink:children]">
					Go Hard
					<item class="absolute bottom-0" style="border-bottom:solid 3px white;" width="100"
						u init-with="p:[tr:scaleX(0), tro:left center]"
						when-gh-scale="a:[scaleX:0:1:200:easeOutCubic:0:1:f]"
						when-gh-shrink="a:[scaleX:1:0:200:easeInSine:0:1:f]">
					</item>
				</txt>
			</item>
		</div>
	</div>
</div>
