angular.module('admin', [])
.controller("AdminCtrl", [
	'$scope',
	'$state',
	AdminCtrl
	]);


function AdminCtrl($scope, $state) {

	$scope.goBack = function() {
		$state.go('root.home');
	}

	var API_KEY = "87a467906004f72e0a99521f67bf40e1";

	var API_SECRET = "970af8524c83081d7e21cbeb78c6f4cf";

	MP.api.setCredentials(API_KEY, API_SECRET);


	// MP.api.segment('App Launch').done(function(queryResults) {
	//     console.log(queryResults);
	// });

	// MP.api.people().done(function(results) {
	//     console.log("people results: " + results);
	// });

	// MP.api.people().done(function(results) {
	//     console.log("people results.values(): " + results.values());
	// });

	var eventsArray = ['App Launch', 'Enter Access Code', 'Selected University', 'Changed University'];
    var nodesMap = {}, nodesArray = []; // stores our node data
    var linksMap = {}, linksArray = []; // stores our link data
    var eventSelect = $('#eventSelect').MPEventSelect();
    var runQuery = function(events) {
      console.log('Making a funnel query with events:', events);
      // Call the funnel endpoint passing events
      // If events is ['A', 'B', 'C'], this is equivalent to calling
      // MP.api.funnel('A', 'B', 'C') ...
      MP.api.funnel.apply(MP.api, events).done(function(funnelData) {
        // Sum step counts
        var steps = _.map(funnelData, function(step) {
          return {
            event: _.first(_.values(step)).event,
            count: _.sum(_.pluck(step, 'count'))
          };
        });
        // Add nodes
        _.each(steps, function(step, i) {
          step = _.clone(step); // copy step so that it isn't modified
          var event = step.event;
          var count = step.count;
          if (_.has(nodesMap, event)) { // if the node already exists check its count
            // Each node's count should be the max value it has in any funnel
            nodesMap[event].count = _.max([nodesMap[event].count, count]);
          } else if (count) { // otherwise create node if it has a non-zero count
            // add the new node to our data structures
            nodesMap[event] = step;
            nodesArray.push(step);
          }
        });
        // Add links
        _.each(steps, function(step, i) {
          var nextStep = steps[i + 1];
          // Only create a link if nextStep exists and has a non-zero count
          if (nextStep && nextStep.count && _.has(nodesMap, nextStep.event)) {
            // Only create a link if one doesn't exist for these two events yet
            if (!_.has(linksMap, step.event + '-' + nextStep.event)) {
              var link = {
                // link target and source values are set as corresponding nodes
                source: nodesMap[step.event],
                target: nodesMap[nextStep.event],
                count: nextStep.count // link count is the target node count
              };
              // add the new link to our data structures
              linksMap[step.event + '-' + nextStep.event] = link;
              linksArray.push(link);
            }
          }
        });
        renderGraph();
      });
    };
    // Do an initial query to render the first event node
    runQuery(eventsArray);
    // When the event select changes, re-query
    eventSelect.on('change', function() {
      var event = eventSelect.MPEventSelect('value');
      // Only add events that we aren't already querying on
      if (!_.contains(eventsArray, event)) {
        eventsArray.push(event); // add the new event to our events array
        var funnels = getFunnels(eventsArray);
        _.each(funnels, function(funnel) { // loop over funnels
          runQuery(funnel);
        });
      }
    });
    var w = window.innerWidth;
    var h = window.innerHeight;
    var width = w - (w*0.15);  // SVG element width
    var height = h - (h*0.65); // SVG element height
    var svg = d3.select('#admin-body').append('svg') // the SVG element
      .attr('width', width)
      .attr('height', height);
    var linkElements = svg.selectAll('.link'); // the link elements
    var nodeElements = svg.selectAll('.node'); // the node elements
    var colorScale = d3.scale.category20(); // used with colorIndex to select a different color for each node
    var countScale = d3.scale.linear().range([0, 5]);   // maps our link widths to values from 0px to 40px
    var strengthScale = d3.scale.linear().range([0, 1]); // maps our link strengths to values from 0 to 1
    var colorIndex = 0; // incremented to select a different color for each node
    var nodeIndex = 0;  // incremented to be display a funnel step number in node labels
    // The D3 Force Layout that calculates our node and link positions
    // See https://github.com/mbostock/d3/wiki/Force-Layout for detailed documentation
    var forceLayout = d3.layout.force()
      .nodes(nodesArray) // link our node data with the layout
      .links(linksArray) // link our link data with the layout
      .size([width, height])
      .charge(-120) // node repulsion/attraction - should always be negative
      .linkDistance(150) // the distance nodes are placed from each other
      .linkStrength(function(d) { return strengthScale(d.count); }) // set link strength based on count
      .on('tick', function() { // a function that runs continuously to animate node and link positions
        linkElements // update link positions
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });
        nodeElements // update node positions
          .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
      });
    function renderGraph() {
      var maxCount = _.max(_.pluck(nodesArray, 'count'));
      // update scale domains for the new data
      countScale.domain([0, maxCount]);
      strengthScale.domain([0, maxCount]);
      // our data has changed - rebind layout data to SVG elements
      nodeElements = nodeElements.data(forceLayout.nodes());
      linkElements = linkElements.data(forceLayout.links());
      var nodeContainers = nodeElements.enter() // for any new node data, add corresponding node elements
        .append('g')
          .attr('class', 'node')
          .call(forceLayout.drag);
      nodeContainers
        .append('circle') // for each new node, add a circle element
          .attr('r', function(d) { return countScale(d.count); }) // set node circle radius
          .style('fill', function(d) { return colorScale(++colorIndex); }) // set node color
          .attr('cx', 0)
          .attr('cy', 0);
      nodeContainers
        .append('text') // for each new node, add a label
        .text(function(d) { return ++nodeIndex + ' ' + d.event; });
      linkElements.enter() // for any new link data, add corresponding link elements
        .insert('line', ':first-child') // prepend links so that they are always behind nodes
          .attr('class', 'link')
          .style('stroke-width', function(d) { return countScale(d.count); }) // set link width based on count
          .append('title')
            .text(function(d) { return d.count; });
      // (Re)start the layout - must happen any time node or link data changes
      // https://github.com/mbostock/d3/wiki/Force-Layout#start
      forceLayout.start();
    }
    // Takes a list, returns all subsets of that list (excluding the empty set - [])
    // See http://stackoverflow.com/questions/5752002/find-all-possible-subset-combos-in-an-array
    function getSubsets(input){
      var allSubsets = [];
      var addSubsets = function(n, input, subset) {
        if (n) {
          _.each(input, function(item, i) {
            addSubsets(n - 1, input.slice(i + 1), subset.concat([item]));
          });
        } else if (subset.length) {
          allSubsets.push(subset);
        }
      }
      _.each(input, function(item, i) {
        addSubsets(i, input, []);
      });
      allSubsets.push(input);
      return allSubsets;
    }
    // Gets all sub-funnels from a list of events, always including the first and last event
    // [A, B, C, D] =>
    //   [ [A, D],
    //   [A, B, D],
    //   [A, C, D],
    //   [A, B, C, D] ]
    function getFunnels(events) {
      if (events.length <= 2) { // No sub-funnels if there are 2 or less events
        return [events];
      }
      var first = events[0];
      var last = events.slice(-1)[0];
      var rest = events.slice(1, -1);
      var funnels = [[first, last]];
      var subFunnels = getSubsets(rest)
      _.each(subFunnels, function(funnel) {
        funnel = [first].concat(funnel).concat([last]);
        funnels.push(funnel);
      });
      return funnels;
    }

    MP.api.people().done(function(results) {

        // console.log(JSON.stringify(results.values()));
        var data = results.values();
        var numPeople = data.total;
        var androidCount = 0;
        var iosCount = 0;
        for(var i=0; i<numPeople; i++) {
        	console.log("data.results[i]: " + JSON.stringify(data.results[i]));
        	var platform = data.results[i].$properties.$Device_Platform;
        	console.log("platform: " + platform);
        	if(platform = 'android') {
        		androidCount++;	
        	} 
        	else if(platform = 'ios') {
        		iosCount++;	
        	} 
        }
        console.log(JSON.stringify(numPeople));
        console.log("androidCount: " + androidCount);
        console.log("iosCount: " + iosCount);
    });

	// function() {
	//  var data = {

	//    pieChart  : [
	//      {
	//        color       : 'red',
	//        description : 'Ipsem lorem text goes here. And foo goes bar goes baz. That\'s up!!!',
	//        title       : 'flowers',
	//        value       : 0.62
	//      },
	//      {
	//        color       : 'blue',
	//        description : 'Another ipsem text goes here. And baz goes bar goes foo. Oh yeah, whazzz up?',
	//        title       : 'trains',
	//        value       : 0.38
	//      }
	//    ]
	//  };
	 
	//  var DURATION = 1500;
	//  var DELAY    = 500;
	 
	//  /**
	//   * draw the fancy pie chart
	//   *
	//   * @param {String} elementId elementId
	//   * @param {Array}  data      data
	//   */
	//  function drawPieChart( elementId, data ) {
	//    // TODO code duplication check how you can avoid that
	//    var containerEl = document.getElementById( elementId ),
	//        width       = containerEl.clientWidth,
	//        height      = width * 0.4,
	//        radius      = Math.min( width, height ) / 2,
	//        container   = d3.select( containerEl ),
	//        svg         = container.select( 'svg' )
	//                              .attr( 'width', width )
	//                              .attr( 'height', height );
	//    var pie = svg.append( 'g' )
	//                .attr(
	//                  'transform',
	//                  'translate(' + width / 2 + ',' + height / 2 + ')'
	//                );
	   
	//    var detailedInfo = svg.append( 'g' )
	//                          .attr( 'class', 'pieChart--detailedInformation' );

	//    var twoPi   = 2 * Math.PI;
	//    var pieData = d3.layout.pie()
	//                    .value( function( d ) { return d.value; } );

	//    var arc = d3.svg.arc()
	//                    .outerRadius( radius - 20)
	//                    .innerRadius( 0 );
	   
	//    var pieChartPieces = pie.datum( data )
	//                            .selectAll( 'path' )
	//                            .data( pieData )
	//                            .enter()
	//                            .append( 'path' )
	//                            .attr( 'class', function( d ) {
	//                              return 'pieChart__' + d.data.color;
	//                            } )
	//                            .attr( 'filter', 'url(#pieChartInsetShadow)' )
	//                            .attr( 'd', arc )
	//                            .each( function() {
	//                              this._current = { startAngle: 0, endAngle: 0 }; 
	//                            } )
	//                            .transition()
	//                            .duration( DURATION )
	//                            .attrTween( 'd', function( d ) {
	//                              var interpolate = d3.interpolate( this._current, d );
	//                              this._current = interpolate( 0 );
	                   
	//                              return function( t ) {
	//                                return arc( interpolate( t ) );
	//                              };
	//                            } )
	//                            .each( 'end', function handleAnimationEnd( d ) {
	//                              drawDetailedInformation( d.data, this ); 
	//                            } );

	//    drawChartCenter(); 
	   
	//    function drawChartCenter() {
	//      var centerContainer = pie.append( 'g' )
	//                                .attr( 'class', 'pieChart--center' );
	     
	//      centerContainer.append( 'circle' )
	//                      .attr( 'class', 'pieChart--center--outerCircle' )
	//                      .attr( 'r', 0 )
	//                      .attr( 'filter', 'url(#pieChartDropShadow)' )
	//                      .transition()
	//                      .duration( DURATION )
	//                      .delay( DELAY )
	//                      .attr( 'r', radius - 50 );
	     
	//      centerContainer.append( 'circle' )
	//                      .attr( 'id', 'pieChart-clippy' )
	//                      .attr( 'class', 'pieChart--center--innerCircle' )
	//                      .attr( 'r', 0 )
	//                      .transition()
	//                      .delay( DELAY )
	//                      .duration( DURATION )
	//                      .attr( 'r', radius - 55 )
	//                      .attr( 'fill', '#fff' );
	//    }
	   
	//    function drawDetailedInformation ( data, element ) {
	//      var bBox      = element.getBBox(),
	//          infoWidth = width * 0.3,
	//          anchor,
	//          infoContainer,
	//          position;
	     
	//      if ( ( bBox.x + bBox.width / 2 ) > 0 ) {
	//        infoContainer = detailedInfo.append( 'g' )
	//                                    .attr( 'width', infoWidth )
	//                                    .attr(
	//                                      'transform',
	//                                      'translate(' + ( width - infoWidth ) + ',' + ( bBox.height + bBox.y ) + ')'
	//                                    );
	//        anchor   = 'end';
	//        position = 'right';
	//      } else {
	//        infoContainer = detailedInfo.append( 'g' )
	//                                    .attr( 'width', infoWidth )
	//                                    .attr(
	//                                      'transform',
	//                                      'translate(' + 0 + ',' + ( bBox.height + bBox.y ) + ')'
	//                                    );
	//        anchor   = 'start';
	//        position = 'left';
	//      }

	//      infoContainer.data( [ data.value * 100 ] )
	//                    .append( 'text' )
	//                    .text ( '0 %' )
	//                    .attr( 'class', 'pieChart--detail--percentage' )
	//                    .attr( 'x', ( position === 'left' ? 0 : infoWidth ) )
	//                    .attr( 'y', -10 )
	//                    .attr( 'text-anchor', anchor )
	//                    .transition()
	//                    .duration( DURATION )
	//                    .tween( 'text', function( d ) {
	//                      var i = d3.interpolateRound(
	//                        +this.textContent.replace( /\s%/ig, '' ),
	//                        d
	//                      );

	//                      return function( t ) {
	//                        this.textContent = i( t ) + ' %';
	//                      };
	//                    } );
	     
	//      infoContainer.append( 'line' )
	//                    .attr( 'class', 'pieChart--detail--divider' )
	//                    .attr( 'x1', 0 )
	//                    .attr( 'x2', 0 )
	//                    .attr( 'y1', 0 )
	//                    .attr( 'y2', 0 )
	//                    .transition()
	//                    .duration( DURATION )
	//                    .attr( 'x2', infoWidth );
	     
	//      infoContainer.data( [ data.description ] ) 
	//                    .append( 'foreignObject' )
	//                    .attr( 'width', infoWidth ) 
	//                    .attr( 'height', 100 )
	//                    .append( 'xhtml:body' )
	//                    .attr(
	//                      'class',
	//                      'pieChart--detail--textContainer ' + 'pieChart--detail__' + position
	//                    )
	//                    .html( data.description );
	//    }
	//  }
	 
	//  function ಠ_ಠ() {
	//    drawPieChart(     'pieChart',     data.pieChart );
	//  }
	 



}