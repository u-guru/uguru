<div rad="2px" hide-x hide-y>
	<h1 height="56px" p="6px" y-center x-center bg="white-25p" f-s="16px" f-w="600" color="white" caps t-a="center" class="caps txt-white txt-center">{{shoes.shoe_name}}</h1>
	<div bg="white">
		<figure>
			<img w="100%" ng-src="{{shoes.shoe_img_url || 'https://s3.amazonaws.com/images.kicksfinder.com/products/thumbs/fa18a2cd21293cabfaf5764061c9557b_1479326228.jpg'}}"/>
		</figure>
		<div class="txt-slate">
			<!-- {{shoes.release_year}}
			{{shoes.release_day}}
			{{shoes.shoe_url}}
			{{shoes.release_month}}
			{{shoes.shoe_price}}
			{{shoes.shoe_img_url}} -->
		</div>
		<div p="12px">
			<rating-stars custom data-rating="{{shoes.shoe_rating || '4.2'}}"></rating-stars>
		</div>
	</div>
	<hr m="0" border="0" bg="sienna" width="100" height="5px"/>
	<inspect-data/>
</div>
