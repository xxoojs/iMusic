(function(){
	function iDrag($el){
		this.render($el);
	}

	iDrag.prototype = {
		constructor: iDrag,

		render: function($el){
			var active = false;
			$el.on('mousedown touchstart', function(downEvt){
				var downX = downEvt.pageX,
					downY = downEvt.pageY;

				active = true;

				var distanceX = downX - parseInt($el.css('left')),
					distanceY = downY - parseInt($el.css('top'));

				$(document).on('mousemove touchmove', function(moveEvt){
					if(active){
						var moveX = moveEvt.pageX,
							moveY = moveEvt.pageY;

						var left = moveX - distanceX,
							top = moveY - distanceY,
							maxLeft = document.body.offsetWidth,
							maxTop = document.body.offsetHeight;

						$el.css('left', left + 'px');
						$el.css('top', top + 'px');
					}

					$(document).on('mouseup touchend', function(){
						var document

						if(parseInt($el.css('left')) < 60){
							$el.css('left', '0px');
						}
						if(parseInt($el.css('top')) < 60){
							$el.css('top', '0px');
						}
						if(parseInt($el.css('right')) < 60){
							$el.css('right', '0px');
						}
						if(parseInt($el.css('bottom')) < 60){
							$el.css('bottom', '0px');
						}
						active = false;
					});
				});
			});
		}
	};

	!(function(){
		var old = $.fn.iDrag;
		$.fn.iDrag = function(){
			this.each(function(){
				new iDrag($(this));
			});
		}
		$.fn.iDrag.defaults = {};
		$.fn.iDrag.noConfict = function(){
			$.fn.iDrag = old;
			return this;
		}
	})();
})()