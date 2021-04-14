<view>
    <components>
        <!-- <list type='string'>
            <ul if-type="grid:attr(column):attr(row):grid:[]" >
                <li if-type="grid:attr()"></li>
            </ul>
        </list> -->
    </components>
    <main size='100'>
        <div bg='charcoal' x='center' y='stretch' height='100' grow='1' r-r width='100'>
            <div dict column nowrap x='center' y='center' grow='1' width='100'>
                {samir: 'yes', asif:'no'}
                <div title x='center' y='center' grow='1'>{{title}}</div>
                <div child x='center' y='center' grow='1'>yo</div>
            </div>
            <!-- <div node name="root" data="{root: {childOne: {}, childTwo: {gcOne: {}, gcTwo:{}}}}" grow='1' column wrap x='center' y='center' child-attr="row nowrap removeChildAttr:row childAttr:column" width='100'  remove-child-attr="column wrap">
                <div column wrap x='center' y='center' width='100'>
                    {{name}}
                </div>
            </div> -->
            <!-- <div row width='100'>
                <div grow='3' x-center bg='moola-20p' height='100' column width='75'>
                    <div x='center' grow='1' column bg='auburn-20p'>
                        First Priority
                    </div>
                    <div grow='9' x='center' y='center' column>
                        <ul width='100' x='center' grow='1' column bg='auburn-80'>
                            <li grow='10' f-w='900' p='10px' x='center' bg='charcoal-20p' width='100' column height='50'>
                                <div grow='1' row width='100'>
                                    <div class='round' grow='1' bg='charcoal' size='40px' x='center' y='center'>
                                        1
                                    </div>
                                    <div grow='9' x='center' height='40px' class='border-2-bottom border-slate'>
                                        <header grow='1' p-x='20px'>Build Relevant API</header>
                                    </div>
                                </div>
                                <div grow='9' row f-w='500' width='100'>
                                    <div grow='1'>&nbsp;</div>
                                    <ul grow='9' column wrap x='start' width='100'>
                                        <li grow='1' x='start'><div>Import font</div><div abs left='0' bg='smoke' op='0.6' height='3px' width='100%'></div></li>
                                        <li grow='1' x='start'><div>External Data Load</div><div abs left='0' bg='smoke' op='0.6' height='3px' width='100%'></div></li>
                                        <li grow='1' x='start'><div>Figure out minimal static hosting for good</div><div op='0.6' abs left='0' bg='smoke' height='3px' width='100%'></div></li>
                                        <li grow='1' x='start'>MVP Static</li>
                                        <li grow='1' x='start'>MVP Responsive</li>
                                    </ul>
                                </div>
                            </li>
                            <li grow='1' op='0.6' f-w='900' p='10px' x='center' bg='charcoal-20p' width='100' column>
                                <div grow='1' row width='100'>
                                    <div class='round' grow='1' bg='charcoal' size='40px' x='center' y='center'>
                                        2
                                    </div>
                                    <div grow='9' x='center' height='40px' class='border-2-bottom border-slate'>
                                        <header grow='1' p-x='20px'>No turning back</header>
                                    </div>
                                </div>
                                <div grow='9' row f-w='500' width='100' hide>
                                    <div grow='1' >&nbsp;</div>
                                    <ul grow='9' column wrap x='start' width='100'>
                                        <li grow='1' x='start' weight='bold'>Ben</li>
                                        <li grow='1' x='start'>Check email</li>
                                        <li grow='1' x='start'>Contact Munir</li>
                                        <li grow='1' x='start'>Forward email to sarah + next steps</li>
                                        <li grow='1' x='start'>Reply to dad + apologize</li>
                                        <li grow='1' x='start'>Static progress</li>
                                        <li grow='1' x='start'>Next month rent</li>
                                        <li grow='1' x='start'>Cancel Bank of America Card</li>
                                        <li grow='1' x='start'>PO. box</li>
                                        <li grow='1' x='start'>Change phone number</li>
                                        <li grow='1' x='start'>Backup living plan</li>
                                        <li grow='1' x='start' weight='bold'>Financial plan</li>
                                        <li grow='1' x='start' weight='bold'>Discuss external communication</li>

                                        <li grow='1' x='start'>Bind & synchronize main loader</li>
                                    </ul>
                                </div>
                            </li>
                            <li grow='1' op='0.6' f-w='900' p='10px' x='center' bg='charcoal-20p' width='100' row>
                                <div grow='1' row width='100'>
                                    <div class='round' grow='1' bg='charcoal' size='40px' x='center' y='center'>
                                        3
                                    </div>
                                    <div grow='9' x='center' height='40px' class='border-2-bottom border-slate'>
                                        <header grow='1' p-x='20px'>I heart my life modular</header>
                                    </div>
                                </div>
                                <div grow='9' row f-w='500' width='100' hide>
                                    <div grow='1'>&nbsp;</div>
                                    <ul grow='9' column wrap x='start' width='100'>
                                        <li grow='1' x='start'>Modularize Scroll</li>
                                        <li grow='1' x='start'>Modaularize Components</li>
                                        <li grow='1' x='start'>Keyboard Mapping</li>
                                        <li grow='1' x='start'>Setting a key with the internal import-dict directive to append to views.data + reference in "view" directive its coming soon</li>
                                        <li grow='1' x='start'>On Hover Reveal Tabs</li>
                                        <li grow='1' x='start'>On Hover Reveal</li>
                                        <li grow='1' x='start'>On init after</li>
                                        <li grow='1' x='start'>Modaularize</li>
                                    </ul>
                                </div>
                            </li>
                            <li grow='1' op='0.6' f-w='900' p='10px' x='center' bg='charcoal-20p' width='100' row>
                                <div class='round' grow='1' bg='charcoal' size='40px' x='center' y='center'>
                                    3
                                </div>
                                <div grow='9' p-x='20px'>
                                    Post HML
                                </div>
                            </li>
                            <li grow='1' op='0.6' f-w='900' p='10px' x='center' bg='charcoal-20p' width='100' row>
                                <div class='round' grow='1' bg='charcoal' size='40px' x='center' y='center'>
                                    4
                                </div>
                                <div grow='9' p-x='20px'>
                                    Iterate on to-do-list
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div grow='1' x-center bg='gold-20p' height='100' column ng-if='false'>
                    <div x='center' grow='1' column>
                        Two
                    </div>
                    <div grow='9' x='center' y='center' column>
                        <ul bg='charcoal' width='100' x='center' y='center' p='10px'>
                            <li  bg='charcoal' f-w='900' p='10px' x='center' width='100'>
                                API
                            <li  bg='charcoal' f-w='900' p='10px' x='center' width='100'>
                                X-Y center

                            <li  bg='charcoal' f-w='900' p='10px' x='center' width='100'>
                                On hover options icons
                            <li>
                            <li  bg='charcoal' f-w='900' p='10px' x='center' width='100'>
                                Prepare for modal, load dynamically
                            <li>

                        </ul>
                    </div>
                </div>
                <div grow='1' x-center bg='moola-20p' height='100' column ng-if='false'>
                    <div x='center' grow='1' column>
                        Ideas / projects
                    </div>
                    <div grow='9' x='center' y='center' column>
                        <ul width='100' x='center' grow='1' column>
                            <li grow='1'  bg='charcoal' f-w='900' p='10px' x='center' width='100'>Ideas</li>
                            <li grow='1' x='center'>
                                Click to expand, Force to edit
                            </li x='center'>
                            <li grow='1'>
                                Shades to emphasize prioritized areas. Curtains w/ timer (starting in ...)
                            </li>
                            <li grow='1'>
                                Dictionary to 10x interfaces
                            </li>
                            <li grow='1'>
                                Pitch deck
                            </li>
                            <li grow='1'>
                                Super animation
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->
        </div>
    </main>
</view>
