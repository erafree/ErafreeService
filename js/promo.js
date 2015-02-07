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
		$logohandler = $('.logohandler'),
		$haveInfo = $('.haveInfo'),
		$cancelContact = $('.pr_page--back'),
		$arrow = $('.fr_arrow'),
		$txtarea = $('textarea', $msForm),
		isMain = true,
		animClasses = 'bounceOutLeft bounceOutRight bounceInLeft bounceInRight';

	init();

	function init() {
		bindEvents();
	}

	function bindEvents() {
		$mainB.on('click', moveContact);
		$haveInfo.on('click', moveContact);
		$messageB.on('click', submitMsg);
		$logohandler.on('click', cancelContact);
		$cancelContact.on('click', cancelContact);
		$txtarea.on('keydown. focus', txtenter);
	}

	function txtenter() {
		$txtarea.removeClass('error');
	}

	function cancelContact() {
		if(!isMain) {
			doAnim($cS, $mS, 'bounceOutRight', function() {
			  isMain = true;
			  txtenter();
			});

			$arrow
				.addClass('bounceOutLeft')
				.bind(utils.animStr, function (e) {
					$arrow.unbind(utils.animString).removeClass(animClasses);
				});
		}
	}

	function moveContact() {
		doAnim($mS,$cS,'bounceOutLeft', function() {
		  isMain = false;
		});
	}

	function submitMsg() {
		var data = $msForm.serialize();

		if(!$txtarea.val().trim()) {
			$txtarea.addClass('error');
			return;
		}
		if($messageB.hasClass('disabled')) return;
		$messageB.addClass('disabled');

		$.ajax({
	        url: $msForm.attr('action'),
	        type: 'POST',
	        data: data,
	        success: function(data) {
	        	doAnim($cS, $mS, 'bounceOutRight', function() {
				  isMain = true;
				  $('input, textarea', $msForm).val('');
				  $messageB.removeClass('disabled');
				});
	        }
	    });
	}

	function doAnim($f, $l, cl, cb) {
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
          cb && cb();
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