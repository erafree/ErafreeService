'use strict';

window.utils = window.utils || {};

utils.isCanAnimate = function () {
	var animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '';

	if( elm.style.animationName !== undefined ) { animation = true; }

	if( animation === false ) {
	  for( var i = 0; i < domPrefixes.length; i++ ) {
	    if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
	      pfx = domPrefixes[ i ];
	      animationstring = pfx + 'Animation';
	      keyframeprefix = '-' + pfx.toLowerCase() + '-';
	      animation = true;
	      break;
	    }
	  }
	}
	return animation;
};

utils.animStr = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend oAnimationEnd';