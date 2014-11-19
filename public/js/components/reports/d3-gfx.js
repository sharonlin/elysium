/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 11/16/14
 * Time: 3:11 PM
 * To change this template use File | Settings | File Templates.
 */
function D3GFX(options) {
	var svg;
	var featureExtraInfo = {};
	var xRange, yRange;
	var isScoreOver = false;
	var _featureClickedListener;
	var X_RANGE = 700;
	var Y_RANGE = 300;
	var DROP_WIDTH = 377;
	var DROP_HEIGHT = 471;
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
		var xAxisGroup = visGroup.append('svg:g').attr("transform", "translate(0,"+Y_RANGE+")");
		xAxisGroup.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", X_RANGE)
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
			.attr("x", X_RANGE - 20)
			.attr("y", 30)
			.text("High")
			.attr("font-family", "sans-serif")
			.attr("font-size", "18px")
			.attr("fill", "black");

		xAxisGroup.append("text")
			.attr("x", xRange(100/2))
			.attr("y", 50)
			.text("Actual Quality in Former Release")
			.attr("text-anchor", "middle")
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("font-wight", "bold")
			.attr("fill", "black");
	}

	function _addYAxis(visGroup){
		var yAxisGroup = visGroup.append('svg:g').attr("transform", "translate(0,0)");
		yAxisGroup.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", Y_RANGE)
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
			.attr("y", Y_RANGE/2)
			.text("Quality")
			.attr("font-family", "sans-serif")
			.attr("font-size", "20px")
			.attr("fill", "black");
	}

	function _onFeatureMouseOver(d){
		console.log('_onFeatureMouseOver '+ d.name);

		featureExtraInfo.group
			.attr("class", "extra-info")
			.attr("transform", "translate(" + xRange(d.x) + "," + yRange(d.score) + ")");


		featureExtraInfo.featureName = d.name;
		featureExtraInfo.currentScore
			.attr("x",((DROP_WIDTH *(d.size/120))/4.0) - 10)
			.attr("y",-((DROP_HEIGHT *(d.size/120)) / 2.0))
			.text(d.score);

		var scoreGap = d.afterImprovement - d.score;
		featureExtraInfo.expectedScore
			.attr("x",0)
			.attr("y",-1*(Y_RANGE - yRange(scoreGap)) - (DROP_HEIGHT *(d.size/120)/2.0))
			.text(d.afterImprovement);

		featureExtraInfo.expectedScoreDrop
			.attr("transform", "translate("+(-1*((DROP_WIDTH * (d.size/120))/2))+"," + ((-1*(Y_RANGE - yRange(scoreGap)))  -  (DROP_HEIGHT *(d.size/120)))+ "), scale ("+ (d.size/120) + ")");


		featureExtraInfo.yLine
			.attr("x1",-20)
			.attr("y1",0)
			.attr("x2",-xRange(d.x))
			.attr("y2",0);

		featureExtraInfo.xLine
			.attr("x1",0)
			.attr("y1",0)
			.attr("x2",0)
			.attr("y2",Y_RANGE-yRange(d.score));


		featureExtraInfo.yLinePrediction
			.attr("x1",-20)
			.attr("y1", -1*(Y_RANGE - yRange(scoreGap)))
			.attr("x2",-xRange(d.x))
			.attr("y2",-1*(Y_RANGE - yRange(scoreGap)));

		featureExtraInfo.xLinePrediction
			.attr("x1",0)
			.attr("y1",-1*(Y_RANGE - yRange(scoreGap)))
			.attr("x2",0)
			.attr("y2",0);

		featureExtraInfo.group.style("opacity", 1);
	}

	function _onFeatureMouseOut(d) {
		console.log('_onFeatureMouseOut '+ d.module + ' ,isScoreOver '+isScoreOver );
//		setTimeout(function(){
//			if(isScoreOver === false) {
				featureExtraInfo.group.style("opacity", 0);
//			}
//		},500);
	}

	function _onScoreMouseOver() {
		isScoreOver = true;
	}
	function _onScoreMouseOut() {
		isScoreOver = false;
	}


	function _renderGraph(data){
		var colors = d3.scale.category10().range();
		var vis = d3.select("#riskChart");
		var visGroup = vis.append('svg:g').attr("transform", "translate(80,40)");
		xRange = d3.scale.linear().range([0, X_RANGE]).domain(   //80/440
			[0,100]
//			[d3.min(data, function (d) {
//			return (d.x);
//		}),
//			d3.max(data, function (d) {
//				return d.x;
//			})]
		);
		yRange = d3.scale.linear().range([Y_RANGE, 0]).domain(   //440,80
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


		//Quad Top Left
		visGroup.append("rect")
			.attr("x", 0)
			.attr("y", yRange(100))
			.attr("width", xRange (100/2))
			.attr("height", yRange (100/2))
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style('stroke-opacity', 0.8)
			.style("fill", "rgb(235, 241,223)");
		//Quad Top Right
		visGroup.append("rect")
			.attr("x", xRange (100/2))
			.attr("y", yRange(100))
			.attr("width", xRange (100/2))
			.attr("height", yRange (100/2))
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style('stroke-opacity', 0.8)
			.style("fill", "white");

		//Quad Bottom Left
		visGroup.append("rect")
			.attr("x", 0)
			.attr("y", yRange(100/2))
			.attr("width", xRange (100/2))
			.attr("height", yRange (100/2))
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style('stroke-opacity', 0.8)
			.style("fill", "white");

		//Quad Bottom Left
		visGroup.append("rect")
			.attr("x", xRange(100/2))
			.attr("y", yRange(100/2))
			.attr("width", xRange (100/2))
			.attr("height", yRange (100/2))
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style('stroke-opacity', 0.8)
			.style("fill", "rgb(242,220,218)");

		var drops = visGroup.selectAll("path").data(data);
		drops.enter()
			.insert("path")
			.attr("transform", function(d){return "translate(" + (xRange(d.x)  - ((377 *(d.size/120)) / 2.0))  + "," + (yRange(d.score) -  ((431 *(d.size/120))))+"), scale ("+(d.size/120)+")";})
			.attr("d", "M292.464,292.479c-31.658,31.625-121.129,121.129-121.129,121.129S85.417,327.69,50.19,292.463c-66.913-66.914-66.922-175.367-0.016-242.274c66.905-66.905,175.391-66.929,242.305-0.015C359.393,117.088,359.369,225.574,292.464,292.479z")
			.attr("filter", "url(#drop-shadow)")
			.style("fill", function(d,i){return colors[i];})
			.style("cursor", "pointer")
			.on('mouseover',_onFeatureMouseOver)
			.on('mouseout', _onFeatureMouseOut)
			.on("click", function() {
				_featureClickedListener(featureExtraInfo.featureName);
			});



//		var circles = visGroup.selectAll("circle").data(data);
//		circles.enter()
//			.insert("circle")
//			.attr("cx", function (d) { return xRange (d.x); })
//			.attr("cy", function (d) { return yRange (d.score); })
//			.attr("r", "0")
//			.attr("filter", "url(#drop-shadow)")
//			.style("fill", function(d,i){return colors[i];})
//			.style("cursor", "pointer")
//			.on('mouseover',_onFeatureMouseOver)
//			.on('mouseout', _onFeatureMouseOut)
//			.on("click", function() {
//				_featureClickedListener(featureExtraInfo.featureName);
//			});
//
//		circles.transition()
//			.duration(1000)
//			.delay(function(d,i){return i * 100})
//			.attr("r", function(d){return d.size;})
//			.ease("elastic");


		var labels = visGroup.selectAll("text").data(data);
		labels.enter()
			.insert("text")
			.attr("x", function (d) { return xRange (d.x); })
			.attr("y", function (d) { return yRange (d.score) + 20; })
			.text(function(d){return d.name;})
			.attr("font-family", "sans-serif")
			.attr("text-anchor", "middle")
			.attr("font-size", "18px")
			.attr("fill", "black")
			.style('opacity', 0);

		labels.transition()
			.duration(1000)
			.delay(function(d,i){return i * 100})
			.style('opacity', 1)
			.ease("elastic");


		//Feature Extra Info Group
		featureExtraInfo.group = visGroup.append("g")
			.attr("id", "extraInfo")
			.style("opacity", 0);


		featureExtraInfo.currentScore = featureExtraInfo.group.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text("0")
			.attr("text-anchor", "middle")
			.attr("font-family", "courier")
			.attr("font-size", "18px")
			.attr("font-weight", "bold")
			.attr("fill", "black");

		featureExtraInfo.expectedScoreDrop  = featureExtraInfo.group.append("path")
			.attr("d", "M292.464,292.479c-31.658,31.625-121.129,121.129-121.129,121.129S85.417,327.69,50.19,292.463c-66.913-66.914-66.922-175.367-0.016-242.274c66.905-66.905,175.391-66.929,242.305-0.015C359.393,117.088,359.369,225.574,292.464,292.479z")
			.attr("filter", "url(#drop-shadow)")
//			.attr("transform", function(d){return "translate(" + (xRange(d.x)  - ((377 *(d.size/120)) / 2.0))  + "," + (yRange(d.score) -  ((431 *(d.size/120))))+"), scale ("+(d.size/120)+")";})
			.style("fill", "white")
			.style("opacity", 0.8)
			.style("stroke", "orange")
			.style("stroke-width", "10");



		featureExtraInfo.expectedScore  = featureExtraInfo.group.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text("0")
			.attr("text-anchor", "middle")
			.attr("font-family", "sans-serif")
			.attr("font-size", "18px")
			.attr("fill", "blue");


		//Score Lines
		featureExtraInfo.yLine = featureExtraInfo.group.append("line")
			.attr("id", "yLine")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 0)
			.style('stroke', 'black')
			.style('stroke-width', '1px')
			.style("stroke-dasharray", ("3, 6"))
			.style("stroke-opacity", 0.9);

		featureExtraInfo.xLine = featureExtraInfo.group.append("line")
			.attr("id", "xLine")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 0)
			.style('stroke', 'black')
			.style('stroke-width', '1px')
			.style("stroke-dasharray", ("3, 6"))
			.style("stroke-opacity", 0.9);

		//Prediction Lines
		featureExtraInfo.yLinePrediction = featureExtraInfo.group.append("line")
			.attr("id", "yLinePrediction")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 0)
			.style('stroke', 'black')
			.style('stroke-width', '1px')
			.style("stroke-dasharray", ("3, 6"))
			.style("stroke-opacity", 0.9);

		featureExtraInfo.xLinePrediction = featureExtraInfo.group.append("line")
			.attr("id", "xLinePrediction")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", 0)
			.style('stroke', 'black')
			.style('stroke-width', '1px')
			.style("stroke-dasharray", ("3, 6"))
			.style("stroke-opacity", 0.9);
		_addXAxis(visGroup);
		_addYAxis(visGroup);
	}

	function _setFeatureClickedListener(listener) {
		_featureClickedListener = listener;
	}
	return {
		renderGraph: _renderGraph,
		setFeatureClickedListener: _setFeatureClickedListener
	}
};

