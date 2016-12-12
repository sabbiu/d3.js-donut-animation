var nayadallo = dallo({
	container: 'containerSVG',
	percent: 0.9,
	radius: {
		max: 0.9,
		min: 0.7,
	},
	color: {
		empty: '#ccc',
		fill: '#ff7c00',
	},
	duration: 1000,
	text: {
		top: '1000',
		bottom: 'Downloads',
	},
	fontsize: {
		top: '1em',
		second: '0.8em'
	}
})

var animated = false;
$(function() {
    var oTop = $('#containerSVG').offset().top - window.innerHeight;
    $(window).scroll(function(){
    	if (!animated) {

	        var pTop = $('body').scrollTop();
	        if( pTop > oTop ){
	        	animated = true;
	            nayadallo.animate();
	        }
    	}
    });
});

$(window).resize(function(){
	nayadallo.render();
	
});