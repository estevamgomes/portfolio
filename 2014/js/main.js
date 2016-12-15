$(function(){
	// isMobDevice = (/iphone|ipad|Android|webOS|iPod|BlackBerry|Windows Phone|ZuneWP7/gi).test(navigator.appVersion);

	$(".lazy").show().lazyload({
		placeholder : "",
		load : function() {
			$(this).addClass('loaded');
		}
	});
	// if(!isMobDevice){
	// 	$(".lazy").show().lazyload({
	// 		placeholder : "img/ajax-loader.gif",
	// 	});
	// 	$('#header h1').html('Não é celular');
	// } else {
	// 	$('.lazy').each(function(){
	// 		$(this).attr('src', $(this).data('original'));
	// 	});
	// 	$('#header h1').html('É celular');
	// }
});
