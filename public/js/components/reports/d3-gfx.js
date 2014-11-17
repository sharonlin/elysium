/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 11/16/14
 * Time: 3:11 PM
 * To change this template use File | Settings | File Templates.
 */
function D3GFX(options) {
	var svg;
	_addDropShadowFilter(options);
	function _addDropShadowFilter(options) {
		svg = d3.select(options.elSvg);
		var defs = svg.append('defs');

		// create filter with id #drop-shadow
		// height=130% so that the shadow is not clipped
		// var filter = defs.append('filter').attr('id', 'drop-shadow').attr('height', '130%');
		filter = defs.append('filter').attr('id', 'drop-shadow').attr('height', '200%').attr('width', '200%').attr('x', '-40%').attr('y', '-40%');
		filter.append('feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 5).attr('result', 'blur');

		// translate output of Gaussian blur to the right and downwards with 2px
		// store result in offsetBlur
		filter.append('feOffset').attr('in', 'blur').attr('dx', 2).attr('dy', 3).attr('result', 'offsetBlur');

		// overlay original SourceGraphic over translated blurred opacity by using
		// feMerge filter. Order of specifying inputs is important!
		var feMerge = filter.append('feMerge');

		feMerge.append('feMergeNode').attr('in', 'offsetBlur');
		feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
	}

	function _addXAxis(visGroup){
		var xAxisGroup = visGroup.append('svg:g').attr("transform", "translate(0,400)");
		xAxisGroup.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 400)
			.attr("y2", 0)
			.style('stroke', 'black')
			.style('stroke-width', '1px');
		xAxisGroup.append("text")
		                 .attr("x", 0)
		                 .attr("y", 30)
		                 .text("Low")
		                 .attr("font-family", "sans-serif")
		                 .attr("font-size", "18px")
		                 .attr("fill", "black");
//
		xAxisGroup.append("text")
			.attr("x", 380)
			.attr("y", 30)
			.text("High")
			.attr("font-family", "sans-serif")
			.attr("font-size", "18px")
			.attr("fill", "black");

		xAxisGroup.append("text")
			.attr("x", 120)
			.attr("y", 50)
			.text("Feature Complexity")
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "black");
	}

	function _addYAxis(visGroup){
		var yAxisGroup = visGroup.append('svg:g').attr("transform", "translate(0,0)");
		yAxisGroup.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 400)
			.style('stroke', 'black')
			.style('stroke-width', '1px');

		yAxisGroup.append("text")
			.attr("x", -60)
			.attr("y", 0)
			.text("High")
			.attr("font-family", "sans-serif")
			.attr("font-size", "18px")
			.attr("fill", "black");

		yAxisGroup.append("text")
			.attr("x", -80)
			.attr("y", 200)
			.text("Quality")
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "black");

	}
	function _renderGraph(data){
		var colors = d3.scale.category10().range();

		var vis = d3.select("#riskChart");
		var visGroup = vis.append('svg:g').attr("transform", "translate(80,40)");
		var xRange = d3.scale.linear().range([80, 440]).domain(
			[0,100]
//			[d3.min(data, function (d) {
//			return (d.x);
//		}),
//			d3.max(data, function (d) {
//				return d.x;
//			})]
		);
		var yRange = d3.scale.linear().range([440, 80]).domain(
			[
				0,100
			]
//			[d3.min(data, function (d) {
//			return d.y;
//		}),
//			d3.max(data, function (d) {
//				return d.y;
//			})]
		);


//		var xAxis = d3.svg.axis().scale(xRange);
//		var yAxis = d3.svg.axis().scale(yRange).orient("left");
//		vis.append("svg:g").call(xAxis).attr("transform", "translate(0,400)");
//		vis.append("svg:g").call(yAxis).attr("transform", "translate(40,0)");

		_addXAxis(visGroup);
		_addYAxis(visGroup);

		var circles = vis.selectAll("circle").data(data);
		circles.enter()
			.insert("circle")
			.attr("cx", function (d) { return xRange (d.x); })
			.attr("cy", function (d) { return yRange (d.y); })
			.attr("r", "0")
			.attr("filter", "url(#drop-shadow)")
			.style("fill", function(d,i){return colors[i];});

		circles.transition()
			.duration(2000)
			.attr("r", function(d){return d.complexity;});




	}
	return {
		renderGraph: _renderGraph
	}
};

