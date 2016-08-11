<div class="full-xy flex-center bg-slate" types='student, guru, no-padding, large-icons' default-type="large-icons">
	<!-- make sure that the borders are not visible after entering otherwise they will conflict with the uploading status -->
	<div class="full-xy flex-center bg-white" ng-if='activeType === "student"'>
		<div class="attach-list student">
			<ul init-default
				on-init="s:[attach-list-init]">
				<li init-with="p-op"
					when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in]">
					<a init-default
						on-click="s:[attach-upload:public]">
						<span>
							<svg viewBox="0 0 100 100">
								<g stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" stroke="#F25A5B" fill="#A25B5D"></path>
									<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 L19.0000163,14 Z M68.0992131,14.96 L68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#A25B5D" fill="#F25A5B"></path>
									<path d="M26,50 L26,78 L73,78" stroke="#FFFFFF"></path>
									<path d="M26.0065349,27 L58.452381,27" stroke="#FFFFFF"></path>
									<path d="M26.0065349,39 L73,39" stroke="#FFFFFF"></path>
									<path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542" stroke="#FFFFFF"></path>
								</g>
							</svg>
						</span>
						<span>vet-ethics-guide.pdf</span>
						<div>
							<div class="top"
								init-with="p:[tr:scaleX(0)]"></div>
							<div class="right"
								init-with="p:[tr:scaleY(0)]"></div>
							<div class="bot"
								init-with="p:[tr:scaleX(0)]"></div>
							<div class="left"
								init-with="p:[tr:scaleY(0)]"></div>
							<div class="uploading"
								init-with="p:[tr:scaleX(0), op:1]"
								when-attach-upload="p:[tr:none, t:all 250ms ease-out, op:0:delay-500]"></div>
						</div>
					</a>
				</li>
				<li init-with="p-op"
					when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in:delay-100]">
					<a>
						<span>
							<svg viewBox="0 0 100 100">
								<g fill="none" stroke-linecap="round" stroke-linejoin="round">
									<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" fill="#467693"></path>
									<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#467693" stroke-width="2" fill="#50A5DD"></path>
									<path d="M22.6366123,64 L77.3852732,64" stroke="#FFFFFF" stroke-width="2"></path>
									<path d="M22.6366123,76 L77.3852732,76" stroke="#FFFFFF" stroke-width="2"></path>
									<path d="M55.6294408,52 L77.2542178,52" stroke="#FFFFFF" stroke-width="2"></path>
									<path d="M55.6336591,40 L77.6212124,40" stroke="#FFFFFF" stroke-width="2"></path>
									<path d="M55.4518409,28 L61.8030306,28" stroke="#FFFFFF" stroke-width="2"></path>
									<rect stroke="#FFFFFF" stroke-width="2" fill="#467693" x="22" y="25" width="26" height="28" rx="2"></rect>
									<path d="M31.9314179,48.9453845 C32.1640179,48.9906485 32.4187723,49.0143973 32.6943619,49.0143973 L42.5153962,49.0143973 C44.7241651,49.0143973 45.5891311,47.4805175 44.447895,45.5883809 L39.6712698,37.6688735 C38.5247851,35.7680349 36.6797244,35.7767369 35.5384884,37.6688735 L31.6684718,44.0852498 L31.2869733,43.4527362 C30.3147502,41.8408183 28.7387295,41.8409855 27.7666073,43.4527362 L26.1722924,46.0960645 C25.2000693,47.7079824 25.9371302,49.0143973 27.8183387,49.0143973 L31.2352418,49.0143973 C31.4884119,49.0143973 31.72095,48.9905711 31.9314179,48.9453845 L31.9314179,48.9453845 Z" stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0"></path>
									<circle stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0" cx="28.1285714" cy="31.1285714" r="2.22857143"></circle>
								</g>
							</svg>
						</span>
						<span>file.doc</span>
						<div>
							<div class="top"
								init-with="p:[tr:scaleX(0)]"></div>
							<div class="right"
								init-with="p:[tr:scaleY(0)]"></div>
							<div class="bot"
								init-with="p:[tr:scaleX(0)]"></div>
							<div class="left"
								init-with="p:[tr:scaleY(0)]"></div>
							<div class="uploading"
								init-with="p:[tr:scaleX(0)]"></div>
						</div>
					</a>
				</li>
				<li init-with="p-op"
					when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in:delay-200]">
					<a>
						<span>
							<svg viewBox="0 0 100 100">
								<g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<rect stroke="#4B7681" fill="#CCE3E9" x="14" y="14" width="72" height="72" rx="2"></rect>
									<rect stroke="#4B7681" fill="#55A4B7" x="19" y="19" width="62" height="52"></rect>
									<path d="M43.4375976,66 L67.786851,66 C71.1015401,66 72.3823516,63.7024894 70.6596479,60.8683666 L58.6929424,41.1812237 C56.9720116,38.3500175 54.1771841,38.3471008 52.4544804,41.1812237 L43.4434661,56.0057822 L42.1887653,53.941599 C40.4658749,51.1071689 37.6696704,51.105382 35.9456939,53.941599 L31.7376067,60.8645749 C30.0147162,63.699005 31.304048,66 34.6198358,66 L43.4375976,66 Z M33.5537843,33.0371927 C36.0687699,33.0371927 38.1075686,31.0141482 38.1075686,28.5185963 C38.1075686,26.0230445 36.0687699,24 33.5537843,24 C31.0387987,24 29,26.0230445 29,28.5185963 C29,31.0141482 31.0387987,33.0371927 33.5537843,33.0371927 Z" stroke="#FFFFFF" fill-opacity="0.5" fill="#40484B"></path>
								</g>
							</svg>
						</span>
						<span>image.jpg</span>
						<div>
							<div class="top"
								init-with="p:[tr:scaleX(0)]"></div>
							<div class="right"
								init-with="p:[tr:scaleY(0)]"></div>
							<div class="bot"
								init-with="p:[tr:scaleX(0)]"></div>
							<div class="left"
								init-with="p:[tr:scaleY(0)]"></div>
							<div class="uploading"
								init-with="p:[tr:scaleX(0)]"></div>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>

	<div class="attach-list guru" ng-if='activeType === "guru"'>
		<ul init-default
			on-init="s:[attach-list-init]">
			<li init-with="p-op"
				when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in]">
				<a init-default
					on-click="s:[attach-upload:public]">
					<span>
						<svg viewBox="0 0 100 100">
							<g stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" stroke="#F25A5B" fill="#A25B5D"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 L19.0000163,14 Z M68.0992131,14.96 L68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#A25B5D" fill="#F25A5B"></path>
								<path d="M26,50 L26,78 L73,78" stroke="#FFFFFF"></path>
								<path d="M26.0065349,27 L58.452381,27" stroke="#FFFFFF"></path>
								<path d="M26.0065349,39 L73,39" stroke="#FFFFFF"></path>
								<path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542" stroke="#FFFFFF"></path>
							</g>
						</svg>
					</span>
					<span>vet-ethics-guide.pdf</span>
					<div>
						<div class="top"
							init-with="p:[tr:scaleX(0)]"></div>
						<div class="right"
							init-with="p:[tr:scaleY(0)]"></div>
						<div class="bot"
							init-with="p:[tr:scaleX(0)]"></div>
						<div class="left"
							init-with="p:[tr:scaleY(0)]"></div>
						<div class="uploading"
							init-with="p:[tr:scaleX(0), op:1]"
							when-attach-upload="p:[tr:none, t:all 250ms ease-out, op:0:delay-500]"></div>
					</div>
				</a>
			</li>
			<li init-with="p-op"
				when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in:delay-100]">
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" fill="#467693"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#467693" stroke-width="2" fill="#50A5DD"></path>
								<path d="M22.6366123,64 L77.3852732,64" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M22.6366123,76 L77.3852732,76" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M55.6294408,52 L77.2542178,52" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M55.6336591,40 L77.6212124,40" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M55.4518409,28 L61.8030306,28" stroke="#FFFFFF" stroke-width="2"></path>
								<rect stroke="#FFFFFF" stroke-width="2" fill="#467693" x="22" y="25" width="26" height="28" rx="2"></rect>
								<path d="M31.9314179,48.9453845 C32.1640179,48.9906485 32.4187723,49.0143973 32.6943619,49.0143973 L42.5153962,49.0143973 C44.7241651,49.0143973 45.5891311,47.4805175 44.447895,45.5883809 L39.6712698,37.6688735 C38.5247851,35.7680349 36.6797244,35.7767369 35.5384884,37.6688735 L31.6684718,44.0852498 L31.2869733,43.4527362 C30.3147502,41.8408183 28.7387295,41.8409855 27.7666073,43.4527362 L26.1722924,46.0960645 C25.2000693,47.7079824 25.9371302,49.0143973 27.8183387,49.0143973 L31.2352418,49.0143973 C31.4884119,49.0143973 31.72095,48.9905711 31.9314179,48.9453845 L31.9314179,48.9453845 Z" stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0"></path>
								<circle stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0" cx="28.1285714" cy="31.1285714" r="2.22857143"></circle>
							</g>
						</svg>
					</span>
					<span>file.doc</span>
					<div>
						<div class="top"
							init-with="p:[tr:scaleX(0)]"></div>
						<div class="right"
							init-with="p:[tr:scaleY(0)]"></div>
						<div class="bot"
							init-with="p:[tr:scaleX(0)]"></div>
						<div class="left"
							init-with="p:[tr:scaleY(0)]"></div>
						<div class="uploading"
							init-with="p:[tr:scaleX(0)]"></div>
					</div>
				</a>
			</li>
			<li init-with="p-op"
				when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in:delay-200]">
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<defs>
						    	<pattern id="img-fill" x="0" y="0" width="1" height="1">
						    		<image width="72" height="72" xlink:href="https://38.media.tumblr.com/avatar_895d9e0c6ef1_128.png"/>
						    	</pattern>
						  </defs>
							<g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<rect x="14" y="14" width="72" height="72" rx="2" stroke="white" stroke-width="2" fill="url(#img-fill)"></rect>
							</g>
						</svg>
					</span>
					<span>image.jpg</span>
					<div>
						<div class="top"
							init-with="p:[tr:scaleX(0)]"></div>
						<div class="right"
							init-with="p:[tr:scaleY(0)]"></div>
						<div class="bot"
							init-with="p:[tr:scaleX(0)]"></div>
						<div class="left"
							init-with="p:[tr:scaleY(0)]"></div>
						<div class="uploading"
							init-with="p:[tr:scaleX(0)]"></div>
					</div>
				</a>
			</li>
		</ul>
	</div>

	<div class="attach-list no-padding" ng-if='activeType === "no-padding"'>
		<ul init-default
			on-init="s:[attach-list-init]">
			<li init-with="p-op"
				when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in]">
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<g stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" stroke="#F25A5B" fill="#A25B5D"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 L19.0000163,14 Z M68.0992131,14.96 L68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#A25B5D" fill="#F25A5B"></path>
								<path d="M26,50 L26,78 L73,78" stroke="#FFFFFF"></path>
								<path d="M26.0065349,27 L58.452381,27" stroke="#FFFFFF"></path>
								<path d="M26.0065349,39 L73,39" stroke="#FFFFFF"></path>
								<path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542" stroke="#FFFFFF"></path>
							</g>
						</svg>
					</span>
					<span>vet-ethics-guide.pdf</span>
				</a>
			</li>
			<li init-with="p-op"
				when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in:delay-100]">
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" fill="#467693"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#467693" stroke-width="2" fill="#50A5DD"></path>
								<path d="M22.6366123,64 L77.3852732,64" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M22.6366123,76 L77.3852732,76" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M55.6294408,52 L77.2542178,52" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M55.6336591,40 L77.6212124,40" stroke="#FFFFFF" stroke-width="2"></path>
								<path d="M55.4518409,28 L61.8030306,28" stroke="#FFFFFF" stroke-width="2"></path>
								<rect stroke="#FFFFFF" stroke-width="2" fill="#467693" x="22" y="25" width="26" height="28" rx="2"></rect>
								<path d="M31.9314179,48.9453845 C32.1640179,48.9906485 32.4187723,49.0143973 32.6943619,49.0143973 L42.5153962,49.0143973 C44.7241651,49.0143973 45.5891311,47.4805175 44.447895,45.5883809 L39.6712698,37.6688735 C38.5247851,35.7680349 36.6797244,35.7767369 35.5384884,37.6688735 L31.6684718,44.0852498 L31.2869733,43.4527362 C30.3147502,41.8408183 28.7387295,41.8409855 27.7666073,43.4527362 L26.1722924,46.0960645 C25.2000693,47.7079824 25.9371302,49.0143973 27.8183387,49.0143973 L31.2352418,49.0143973 C31.4884119,49.0143973 31.72095,48.9905711 31.9314179,48.9453845 L31.9314179,48.9453845 Z" stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0"></path>
								<circle stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0" cx="28.1285714" cy="31.1285714" r="2.22857143"></circle>
							</g>
						</svg>
					</span>
					<span>file.doc</span>
				</a>
			</li>
			<li init-with="p-op"
				when-attach-list-init="a:[bounceInRight-subtle:set:(dur:1000ms#func:linear):in:delay-200]">
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<g stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect stroke="#4B7681" fill="#CCE3E9" x="14" y="14" width="72" height="72" rx="2"></rect>
								<rect stroke="#4B7681" fill="#55A4B7" x="19" y="19" width="62" height="52"></rect>
								<path d="M43.4375976,66 L67.786851,66 C71.1015401,66 72.3823516,63.7024894 70.6596479,60.8683666 L58.6929424,41.1812237 C56.9720116,38.3500175 54.1771841,38.3471008 52.4544804,41.1812237 L43.4434661,56.0057822 L42.1887653,53.941599 C40.4658749,51.1071689 37.6696704,51.105382 35.9456939,53.941599 L31.7376067,60.8645749 C30.0147162,63.699005 31.304048,66 34.6198358,66 L43.4375976,66 Z M33.5537843,33.0371927 C36.0687699,33.0371927 38.1075686,31.0141482 38.1075686,28.5185963 C38.1075686,26.0230445 36.0687699,24 33.5537843,24 C31.0387987,24 29,26.0230445 29,28.5185963 C29,31.0141482 31.0387987,33.0371927 33.5537843,33.0371927 Z" stroke="#FFFFFF" fill-opacity="0.5" fill="#40484B"></path>
							</g>
						</svg>
					</span>
					<span>image.jpg</span>
				</a>
			</li>
		</ul>
	</div>

	<div class="attach-list large" ng-if='activeType === "large-icons"'>
		<ul>
			<li>
				<a init-default
					on-init="send:[pdf-load:public]"
					when-pdf-load="send:[pdf-enter:public:delay-350]">
					<span>
						<svg viewBox="0 0 100 100">
							<g stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="white" stroke-width="2" stroke-opacity="0.1"
									init-with="p:[op:0, sdo:303, sda:303]"
									when-pdf-load="p:[op:1, sdo:0, t:all 150ms ease-out]"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" stroke="#F25A5B" fill="#A25B5D"
									init-with="p-op"
									when-pdf-enter="a:[fadeIn:set:(dur:1000ms#func:linear):in]"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 L19.0000163,14 Z M68.0992131,14.96 L68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#A25B5D" fill="#F25A5B"
									init-with="p:[fill-opacity:0, sdo:303, sda:303]"
									when-pdf-enter="p:[fill-opacity:1:delay-500,stroke-dashoffset:0, t:fill-opacity 250ms ease-out#stroke-dashoffset 150ms ease-out]"></path>
								<path d="M26,50 L26,78 L73,78" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
								<path d="M26.0065349,27 L58.452381,27" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
								<path d="M26.0065349,39 L73,39" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
								<path d="M68.6006058,52 L52.1852677,69.8143786 L43.0177984,59.8655876 L26.3536791,77.9499504 M61.1012997,52 L68.5969544,52 L68.5969544,60.1384542" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
							</g>
						</svg>
					</span>
					<span>pdf</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="white" stroke-width="2" stroke-opacity="0.1"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" fill="#467693"
									init-with="p:[op:0]"></path>
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#467693" stroke-width="2" fill="#50A5DD"
									init-with="p:[op:0]"></path>
								<path d="M22.6366123,64 L77.3852732,64" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
								<path d="M22.6366123,76 L77.3852732,76" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
								<path d="M55.6294408,52 L77.2542178,52" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
								<path d="M55.6336591,40 L77.6212124,40" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
								<path d="M55.4518409,28 L61.8030306,28" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
								<rect stroke="#FFFFFF" stroke-width="2" fill="#467693" x="22" y="25" width="26" height="28" rx="2"
									init-with="p:[op:0]"></rect>
								<path d="M31.9314179,48.9453845 C32.1640179,48.9906485 32.4187723,49.0143973 32.6943619,49.0143973 L42.5153962,49.0143973 C44.7241651,49.0143973 45.5891311,47.4805175 44.447895,45.5883809 L39.6712698,37.6688735 C38.5247851,35.7680349 36.6797244,35.7767369 35.5384884,37.6688735 L31.6684718,44.0852498 L31.2869733,43.4527362 C30.3147502,41.8408183 28.7387295,41.8409855 27.7666073,43.4527362 L26.1722924,46.0960645 C25.2000693,47.7079824 25.9371302,49.0143973 27.8183387,49.0143973 L31.2352418,49.0143973 C31.4884119,49.0143973 31.72095,48.9905711 31.9314179,48.9453845 L31.9314179,48.9453845 Z" stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0"
									init-with="p:[op:0]"></path>
								<circle stroke="#FFFFFF" stroke-width="2" fill="#B0D8F0" cx="28.1285714" cy="31.1285714" r="2.22857143"
									init-with="p:[op:0]"></circle>
							</g>
						</svg>
					</span>
					<span>doc</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<g stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
								<rect stroke="white" stroke-opacity="0.1" x="14" y="14" width="72" height="72" rx="2"></rect>
								<rect stroke="#4B7681" fill="#CCE3E9" x="14" y="14" width="72" height="72" rx="2"
									init-with="p:[op:0]"></rect>
								<rect stroke="#4B7681" fill="#55A4B7" x="19" y="19" width="62" height="52"
									init-with="p:[op:0]"></rect>
								<path d="M43.4375976,66 L67.786851,66 C71.1015401,66 72.3823516,63.7024894 70.6596479,60.8683666 L58.6929424,41.1812237 C56.9720116,38.3500175 54.1771841,38.3471008 52.4544804,41.1812237 L43.4434661,56.0057822 L42.1887653,53.941599 C40.4658749,51.1071689 37.6696704,51.105382 35.9456939,53.941599 L31.7376067,60.8645749 C30.0147162,63.699005 31.304048,66 34.6198358,66 L43.4375976,66 Z M33.5537843,33.0371927 C36.0687699,33.0371927 38.1075686,31.0141482 38.1075686,28.5185963 C38.1075686,26.0230445 36.0687699,24 33.5537843,24 C31.0387987,24 29,26.0230445 29,28.5185963 C29,31.0141482 31.0387987,33.0371927 33.5537843,33.0371927 Z" stroke="#FFFFFF" fill-opacity="0.5" fill="#40484B"
									init-with="p:[op:0]"></path>
							</g>
						</svg>
					</span>
					<span>jpg</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
							<defs>
						    	<pattern id="img-fill" x="0" y="0" width="1" height="1">
						    		<image width="72" height="72" xlink:href="https://38.media.tumblr.com/avatar_895d9e0c6ef1_128.png"/>
						    	</pattern>
						  </defs>
							<g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<rect x="14" y="14" width="72" height="72" rx="2" stroke="white" stroke-width="2" stroke-opacity="0.1"></rect>
								<!-- this extra element is to draw in, since you probably won't be able to animate the fill coming in properly, it's an image fill -->
								<rect x="14" y="14" width="72" height="72" rx="2" stroke="white" stroke-width="2"
									init-with="p:[op:0]"></rect>
								<rect x="14" y="14" width="72" height="72" rx="2" stroke="white" stroke-width="2" fill="url(#img-fill)"
									init-with="p:[op:0]"></rect>
							</g>
						</svg>
					</span>
					<span>jpg</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
						    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M14,17.5951249 C14,15.6095923 15.3424077,14 17.0020839,14 L82.9979161,14 C84.6559213,14 86,15.6047717 86,17.5951249 L86,82.4048751 C86,84.3904077 84.6575923,86 82.9979161,86 L17.0020839,86 C15.3440787,86 14,84.3952283 14,82.4048751 L14,17.5951249 L14,17.5951249 Z M15.5,25 L84.5,25" stroke="white" stroke-width="2" stroke-opacity="0.1"></path>
						        <path d="M14,28.0458697 C14,26.3636823 15.3424077,25 17.0020839,25 L82.9979161,25 C84.6559213,25 86,26.3595982 86,28.0458697 L86,82.9541303 C86,84.6363177 84.6575923,86 82.9979161,86 L17.0020839,86 C15.3440787,86 14,84.6404018 14,82.9541303 L14,28.0458697 L14,28.0458697 Z" fill="#40484B"
									init-with="p:[op:0]"></path>
						        <path d="M14,15.5492552 C14,15.2459099 15.3424077,15 17.0020839,15 L82.9979161,15 C84.6559213,15 86,15.2451735 86,15.5492552 L86,25.4507448 C86,25.7540901 84.6575923,26 82.9979161,26 L17.0020839,26 C15.3440787,26 14,25.7548265 14,25.4507448 L14,15.5492552 L14,15.5492552 Z" fill="#C8D2D4"
									init-with="p:[op:0]"></path>
						        <path d="M14,17.5951249 C14,15.6095923 15.3424077,14 17.0020839,14 L82.9979161,14 C84.6559213,14 86,15.6047717 86,17.5951249 L86,82.4048751 C86,84.3904077 84.6575923,86 82.9979161,86 L17.0020839,86 C15.3440787,86 14,84.3952283 14,82.4048751 L14,17.5951249 L14,17.5951249 Z M15.5,25 L84.5,25" stroke="#8A9EA3" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M20.2161578,66 L38.8057277,66" stroke="#F1F1F1" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M43.2102147,66 L61.2886771,66" stroke-opacity="0.699999988" stroke="#FFFFFF" stroke-width="2" opacity="0.7"
									init-with="p:[op:0]"></path>
						        <path d="M65.1761238,66 L80.322768,66" stroke="#FFFFFF" stroke-width="2" opacity="0.3"
									init-with="p:[op:0]"></path>
						        <path d="M20.2969054,56 L45.8307734,56" stroke="#F1F1F1" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M50.34236,56 L79.7853188,56" stroke-opacity="0.699999988" stroke="#FFFFFF" stroke-width="2" opacity="0.7"
									init-with="p:[op:0]"></path>
						        <path d="M20.2287236,76 L39.8989552,76" stroke="#F1F1F1" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M44.1605418,76 L57.967137,76" stroke-opacity="0.699999988" stroke="#FFFFFF" stroke-width="2" opacity="0.7"
									init-with="p:[op:0]"></path>
						        <path d="M62.2059964,76 L79.9216825,76" stroke="#FFFFFF" stroke-width="2" opacity="0.3"
									init-with="p:[op:0]"></path>
						        <path d="M20.1306692,46 L31.3682225,46" stroke="#F1F1F1" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M20.3011238,36 L46.197768,36" stroke="#F1F1F1" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M50.3465783,36 L80.1523134,36" stroke-opacity="0.699999988" stroke="#FFFFFF" stroke-width="2" opacity="0.7"
									init-with="p:[op:0]"></path>
						        <path d="M35.2670329,46 L58.2318589,46" stroke-opacity="0.699999988" stroke="#FFFFFF" stroke-width="2" opacity="0.7"
									init-with="p:[op:0]"></path>
						        <path d="M62.2102147,46 L80.2886771,46" stroke="#FFFFFF" stroke-width="2" opacity="0.3"
									init-with="p:[op:0]"></path>
						        <circle stroke="#8A9EA3" stroke-width="2" cx="20.5" cy="19.5" r="1.5"
									init-with="p:[op:0]"></circle>
						        <circle stroke="#8A9EA3" stroke-width="2" cx="27.5" cy="19.5" r="1.5"
									init-with="p:[op:0]"></circle>
						        <circle stroke="#8A9EA3" stroke-width="2" cx="34.5" cy="19.5" r="1.5"
									init-with="p:[op:0]"></circle>
						    </g>
						</svg>
					</span>
					<span>html</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
						    <g fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="white" stroke-width="2" stroke-opacity="0.1"></path>
						        <path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 L19.0000163,14 Z" fill="#617E56"
									init-with="p:[op:0]"></path>
						        <path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#617E56" stroke-width="2" fill="#81B566"
									init-with="p:[op:0]"></path>
						        <path d="M38,39 L38,79 M50,39 L50,79 M62,39 L62,79 M74,39 L74,79 M26,39 L26,79 M74,79 L26.5,79 M74,69 L26.5,69 M74,59 L26.5,59 M74,49 L26.5,49 M74,39 L26.5,39" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
						    </g>
						</svg>
					</span>
					<span>xls</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
						    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
						        <rect x="14" y="14" width="72" height="72" rx="2" stroke="white" stroke-width="2" stroke-opacity="0.1"></rect>
						        <rect x="14" y="14" width="72" height="72" rx="2" stroke="#AD377C" stroke-width="2" fill="#E6389B"
									init-with="p:[op:0]"></rect>
								<rect x="14" y="14" width="72" height="72" rx="2" stroke="none" fill-opacity="0.5" fill="#FFFFFF"
									init-with="p:[op:0]"></rect>
						        <path d="M18,61 L18,67 M39,58 L39,70 M53,58 L53,70 M67,58 L67,70 M81,58 L81,70 M25,58 L25,70 M32,52 L32,76 M46,61 L46,67 M60,52 L60,76 M74,61 L74,67" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M43.5176381,41.9318517 C45.1180364,41.5030262 46.1836611,40.2904751 45.8977775,39.2235429 C45.6118939,38.1566107 44.0827602,37.6393229 42.4823619,38.0681483 C40.8819636,38.4969738 39.8163389,39.7095249 40.1022225,40.7764571 C40.3881061,41.8433893 41.9172398,42.3606771 43.5176381,41.9318517 L43.5176381,41.9318517 Z M54.5176381,38.9318517 C56.1180364,38.5030262 57.1836611,37.2904751 56.8977775,36.2235429 C56.6118939,35.1566107 55.0827602,34.6393229 53.4823619,35.0681483 C51.8819636,35.4969738 50.8163389,36.7095249 51.1022225,37.7764571 C51.3881061,38.8433893 52.9172398,39.3606771 54.5176381,38.9318517 L54.5176381,38.9318517 Z M57,28.5 L46,31 M57,24.5 L46,27 M57,24.65 L57,36.35 M46,27.65 L46,39.35" stroke="#FFFFFF" stroke-width="2"
									init-with="p:[op:0]"></path>
						    </g>
						</svg>
					</span>
					<span>mp3</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
						    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<rect x="14" y="14" width="72" height="72" rx="2" stroke="white" stroke-width="2" stroke-opacity="0.1"></rect>
						        <rect fill="#7872E3" x="14" y="14" width="72" height="72" rx="2"
									init-with="p:[op:0]"></rect>
						        <rect fill="#FFFFFF" opacity="0.5" x="14" y="14" width="12" height="72" rx="2"
									init-with="p:[op:0]"></rect>
						        <rect fill="#FFFFFF" opacity="0.5" x="74" y="14" width="12" height="72" rx="2"
									init-with="p:[op:0]"></rect>
						        <path d="M27,14.4675325 L27,85.5324675" stroke="#4A4D72" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M73,14.4675325 L73,85.5324675" stroke="#4A4D72" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M74,74 L86,74 M74,26 L86,26 M74,38 L86,38 M74,50 L86,50 M74,62 L86,62" stroke="#4A4D72" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M14,74 L26,74 M14,26 L26,26 M14,38 L26,38 M14,50 L26,50 M14,62 L26,62" stroke="#4A4D72" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M62.2163044,47.615046 C62.6255301,47.9506063 62.9624,48.2795217 62.9624,48.805565 C62.9624,49.3305008 62.7227954,49.6494492 62.2163044,49.9949765 L44.2957773,63.0862556 C43.9980507,63.2767387 42.8178201,63.3586907 42.8024,62.1338404 L42.8024,35.4761821 C42.8035862,34.343251 43.8818069,34.2535468 44.2957773,34.5248744 L62.2163044,47.615046 Z" stroke="#FFFFFF" stroke-width="2" fill-opacity="0.5" fill="#FFFFFF"
									init-with="p:[op:0]"></path>
						        <rect stroke="#4A4D72" stroke-width="2" x="14" y="14" width="72" height="72" rx="2"
									init-with="p:[op:0]"></rect>
						    </g>
						</svg>
					</span>
					<span>mp4</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
						    <g stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M78.6753247,69.4038462 L83.9946012,69.4038462 C85.6544371,69.4038462 87,68.0615005 87,66.4025609 L87,25.0012853 C87,23.3437212 85.6551641,22 83.9983762,22 L22.6769485,22 C21.0191974,22 19.6821402,23.3349726 19.6906437,25.0005709 L19.7282873,32.3739316" stroke="white" stroke-opacity="0.1"></path>
								<rect stroke="white" stroke-opacity="0.1" x="15" y="33" width="63" height="50" rx="3"></rect>
						        <path d="M78.6753247,69.4038462 L83.9946012,69.4038462 C85.6544371,69.4038462 87,68.0615005 87,66.4025609 L87,25.0012853 C87,23.3437212 85.6551641,22 83.9983762,22 L22.6769485,22 C21.0191974,22 19.6821402,23.3349726 19.6906437,25.0005709 L19.7282873,32.3739316" stroke="#9C694C" fill="#F4C2A7"
									init-with="p:[op:0]"></path>
						        <rect stroke="#9C694C" fill="#E5753C" x="15" y="33" width="63" height="50" rx="3"
									init-with="p:[op:0]"></rect>
						        <rect stroke="#FFFFFF" fill-opacity="0.5" fill="#FFFFFF" x="22" y="42" width="49" height="5" rx="2.5"
									init-with="p:[op:0]"></rect>
						        <path d="M39.5939197,68.0940381 L32.8419127,64.9262109 L29.129401,58.3562293 C29.0367577,58.1928325 28.8848499,58.0732396 28.705698,58.0245688 C28.5265433,57.9751994 28.3364888,58.0009281 28.1764087,58.0954882 C25.6001272,59.6154347 24,62.443956 24,65.4782859 C24,70.177188 27.7452127,74 32.3487273,74 C35.5987102,74 38.576895,72.0524354 39.9358793,69.0382687 C40.0135366,68.8665276 40.0210295,68.6711486 39.9563151,68.4938446 C39.8922826,68.3165409 39.7621746,68.1726085 39.5939197,68.0940381 L39.5939197,68.0940381 Z" stroke="#FFFFFF" fill-opacity="0.5" fill="#FFFFFF"
									init-with="p:[op:0]"></path>
						        <path d="M41.5,65 C41.5,60.3055796 37.6944204,56.5 33,56.5" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
						        <path d="M49.4545455,71 L68.5454545,71 M49.4545455,65 L68.5454545,65 M49.4545455,59 L68.5454545,59" stroke="#FFFFFF"
									init-with="p:[op:0]"></path>
						    </g>
						</svg>
					</span>
					<span>ppt</span>
				</a>
			</li>
			<li>
				<a>
					<span>
						<svg viewBox="0 0 100 100">
						    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="white" stroke-width="2" stroke-opacity="0.1"></path>
						        <path d="M14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 Z" fill="#ADBAD4"
									init-with="p:[op:0]"></path>
						        <path d="M19.0000163,14 C16.2385836,14 14,16.2337694 14,19.0057363 L14,80.9942637 C14,83.7588555 16.2337694,86 19.0057363,86 L80.9942637,86 C83.7588555,86 86,83.7643283 86,81.0001225 L86,33.5605722 C86,32.4548035 85.3472697,30.9334881 84.5608909,30.1806226 L69.0991089,15.3777783 C68.3043109,14.6168523 66.7734003,14 65.6543987,14 L19.0000163,14 Z M68.0992131,14.96 C68.0992131,14.96 68.0992131,15.4039671 68.0992131,15.9609247 L68.0992131,26.5558242 C68.0992131,29.318671 70.3364841,31.5584009 73.1045233,31.5584009 L85.4848101,31.5584009" stroke="#ADBAD4" stroke-width="2" fill="#E7EBF3"
									init-with="p:[op:0]"></path>
						        <path d="M26.5355418,76 L72.592137,76" stroke="#ADBAD4" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M26.5397601,40 L72.9591316,40" stroke="#ADBAD4" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M26.5397601,52 L72.9591316,52" stroke="#ADBAD4" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M26.5397601,64 L72.9591316,64" stroke="#ADBAD4" stroke-width="2"
									init-with="p:[op:0]"></path>
						        <path d="M26.357942,28 L57.1409498,28" stroke="#ADBAD4" stroke-width="2"
									init-with="p:[op:0]"></path>
						    </g>
						</svg>
					</span>
					<span>txt</span>
				</a>
			</li>
		</ul>
	</div>
</div>
