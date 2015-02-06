$(function(){
	new promopage();
});


var promopage = function() {
	var _this = this,
		$sections = $('.pr_imgsection'),
		$mS = $('.mainhandler'),
		$cS = $('.contacthandler'),
		$mainB = $('.livehandler', $mS),
		$messageB = $('.livehandler', $cS),
		$msForm = $('.pr_form'),
		isMain = true,
		animClasses = 'bounceOutLeft bounceOutRight bounceInLeft bounceInRight';

	init();

	function init() {
		bindEvents();
	}

	function bindEvents() {
		$mainB.on('click', moveContact);
		$messageB.on('click', submitMsg);
	}

	function moveContact() {
		doAnim($mS,$cS,'bounceOutLeft');
	}

	function submitMsg() {
		$.ajax({
	        url: $msForm.attr('action'),
	        type: 'POST',
	        data: $msForm.serialize(),
	        success: function(data) {
	            
	        }
	    });
	}

	function doAnim($f, $l, cl) {
		var wH = Math.max($f.height(),$(window).height()),
            wW = $(window).width(),
			onAnimationFinished = null;window.scroll(0, 0);

		$('body').css({
          overflow: 'hidden',
          height: wH
        });

        onAnimationFinished = function() {
          $sections
            .unbind(utils.animString)
            .removeClass(cl)
            .removeAttr('style');

           $f.hide();
           $l.show();


          $('body').removeAttr('style');

          onAnimationFinished = null;
		  isMain = false;
        };

		$sections
			.show()
			.addClass(cl)
			.width(wW)
			.css('position', 'absolute');

		$l.bind(utils.animStr, function (e) {
            onAnimationFinished && onAnimationFinished();
        });
	}
}