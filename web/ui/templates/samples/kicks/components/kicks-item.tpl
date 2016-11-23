<div rad="2px" hide-x hide-y>
	<div rel>
		<div rel z="0">
			<h1 height="56px" p="6px" y-center x-center bg="white-25p" f-s="16px" f-w="600" color="white" caps t-a="center" class="caps txt-white txt-center">{{shoes.shoe_name}}</h1>
			<div bg="white">
				<figure>
					<img w="100%" ng-src="{{shoes.shoe_img_url || 'https://s3.amazonaws.com/images.kicksfinder.com/products/thumbs/fa18a2cd21293cabfaf5764061c9557b_1479326228.jpg'}}"/>
				</figure>
				<ul y-center p="6px" f-s="14px" f-w="600">
					<li p="6px">
						<div p="3px 6px" bg="sienna" rad="2px">${{shoes.shoe_price}}</div>
					</li>
					<li p="6px 0" w="100%">
						<rating-stars custom data-rating="{{shoes.shoe_rating || '4.2'}}"></rating-stars>
					</li>
					<li p="6px">
						<div p="3px 6px" bg="stone" rad="2px">{{shoes.release_month}}&middot;{{shoes.release_day}}&middot;{{shoes.release_year}}</div>
					</li>
				</ul>
			</div>
		</div>
		<a abs z="10" top="0" left="0" width="100" height="100" bg="stone-90p"
			href="{{shoes.shoe_url || 'http://sneakernews.com/2016/11/01/nike-kobe-ad-release-date-and-price/'}}"
			u init-with="p:[op:0]"
			on-mouseenter="p:[op:1]"
			on-mouseover="p:[op:1]"
			on-mouseleave="p:[op:0]"
			on-mousedown="p:[op:1]"
			on-mouseup="p:[op:1]">
			<div x-center y-center w="100%" height="100%" p="12px" bg="stone-50p">
				<div p="6px 12px" rad="2px" bg="sienna" f-s="18px" f-w="600" t-a="center" class="pointer txt-center">Click for more information</div>
			</div>
		</a>
	</div>
	<hr m="0" border="0" bg="sienna" width="100" height="5px"/>
</div>
