<!-- linked-data: place data url, i.e. receipt.json-->
<!-- linked-data-name:  -->
<view class='full-xy block overflow-auto flex-wrap-center no-scrollbar flex-wrap' link-data="https://s3-us-west-1.amazonaws.com/ui-guru/receipts/fb8fe8ea7fc1495d8b10.json" link-data-name="receipt">
    <ul class="flex-wrap-center p15-grid full-x">
        <li ng-repeat='(field, data) in receipt' class='p15-grid full-x flex-wrap flex-start'>

            <txt class="opacity-50p z-index-2 txt-2 uppercase weight-900 txt-center">{{field}}</txt>
            <txt class="z-index-2 txt-7 weight-500 txt-center">{{data}}</txt>
        </li>
		<li>
			<txt> ${{receipt.amount.total}} </txt>
		</li>
    </ul>
</view>
