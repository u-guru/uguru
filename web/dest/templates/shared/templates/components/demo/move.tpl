<div class="full-xy flex absolute full-xy top-0 left-0 flex-vertical-center">
    <ul class="flex-vertical-center p15-grid full-xy">
        <li class='full-x width-128 height-128' u on-click='a:[move:vp.left+#move-1.left:vp.bottom+#move-1.top:1000:easeOutCirc:0:1:f]|'>
            <item class='flex-wrap'>
                <text y="95" fill="white" font-size="10" fill="black">Base</text>
                <text y="56.25" fill="white" font-size="18" fill="black">or</text>
                <text fill="white" font-size="10" fill="black" y="10" x="50">Custom Item</text>
            </item>
        </li>
        <li class='full-x width-128 height-128' u on-click='a:[move:#move-1.left-vp.right:vp.top-#move-1.top:1000:easeOutCirc:0:1:f]|'>
            <item class='flex-wrap'>
                <text y="95" fill="white" font-size="10" fill="black">Base</text>
                <text y="56.25" fill="white" font-size="18" fill="black">or</text>
                <text fill="white" font-size="10" fill="black" y="10" x="50">Custom Item</text>
            </item>
        </li>

        <li class='full-x width-128 height-128 absolute top-0 right-0' u on-click='a:[move:vp.right*0.5:vp.bottom*-1:1000:easeOutCirc:0:1:f]|'>
            <item class='flex-wrap' cache-id id='move-1'>
                <text y="95" fill="white" font-size="10" fill="black">Base</text>
                <text y="56.25" fill="white" font-size="18" fill="black">or</text>
                <text fill="white" font-size="10" fill="black" y="10" x="50">Custom Item</text>
            </item>
        </li>

    </ul>
</div>
