<ul p="0px 5px">
	<!-- <inspect-data station/> -->
    <!-- {{station.abbreviation}} -->
    <!-- <time-estimate u-list="estimate in station.estimation"> -->
    <!-- <ul row width='100' nowrap x='start' y='center'>
        <li u-list='estimate in station.estimation'>
            Coming in from {{estimate.direction}}, {{estimate.bikeFlag}}, {{estimate.color}}, <span width='50px' height='50px' style='background-color:{{estimate.hexcolor}}'>&nbsp;</span>, {{estimate.minutes}}
        </li>
    </li> -->
	<li row y-center p="5px" f-s="14px">
		<h2 f-w="600">{{station.destination}}&nbsp;</h2>
		<span u-list='estimate in station.estimation'>
			<span style='background-color:{{estimate.hexcolor}}'>{{estimate.minutes}} minutes</span>
		</span>
	</li>
</ul>
