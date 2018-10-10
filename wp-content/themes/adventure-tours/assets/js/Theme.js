var Theme = {

	disable_tab_state_restore:false,

	selectiper_live_search_auto_start:7,

	init:function($){
		this._initMobileMenu();
		this._initScrollTop($);
		this.initSelectpicker();
		this._initToursTabsCollapse();
		this._initTabsStateFromHash($);
		this._initTourSerchForm();

		$('[data-toggle="tooltip"]').tooltip();

		this.FormValidationHelper.init();
	},

	initGoogleMap: function(cfg){
		if ( 'undefined' == typeof(cfg) ) {
			return;
		}

		var mapElement = document.getElementById(cfg.element_id);

		if ( ! mapElement ){
			return;
		}

		var jMap = jQuery(mapElement);
		jMap.height(cfg.height);

		if (cfg.full_width) {
			var on_resize_hander = function(){
				jMap.width(jQuery(window).outerWidth())
					.offset({left:0});
				if (map) {
					//google.maps.event.trigger(map, 'resize');
					if (mapLang) {
						map.setCenter(mapLang);
					}
				}
			};
			on_resize_hander();
			jQuery(window).on('resize', on_resize_hander);
		}

		var mapLang = new google.maps.LatLng(parseFloat(cfg.coordinates[0]), parseFloat(cfg.coordinates[1])),
			map = new google.maps.Map(mapElement,{
				scaleControl: true,
				center: mapLang,
				zoom: cfg.zoom,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false
			}),
			marker = new google.maps.Marker({
				map: map,
				position: map.getCenter()
			});

		if (cfg.address) {
			var infowindow = new google.maps.InfoWindow();
			infowindow.setContent(cfg.address);
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}

		// fix display map in bootstrap tabs and accordion
		if ( cfg.is_reset_map_fix_for_bootstrap_tabs_accrodion ) {
			jQuery(document).on('shown.bs.collapse shown.bs.tab', '.panel-collapse, a[data-toggle="tab"]', function () {
				google.maps.event.trigger(map, 'resize');
				map.setCenter(mapLang);
			});
		}
	},

	initStickyHeader:function(){
		var doc = jQuery(document),
			headerIsSticky = false,
			headerWrap = jQuery('.header-wrap'),
			headerInfo = headerWrap.find('.header__info'),
			headerBacklog = headerWrap.find('.header-wrap__backlog'),
			headerWrapClassSticky = 'header-wrap--sticky-header',
			stickyBreakpoint = null,
			switchHeightDelay = 0,
			calculateHeaderInfo = function(){
				stickyBreakpoint = headerInfo.outerHeight() + switchHeightDelay;

				headerBacklog.css({
					'min-height': headerWrap.find('.header__content-wrap').outerHeight() + 'px',
					'margin-top': stickyBreakpoint + 'px'
				});
			};
		setTimeout(calculateHeaderInfo, 10);
		jQuery(window).on('resize', calculateHeaderInfo);

		doc.on('scroll', function(){
			var newState = doc.scrollTop() > stickyBreakpoint;
			if ( newState != headerIsSticky ) {
				headerIsSticky = newState;
				if( newState ){
					headerWrap.addClass(headerWrapClassSticky);
				} else {
					headerWrap.removeClass(headerWrapClassSticky);
				}
			}
		});
	},

	/**
	 * Initialization modile menu.
	 * @use jquery.slicknav.js, slicknav.css
	 * @return void
	 */
	_initMobileMenu:function(){
		var mainBtn,
			closeClass = 'slicknav_btn--close',
			itemClass = 'slicknav_item',
			itemOpenClass= 'slicknav_item--open';

		jQuery('#navigation').slicknav({
			label:'',
			prependTo:'.header__content',
			openedSymbol: '',
			closedSymbol: '',
			allowParentLinks:true,
			beforeOpen : function(target){
				if( target.length ){
					if( target[0] == mainBtn ){
						target.addClass(closeClass);
					}else if( target.hasClass(itemClass) ){
						target.addClass(itemOpenClass);
					}
				}
			},
			beforeClose : function(target){
				if( target.length ){
					if( target[0] == mainBtn ){
						target.removeClass(closeClass);
					}else if( target.hasClass(itemClass) ){
						target.removeClass(itemOpenClass);
					}
				}
			},
		});

		mainBtn = jQuery('.slicknav_btn');
		mainBtn = mainBtn.length ? mainBtn[0] : null;
	},

	/**
	 * Initialization custom select box.
	 * 
	 * @use bootstrap.min.js, bootstrap-select.min.js, bootstrap-select.min.css
	 * @param String|jQuery elements
	 * @return void
	 */
	initSelectpicker: function( elements ){
		var self = this,
			collection = elements ? jQuery( elements ) : null;

		if ( null == collection ) {
			collection = jQuery('select.selectpicker')
				.add('.widget select')
				.add('select.orderby') // woocommerce, shop page > orderby selector
				.add('.wcml_currency_switcher'); // wpml woocommerce currency switcher on single product
		}

		if ( ! collection  || collection.length < 1 ) {
			return false;
		}

		var live_auto_start_limit =  this.selectiper_live_search_auto_start;
		if ( live_auto_start_limit > 0 ) {
			collection.each(function(){ // .not('[data-live-search]')
				if ( this.children.length >= live_auto_start_limit  && ! this.hasAttribute('data-live-search') ) {
					jQuery(this).attr( 'data-live-search', true );
				}
			});
		}

		collection.selectpicker()
			.on('change', function(){
				self._fixSelectpickerEmptyClass( this );
			})
			.each(function(){
				self._fixSelectpickerEmptyClass( this );
			});
	},

	_fixSelectpickerEmptyClass:function( node ){
		var el = jQuery(node),
			isSelectpicker = el.data('selectpicker') ? true : false;
		if ( ! isSelectpicker ) {
			return;
		}
		var emptyClass = 'selectpicker--empty';
		if ( el.val() ) {
			el.selectpicker('setStyle', emptyClass, 'remove');
		} else {
			el.selectpicker('setStyle', emptyClass, 'add');
		}
	},

	_initTabsStateFromHash:function($){
		if ( this.disable_tab_state_restore || ! document.location.hash ) {
			return;
		}
		var hash = document.location.hash;
		if ( hash.search('accordion') < 0 ) {
			var tab_link = $('.nav-tabs a[href="' + hash + '"]');
			if ( tab_link.length ) {
				tab_link.tab('show');
			}
		} else {
			var accordion_link = $('.accordion__item a[href="' + hash + '"]');
			if ( accordion_link.length ) {
				accordion_link.trigger('click');
			}
		}
	},

	_initTourSerchForm:function(selector, disable_selects_only ){
		var forms = selector ? jQuery(selector) : jQuery('form').has('input[name=toursearch]');
		if ( forms.length < 1 ) {
			return;
		}

		var date_fields = forms.find('[name*="_date"]');
		if ( date_fields.length && jQuery.fn.datepicker ) {
			var self = this;
			date_fields.each(function(){
					var el = jQuery(this),
						cfg = {},
						options_map = {
							mindate: 'minDate',
							maxdate: 'maxDate',
							dateformat: 'dateFormat'
							//,altformat: 'altFormat'
						},
						cur_data_option;
					for ( data_key_name in options_map ) {
						cur_data_option = el.data( data_key_name );
						if ( cur_data_option ) {
							cfg[ options_map[ data_key_name ] ] = cur_data_option;
						}
					}
					cfg.onClose = function( newdate, ui ){
						self._tourSearchFormOnDateFieldCloseCallback(ui.input[0]);
					}
					el.datepicker( cfg );
				})
				.each(function(){
					if ( this.value != '' ) { 
						self._tourSearchFormOnDateFieldCloseCallback(this);
					};
				});
		}

		forms.on('submit',function(){
			jQuery(this).find( 'select' + ( ! disable_selects_only ? ',input,textarea' : '' ) )
				.filter(function(index,el){
					return jQuery(el).val() == '';
				})
				.attr('disabled','disabled');

			return true;
		});
	},

	_tourSearchFormOnDateFieldCloseCallback:function( dom_el ){
		var el = jQuery(dom_el),
			name = el.attr('name'),
			is_min = name.indexOf('min_') >= 0,
			is_max = ! is_min && name.indexOf('max_') >= 0;

		if ( is_min || is_max ) {
			if ( typeof dom_el.pair == 'undefined' ) {
				var name_selector = name.replace('min_','').replace('max_',''),
					pair = el.parents('form').find('[name$="'+name_selector+'"]').not(el);
				dom_el.pair = pair.length ? pair : null;
			}

			if ( dom_el.pair ) {
				var set_option_name = is_min ? 'minDate' : 'maxDate';
				if ( typeof dom_el.pair.init_value == 'undefined' ) {
					dom_el.pair.init_value = dom_el.pair.datepicker( 'option', set_option_name );
				}
				dom_el.pair.datepicker('option', set_option_name, dom_el.value ? dom_el.value : dom_el.pair.init_value );
			}
		}
	},

	/**
	 * Initilizes responsive  for bootstrap tabs via transformation them into accordion for small devices.
	 *
	 * @return void
	 */
	_initToursTabsCollapse :function(){
		var element = jQuery('.tours-tabs .nav');
		if(0 == element.length){
			return;
		}

		// getting tab that should allow to scroll to booking form on mobile devices
		// this tab is marked with .booking-form-scroller
		var bookingFormElement = element.find('li.booking-form-scroller').find('a');
		if (bookingFormElement.length) {
			// removing related panel body, to prevent expand of empty panel
			element.parent().find(
				bookingFormElement.attr('href')
			).remove();

			element.one('shown-accordion.bs.tabcollapse', function(){
				var newHash = 'tourBooking';
				if (jQuery('a[name="'+newHash+'"]').length < 1) {
					return;
				}
				newHash = '#' + newHash;

				element.parent().find('a:contains("'+bookingFormElement.text()+'")').click(function(ev){
					ev.preventDefault();
					setTimeout(function(){
						if ( newHash == document.location.hash ) {
							document.location.hash = '#';
						}
						document.location.hash = newHash;
					}, 300);
				});
			});
		}

		element.tabCollapse({
			tabsClass: 'hidden-xs',
			accordionClass: 'visible-xs tabs-accordion' // class tabs-accordion need for customize accordion
		});
	},

	/**
	 * Created swiper sliders.
	 *
	 * @param numSlides config
	 */
	makeSwiper: function( config ){
		var cfg = jQuery.extend( {
			containerSelector:'',
			slidesNumber:4,
			navPrevSelector:'',
			navNextSelector:'',
			sliderElementSelector:'.swiper-slider',
			slideSelector: '.swiper-slide',
			widthToSlidesNumber:function(windowWidth, slidesPerView) {
				var result = slidesPerView;
				if (windowWidth > 992) {

				} else if(windowWidth > 768) {
					//result = Math.max(3, Math.ceil(slidesPerView / 2));
					result = Math.ceil(slidesPerView / 2);
				} else if (windowWidth > 670) {
					result = 2;
				} else {
					result = 1;
				}

				return result;
			}
		}, config || {} );
		if( !cfg.containerSelector ){
			return null;
		}

		var numSlides = cfg.slidesNumber,
			container = jQuery(cfg.containerSelector),
			sliderElement = container.find( cfg.sliderElementSelector ),
			realSlidesNumber = sliderElement.find( cfg.slideSelector ).length,
			swiperCfg = {
				slidesPerView: numSlides,
				spaceBetween: 30,
				loop: numSlides < realSlidesNumber
				//,loopedSlides: 0
			};
		if ( cfg.swiperOptions ) {
			jQuery.extend( swiperCfg, cfg.swiperOptions );
		}

		var swiper = new Swiper ( sliderElement, swiperCfg ),
			navButtons = null,
			naviPrev = null,
			naviNext = null;
		if(cfg.navPrevSelector){
			naviPrev = container.find(cfg.navPrevSelector);
			if ( naviPrev.length ) {
				naviPrev.on('click', function(e){
					e.preventDefault();
					swiper.slidePrev();
				});
				navButtons = jQuery(naviPrev);
			}
		}
		if(cfg.navNextSelector){
			naviNext = container.find(cfg.navNextSelector);
			if (naviNext.length) {
				naviNext.on('click', function(e){
					e.preventDefault();
					swiper.slideNext();
				});
				navButtons = navButtons ? navButtons.add(naviNext) : jQuery(naviNext);
			}
		}

		var isFirstCall = true,
			_resizeHandler = function(){
				var slidesPerView = numSlides;

				if ( cfg.widthToSlidesNumber && 'function' == typeof cfg.widthToSlidesNumber ) {
					slidesPerView = cfg.widthToSlidesNumber(jQuery(window).width(), numSlides);
				}

				var isNewValue = swiper.params.slidesPerView != slidesPerView;

				if ( isFirstCall || isNewValue ) {
					if (isNewValue) {
						swiper.params.slidesPerView = slidesPerView;
						swiper.update();
					}

					if ( navButtons ) {
						if (slidesPerView < realSlidesNumber && realSlidesNumber > 1) {
							navButtons.show();
						} else {
							navButtons.hide();
						}
					}
					if (isFirstCall) {
						isFirstCall = false;
					}
				}
			};
		jQuery(window).on('resize', _resizeHandler);//.trigger('resize');
		_resizeHandler();
	},

	initParallax : function(selector){
		if ( !selector ) {
			selector = '.parallax-image';
		}

		jQuery(selector).each(function(){
			var element = jQuery(this),
				speed = element.data('parallax-speed');
			element.parallax("50%", speed ? speed : 0.4);
		});
	},

	// Page FAQ bootstrap accordion changes icon
	// @use bootstrap.min.js
	faqAccordionCahgesIcon : function(){
		var accordion = jQuery('.faq__accordion'),
			panels = '.faq__accordion__item',
			panelsClassOpen = 'faq__accordion__item--open',
			icon = '.faq__accordion__heading i',
			iconClassUp = 'fa-info',
			iconClassDown = 'fa-question';

		accordion.each(function(){
			var el = jQuery(this);

			el.find(panels).find(icon).addClass(iconClassDown);

			el.find(panels).on({
				'show.bs.collapse':function () {
					jQuery(this)
						.addClass(panelsClassOpen)
						.find(icon)
							.removeClass(iconClassDown)
							.addClass(iconClassUp);
				},
				'hide.bs.collapse':function () {
					jQuery(this)
						.removeClass(panelsClassOpen)
						.find(icon)
							.removeClass(iconClassUp)
							.addClass(iconClassDown);
				}
			});
		});
	},

	_initScrollTop: function($){
		var document = $('body, html'),
			link = $('.footer__arrow-top'),
			windowHeight = $(window).outerHeight(),
			documentHeight = $(document).outerHeight();

		if(windowHeight >= documentHeight){
			link.hide();
		}

		link.on('click', function(e){
			e.preventDefault();

			document.animate({
				scrollTop : 0
			}, 800);
		});
	},

	init_faq_question_form: function(formSelector){
		var form = jQuery(formSelector),
			form_content = jQuery('.form-block__content'),
			form_el_msg_success = jQuery('.form-block__validation-success');

		if (form.length < 1) {
			return;
		}

		var notice_wrapper = form.find('.form-block__validation-error'),
			resetFormErrors = function() {
				form.find('.field-error-msg').remove();
				notice_wrapper.html('');
			};

		Theme.FormValidationHelper.initTooltip();

		form.on('submit', function(e){
			//e.preventDefault();
			var dataArray = form.serializeArray(),
				formData = {};

			jQuery.each(dataArray, function(i, item){
				formData[item.name] = item.value
			});

			jQuery.ajax({
				url: form.attr('action'),
				data: formData,
				method:'POST',
				error:function(responseXHR){
					var res = responseXHR.responseJSON ? responseXHR.responseJSON : {};
					resetFormErrors();
					Theme.FormValidationHelper.formReset(formSelector);

					if (res.field_errors) {
						jQuery.each(res.field_errors, function(fieldKey, message){
							var el = form.find('[name*="['+ fieldKey + ']"]');
							el.tooltip('destroy');
							setTimeout(function(){
								Theme.FormValidationHelper.initTooltip(el);
								Theme.FormValidationHelper.itemMakeInvalid(el, message)
							}, 200);
						});
					}

					if (res.error) {
						notice_wrapper.html('<i class="fa fa-exclamation-triangle"></i>' + res.error);
					}
				},
				success:function(res){
					resetFormErrors();
					Theme.FormValidationHelper.formReset(formSelector);
					if(res.message){
						form_content.fadeOut(400, function(){
							form_el_msg_success.html(res.message);
						});
					}
					if (res.success) {
						form[0].reset();
					}
				},
			})

			return false;
		});
	},

	/**
	 * Initilize sharrre buttions.
	 * @param  object config
	 * @return void
	 */
	initSharrres: function(config){
		if (!config || typeof config != 'object' || !config.itemsSelector) {
			//throw 'Parameters error.';
			return;
		}

		var curlUrl = config.urlCurl ? config.urlCurl : '',
			elements = jQuery(config.itemsSelector);

		if (elements.length < 1) {
			return;
		}

		var initSharreBtn = function(){
			var el = jQuery(this),
				url = el.parent().data('urlshare'),
				imageUrl = el.parent().data('imageshare'),
				curId = el.data('btntype'),
				curConf = {
					urlCurl: curlUrl,
					enableHover: false,
					enableTracking: true,
					url: ('' != url) ? url : document.location.href,
					share: {},
					buttons : {
						pinterest : {
							media : imageUrl
						},
						vk : {
							image : imageUrl
						}
					},
					click: function(api, options){
						api.simulateClick();
						api.openPopup(curId);
					}
				};

			curConf.share[curId] = true;
			el.sharrre(curConf);
		};
		elements.each(initSharreBtn);

		// to prevent jumping to the top of page on click event
		setTimeout(function(){
			jQuery('a.share,a.count', config.itemsSelector).attr('href','javascript:void(0)');
		},1500);
	},

	/**
	 * Initilize Search Form in popup.
	 * @use jquery.magnific-popup.min.js magnific-popup.css
	 * @return void
	 */
	initSerchFormPopup: function( config ){
		var classHide = 'search-form-popup--hide',
			cfg = jQuery.extend({
				placeholder_text: 'Type in your request...'
			}, config || {});

		jQuery('.popup-search-form').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#s',
			//closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="fa fa-times"></i></button>',
			showCloseBtn: false,
			removalDelay: 500, //delay removal by X to allow out-animation
			fixedContentPos: false,
			callbacks: {
				beforeOpen: function(){
					this.st.mainClass = this.st.el.attr('data-effect');
				},
				open: function() {
					this.content.removeClass(classHide);
					jQuery('.mfp-close').on('click', function(){
						jQuery.magnificPopup.close();
					});
				},
				close : function(){
					this.content.addClass(classHide);
				},
			},
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});

		if ( cfg.placeholder_text ) {
			jQuery('.search-form-popup')
				.find('.search-field')
				.attr('placeholder', cfg.placeholder_text);
		}
	},

	initTourOrdering:function(){
		jQuery('.tours-ordering').on('change', 'select.orderby', function(){
			jQuery(this).parents('.tours-ordering').submit();
		});
	}
}

/**
 * Gallery plugin.
 * Enables filtering and pagination functionalities.
 *
 * @param {jQuery|selector} container
 * @param {Oject}           config
 */
Theme.Gallery = function(container, config){
	if (config) {
		jQuery.extend(this, config);
	}

	this.cnt = jQuery(container);

	this._init();
};

Theme.Gallery.prototype = {

	paginationSl : '.pagination',
	imagesContainerSl:'.gallery__items',
	filterButtonsSl : '.gallery__navigation a',
	filterButtonActionClass : 'gallery__navigation__item-current',
	aminationClass : 'animated',
	_jPager:null,

	/**
	 * Settings for jPages plugin
	 *
	 * @see initPagination
	 * @type {Object}
	 */
	paginationConfig:{
		// container: '#galleryContatiner1 .gallery__items',
		perPage : 9,
		animation:'fadeIn',
		previous: '',
		next: '',
		minHeight: false
	},

	getPagerEl:function(){
		return this.paginationSl ? this.cnt.find(this.paginationSl) : null;
	},

	getImagesContEl:function(){
		return this.cnt.find(this.imagesContainerSl);
	},

	/**
	 * Initilize gallery.
	 * @use jquery.swipebox.js, swipebox.css, jPages.js
	 *
	 * @return void
	 */
	_init : function(contSelector){
		if(this.cnt.length < 1){
			// throw 'configuration error';
			return;
		}

		this.cnt.find('.swipebox').swipebox({
			useSVG : true,
			hideBarsDelay : 0
		});

		this._initPagination();
		this._initFilter();
	},

	/**
	 * Initilize gallery pagination.
	 *
	 * @use jPages.js
	 * @return void
	 */
	_initPagination:function(){
		var paginationEl = this.getPagerEl();

		if( ! paginationEl || paginationEl.length < 1 ){
			return;
		}

		if(this._jPager){
			this._jPager.jPages('destroy');
		}

		this._jPager = paginationEl.jPages(
			jQuery.extend({
					container : this.getImagesContEl()
				},
				this.paginationConfig
			)
		);
	},

	/**
	 * Initilize gallery filter.
	 * @param container selector, wrap gallery
	 * @param filterButtons selector
	 * @return void
	 */
	_initFilter:function(container, filterButtons){
		var filterButtonsEl = this.filterButtonsSl ? this.cnt.find(this.filterButtonsSl) : null;
		if ( !filterButtonsEl && !filterButtonsEl.length ) {
			return;
		}

		var self = this,
			items = this.getImagesContEl().children();

		/**
		 * Items animation use jPages animation, when pagination off.
		 */
		var _itemsAnimation = function(){
			if( self._jPager ){
				return;
			}

			var customAnimationClass = self.paginationConfig.animation;
			if(!customAnimationClass){
				return;
			}

			var animationClasses = self.aminationClass + ' ' + customAnimationClass;
			items.addClass(animationClasses);
			setTimeout( function(){
				items.removeClass(animationClasses);
			}, 600 );
		};

		_itemsAnimation();

		filterButtonsEl.on('click', function(e){
			e.preventDefault();
			var idFilter = jQuery(this).data('filterid'),
				btnActiveClass = self.filterButtonActionClass;

			filterButtonsEl.parent()
				.removeClass(btnActiveClass);

			jQuery(this).parent()
				.addClass(btnActiveClass);

			if(!idFilter){
				idFilter = 'all';
			}

			var filtered = idFilter == 'all' ? items : items.filter('[data-filterid*="'+idFilter+'"]'),
				needShow = filtered,// filtered.filter(':not(:visible)'),
				needHide = items.not(filtered);//.filter(':visible');

			if ( !needShow.length && !needHide.length ) {
				return; // nothing to do
			}

			_itemsAnimation();

			needHide.hide();
			needShow.show();

			if ( self._jPager ) {
				self._initPagination();
			}
		});
	}
};

/**
 * Form validation helper.
 * @use bootstrap.min.js, bootstrap-custom.css
 */
Theme.FormValidationHelper = {
	options: {
		itemsValidationClass : 'form-validation-item',
		emailValidationRegex : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
	},

	errors: {
		requiredField : 'Fill in the required field.',
		emailInvalid : 'Email invalid.',
	},

	init: function(){
		this.initTooltip(
			jQuery( '.' + this.options.itemsValidationClass )
		);
		this.initContactForm7CustomValidtion();
	},

	/**
	 * Initialization tooltips.
	 * @param selector|jQuery items
	 * @return void
	 */
	initTooltip: function(items){
		if ( typeof items == 'string') {
			items = jQuery(items);
		}else if( typeof items == 'undefined' ){
			items = jQuery('.' + this.options.itemsValidationClass);
		}

		if( items.length < 1 ){
			return items;
		}

		items
			.tooltip({
				trigger : 'manual',
				animation : true,
				delay : 0
			})
			.on('focus', function(){
				jQuery(this).tooltip('destroy');
			});
		return items;
	},

	/**
	 * Form items hide tooltip.
	 * @param selector wrap
	 * @return void
	 */
	formReset: function(wrap){
		var wrap = jQuery(wrap);

		if(0 == wrap.length){
			return null;
		}

		wrap.find('.' + this.options.itemsValidationClass)
			.tooltip('destroy')
			.attr('data-original-title', '')
			.attr('title', '');
	},

	/**
	 * Item show tooltip with error.
	 * @parm jQuery object item
	 * @parm  string title
	 * @return void
	 */
	itemMakeInvalid: function(item, title){
		item
			.attr('data-original-title', title)
			.tooltip('show');
	},

	/**
	 * Validation items.
	 * @param object items
	 * @return integer errors count
	 */
	itemsValidation: function(items){
		var self = this,
			errorsCount = 0;

		jQuery.each(items, function(i, item){
			var item = jQuery(item),
				itemVal = item.val(),
				itemName = item.attr('name'),
				itemType = item.attr('type');

			if( ! itemVal.trim() ) {
				errorsCount++;
				self.itemMakeInvalid(item, ( 'undefined' != self.errors['requiredField'] ? self.errors['requiredField'] : '' ) );
			} else if('email' == itemType || 'email' == itemName || item.hasClass('yks-mc-input-email-address')){
				if( ! self.options.emailValidationRegex.test( itemVal ) ) {
					errorsCount++;
					self.itemMakeInvalid( item, ( 'undefined' != self.errors['emailInvalid'] ? self.errors['emailInvalid'] : '' ) );
				}
			}
		});

		return errorsCount;
	},

	/**
	 * Initialization custom validation for plugin contact form 7.
	 * @return void
	 */
	initContactForm7CustomValidtion: function(){
		var self = this,
			wrapForm = jQuery('.wpcf7'),
			itemsValidationClass = this.options.itemsValidationClass;

		wrapForm.each(function(){
			var wrapFromId = jQuery(this).attr('id'),
			wrapFormEl = jQuery('#' + wrapFromId);

			if(wrapFormEl.length < 1){
				return;
			}

			var items = wrapFormEl
				.find('.wpcf7-validates-as-required')
				.addClass(itemsValidationClass);

			self.initTooltip( items );

			wrapFormEl.find('form').on('ajaxComplete', function(e){
				self.initTooltip( items );
				jQuery(this).find('.wpcf7-not-valid').each(function(i, item){
					var item = jQuery(item),
						itemErrorText = item.siblings('.wpcf7-not-valid-tip').text();

					switch(itemErrorText){
					case 'Please fill in the required field.':
						itemErrorText = 'undefined' != self.errors['requiredField'] ? self.errors['requiredField'] : '';
						break;
					case 'Email address seems invalid.':
						itemErrorText = 'undefined' != self.errors['emailInvalid'] ? self.errors['emailInvalid'] : '';
						break;
					}

					self.itemMakeInvalid(item, itemErrorText);
				});
			});
		});
	},

	/**
	 * Initialization custom validation for plugin Easy MailChimp Forms.
	 *
	 * @param selector wrapFormId
	 * @return void
	 */
	initMailChimpCustomValidtion: function(wrapFormId){
		var self = this,
			itemsValidationClass = this.options.itemsValidationClass,
			wrapForm = jQuery('#' + wrapFormId);

		if(wrapForm.length < 1){
			return;
		}

		var items = wrapForm.find('.yks-require, input[required="required"]')
			.addClass(itemsValidationClass);

		this.initTooltip( items );

		wrapForm.find('form')
			.find('[type="submit"], [type="image"]')
			.on('click', function(e){
				self.initTooltip( items );
				if( self.itemsValidation( items ) > 0 ){
					e.preventDefault();
				}
			});
	},

	/**
	 * Initialization custom validation for forms.
	 *
	 * @param  selector wrapFormId
	 * @return void
	 */
	initValidationForm: function(wrapFormId){
		var self = this,
			itemsValidationClass = this.options.itemsValidationClass,
			wrapForm = jQuery('#' + wrapFormId);

		if(0 == wrapForm.length){
			return;
		}

		this.initTooltip(
			wrapForm.find('.' + this.options.itemsValidationClass)
		);

		wrapForm.find('form').on('submit', function(e){
//			e.preventDefault();
			self.formReset(wrapForm);

			var items = wrapForm.find('.' + itemsValidationClass),
				formErrors = 0;

			formErrors = self.itemsValidation(items);

			// validation success
			if(0 == formErrors){
//TODO complete
			}
		});
	}
};

/**
 * Namespace for processing tour booking form.
 *
 * @type Object
 */
Theme.tourBookingForm = {
	/**
	 * Tour booking form selector.
	 *
	 * @type String
	 */
	formSelector:'#tourBookingForm',

	/**
	 * Selector for booking date field.
	 *
	 * @type String
	 */
	dateFieldSelector:'[name="date"]',

	/**
	 * Disables the booking form submission via ajax.
	 *
	 * @type Boolean
	 */
	disableAjax:false,

	/**
	 * Determines if datepicker should be used to the booking date selection.
	 *
	 * @type Boolean
	 */
	useDatePickerForDateSelection:true,

	/**
	 * Date format used by the datepicker element to render selected date.
	 *
	 * @type String
	 */
	dateFormat: 'yy-mm-dd',

	/**
	 * String used for formatting hint text in the datepiker calendar. Receives number of available tickets.
	 *
	 * @type String
	 */
	dateCalendarAvailableTicketsMessage:'%s',

	/**
	 * Template ised for time selector creation.
	 *
	 * @type String
	 */
	timeSelectorElementTemplate:'<div class="form-block__item form-block__field-width-icon"><select></select><i class="td-clock-3"></i></div>',

	/**
	 * Format for time selector.
	 * 1-st argument is time, 2-nd one is number of available tickets.
	 *
	 * @type String
	 */
	timeSeletTextFormat:'%s (%s)',

	/**
	 * Format for time field.
	 *
	 * @type String
	 */
	timeFormat:false,

	/**
	 * Contains set of dates available for tour booking.
	 * Date used as a key, value - is count of booking available for that date.
	 *
	 * @type Object
	 */
	availableDates:null,

	/**
	 * Set stores information about variations for variable items.
	 *
	 * @type Array
	 */
	variationsData:null,

	/**
	 * Object stores information about price for general (non variable) items.
	 *
	 * @type Object
	 */
	plainPriceData:null,

	/**
	 * Disable/enable quick price calculations on the booking form.
	 *
	 * @type Boolean
	 */
	renderPriceDetails:true,

	/**
	 * Url address for server action that able make calculations for item prices.
	 *
	 * @type String
	 */
	itemsDataPriceUrl:null,

	/**
	 * Cache object for _getFormPriceItemsData method.
	 *
	 * @type Object
	 */
	_price_requests_cache:{},

	/**
	 * Inits function.
	 *
	 * @param  Object config
	 * @return void
	 */
	init:function( config ){
		if ( config ) {
			jQuery.extend( this, config );
		}

		if ( ! this.disableAjax ) {
			this._initAjaxHandler();
		}

		this._initDateSelector();

		this._initVariations();
	},

	_initAjaxHandler:function(){
		this.getForm().on('submit', function(){
			var f = jQuery(this),
				submitBtn = f.find('[type=submit]'),
				data = f.serializeArray();

			data.push({
				name: 'is_ajax',
				value: '1'
			},{
				name: '_t',
				value: Date.now()
			});


			submitBtn.prop('disabled', true);
			jQuery.ajax( {
				data: data,
				dataType:'json',
				method: f.attr('method') || 'POST',
				complete:function(response, status){
					submitBtn.prop('disabled', false);

					var r = response.responseJSON ? response.responseJSON : {},
						is_success = 'success' == status && r.success;

					if ( is_success ) {
						var send_url = r.data && r.data.redirect_url ? r.data.redirect_url : null;
						if ( send_url ) {
							document.location = send_url;
						} else {
							document.location.reload();
						}
					} else {
						var errors = r.data && r.data.errors ? r.data.errors : {
							'email': ['Unknown system error. Please contact support']
						};
						var set_field_errors = function(el, errors) {
							if ( errors ) {
								el.attr('title', errors.join(' '))
									.addClass('form-validation-item');
							} else {
								if ( el.attr('data-original-title') ) {
									el.removeAttr('title')
										.tooltip('destroy');
								}
							}
						};
						var elements = jQuery(f[0].elements).filter('[name],[data-fieldkey]').each(function(){
							var el = jQuery(this),
								field_key = el.data('fieldkey') || el.attr('name');

							if ( field_key && field_key.indexOf('[') > 0 ) {
								field_key = field_key.replace(/\w+\[(\w+)\]/, '$1');
							}

							if (field_key) {
								set_field_errors(el, errors[field_key] ? errors[field_key] : null);
							}
						});
						Theme.FormValidationHelper
							.initTooltip( elements.filter('[title]') )
							.tooltip('show');
					}
				}
			} );
			return false;
		});
	},

	/**
	 * Inits date selector field for the tour booking.
	 *
	 * @return void
	 */
	_initDateSelector:function(){
		if ( ! jQuery.fn.datepicker ) {
			return;
		}
		var date_field = this._getDateField();
		if ( ! this.useDatePickerForDateSelection ) {
			if ( date_field.is('select') ) {
				Theme.initSelectpicker( date_field );
			}
			return;
		}

		date_field.hide();

		var self = this,
			clear_date_format = 'yy-mm-dd',
			calc_field = this._getDateField( true );

		calc_field.on('change',function(){
			self._renderTimeOptions( calc_field.datepicker('getDate') );
		}).datepicker({
			dateFormat: this.dateFormat ? this.dateFormat : clear_date_format,
			beforeShowDay: function(date){
				var tickets = self.getAvailableTickets(date);
				if ( tickets > 0 ) {
					return [ true,
						'date-available',
						self.dateCalendarAvailableTicketsMessage ? Theme.formatter.sprintf( self.dateCalendarAvailableTicketsMessage, tickets ) : ''
					];
				} else {
					return [ false ];
				}
			}
		}).datepicker('setDate', this._createDateFromString( date_field.val() ) )
			.trigger('change');

		jQuery('#ui-datepicker-div').hide(); // To fix issue with generated mockup that visible under footer.
	},

	/**
	 * Returns numner of available tickers for particular date.
	 *
	 * @param  String  date
	 * @return Integer
	 */
	getAvailableTickets:function( date ){
		if ( ! this.availableDates ) {
			return 0;
		}

		if ( ! this._availableDateConverted ) {
			this._availableDateConverted = this._convertAvailableDates( this.availableDates );
		}

		var formattedDate = jQuery.datepicker.formatDate('yy-mm-dd', date);

		return this._availableDateConverted[ formattedDate ] ? this._availableDateConverted[ formattedDate ].all : 0;
	},

	/**
	 * @return jQuery
	 */
	getForm:function(){
		return jQuery(this.formSelector);
	},

	/**
	 * @param  Boolean forCalendar
	 * @return jQuery
	 */
	_getDateField:function( forCalendar ){
		var original = this.getForm().find( this.dateFieldSelector );
		if ( forCalendar ) {
			if ( ! this._cal_date_field ) {
				this._cal_date_field = jQuery('<input type="text" data-fieldkey="' + original.attr('name') + '">')
					.insertBefore( original );

				original.data('fieldkey','_disabled');
			}

			return this._cal_date_field;
		} else {
			return original;
		}
	},

	_setDateValue:function( date_string ) {
		var date_field = this._getDateField(),
			new_valid_value = date_field.find('option[value^="'+date_string+'"]').first().attr('value');

		if ( new_valid_value ) {
			this._time_prefix = date_string + ' ';
			date_field.val( new_valid_value ).trigger( 'change' );
		} else {
			date_field.val( null ).trigger( 'change' );
			// throw 'Invalid date value ' + date_string + '!';
			return false;
		}
		return true;
	},

	/**
	 * @return jQuery
	 */
	_getTimeField:function( required ){
		var need_init = false;
		if ( ! this._timeSelector ) {
			this._timeSelector = jQuery('.time-select');
			if ( this._timeSelector.length < 1 ) {
				this._timeSelector = null;
			}
			need_init = true;
		}
		if ( ! this._timeSelector ) {
			if ( ! required ) {
				return;
			}
			this._timeSelector = this._createTimeField();
		}

		if ( need_init && this._timeSelector ) {
			var self = this;
			this._timeSelector.on('change', function(){
				self._setDateValue( jQuery(this).val() );
			});
		}
		return this._timeSelector;
	},

	/**
	 * @return jQuery
	 */
	_createTimeField:function(){
		var dateField = this._getDateField(),
			newEl = jQuery( this.timeSelectorElementTemplate );

		if ( newEl.length < 1 ) {
			return newEl;
		}

		if ( newEl.is('select') ) {
			newEl.insertAfter(dateField);
			return newEl;
		} else {
			newEl.insertAfter(dateField.parent());
			return newEl.find('select');
		}
	},

	_renderTimeOptions:function( date ){
		var date_str = this._makeSystemDateFormatString( date );

		if ( ! this._setDateValue( date_str ) ) {
			return;
		}

		var times = this._getTimeOptions( date_str );
		if ( times.length > 0 ) {
			var tfield = this._getTimeField( true ),
				_time_prefix = this._time_prefix,
				the_same = false;

			if ( JSON && JSON.stringify ) {
				var new_set = JSON.stringify( [_time_prefix, times] );
				the_same = new_set == tfield.data('lastoptionsset');
				if ( ! the_same ) {
					tfield.data( 'lastoptionsset', new_set );
				}
			}

			if ( ! the_same ) {
				tfield.find('option').remove();

				jQuery(times).each(function(index, el){
					tfield.append(
						jQuery('<option/>')
							.val(_time_prefix + el.val)
							.text(el.text)
					);
				});
			}

			tfield.selectpicker('refresh')
			this._changeTimeFieldState( true );
		} else {
			this._changeTimeFieldState( false ); // to disable time selector
		}
	},

	_changeTimeFieldState:function(is_active){
		var field = this._getTimeField();
		if ( ! field ) {
			return;
		}

		if ( is_active ) {
			field
				//.prop('disabled', false)
				.parent().show();
		} else {
			field
				//.prop('disabled',true)
				.parent().hide();
		}
	},

	/**
	 * Converts Date value to string in yy-mm-dd format (php format is Y-m-d).
	 *
	 * @param  Date date
	 * @return String
	 */
	_makeSystemDateFormatString:function( date ){
		return [
			date.getFullYear(),
			('0'+ (date.getMonth()+1) ).slice(-2),
			('0'+date.getDate()).slice(-2)
		].join('-');
	},

	_convertAvailableDates:function( unconverted ) {
		var r = {};
		if ( ! unconverted || jQuery.isEmptyObject( unconverted ) ) {
			return unconverted;
		}

		var def_time = '00:00';
		for( var full_date in unconverted ) {
			var _val = parseInt( unconverted[ full_date ], 10 ),
				_cur_date = this._createDateFromString( full_date ),
				_formatted = jQuery.datepicker.formatDate('yy-mm-dd', _cur_date),
				_time_formatted = _formatted == full_date 
					? def_time
					: ('0' + _cur_date.getHours() ).slice(-2) + ':' + ('0' + _cur_date.getMinutes()).slice(-2);

			if ( ! r[ _formatted ] ) {
				r[ _formatted ] = {
					'all': 0,
					'times': {}
				};
			}

			r[ _formatted ]['all'] += _val;
			if ( r[ _formatted ].times[_time_formatted] ) {
				r[ _formatted ].times[_time_formatted] += _val;
			} else {
				r[ _formatted ].times[_time_formatted] = _val;
			}
		}

		for(var d in r){
			if (r[d].times[def_time] == r[d].all ) {
				delete(r[d].times[def_time]);
			}
		}

		return r;
	},

	_createDateFromString:function(date_string){
		var r = new Date( date_string ? date_string.replace(/(\ )(\d{2}:\d{2})$/, 'T$2Z') : '' );
		r.setMinutes( r.getMinutes() + r.getTimezoneOffset() );
		return r;
	},

	_getTimeOptions:function( date ){
		var result = [],
			hash = this._availableDateConverted || null;

		if ( hash && hash[date] ) {
			var time, time_string;
			for( time in hash[date].times ) {
				result.push({
					val: time,
					text: Theme.formatter.sprintf(
						this.timeSeletTextFormat,
						this.timeFormat ? Theme.formatter.time( time, this.timeFormat ) : time,
						hash[date].times[time]
					)
				});
			}
		}

		return result;
	},

	// variation related methods
	_initVariations:function(){
		var form = this.getForm(),
			self = this,
			quantity_fields = this._getQuantityFields( true ),
			is_ajax_price_calculation = this.renderPriceDetails && this.itemsDataPriceUrl,
			wc_deposit_fields = is_ajax_price_calculation ? form.find('[name^=wc_deposit_]') : null;

		if ( ! this.variationsData ) {
			if ( this.plainPriceData ) {
				var form_change_handler = function() {
					self._renderPriceDetails( self.plainPriceData )
				};

				this._getDateField().on('change', form_change_handler);

				quantity_fields.on('change', form_change_handler).trigger( 'change' );

				if ( wc_deposit_fields ) {
					wc_deposit_fields.on('change', form_change_handler );
				}

				form_change_handler();
			}
			return;
		}

		var form_change_handler = function() {
			self._renderPriceDetails( self._current_variation_config )
		};

		this._getDateField().on('change', form_change_handler);
		quantity_fields.on('change', form_change_handler);

		if ( wc_deposit_fields ) {
			wc_deposit_fields.on('change', form_change_handler );
		}

		var attrib_change_handler = function(){
			var config = self._getVariationFor( self._readAttributesValues() );

			self._current_variation_config = config;

			if ( jQuery.isArray( config ) ) {
				self._getQuantityFields( true ).each(function( index, qfield ){
					var cur_config = config[ index ] ? config[ index ] : null,
						var_id = cur_config && cur_config.variation_id ? cur_config.variation_id : null,
						field = jQuery(qfield);
					self._getVariationFieldForQuanityField( field )
						.val( var_id )
						.trigger('change');
					field.prop('disabled', ! var_id );
				})
			} else {
				self._getVariationFieldForQuanityField( self._getQuantityFields( true ) )
					.val( config && config.variation_id ? config.variation_id : null )
					.trigger('change');
			}

			self._renderPriceDetails( self._current_variation_config );
		};

		this._attribute_fields = form.find('[name^="attribute_"]').on('change', attrib_change_handler);
		attrib_change_handler();
	},

	_is_multi_quantity:function(){
		var fields = this._getQuantityFields( false );
		return fields.length > 1;
	},

	_getVariationFieldForQuanityField:function( field_el ){
		var field = jQuery(field_el),
			postfix = field.attr('name').replace('quantity_', '');
		if ( postfix == 'quantity' ) {
			return this.getForm().find('[name=variation_id]');
		} else {
			return this.getForm().find('[name=variation_id_'+postfix+']');
		}
	},

	_getQuantityFields:function( editableOnly ){
		var allQFields = this.getForm().find('[name^=quantity]');

		if ( allQFields.length > 1 && editableOnly ) {
			return allQFields.not('[name=quantity]');
		}

		return allQFields;
	},

	_renderPriceDetails:function( config ){
		if ( ! this.renderPriceDetails ) {
			return;
		}

		var form = this.getForm(),
			submitBtn = form.find('[type=submit]'),
			price_element = form.find('[data-role="price-explanation"]'),
			progress_indicator_class = 'form-block__price-details--in-progress';

		var set_form_state = function( is_valid, html ) {
			price_element.html( html ? html : '' );
			if ( is_valid ) {
				submitBtn.removeAttr('disabled');
			} else {
				submitBtn.attr('disabled', 'disabled');
			}
		};

		if ( this.itemsDataPriceUrl ) {
			submitBtn.attr('disabled', 'disabled');

			this._getFormPriceItemsData( this.itemsDataPriceUrl, form.serializeArray(), false, function( response ) {
				var is_success = response && response.success,
					as_html = response.as_html ? response.as_html : '';
				set_form_state( is_success, as_html );
			}, function( in_progress ){
				if ( ! progress_indicator_class || price_element.hasClass( progress_indicator_class ) == in_progress ) {
					return;
				}
				if ( in_progress ) {
					price_element.addClass( progress_indicator_class );
				} else {
					price_element.removeClass( progress_indicator_class );
				}
			});
		} else {
			// local price calculations
			var cfg_set = jQuery.isArray( config ) ? config : [ config ];

			var explanation_parts = [],
				total_price = 0,
				qfields = this._getQuantityFields( true );

			qfields.each(function(index, field){
				var quantity = parseInt( jQuery(field).val(), 10 ),
					cur_cfg = cfg_set[ index ];

				var price = cur_cfg && cur_cfg.display_price ? cur_cfg.display_price : null
				if ( price && quantity > 0 ) {
					var line_price = quantity * price;
					explanation_parts.push(
						quantity + ' x ' + Theme.formatter.formatMoney( price ) + ' = ' + Theme.formatter.formatMoney( line_price )
					);

					total_price += line_price;
				}
			});

			if ( explanation_parts.length > 0 ) {
				if ( explanation_parts.length > 1 ) {
					explanation_parts.push( Theme.formatter.formatMoney( total_price ) );
				}

				set_form_state( true, explanation_parts.join('<br>') );
			} else {
				set_form_state( false, '' );
			}
		}
	},

	_getFormPriceItemsData:function( url, data, refreshCache, callback, request_state_callback ){
		var cacke_key = url + JSON.stringify(data);

		if ( this.__price_request_in_progress ) {
			if ( ! this.__price_request_next ) {
				this.__price_request_next = [];
			}
			this.__price_request_next.push( arguments );
			return;
		}

		if ( !this._price_requests_cache[ cacke_key ] || refreshCache ) {
			this.__price_request_in_progress = true;

			jQuery(data).each(function(index, el){
				if ( el.name == 'add-to-cart' ) {
					el.name = 'product_id';
				}
			});

			data.push({
				name: '_t',
				value: Date.now()
			});

			if ( jQuery.isFunction( request_state_callback ) ) {
				request_state_callback( true );
			}

			jQuery.ajax( {
				url:url,
				data:data,
				dataType:'json',
				method:'POST',
				complete:function( xhr, status ){
					var response = xhr.responseJSON ? xhr.responseJSON : {};

					this._price_requests_cache[ cacke_key ] = response;

					if ( jQuery.isFunction( callback ) ) {
						callback( this._price_requests_cache[ cacke_key ] );
					}

					if ( jQuery.isFunction( request_state_callback ) ) {
						request_state_callback( false );
					}

					this.__price_request_in_progress = false;
					if ( this.__price_request_next && this.__price_request_next.length > 0 ) {
						this._getFormPriceItemsData.apply( this, this.__price_request_next.pop() );
					}
				},
				context: this
			});
			return;
		}
		if ( jQuery.isFunction( callback ) ) {
			callback( this._price_requests_cache[ cacke_key ] );
		}
	},

	_readAttributesValues:function(){
		var result = {};
		if (this._attribute_fields) {
			this._attribute_fields.each(function(){
				result[this.name] = jQuery(this).val();
			});
		}

		if ( this._is_multi_quantity() ) {
			var complex_result = [];
			this._getQuantityFields( true ).each(function(index, field){

				var cur_field = jQuery(field),
					rewrites = {},
					attrib_name = cur_field.data('quantityattribute');
				if ( ! attrib_name ) {
					throw 'System error. Incorrect field configuration.';
				}
				rewrites[attrib_name] = cur_field.attr('name').replace('quantity_','');
				complex_result.push(jQuery.extend( {}, result, rewrites));
			});
			return complex_result;
		}

		return result;
	},

	_getVariationFor:function( attributes ){
		if ( jQuery.isArray( attributes ) ) {
			var result = [],
				i;
			for( i=0; i<attributes.length; i++ ) {
				result.push( this._getVariationFor( attributes[i] ) );
			}
			return result;
		}

		return this._getMatchedVariations( attributes, true );
	},

	_getMatchedVariations:function( attributes, return_first ){
		var variations_list = this.variationsData;
		if ( ! variations_list || variations_list.length < 1 || jQuery.isEmptyObject( attributes ) ) {
			return return_first ? null : [];
		}

		var i, cur_variation, is_pass,
			at_name, variation_at_value, selected_attribute_value,
			matched = [];

		for( i = 0; i<variations_list.length; i++ ) {
			cur_variation = variations_list[i];
			is_pass = true;
			for( at_name in attributes ) {
				variation_at_value = cur_variation.attributes[at_name];
				if ( variation_at_value && variation_at_value != attributes[at_name] ) {
					is_pass = false;
					break;
				}
			}

			if ( is_pass ) {
				if ( return_first ) {
					return cur_variation;
				}

				matched.push( cur_variation );
			}
		}

		return return_first ? null : matched;
	}
};

Theme.formatter = {
	configs:{},

	setConfig:function( format, cfg ) {
		this.configs[format] = cfg;
	},

	formatMoney:function(amount){
		var cfg = jQuery.extend({
			//mask: '{amount}',
			decimal_separator: '.',
			thousand_separator: ',',
			decimals: 2
		}, this.configs['money'] ? this.configs['money'] : {});

		var formatted = this.formatNumber(amount, cfg.decimals, 3, cfg.thousand_separator, cfg.decimal_separator);

		if ( cfg.mask ) {
			var completed = cfg.mask.replace( '{amount}', formatted );
			if ( completed != cfg.mask ) {
				return completed;
			}
		}

		return formatted;
	},

	formatNumber: function(number, decimals, th, th_sep, dec_sep) {
		var re = '\\d(?=(\\d{' + (th || 3) + '})+' + (decimals > 0 ? '\\D' : '$') + ')',
			num = number.toFixed(Math.max(0, ~~decimals));

		return (dec_sep ? num.replace('.', dec_sep) : num).replace(new RegExp(re, 'g'), '$&' + (th_sep || ','));
	},

	/**
	 * Allows format strings with %s and %d placeholders.
	 *
	 * @return String
	 */
	sprintf:function() {
		var args = arguments,
			string = args[0],
			i = 1;

		return string.replace(/%((%)|s|d)/g, function (m) {
			// m is the matched format, e.g. %s, %d
			var val = null;
			if (m[2]) {
				val = m[2];
			} else {
				val = args[i];
				switch (m) {
				case '%d':
					val = parseFloat(val);
					if (isNaN(val)) val = 0;
					break;
				}
				i++;
			}
			return val;
		});
	},

	time:function(time_in_24_hours, format){
		if ( ! format || format == 'hh:ii' ) {
			return time_in_24_hours;
		}

		var parts = time_in_24_hours.split(':'),
			result = format.replace('ii', parts[1]),
			h = parseInt(parts[0],10),
			is_12_hours_format = format.search('A') >= 0,
			is_12_hours_format_lowercase = format.search('a') >= 0,
			new_hour_value = h;


		if ( is_12_hours_format || is_12_hours_format_lowercase ) {
			var suffix = h >= 12 ? ' PM' : ' AM';
			result = result.replace( is_12_hours_format_lowercase ? 'a' : 'A', is_12_hours_format_lowercase ? suffix.toLowerCase() : suffix );
			if ( new_hour_value >= 12 ) {
				new_hour_value -= 12;
			}
		}

		if ( format.search('hh') >= 0 ) {
			result = result.replace('hh', ( new_hour_value < 10 ? '0' : '' ) + new_hour_value );
		} else {
			result = result.replace('h', new_hour_value );
		}

		return result;
	}
};

jQuery(function($){
	Theme.init($);
});
