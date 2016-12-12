(function(global, d3, $) {

	var dallo = function(params) {
		return new dallo.init(params);
	}

	var 
		
		// width and height of the container
		width, height, $container, svg, wrapper, duration, text, fontsize,
		// radius
		radius, percent, maxradius, minradius, tau = 2 * Math.PI;

	dallo.prototype = {
		print: function() {
			// // console.log.log(cWidth, cHeight);
		},

		

		setup: function(){
			var self = this;
			self.radius = Math.min(width, height) /2;

			self.arc = d3.svg.arc()
			    .innerRadius(self.radius * minradius)
			    .outerRadius(self.radius * maxradius)
			    .startAngle(0);

			self.background = wrapper.append("path")
			    .datum({endAngle: tau})
			    .style("fill", color.empty)
			    .attr("d", self.arc);

			self.foreground = wrapper.append("path")
			    .datum({endAngle: 0 * tau})
			    .style("fill", color.fill)
			    .attr("d", self.arc);

		  	
			self.textTop = wrapper.append('text')
							.attr('text-anchor', 'middle')
							.text(text.top)
							.attr('dy', '-10')
							.style({
								'font-size': fontsize.top,
								'font-weight': 'bold'
							});

			self.textBottom = wrapper.append('text')
							.attr('text-anchor', 'middle')
							.text(text.bottom)
							.attr('dy', '10')
							.style({
								'font-size': fontsize.bottom
							});
			// self.animate();
		},

		animate: function() {
			var self = this;
			self.foreground.transition()
			    .duration(duration)
			    .ease('quad')
			    .attrTween("d", arcTween(percent * tau));

			function arcTween(newAngle) {

				return function(d) {
				    var interpolate = d3.interpolate(d.endAngle, newAngle);
				    return function(t) {
				      	d.endAngle = interpolate(t);
				      	return self.arc(d);
				    };
			  	};
			}
		},

		render: function() {
			var self = this;
			self.setDimensions();
			wrapper.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			self.radius = Math.min(width, height) /2;

			svg.attr('width', width)
				.attr('height', height);
			self.radius = Math.min(width, height) /2;
			self.arc.innerRadius(self.radius * minradius)
			    .outerRadius(self.radius * maxradius);

			self.foreground.attr('d', self.arc);
			self.background.attr('d', self.arc)
			
		},

		
		// set dimensions
		setDimensions: function() {
			width = $container.width();
			height = $container.height(width).height();
			return this;
		},

		//remove svg
		remove: function() {
			$container.find('svg').remove();
		},

	};

	dallo.init = function(params) {
		var self = this;
		$container = $('#'+ params.container);
		percent = params.percent;
		maxradius = params.radius.max;
		minradius = params.radius.min;
		color = params.color;
		duration = params.duration;
		text = params.text;
		fontsize = params.fontsize;

		self.setDimensions();//.color(params.color);
		radius = Math.min(width, height) / 2;
		svg = d3.select('#'+ params.container)
				.append('svg')
					.attr('width', width)
					.attr('height', height);

		wrapper = svg.append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		self.setup();
		return this;
	};

	dallo.init.prototype = dallo.prototype;

	global.dallo = dallo;

})(window, d3, $);