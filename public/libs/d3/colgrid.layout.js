/**
 * Created with IntelliJ IDEA.
 * User: linsha
 * Date: 9/3/14
 * Time: 11:20 AM
 * To change this template use File | Settings | File Templates.
 */
(function() {
	d3.layout.colgrid = function() {
		var x = d3.scale.ordinal(),
			y = d3.scale.ordinal(),
			gridsize = [1, 1],
			nodesize = [0, 0],
			padding = [0, 0],
			cols, rows;

		/* Takes a list of columns. Each column is a list of nodes.
		 * Returns a list of {d:node, x:_, y:_} */
		function colgrid(nodes) {
			var ri, ci = -1,
			cols = nodes.length;
			rows = d3.max(nodes.map(function(c) {return c.length}));

			x.domain(d3.range(cols)).rangeBands([0, gridsize[0]], padding[0], 0);
			y.domain(d3.range(rows)).rangeBands([0, gridsize[1]], padding[1], 0);
			nodesize[0] = x.rangeBand();
			nodesize[1] = y.rangeBand();

//			x.domain(d3.range(cols)).range(d3.range(0, (gridsize[0] + padding[0]) * cols, gridsize[0] + padding[0]));
//			y.domain(d3.range(rows)).range(d3.range(0, (gridsize[1] + padding[1]) * rows, gridsize[1] + padding[1]));
//			var actualSize = [0,0];
//			actualSize[0] = x(cols - 1);
//			actualSize[1] = y(rows - 1);

			outnodes = []
			while (++ci < cols) {
				ri = -1;
				while (++ri < rows) {
					if(typeof(nodes[ci][ri]) != 'undefined') {
						outnode = {}
						outnode.d = nodes[ci][ri];
						outnode.x = x(ci);
						outnode.y = y(ri);
						outnode.col = ci;
						outnode.row = ri;
						outnodes.push(outnode);
					}
				}
			}
			return outnodes;
		}

		colgrid.size = function(value) {
			if (!arguments.length) return gridsize;
			gridsize = value;
			return colgrid;
		}

		colgrid.nodesize = function(value) {
			if (!arguments.length) return nodesize;
			nodesize = value;
			return colgrid;
		}

		colgrid.padding = function(value) {
			if (!arguments.length) return padding;
			padding = value;
			return colgrid;
		}
		colgrid.x = function() {
			return x;
		}

		colgrid.y = function() {
			return y;
		}

		return colgrid;
	};
})();
