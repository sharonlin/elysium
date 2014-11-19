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
		console.log('_onFeatureMouseOver '+ d.moduleName);

	//.style("stroke", "LightBlue")
//			.style("stroke-width", "5")
		featureExtraInfo.group.attr("transform", "translate(" + xRange(d.x) + "," + yRange(d.y) + ")");
		featureExtraInfo.featureName = d.moduleName;
		featureExtraInfo.currentScore
			.attr("x",0)
			.attr("y",+5)
			.text(d.y);

		var y = -1 * (d.y + 30);

		featureExtraInfo.expectedScore
			.attr("x",0)
			.attr("y",-1*(Y_RANGE - yRange(30)) +5)
			.text(d.y + 30);

		featureExtraInfo.expectedScoreCircle
			.attr("cx",0)
			.attr("cy",-1*(Y_RANGE - yRange(30)))
			.attr("r", d.complexity);



		featureExtraInfo.yLine
			.attr("x1",-20)
			.attr("y1",0)
			.attr("x2",-xRange(d.x))
			.attr("y2",0);

		featureExtraInfo.xLine
			.attr("x1",0)
			.attr("y1",0)
			.attr("x2",0)
			.attr("y2",Y_RANGE-yRange(d.y));


		featureExtraInfo.yLinePrediction
			.attr("x1",-20)
			.attr("y1", -1*(Y_RANGE - yRange(30)))
			.attr("x2",-xRange(d.x))
			.attr("y2",-1*(Y_RANGE - yRange(30)));

		featureExtraInfo.xLinePrediction
			.attr("x1",0)
			.attr("y1",-1*(Y_RANGE - yRange(30)))
			.attr("x2",0)
			.attr("y2",0);

		featureExtraInfo.group.style("opacity", 1);
	}

	function _onFeatureMouseOut(d) {
//		console.log('_onFeatureMouseOut '+ d.moduleName + ' ,isScoreOver '+isScoreOver );
		setTimeout(function(){
			if(isScoreOver === false) {
				featureExtraInfo.group.style("opacity", 0);
			}
		},500);
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


		var circles = visGroup.selectAll("circle").data(data);
		circles.enter()
			.insert("circle")
			.attr("cx", function (d) { return xRange (d.x); })
			.attr("cy", function (d) { return yRange (d.y); })
			.attr("r", "0")
			.attr("filter", "url(#drop-shadow)")
			.style("fill", function(d,i){return colors[i];})
			.on('mouseover',_onFeatureMouseOver)
			.on('mouseout', _onFeatureMouseOut);

		circles.transition()
			.duration(1000)
			.delay(function(d,i){return i * 100})
			.attr("r", function(d){return d.complexity;})
			.ease("elastic");


		var labels = visGroup.selectAll("text").data(data);
		labels.enter()
			.insert("text")
			.attr("x", function (d) { return xRange (d.x); })
			.attr("y", function (d) { return yRange (d.y + d.complexity/2 - 3); })
			.text(function(d){return d.moduleName;})
			.attr("font-family", "sans-serif")
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
			.style("opacity", 0)
			.on("click", function(d) {
				_featureClickedListener(featureExtraInfo.featureName);
			});

		featureExtraInfo.currentScore = featureExtraInfo.group.append("text")
			.attr("x", 0)
			.attr("y", 0)
			.text("0")
			.attr("text-anchor", "middle")
			.attr("font-family", "courier")
			.attr("font-size", "18px")
			.attr("font-weight", "bold")
			.attr("fill", "white")
			.on('mouseover',_onScoreMouseOver)
			.on('mouseout',_onScoreMouseOut);

		featureExtraInfo.expectedScoreCircle  = featureExtraInfo.group.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", "0")
			.attr("filter", "url(#drop-shadow)")
			.style("stroke", "LightGreen")
			.style("stroke-width", "8")
			.style("fill", "Lavender")
			.style("opacity", 0.8)

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

