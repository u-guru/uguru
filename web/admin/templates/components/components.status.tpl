<div class="fixed bottom-0 left-0 flex p15xy">
	<div class="bg-light-slate radius-2">
	    <ul class='p15-grid flex-wrap' style="max-width: 600px">
			<li class="full-x"><h1 class="semibold"><span class="opacity-50p">{{section}}&nbsp;&rarr;</span>&nbsp;{{name}}&nbsp;<span class="opacity-50p">&rarr; {{version}}</span></h1></li>
	        <li class="txt-16 flex">
				<span class="bg-slate-50p radius-2-left block p10x-p05y">File Name</span>
				<span class="bg-moxie radius-2-right block p10x-p05y semibold">{{metadata.filename}}</span>
			</li>
	        <li class="txt-16 flex">
				<span class="bg-slate-50p radius-2-left block p10x-p05y">Versions</span>
				<span class="bg-moxie radius-2-right block p10x-p05y semibold">{{metadata.versions}}</span>
			</li>
			<li class='txt-14 line-height-1-2 semibold full-x'>
		        {{metadata.notes.for}}
		    </li>
			<li class='opacity-30p txt-14 line-height-1-2 weight-300 full-x'>
		        {{metadata}}
		    </li>
	    </ul>
	</div>
</div>
