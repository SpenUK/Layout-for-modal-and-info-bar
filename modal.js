(function($){
	// Register custom easing
	// could be registered against the global jQuery object.
  $.easing['easeInBack'] = function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.2;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  }

	var Modal = {
		init: function(options){
			this.$el = $(this.el = (options && options.el) ? options.el : defaults.el);
			this.setListeners();

			return this;
		},
		openWith: function(reference){
			this.changeContent(reference).show();

			return this;
		},
		changeContent: function(reference){
			if (typeof reference == 'undefined' || $(reference).length <= 0) return this;
			var content = $(reference).html();

			this.$el.find('.modal__content').html(content);

			return this;
		},
		show: function(){
			this.$el.fadeIn(100);
			return this;
		},
		hide: function(){
			_this = this;
			var H = this.$el.height(),
					shader = this.$el.find('.modal__shader'),
					container = this.$el.find('.modal__container');		

			shader.fadeOut(300);
			container.animate({bottom: -(H * 1.2)},{duration: 300,
		    specialEasing: {
		      bottom: "easeInBack"
		    },
		    complete: function(){
		    	shader.show();
		  		container.css({bottom: 'initial'});
		  		_this.$el.hide();
		    }
		  });

			return this;
		},
		transitions: {
			show: {
				fade: function() {

				},
				popUp: function() {

				},
				popDown: function() {

				}
			},
			hide: {
				fade: function() {

				}
			}
		},
		setListeners: function(){
			_this = this;
			this.$el.on('click', '.modal__button--dismiss', function(){
				_this.hide();
			});

			$(document).on('keyup', function(e){
				if (e.which === 27) {_this.hide()};
			});

			this.$el.on('click', '.modal__shader', function(){
				_this.hide();
			});

			return this;
		}

	}

	$(document).on('ready', function(){
		window.modal = Modal;
		modal.init({ el: '#modal'});
	});

}(jQuery));