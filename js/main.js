$(function(){

	$(".lazy").show().lazyload({
		placeholder : "",
		load : function() {
			$(this).addClass('loaded');
			$(this).closest('.hentry').addClass('loaded');
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

			
		////////////
		// filtro //
		////////////
		$('.filter-tag').click(function(event) {
			if($('.home').length > 0) event.preventDefault();

			if($(this).parent().hasClass('active')) {
				$('.filter-tag').parent().removeClass('active');
				$('.home .hentry').removeClass('grayscale').parent().removeClass('hide');
				$('.tag-title').remove();
			} else {
				var tag = $(this).data('tag-slug');
				selectTag(tag);
			}

			$(".lazy").not(".loaded").show().lazyload();
			$(this).blur();
		});

		// ao iniciar o site vê se algum parâmetro já foi enviado pelo get para filtrar o conteúdo
		var tag = $.urlParam('tag'); // tag
		if(tag != null) {
			selectTag(tag);
		}

		function selectTag(tag) {
			$('.filter-tag').not('[data-tag-slug="' + tag + '"]').parent().removeClass('active');
			$('[data-tag-slug=' + tag + ']').parent().addClass('active');
			$('.home .hentry').not('.tag-' + tag).addClass('grayscale').parent().addClass('hide');
			$('.home .hentry.tag-' + tag).removeClass('grayscale').parent().removeClass('hide');

			var tagName = $('[data-tag-slug="' + tag + '"]').html();
			if($('.tag-title').length > 0) {
				$('.tag-title .tag-name').html(tagName);
			} else {					
				var html = '<h2 class="tag-title"><span class="tag-name">' + tagName + '</span></h2>';
				$('.home').prepend(html);
			}
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


/////////////////////////
// fixa o menu no topo //
/////////////////////////

// var menu topo (abrir e fechar)
var $nav,
	docScrollTop,
	docScrollTopLast,
	docScrollDir;

// var menu topo
$nav = $("#header");
$nav.addClass('menu-toggle');

$(window).scroll(function(event) {
	docScrollTop = $(document).scrollTop();
	docScrollDir = docScrollTop > docScrollTopLast ? 1 : -1;
	docScrollTopLast = $(document).scrollTop();

	if(docScrollDir == -1) {
		hideNav();
	} else {
		showNav();
	}
});

function showNav() {
	$nav.addClass('menu-hide');
}

function hideNav() {
	$nav.removeClass('menu-hide');
}


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