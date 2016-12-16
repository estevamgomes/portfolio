$(function(){

	$(".lazy").show().lazyload({
		placeholder : "",
		load : function() {
			$(this).addClass('loaded');
			$('.smartphone-window').each(function(index, el) {
				if($(el).height() + 10 < $(el).find('img').height()) $(el).addClass('grab');
			});
		}
	});
	
	$(document).ready(function() {
			/////////////
			// galeria //
			/////////////
			var $galeriaLista = $('.galeria li'),
				item = 0,
				itemMax = $galeriaLista.length-1;
			$('.galeria-prev').click(function(event) {
				item = item > 0 ? item - 1 : itemMax;
				$galeriaLista.eq(item).show().siblings().hide();
			});
			$('.galeria-next').click(function(event) {
				item = item < itemMax ? item + 1 : 0;
				$galeriaLista.eq(item).show().siblings().hide();
			});


			/////////////////////////////
			// scroll images with drag //
			/////////////////////////////
			var clicked = false, clickY;

			$('.smartphone-window').on({
				'mousemove': function(e) {
					clicked && updateScrollPos(e, $(this));
				},
				'mousedown': function(e) {
					clicked = true;
					clickY = e.pageY + $(this).scrollTop();
				},
				'mouseleave': function() {
					$(this).removeClass('grabbing');
					clicked = false;
				},
			});

			$(document).on({
				'mouseup': function() {
					$('.smartphone-window').removeClass('grabbing');
					clicked = false;
				}
			});

			var updateScrollPos = function(e, $this) {
				$this.addClass('grabbing');
				$this.scrollTop(clickY - e.pageY);
			}

			
			/////////////////
			// play videos //
			/////////////////
			$('.play').click(function(event) {
				var $browser = $(this).closest('.browser');
				var video = $browser.find('video').get(0);
				if(video.paused) {
					video.play();
					$browser.addClass('full');
				} else {
					video.pause();
					$browser.removeClass('full');
				}
			});
			$('video').on('ended',function(){
				$(this).closest('.browser').removeClass('full');
			});
			
			/////////////
			// contato //
			/////////////
			$('#contact')
				.hide()
				.css('position', 'absolute')
				.css('top', '0')
				.css('left', '0')
				.append('<div class="contact-close"><a href="javascript:void(0);"><i class="fa fa-times"></i></a></div>')
				.find('.contact-close')
					.click(function(event) {
						$('#contact').fadeOut('fast');
					});
			$('#contact').find('.contact-shadow').show();

			$('#contact').find('.contact-shadow').click(function(event) {
				$('#contact').fadeOut('fast');
			});

			$('.contact-toggle').click(function(event) {
				$('#contact').fadeIn('fast');
				var scroll = $(window).scrollTop();
				$('#contact .contact-box').css({top: scroll + 'px',});
			});

			$(document).keyup(function(e) {
				// esc
				if (e.keyCode == 27) $('#contact').fadeOut('fast');
			});


		////////////
		// filtro //
		////////////
		$('.filter-tag').click(function(event) {
			if($('.home').length > 0) event.preventDefault();
			if($(this).hasClass('active')) {
				$('.filter-tag').removeClass('active');
				$('.home .group').show();
			} else {
				var tag = $(this).data('tag-slug');
				$('.filter-tag').not(this).removeClass('active');
				$(this).addClass('active');
				$('.home .group').not('.tag-' + tag).hide();
				$('.home .group.tag-' + tag).show();
			}
			$(".lazy").not(".loaded").show().lazyload();
		});

		// ao iniciar o site vê se algum parâmetro já foi enviado pelo get para filtrar o conteúdo
		var tag = $.urlParam('tag'); // tag
		if(tag != null) {
			$('.filter-tag').not('[data-tag-slug=' + tag + ']').removeClass('active');
			$('[data-tag-slug=' + tag + ']').addClass('active');
			$('.home .group').not('.tag-' + tag).hide();
			$('.home .group.tag-' + tag).show();
		}

	});

	//////////////////
	// ajax imagens //
	//////////////////
	/*
	$('body').append('<div id="ajaxcontent"></div>')
	$('.entry-link, .entry-image').click(function(event) {
		event.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			url: url,
			cache: false
		})
		.done(function( html ) {
			$("#ajaxcontent").append( html ).addClass('loaded');
		});
	});
	*/
});


/*
 *
 * Extrai os parâmetros get do url
 *
 */
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
		return null;
	}
	else{
		return results[1] || 0;
	}
}