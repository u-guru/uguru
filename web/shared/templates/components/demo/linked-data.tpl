<!-- linked-data: place data url, i.e. receipt.json-->
<!-- linked-data-name:  -->
<view class='full-xy block overflow-auto flex-wrap-center no-scrollbar flex-wrap' link-data="https://s3-us-west-1.amazonaws.com/ui-guru/receipts/fb8fe8ea7fc1495d8b10.json" link-data-name="receipt">
    <ul class="flex-wrap-center p15-grid">
        <div ng-repeat='(field, data) in receipt'>
            <div class="relative width-128 height-128 flex-center">
                <div class='flex-wrap-center'>
                    <h1 class="relative z-index-2 txt-2 uppercase weight-900 txt-center">{{field}}</h1>
                    <h1 class="relative z-index-2 txt-7 weight-500 txt-center">{{data}}</h1>
                </div>
            </div>
        </li>
    </ul>
</view>
