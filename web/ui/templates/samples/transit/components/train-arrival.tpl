<div abs bg="white" rad="2" border="1px solid #9cbdbe" class="txt-slate" width='100%'>
    <inspect-data station/>
    {{station.abbreviation}}
    <time-estimate u-list="estimate in station.estimation">
    <ul row width='100' nowrap x='start' y='center'>
        <li u-list='estimate in station.estimation'>
            Coming in from {{estimate.direction}}, {{estimate.bikeFlag}}, {{estimate.color}}, <span width='50px' height='50px' style='background-color:{{estimate.hexcolor}}'>&nbsp;</span>, {{estimate.minutes}}
        </li>
    </li>
	<h1 p="5px 10px" bg="aero" f-s="16px" f-w="600" class="caps">Arriving</h1>
	<ul p="0px 5px">
		<li row y-center p="5px" f-s="14px">
			<h2 f-w="600">Daly City&nbsp;</h2>
			<span><span>11am</span>, <span>2pm</span></span>
		</li>
	</ul>
</div>
