/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
;(function ($, document, window) {
    var
    // default settings object.
        defaults = {
            label: 'MENU',
            duplicate: true,
            duration: 200,
            easingOpen: 'swing',
            easingClose: 'swing',
            closedSymbol: '&#9658;',
            openedSymbol: '&#9660;',
            prependTo: 'body',
            parentTag: 'a',
            closeOnClick: false,
            allowParentLinks: false,
            nestedParentLinks: true,
            showChildren: false,
            removeIds: false,
            removeClasses: false,
			brand: '',
            init: function () {},
            beforeOpen: function () {},
            beforeClose: function () {},
            afterOpen: function () {},
            afterClose: function () {}
        },
        mobileMenu = 'slicknav',
        prefix = 'slicknav';

    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = mobileMenu;

        this.init();
    }

    Plugin.prototype.init = function () {
        var $this = this,
            menu = $(this.element),
            settings = this.settings,
            iconClass,
            menuBar;

        // clone menu if needed
        if (settings.duplicate) {
            $this.mobileNav = menu.clone();
            //remove ids from clone to prevent css issues
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('id');
            });
        } else {
            $this.mobileNav = menu;
            
            // remove ids if set
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('id');
            });
        }
        
        // remove classes if set
        if (settings.removeClasses) {
            $this.mobileNav.removeAttr('class');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('class');
            });
        }

        // styling class for the button
        iconClass = prefix + '_icon';

        if (settings.label === '') {
            iconClass += ' ' + prefix + '_no-text';
        }

        if (settings.parentTag == 'a') {
            settings.parentTag = 'a href="#"';
        }

        // create menu bar
        $this.mobileNav.attr('class', prefix + '_nav');
        menuBar = $('<div class="' + prefix + '_menu"></div>');
		if (settings.brand !== '') {
			var brand = $('<div class="' + prefix + '_brand">'+settings.brand+'</div>');
			$(menuBar).append(brand);
		}
        $this.btn = $(
            ['<' + settings.parentTag + ' aria-haspopup="true" tabindex="0" class="' + prefix + '_btn ' + prefix + '_collapsed">',
                '<span class="' + prefix + '_menutxt">' + settings.label + '</span>',
                '<span class="' + iconClass + '">',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                '</span>',
            '</' + settings.parentTag + '>'
            ].join('')
        );
        $(menuBar).append($this.btn);
        $(settings.prependTo).prepend(menuBar);
        menuBar.append($this.mobileNav);

        // iterate over structure adding additional structure
        var items = $this.mobileNav.find('li');
        $(items).each(function () {
            var item = $(this),
                data = {};
            data.children = item.children('ul').attr('role', 'menu');
            item.data('menu', data);

            // if a list item has a nested menu
            if (data.children.length > 0) {

                // select all text before the child menu
                // check for anchors

                var a = item.contents(),
                    containsAnchor = false,
                    nodes = [];

                $(a).each(function () {
                    if (!$(this).is('ul')) {
                        nodes.push(this);
                    } else {
                        return false;
                    }

                    if($(this).is("a")) {
                        containsAnchor = true;
                    }
                });

                var wrapElement = $(
                    '<' + settings.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + prefix + '_item"/>'
                );

                // wrap item text with tag and add classes unless we are separating parent links
                if ((!settings.allowParentLinks || settings.nestedParentLinks) || !containsAnchor) {
                    var $wrap = $(nodes).wrapAll(wrapElement).parent();
                    $wrap.addClass(prefix+'_row');
                } else
                    $(nodes).wrapAll('<span class="'+prefix+'_parent-link '+prefix+'_row"/>').parent();

                if (!settings.showChildren) {
                    item.addClass(prefix+'_collapsed');
                } else {
                    item.addClass(prefix+'_open');
                }
                
                item.addClass(prefix+'_parent');

                // create parent arrow. wrap with link if parent links and separating
                var arrowElement = $('<span class="'+prefix+'_arrow">'+(settings.showChildren?settings.openedSymbol:settings.closedSymbol)+'</span>');

                if (settings.allowParentLinks && !settings.nestedParentLinks && containsAnchor)
                    arrowElement = arrowElement.wrap(wrapElement).parent();

                //append arrow
                $(nodes).last().after(arrowElement);


            } else if ( item.children().length === 0) {
                 item.addClass(prefix+'_txtnode');
            }

            // accessibility for links
            item.children('a').attr('role', 'menuitem').click(function(event){
                //Ensure that it's not a parent
                if (settings.closeOnClick && !$(event.target).parent().closest('li').hasClass(prefix+'_parent')) {
                        //Emulate menu close if set
                        $($this.btn).click();
                    }
            });

            //also close on click if parent links are set
            if (settings.closeOnClick && settings.allowParentLinks) {
                item.children('a').children('a').click(function (event) {
                    //Emulate menu close
                    $($this.btn).click();
                });

                item.find('.'+prefix+'_parent-link a:not(.'+prefix+'_item)').click(function(event){
                    //Emulate menu close
                        $($this.btn).click();
                });
            }
        });

        // structure is in place, now hide appropriate items
        $(items).each(function () {
            var data = $(this).data('menu');
            if (!settings.showChildren){
                $this._visibilityToggle(data.children, null, false, null, true);
            }
        });

        // finally toggle entire menu
        $this._visibilityToggle($this.mobileNav, null, false, 'init', true);

        // accessibility for menu button
        $this.mobileNav.attr('role','menu');

        // outline prevention when using mouse
        $(document).mousedown(function(){
            $this._outlines(false);
        });

        $(document).keyup(function(){
            $this._outlines(true);
        });

        // menu button click
        $($this.btn).click(function (e) {
            e.preventDefault();
            $this._menuToggle();
        });

        // click on menu parent
        $this.mobileNav.on('click', '.' + prefix + '_item', function (e) {
            e.preventDefault();
            $this._itemClick($(this));
        });

        // check for enter key on menu button and menu parents
        $($this.btn).keydown(function (e) {
            var ev = e || event;
            if(ev.keyCode == 13) {
                e.preventDefault();
                $this._menuToggle();
            }
        });

        $this.mobileNav.on('keydown', '.'+prefix+'_item', function(e) {
            var ev = e || event;
            if(ev.keyCode == 13) {
                e.preventDefault();
                $this._itemClick($(e.target));
            }
        });

        // allow links clickable within parent tags if set
        if (settings.allowParentLinks && settings.nestedParentLinks) {
            $('.'+prefix+'_item a').click(function(e){
                    e.stopImmediatePropagation();
            });
        }
    };

    //toggle menu
    Plugin.prototype._menuToggle = function (el) {
        var $this = this;
        var btn = $this.btn;
        var mobileNav = $this.mobileNav;

        if (btn.hasClass(prefix+'_collapsed')) {
            btn.removeClass(prefix+'_collapsed');
            btn.addClass(prefix+'_open');
        } else {
            btn.removeClass(prefix+'_open');
            btn.addClass(prefix+'_collapsed');
        }
        btn.addClass(prefix+'_animating');
        $this._visibilityToggle(mobileNav, btn.parent(), true, btn);
    };

    // toggle clicked items
    Plugin.prototype._itemClick = function (el) {
        var $this = this;
        var settings = $this.settings;
        var data = el.data('menu');
        if (!data) {
            data = {};
            data.arrow = el.children('.'+prefix+'_arrow');
            data.ul = el.next('ul');
            data.parent = el.parent();
            //Separated parent link structure
            if (data.parent.hasClass(prefix+'_parent-link')) {
                data.parent = el.parent().parent();
                data.ul = el.parent().next('ul');
            }
            el.data('menu', data);
        }
        if (data.parent.hasClass(prefix+'_collapsed')) {
            data.arrow.html(settings.openedSymbol);
            data.parent.removeClass(prefix+'_collapsed');
            data.parent.addClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        } else {
            data.arrow.html(settings.closedSymbol);
            data.parent.addClass(prefix+'_collapsed');
            data.parent.removeClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        }
    };

    // toggle actual visibility and accessibility tags
    Plugin.prototype._visibilityToggle = function(el, parent, animate, trigger, init) {
        var $this = this;
        var settings = $this.settings;
        var items = $this._getActionItems(el);
        var duration = 0;
        if (animate) {
            duration = settings.duration;
        }

        if (el.hasClass(prefix+'_hidden')) {
            el.removeClass(prefix+'_hidden');
             //Fire beforeOpen callback
                if (!init) {
                    settings.beforeOpen(trigger);
                }
            el.slideDown(duration, settings.easingOpen, function(){

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire afterOpen callback
                if (!init) {
                    settings.afterOpen(trigger);
                }
            });
            el.attr('aria-hidden','false');
            items.attr('tabindex', '0');
            $this._setVisAttr(el, false);
        } else {
            el.addClass(prefix+'_hidden');
            	
            //Fire init or beforeClose callback
            if (!init){
                settings.beforeClose(trigger);
            }else if (trigger == 'init'){
                settings.init();
            }
            
            el.slideUp(duration, this.settings.easingClose, function() {
                el.attr('aria-hidden','true');
                items.attr('tabindex', '-1');
                $this._setVisAttr(el, true);
                el.hide(); //jQuery 1.7 bug fix
                
                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire init or afterClose callback
                if (!init){
                    settings.afterClose(trigger);
                }
                else if (trigger == 'init'){
                    settings.init();
                }
            });
        }
    };

    // set attributes of element and children based on visibility
    Plugin.prototype._setVisAttr = function(el, hidden) {
        var $this = this;

        // select all parents that aren't hidden
        var nonHidden = el.children('li').children('ul').not('.'+prefix+'_hidden');

        // iterate over all items setting appropriate tags
        if (!hidden) {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','false');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '0');
                $this._setVisAttr(ul, hidden);
            });
        } else {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','true');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '-1');
                $this._setVisAttr(ul, hidden);
            });
        }
    };

    // get all 1st level items that are clickable
    Plugin.prototype._getActionItems = function(el) {
        var data = el.data("menu");
        if (!data) {
            data = {};
            var items = el.children('li');
            var anchors = items.find('a');
            data.links = anchors.add(items.find('.'+prefix+'_item'));
            el.data('menu', data);
        }
        return data.links;
    };

    Plugin.prototype._outlines = function(state) {
        if (!state) {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','none');
        } else {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','');
        }
    };

    Plugin.prototype.toggle = function(){
        var $this = this;
        $this._menuToggle();
    };

    Plugin.prototype.open = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_collapsed')) {
            $this._menuToggle();
        }
    };

    Plugin.prototype.close = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_open')) {
            $this._menuToggle();
        }
    };

    $.fn[mobileMenu] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once due to methods
                if (!$.data(this, 'plugin_' + mobileMenu)) {

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + mobileMenu, new Plugin( this, options ));
                }
            });

        // If is a string and doesn't start with an underscore or 'init' function, treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + mobileMenu);

                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });

            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };
}(jQuery, document, window));

/*! Magnific Popup - v1.0.0 - 2015-01-03
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2015 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isIE7=-1!==c.indexOf("MSIE 7."),b.isIE8=-1!==c.indexOf("MSIE 8."),b.isLowIE=b.isIE7||b.isIE8,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",b.ev=c.mainEl&&c.mainEl.length?c.mainEl.eq(0):d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.wrap.css(b.fixedContentPos?{overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}:{top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),b.currTemplate[d]=f?a(f):!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||2!==c.which&&!c.ctrlKey&&!c.metaKey){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(a,c){if(void 0===c||c===!1)return!0;if(e=a.split("_"),e.length>1){var d=b.find(p+"-"+e[0]);if(d.length>0){var f=e[1];"replaceWith"===f?d[0]!==c[0]&&d.replaceWith(c):"img"===f?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(p+"-"+a).html(c)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery",g=Boolean(a.fn.mfpFastClick);return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s),h=g?"mfpFastClick":"click";e[h](function(){b.prev()}),f[h](function(){b.next()}),b.isIE7&&(x("b",e[0],!1,!0),x("a",e[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowLeft&&g&&b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),function(){var b=1e3,c="ontouchstart"in window,d=function(){v.off("touchmove"+f+" touchend"+f)},e="mfpFastClick",f="."+e;a.fn.mfpFastClick=function(e){return a(this).each(function(){var g,h=a(this);if(c){var i,j,k,l,m,n;h.on("touchstart"+f,function(a){l=!1,n=1,m=a.originalEvent?a.originalEvent.touches[0]:a.touches[0],j=m.clientX,k=m.clientY,v.on("touchmove"+f,function(a){m=a.originalEvent?a.originalEvent.touches:a.touches,n=m.length,m=m[0],(Math.abs(m.clientX-j)>10||Math.abs(m.clientY-k)>10)&&(l=!0,d())}).on("touchend"+f,function(a){d(),l||n>1||(g=!0,a.preventDefault(),clearTimeout(i),i=setTimeout(function(){g=!1},b),e())})})}h.on("click"+f,function(){g||e()})})},a.fn.destroyMfpFastClick=function(){a(this).off("touchstart"+f+" click"+f),c&&v.off("touchmove"+f+" touchend"+f)}}(),A()});
(function($){'use strict';$.expr[':'].icontains=function(obj,index,meta){return icontains($(obj).text(),meta[3])};$.expr[':'].aicontains=function(obj,index,meta){return icontains($(obj).data('normalizedText')||$(obj).text(),meta[3])};function icontains(haystack,needle){return haystack.toUpperCase().indexOf(needle.toUpperCase())>-1}function normalizeToBase(text){var rExps=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];$.each(rExps,function(){text=text.replace(this.re,this.ch)});return text}function htmlEscape(html){var escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;','`':'&#x60;'};var source='(?:'+Object.keys(escapeMap).join('|')+')',testRegexp=new RegExp(source),replaceRegexp=new RegExp(source,'g'),string=html==null?'':''+html;return testRegexp.test(string)?string.replace(replaceRegexp,function(match){return escapeMap[match]}):string}var Selectpicker=function(element,options,e){if(e){e.stopPropagation();e.preventDefault()}this.$element=$(element);this.$newElement=null;this.$button=null;this.$menu=null;this.$lis=null;this.options=options;if(this.options.title===null){this.options.title=this.$element.attr('title')}this.val=Selectpicker.prototype.val;this.render=Selectpicker.prototype.render;this.refresh=Selectpicker.prototype.refresh;this.setStyle=Selectpicker.prototype.setStyle;this.selectAll=Selectpicker.prototype.selectAll;this.deselectAll=Selectpicker.prototype.deselectAll;this.destroy=Selectpicker.prototype.remove;this.remove=Selectpicker.prototype.remove;this.show=Selectpicker.prototype.show;this.hide=Selectpicker.prototype.hide;this.init()};Selectpicker.VERSION='1.6.3';Selectpicker.DEFAULTS={noneSelectedText:'Nothing selected',noneResultsText:'No results match',countSelectedText:function(numSelected,numTotal){return(numSelected==1)?"{0} item selected":"{0} items selected"},maxOptionsText:function(numAll,numGroup){var arr=[];arr[0]=(numAll==1)?'Limit reached ({n} item max)':'Limit reached ({n} items max)';arr[1]=(numGroup==1)?'Group limit reached ({n} item max)':'Group limit reached ({n} items max)';return arr},selectAllText:'Select All',deselectAllText:'Deselect All',multipleSeparator:', ',style:'btn-default',size:'auto',title:null,selectedTextFormat:'values',width:false,container:false,hideDisabled:false,showSubtext:false,showIcon:true,showContent:true,dropupAuto:true,header:false,liveSearch:false,actionsBox:false,iconBase:'glyphicon',tickIcon:'glyphicon-ok',maxOptions:false,mobile:false,selectOnTab:false,dropdownAlignRight:false,searchAccentInsensitive:false};Selectpicker.prototype={constructor:Selectpicker,init:function(){var that=this,id=this.$element.attr('id');this.$element.hide();this.multiple=this.$element.prop('multiple');this.autofocus=this.$element.prop('autofocus');this.$newElement=this.createView();this.$element.after(this.$newElement);this.$menu=this.$newElement.find('> .dropdown-menu');this.$button=this.$newElement.find('> button');this.$searchbox=this.$newElement.find('input');if(this.options.dropdownAlignRight)this.$menu.addClass('dropdown-menu-right');if(typeof id!=='undefined'){this.$button.attr('data-id',id);$('label[for="'+id+'"]').click(function(e){e.preventDefault();that.$button.focus()})}this.checkDisabled();this.clickListener();if(this.options.liveSearch)this.liveSearchListener();this.render();this.liHeight();this.setStyle();this.setWidth();if(this.options.container)this.selectPosition();this.$menu.data('this',this);this.$newElement.data('this',this);if(this.options.mobile)this.mobile()},createDropdown:function(){var multiple=this.multiple?' show-tick':'',inputGroup=this.$element.parent().hasClass('input-group')?' input-group-btn':'',autofocus=this.autofocus?' autofocus':'',btnSize=this.$element.parents().hasClass('form-group-lg')?' btn-lg':(this.$element.parents().hasClass('form-group-sm')?' btn-sm':'');var header=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+'</div>':'';var searchbox=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>':'';var actionsbox=this.options.actionsBox?'<div class="bs-actionsbox">'+'<div class="btn-group btn-block">'+'<button class="actions-btn bs-select-all btn btn-sm btn-default">'+this.options.selectAllText+'</button>'+'<button class="actions-btn bs-deselect-all btn btn-sm btn-default">'+this.options.deselectAllText+'</button>'+'</div>'+'</div>':'';var drop='<div class="btn-group bootstrap-select'+multiple+inputGroup+'">'+'<button type="button" class="btn dropdown-toggle selectpicker'+btnSize+'" data-toggle="dropdown"'+autofocus+'>'+'<span class="filter-option pull-left"></span>&nbsp;'+'<span class="caret"></span>'+'</button>'+'<div class="dropdown-menu open">'+header+searchbox+actionsbox+'<ul class="dropdown-menu inner selectpicker" role="menu">'+'</ul>'+'</div>'+'</div>';return $(drop)},createView:function(){var $drop=this.createDropdown();var $li=this.createLi();$drop.find('ul').append($li);return $drop},reloadLi:function(){this.destroyLi();var $li=this.createLi();this.$menu.find('ul').append($li)},destroyLi:function(){this.$menu.find('li').remove()},createLi:function(){var that=this,_li=[],optID=0;var generateLI=function(content,index,classes){return'<li'+(typeof classes!=='undefined'?' class="'+classes+'"':'')+(typeof index!=='undefined'|null===index?' data-original-index="'+index+'"':'')+'>'+content+'</li>'};var generateA=function(text,classes,inline,optgroup){var normText=normalizeToBase(htmlEscape(text));return'<a tabindex="0"'+(typeof classes!=='undefined'?' class="'+classes+'"':'')+(typeof inline!=='undefined'?' style="'+inline+'"':'')+(typeof optgroup!=='undefined'?'data-optgroup="'+optgroup+'"':'')+' data-normalized-text="'+normText+'"'+'>'+text+'<span class="'+that.options.iconBase+' '+that.options.tickIcon+' check-mark"></span>'+'</a>'};this.$element.find('option').each(function(){var $this=$(this);var optionClass=$this.attr('class')||'',inline=$this.attr('style'),text=$this.data('content')?$this.data('content'):$this.html(),subtext=typeof $this.data('subtext')!=='undefined'?'<small class="muted text-muted">'+$this.data('subtext')+'</small>':'',icon=typeof $this.data('icon')!=='undefined'?'<span class="'+that.options.iconBase+' '+$this.data('icon')+'"></span> ':'',isDisabled=$this.is(':disabled')||$this.parent().is(':disabled'),index=$this[0].index;if(icon!==''&&isDisabled){icon='<span>'+icon+'</span>'}if(!$this.data('content')){text=icon+'<span class="text">'+text+subtext+'</span>'}if(that.options.hideDisabled&&isDisabled){return}if($this.parent().is('optgroup')&&$this.data('divider')!==true){if($this.index()===0){optID+=1;var label=$this.parent().attr('label');var labelSubtext=typeof $this.parent().data('subtext')!=='undefined'?'<small class="muted text-muted">'+$this.parent().data('subtext')+'</small>':'';var labelIcon=$this.parent().data('icon')?'<span class="'+that.options.iconBase+' '+$this.parent().data('icon')+'"></span> ':'';label=labelIcon+'<span class="text">'+label+labelSubtext+'</span>';if(index!==0&&_li.length>0){_li.push(generateLI('',null,'divider'))}_li.push(generateLI(label,null,'dropdown-header'))}_li.push(generateLI(generateA(text,'opt '+optionClass,inline,optID),index))}else if($this.data('divider')===true){_li.push(generateLI('',index,'divider'))}else if($this.data('hidden')===true){_li.push(generateLI(generateA(text,optionClass,inline),index,'hide is-hidden'))}else{_li.push(generateLI(generateA(text,optionClass,inline),index))}});if(!this.multiple&&this.$element.find('option:selected').length===0&&!this.options.title){this.$element.find('option').eq(0).prop('selected',true).attr('selected','selected')}return $(_li.join(''))},findLis:function(){if(this.$lis==null)this.$lis=this.$menu.find('li');return this.$lis},render:function(updateLi){var that=this;if(updateLi!==false){this.$element.find('option').each(function(index){that.setDisabled(index,$(this).is(':disabled')||$(this).parent().is(':disabled'));that.setSelected(index,$(this).is(':selected'))})}this.tabIndex();var notDisabled=this.options.hideDisabled?':not([disabled])':'';var selectedItems=this.$element.find('option:selected'+notDisabled).map(function(){var $this=$(this);var icon=$this.data('icon')&&that.options.showIcon?'<i class="'+that.options.iconBase+' '+$this.data('icon')+'"></i> ':'';var subtext;if(that.options.showSubtext&&$this.attr('data-subtext')&&!that.multiple){subtext=' <small class="muted text-muted">'+$this.data('subtext')+'</small>'}else{subtext=''}if($this.data('content')&&that.options.showContent){return $this.data('content')}else if(typeof $this.attr('title')!=='undefined'){return $this.attr('title')}else{return icon+$this.html()+subtext}}).toArray();var title=!this.multiple?selectedItems[0]:selectedItems.join(this.options.multipleSeparator);if(this.multiple&&this.options.selectedTextFormat.indexOf('count')>-1){var max=this.options.selectedTextFormat.split('>');if((max.length>1&&selectedItems.length>max[1])||(max.length==1&&selectedItems.length>=2)){notDisabled=this.options.hideDisabled?', [disabled]':'';var totalCount=this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]'+notDisabled).length,tr8nText=(typeof this.options.countSelectedText==='function')?this.options.countSelectedText(selectedItems.length,totalCount):this.options.countSelectedText;title=tr8nText.replace('{0}',selectedItems.length.toString()).replace('{1}',totalCount.toString())}}this.options.title=this.$element.attr('title');if(this.options.selectedTextFormat=='static'){title=this.options.title}if(!title){title=typeof this.options.title!=='undefined'?this.options.title:this.options.noneSelectedText}this.$button.attr('title',htmlEscape(title));this.$newElement.find('.filter-option').html(title)},setStyle:function(style,status){if(this.$element.attr('class')){this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|validate\[.*\]/gi,''))}var buttonClass=style?style:this.options.style;if(status=='add'){this.$button.addClass(buttonClass)}else if(status=='remove'){this.$button.removeClass(buttonClass)}else{this.$button.removeClass(this.options.style);this.$button.addClass(buttonClass)}},liHeight:function(){if(this.options.size===false)return;var $selectClone=this.$menu.parent().clone().find('> .dropdown-toggle').prop('autofocus',false).end().appendTo('body'),$menuClone=$selectClone.addClass('open').find('> .dropdown-menu'),liHeight=$menuClone.find('li').not('.divider').not('.dropdown-header').filter(':visible').children('a').outerHeight(),headerHeight=this.options.header?$menuClone.find('.popover-title').outerHeight():0,searchHeight=this.options.liveSearch?$menuClone.find('.bs-searchbox').outerHeight():0,actionsHeight=this.options.actionsBox?$menuClone.find('.bs-actionsbox').outerHeight():0;$selectClone.remove();this.$newElement.data('liHeight',liHeight).data('headerHeight',headerHeight).data('searchHeight',searchHeight).data('actionsHeight',actionsHeight)},setSize:function(){this.findLis();var that=this,menu=this.$menu,menuInner=menu.find('.inner'),selectHeight=this.$newElement.outerHeight(),liHeight=this.$newElement.data('liHeight'),headerHeight=this.$newElement.data('headerHeight'),searchHeight=this.$newElement.data('searchHeight'),actionsHeight=this.$newElement.data('actionsHeight'),divHeight=this.$lis.filter('.divider').outerHeight(true),menuPadding=parseInt(menu.css('padding-top'))+parseInt(menu.css('padding-bottom'))+parseInt(menu.css('border-top-width'))+parseInt(menu.css('border-bottom-width')),notDisabled=this.options.hideDisabled?', .disabled':'',$window=$(window),menuExtras=menuPadding+parseInt(menu.css('margin-top'))+parseInt(menu.css('margin-bottom'))+2,menuHeight,selectOffsetTop,selectOffsetBot,posVert=function(){selectOffsetTop=that.$newElement.offset().top-$window.scrollTop();selectOffsetBot=$window.height()-selectOffsetTop-selectHeight};posVert();if(this.options.header)menu.css('padding-top',0);if(this.options.size=='auto'){var getSize=function(){var minHeight,lisVis=that.$lis.not('.hide');posVert();menuHeight=selectOffsetBot-menuExtras;if(that.options.dropupAuto){that.$newElement.toggleClass('dropup',(selectOffsetTop>selectOffsetBot)&&((menuHeight-menuExtras)<menu.height()))}if(that.$newElement.hasClass('dropup')){menuHeight=selectOffsetTop-menuExtras}if((lisVis.length+lisVis.filter('.dropdown-header').length)>3){minHeight=liHeight*3+menuExtras-2}else{minHeight=0}menu.css({'max-height':menuHeight+'px','overflow':'hidden','min-height':minHeight+headerHeight+searchHeight+actionsHeight+'px'});menuInner.css({'max-height':menuHeight-headerHeight-searchHeight-actionsHeight-menuPadding+'px','overflow-y':'auto','min-height':Math.max(minHeight-menuPadding,0)+'px'})};getSize();this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize',getSize);$(window).off('resize.getSize').on('resize.getSize',getSize);$(window).off('scroll.getSize').on('scroll.getSize',getSize)}else if(this.options.size&&this.options.size!='auto'&&menu.find('li'+notDisabled).length>this.options.size){var optIndex=this.$lis.not('.divider'+notDisabled).find(' > *').slice(0,this.options.size).last().parent().index();var divLength=this.$lis.slice(0,optIndex+1).filter('.divider').length;menuHeight=liHeight*this.options.size+divLength*divHeight+menuPadding;if(that.options.dropupAuto){this.$newElement.toggleClass('dropup',(selectOffsetTop>selectOffsetBot)&&(menuHeight<menu.height()))}menu.css({'max-height':menuHeight+headerHeight+searchHeight+actionsHeight+'px','overflow':'hidden'});menuInner.css({'max-height':menuHeight-menuPadding+'px','overflow-y':'auto'})}},setWidth:function(){if(this.options.width=='auto'){this.$menu.css('min-width','0');var selectClone=this.$newElement.clone().appendTo('body');var ulWidth=selectClone.find('> .dropdown-menu').css('width');var btnWidth=selectClone.css('width','auto').find('> button').css('width');selectClone.remove();this.$newElement.css('width',Math.max(parseInt(ulWidth),parseInt(btnWidth))+'px')}else if(this.options.width=='fit'){this.$menu.css('min-width','');this.$newElement.css('width','').addClass('fit-width')}else if(this.options.width){this.$menu.css('min-width','');this.$newElement.css('width',this.options.width)}else{this.$menu.css('min-width','');this.$newElement.css('width','')}if(this.$newElement.hasClass('fit-width')&&this.options.width!=='fit'){this.$newElement.removeClass('fit-width')}},selectPosition:function(){var that=this,drop='<div />',$drop=$(drop),pos,actualHeight,getPlacement=function($element){$drop.addClass($element.attr('class').replace(/form-control/gi,'')).toggleClass('dropup',$element.hasClass('dropup'));pos=$element.offset();actualHeight=$element.hasClass('dropup')?0:$element[0].offsetHeight;$drop.css({'top':pos.top+actualHeight,'left':pos.left,'width':$element[0].offsetWidth,'position':'absolute'})};this.$newElement.on('click',function(){if(that.isDisabled()){return}getPlacement($(this));$drop.appendTo(that.options.container);$drop.toggleClass('open',!$(this).hasClass('open'));$drop.append(that.$menu)});$(window).resize(function(){getPlacement(that.$newElement)});$(window).on('scroll',function(){getPlacement(that.$newElement)});$('html').on('click',function(e){if($(e.target).closest(that.$newElement).length<1){$drop.removeClass('open')}})},setSelected:function(index,selected){this.findLis();this.$lis.filter('[data-original-index="'+index+'"]').toggleClass('selected',selected)},setDisabled:function(index,disabled){this.findLis();if(disabled){this.$lis.filter('[data-original-index="'+index+'"]').addClass('disabled').find('a').attr('href','#').attr('tabindex',-1)}else{this.$lis.filter('[data-original-index="'+index+'"]').removeClass('disabled').find('a').removeAttr('href').attr('tabindex',0)}},isDisabled:function(){return this.$element.is(':disabled')},checkDisabled:function(){var that=this;if(this.isDisabled()){this.$button.addClass('disabled').attr('tabindex',-1)}else{if(this.$button.hasClass('disabled')){this.$button.removeClass('disabled')}if(this.$button.attr('tabindex')==-1){if(!this.$element.data('tabindex'))this.$button.removeAttr('tabindex')}}this.$button.click(function(){return!that.isDisabled()})},tabIndex:function(){if(this.$element.is('[tabindex]')){this.$element.data('tabindex',this.$element.attr('tabindex'));this.$button.attr('tabindex',this.$element.data('tabindex'))}},clickListener:function(){var that=this;this.$newElement.on('touchstart.dropdown','.dropdown-menu',function(e){e.stopPropagation()});this.$newElement.on('click',function(){that.setSize();if(!that.options.liveSearch&&!that.multiple){setTimeout(function(){that.$menu.find('.selected a').focus()},10)}});this.$menu.on('click','li a',function(e){var $this=$(this),clickedIndex=$this.parent().data('originalIndex'),prevValue=that.$element.val(),prevIndex=that.$element.prop('selectedIndex');if(that.multiple){e.stopPropagation()}e.preventDefault();if(!that.isDisabled()&&!$this.parent().hasClass('disabled')){var $options=that.$element.find('option'),$option=$options.eq(clickedIndex),state=$option.prop('selected'),$optgroup=$option.parent('optgroup'),maxOptions=that.options.maxOptions,maxOptionsGrp=$optgroup.data('maxOptions')||false;if(!that.multiple){$options.prop('selected',false);$option.prop('selected',true);that.$menu.find('.selected').removeClass('selected');that.setSelected(clickedIndex,true)}else{$option.prop('selected',!state);that.setSelected(clickedIndex,!state);$this.blur();if((maxOptions!==false)||(maxOptionsGrp!==false)){var maxReached=maxOptions<$options.filter(':selected').length,maxReachedGrp=maxOptionsGrp<$optgroup.find('option:selected').length;if((maxOptions&&maxReached)||(maxOptionsGrp&&maxReachedGrp)){if(maxOptions&&maxOptions==1){$options.prop('selected',false);$option.prop('selected',true);that.$menu.find('.selected').removeClass('selected');that.setSelected(clickedIndex,true)}else if(maxOptionsGrp&&maxOptionsGrp==1){$optgroup.find('option:selected').prop('selected',false);$option.prop('selected',true);var optgroupID=$this.data('optgroup');that.$menu.find('.selected').has('a[data-optgroup="'+optgroupID+'"]').removeClass('selected');that.setSelected(clickedIndex,true)}else{var maxOptionsArr=(typeof that.options.maxOptionsText==='function')?that.options.maxOptionsText(maxOptions,maxOptionsGrp):that.options.maxOptionsText,maxTxt=maxOptionsArr[0].replace('{n}',maxOptions),maxTxtGrp=maxOptionsArr[1].replace('{n}',maxOptionsGrp),$notify=$('<div class="notify"></div>');if(maxOptionsArr[2]){maxTxt=maxTxt.replace('{var}',maxOptionsArr[2][maxOptions>1?0:1]);maxTxtGrp=maxTxtGrp.replace('{var}',maxOptionsArr[2][maxOptionsGrp>1?0:1])}$option.prop('selected',false);that.$menu.append($notify);if(maxOptions&&maxReached){$notify.append($('<div>'+maxTxt+'</div>'));that.$element.trigger('maxReached.bs.select')}if(maxOptionsGrp&&maxReachedGrp){$notify.append($('<div>'+maxTxtGrp+'</div>'));that.$element.trigger('maxReachedGrp.bs.select')}setTimeout(function(){that.setSelected(clickedIndex,false)},10);$notify.delay(750).fadeOut(300,function(){$(this).remove()})}}}}if(!that.multiple){that.$button.focus()}else if(that.options.liveSearch){that.$searchbox.focus()}if((prevValue!=that.$element.val()&&that.multiple)||(prevIndex!=that.$element.prop('selectedIndex')&&!that.multiple)){that.$element.change()}}});this.$menu.on('click','li.disabled a, .popover-title, .popover-title :not(.close)',function(e){if(e.target==this){e.preventDefault();e.stopPropagation();if(!that.options.liveSearch){that.$button.focus()}else{that.$searchbox.focus()}}});this.$menu.on('click','li.divider, li.dropdown-header',function(e){e.preventDefault();e.stopPropagation();if(!that.options.liveSearch){that.$button.focus()}else{that.$searchbox.focus()}});this.$menu.on('click','.popover-title .close',function(){that.$button.focus()});this.$searchbox.on('click',function(e){e.stopPropagation()});this.$menu.on('click','.actions-btn',function(e){if(that.options.liveSearch){that.$searchbox.focus()}else{that.$button.focus()}e.preventDefault();e.stopPropagation();if($(this).is('.bs-select-all')){that.selectAll()}else{that.deselectAll()}that.$element.change()});this.$element.change(function(){that.render(false)})},liveSearchListener:function(){var that=this,no_results=$('<li class="no-results"></li>');this.$newElement.on('click.dropdown.data-api touchstart.dropdown.data-api',function(){that.$menu.find('.active').removeClass('active');if(!!that.$searchbox.val()){that.$searchbox.val('');that.$lis.not('.is-hidden').removeClass('hide');if(!!no_results.parent().length)no_results.remove()}if(!that.multiple)that.$menu.find('.selected').addClass('active');setTimeout(function(){that.$searchbox.focus()},10)});this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api',function(e){e.stopPropagation()});this.$searchbox.on('input propertychange',function(){if(that.$searchbox.val()){if(that.options.searchAccentInsensitive){that.$lis.not('.is-hidden').removeClass('hide').find('a').not(':aicontains('+normalizeToBase(that.$searchbox.val())+')').parent().addClass('hide')}else{that.$lis.not('.is-hidden').removeClass('hide').find('a').not(':icontains('+that.$searchbox.val()+')').parent().addClass('hide')}if(!that.$menu.find('li').filter(':visible:not(.no-results)').length){if(!!no_results.parent().length)no_results.remove();no_results.html(that.options.noneResultsText+' "'+htmlEscape(that.$searchbox.val())+'"').show();that.$menu.find('li').last().after(no_results)}else if(!!no_results.parent().length){no_results.remove()}}else{that.$lis.not('.is-hidden').removeClass('hide');if(!!no_results.parent().length)no_results.remove()}that.$menu.find('li.active').removeClass('active');that.$menu.find('li').filter(':visible:not(.divider)').eq(0).addClass('active').find('a').focus();$(this).focus()})},val:function(value){if(typeof value!=='undefined'){this.$element.val(value);this.render();return this.$element}else{return this.$element.val()}},selectAll:function(){this.findLis();this.$lis.not('.divider').not('.disabled').not('.selected').filter(':visible').find('a').click()},deselectAll:function(){this.findLis();this.$lis.not('.divider').not('.disabled').filter('.selected').filter(':visible').find('a').click()},keydown:function(e){var $this=$(this),$parent=($this.is('input'))?$this.parent().parent():$this.parent(),$items,that=$parent.data('this'),index,next,first,last,prev,nextPrev,prevIndex,isActive,keyCodeMap={32:' ',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',59:';',65:'a',66:'b',67:'c',68:'d',69:'e',70:'f',71:'g',72:'h',73:'i',74:'j',75:'k',76:'l',77:'m',78:'n',79:'o',80:'p',81:'q',82:'r',83:'s',84:'t',85:'u',86:'v',87:'w',88:'x',89:'y',90:'z',96:'0',97:'1',98:'2',99:'3',100:'4',101:'5',102:'6',103:'7',104:'8',105:'9'};if(that.options.liveSearch)$parent=$this.parent().parent();if(that.options.container)$parent=that.$menu;$items=$('[role=menu] li a',$parent);isActive=that.$menu.parent().hasClass('open');if(!isActive&&/([0-9]|[A-z])/.test(String.fromCharCode(e.keyCode))){if(!that.options.container){that.setSize();that.$menu.parent().addClass('open');isActive=true}else{that.$newElement.trigger('click')}that.$searchbox.focus()}if(that.options.liveSearch){if(/(^9$|27)/.test(e.keyCode.toString(10))&&isActive&&that.$menu.find('.active').length===0){e.preventDefault();that.$menu.parent().removeClass('open');that.$button.focus()}$items=$('[role=menu] li:not(.divider):not(.dropdown-header):visible',$parent);if(!$this.val()&&!/(38|40)/.test(e.keyCode.toString(10))){if($items.filter('.active').length===0){if(that.options.searchAccentInsensitive){$items=that.$newElement.find('li').filter(':aicontains('+normalizeToBase(keyCodeMap[e.keyCode])+')')}else{$items=that.$newElement.find('li').filter(':icontains('+keyCodeMap[e.keyCode]+')')}}}}if(!$items.length)return;if(/(38|40)/.test(e.keyCode.toString(10))){index=$items.index($items.filter(':focus'));first=$items.parent(':not(.disabled):visible').first().index();last=$items.parent(':not(.disabled):visible').last().index();next=$items.eq(index).parent().nextAll(':not(.disabled):visible').eq(0).index();prev=$items.eq(index).parent().prevAll(':not(.disabled):visible').eq(0).index();nextPrev=$items.eq(next).parent().prevAll(':not(.disabled):visible').eq(0).index();if(that.options.liveSearch){$items.each(function(i){if($(this).is(':not(.disabled)')){$(this).data('index',i)}});index=$items.index($items.filter('.active'));first=$items.filter(':not(.disabled):visible').first().data('index');last=$items.filter(':not(.disabled):visible').last().data('index');next=$items.eq(index).nextAll(':not(.disabled):visible').eq(0).data('index');prev=$items.eq(index).prevAll(':not(.disabled):visible').eq(0).data('index');nextPrev=$items.eq(next).prevAll(':not(.disabled):visible').eq(0).data('index')}prevIndex=$this.data('prevIndex');if(e.keyCode==38){if(that.options.liveSearch)index-=1;if(index!=nextPrev&&index>prev)index=prev;if(index<first)index=first;if(index==prevIndex)index=last}if(e.keyCode==40){if(that.options.liveSearch)index+=1;if(index==-1)index=0;if(index!=nextPrev&&index<next)index=next;if(index>last)index=last;if(index==prevIndex)index=first}$this.data('prevIndex',index);if(!that.options.liveSearch){$items.eq(index).focus()}else{e.preventDefault();if(!$this.is('.dropdown-toggle')){$items.removeClass('active');$items.eq(index).addClass('active').find('a').focus();$this.focus()}}}else if(!$this.is('input')){var keyIndex=[],count,prevKey;$items.each(function(){if($(this).parent().is(':not(.disabled)')){if($.trim($(this).text().toLowerCase()).substring(0,1)==keyCodeMap[e.keyCode]){keyIndex.push($(this).parent().index())}}});count=$(document).data('keycount');count++;$(document).data('keycount',count);prevKey=$.trim($(':focus').text().toLowerCase()).substring(0,1);if(prevKey!=keyCodeMap[e.keyCode]){count=1;$(document).data('keycount',count)}else if(count>=keyIndex.length){$(document).data('keycount',0);if(count>keyIndex.length)count=1}$items.eq(keyIndex[count-1]).focus()}if((/(13|32)/.test(e.keyCode.toString(10))||(/(^9$)/.test(e.keyCode.toString(10))&&that.options.selectOnTab))&&isActive){if(!/(32)/.test(e.keyCode.toString(10)))e.preventDefault();if(!that.options.liveSearch){$(':focus').click()}else if(!/(32)/.test(e.keyCode.toString(10))){that.$menu.find('.active a').click();$this.focus()}$(document).data('keycount',0)}if((/(^9$|27)/.test(e.keyCode.toString(10))&&isActive&&(that.multiple||that.options.liveSearch))||(/(27)/.test(e.keyCode.toString(10))&&!isActive)){that.$menu.parent().removeClass('open');that.$button.focus()}},mobile:function(){this.$element.addClass('mobile-device').appendTo(this.$newElement);if(this.options.container)this.$menu.hide()},refresh:function(){this.$lis=null;this.reloadLi();this.render();this.setWidth();this.setStyle();this.checkDisabled();this.liHeight()},update:function(){this.reloadLi();this.setWidth();this.setStyle();this.checkDisabled();this.liHeight()},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove();this.$element.remove()}};function Plugin(option,event){var args=[],argsCounter=0;while(arguments.length>argsCounter){args.push(arguments[argsCounter]);argsCounter++}var _option=option,option=args[0],event=args[1];[].shift.apply(args);if(typeof option=='undefined'){option=_option}var value;var chain=this.each(function(){var $this=$(this);if($this.is('select')){var data=$this.data('selectpicker'),options=typeof option=='object'&&option;if(!data){var config=$.extend({},Selectpicker.DEFAULTS,$.fn.selectpicker.defaults||{},$this.data(),options);$this.data('selectpicker',(data=new Selectpicker(this,config,event)))}else if(options){for(var i in options){if(options.hasOwnProperty(i)){data.options[i]=options[i]}}}if(typeof option=='string'){if(data[option]instanceof Function){value=data[option].apply(data,args)}else{value=data.options[option]}}}});if(typeof value!=='undefined'){return value}else{return chain}}var old=$.fn.selectpicker;$.fn.selectpicker=Plugin;$.fn.selectpicker.Constructor=Selectpicker;$.fn.selectpicker.noConflict=function(){$.fn.selectpicker=old;return this};$(document).data('keycount',0).on('keydown','.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input',Selectpicker.prototype.keydown).on('focusin.modal','.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input',function(e){e.stopPropagation()});$(window).on('load.bs.select.data-api',function(){$('.selectpicker').each(function(){var $selectpicker=$(this);Plugin.call($selectpicker,$selectpicker.data())})})})(jQuery);
!function ($) {

    "use strict";

    // TABCOLLAPSE CLASS DEFINITION
    // ======================

    var TabCollapse = function (el, options) {
        this.options   = options;
        this.$tabs  = $(el);

        this._accordionVisible = false; //content is attached to tabs at first
        this._initAccordion();
        this._checkStateOnResize();


        // checkState() has gone to setTimeout for making it possible to attach listeners to
        // shown-accordion.bs.tabcollapse event on page load.
        // See https://github.com/flatlogic/bootstrap-tabcollapse/issues/23
        var that = this;
        setTimeout(function() {
          that.checkState();
        }, 0);
    };

    TabCollapse.DEFAULTS = {
        accordionClass: 'visible-xs',
        tabsClass: 'hidden-xs',
        accordionTemplate: function(heading, groupId, parentId, active) {
            return  '<div class="panel panel-default">' +
                    '   <div class="panel-heading">' +
                    '      <h4 class="panel-title">' +
                    '      </h4>' +
                    '   </div>' +
                    '   <div id="' + groupId + '" class="panel-collapse collapse ' + (active ? 'in' : '') + '">' +
                    '       <div class="panel-body js-tabcollapse-panel-body">' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'

        }
    };

    TabCollapse.prototype.checkState = function(){
        if (this.$tabs.is(':visible') && this._accordionVisible){
            this.showTabs();
            this._accordionVisible = false;
        } else if (this.$accordion.is(':visible') && !this._accordionVisible){
            this.showAccordion();
            this._accordionVisible = true;
        }
    };

    TabCollapse.prototype.showTabs = function(){
        var view = this;
        this.$tabs.trigger($.Event('show-tabs.bs.tabcollapse'));

        var $panelHeadings = this.$accordion.find('.js-tabcollapse-panel-heading').detach();

        $panelHeadings.each(function() {
            var $panelHeading = $(this),
            $parentLi = $panelHeading.data('bs.tabcollapse.parentLi');

            var $oldHeading = view._panelHeadingToTabHeading($panelHeading);

            $parentLi.removeClass('active');
            if ($parentLi.parent().hasClass('dropdown-menu') && !$parentLi.siblings('li').hasClass('active')) {
                $parentLi.parent().parent().removeClass('active');
            }

            if (!$oldHeading.hasClass('collapsed')) {
                $parentLi.addClass('active');
                if ($parentLi.parent().hasClass('dropdown-menu')) {
                    $parentLi.parent().parent().addClass('active');
                }
            } else {
                $oldHeading.removeClass('collapsed');
            }

            $parentLi.append($panelHeading);
        });

        if (!$('li').hasClass('active')) {
            $('li').first().addClass('active')
        }

        var $panelBodies = this.$accordion.find('.js-tabcollapse-panel-body');
        $panelBodies.each(function(){
            var $panelBody = $(this),
                $tabPane = $panelBody.data('bs.tabcollapse.tabpane');
            $tabPane.append($panelBody.contents().detach());
        });
        this.$accordion.html('');

        if(this.options.updateLinks) {
            var $tabContents = this.getTabContentElement();
            $tabContents.find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function() {
                var $el = $(this);
                var href = $el.attr('href').replace(/-collapse$/g, '');
                $el.attr({
                    'data-toggle': $el.attr('data-toggle-was'),
                    'data-toggle-was': '',
                    'data-parent': '',
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-tabs.bs.tabcollapse'));
    };

    TabCollapse.prototype.getTabContentElement = function(){
        var $tabContents = $(this.options.tabContentSelector);
        if($tabContents.length === 0) {
            $tabContents = this.$tabs.siblings('.tab-content');
        }
        return $tabContents;
    };

    TabCollapse.prototype.showAccordion = function(){
        this.$tabs.trigger($.Event('show-accordion.bs.tabcollapse'));

        var $headings = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'),
            view = this;
        $headings.each(function(){
            var $heading = $(this),
                $parentLi = $heading.parent();
            $heading.data('bs.tabcollapse.parentLi', $parentLi);
            view.$accordion.append(view._createAccordionGroup(view.$accordion.attr('id'), $heading.detach()));
        });

        if(this.options.updateLinks) {
            var parentId = this.$accordion.attr('id');
            var $selector = this.$accordion.find('.js-tabcollapse-panel-body');
            $selector.find('[data-toggle="tab"], [data-toggle="pill"]').each(function() {
                var $el = $(this);
                var href = $el.attr('href') + '-collapse';
                $el.attr({
                    'data-toggle-was': $el.attr('data-toggle'),
                    'data-toggle': 'collapse',
                    'data-parent': '#' + parentId,
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-accordion.bs.tabcollapse'));
    };

    TabCollapse.prototype._panelHeadingToTabHeading = function($heading) {
        var href = $heading.attr('href').replace(/-collapse$/g, '');
        $heading.attr({
            'data-toggle': 'tab',
            'href': href,
            'data-parent': ''
        });
        return $heading;
    };

    TabCollapse.prototype._tabHeadingToPanelHeading = function($heading, groupId, parentId, active) {
        $heading.addClass('js-tabcollapse-panel-heading ' + (active ? '' : 'collapsed'));
        $heading.attr({
            'data-toggle': 'collapse',
            'data-parent': '#' + parentId,
            'href': '#' + groupId
        });
        return $heading;
    };

    TabCollapse.prototype._checkStateOnResize = function(){
        var view = this;
        $(window).resize(function(){
            clearTimeout(view._resizeTimeout);
            view._resizeTimeout = setTimeout(function(){
                view.checkState();
            }, 100);
        });
    };


    TabCollapse.prototype._initAccordion = function(){
        var randomString = function() {
            var result = "",
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ ) {
                result += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return result;
        };

        var srcId = this.$tabs.attr('id'),
            accordionId = (srcId ? srcId : randomString()) + '-accordion';

        this.$accordion = $('<div class="panel-group ' + this.options.accordionClass + '" id="' + accordionId +'"></div>');
        this.$tabs.after(this.$accordion);
        this.$tabs.addClass(this.options.tabsClass);
        this.getTabContentElement().addClass(this.options.tabsClass);
    };

    TabCollapse.prototype._createAccordionGroup = function(parentId, $heading){
        var tabSelector = $heading.attr('data-target'),
            active = $heading.data('bs.tabcollapse.parentLi').is('.active');

        if (!tabSelector) {
            tabSelector = $heading.attr('href');
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $tabPane = $(tabSelector),
            groupId = $tabPane.attr('id') + '-collapse',
            $panel = $(this.options.accordionTemplate($heading, groupId, parentId, active));
        $panel.find('.panel-heading > .panel-title').append(this._tabHeadingToPanelHeading($heading, groupId, parentId, active));
        $panel.find('.panel-body').append($tabPane.contents().detach())
            .data('bs.tabcollapse.tabpane', $tabPane);

        return $panel;
    };



    // TABCOLLAPSE PLUGIN DEFINITION
    // =======================

    $.fn.tabCollapse = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.tabcollapse');
            var options = $.extend({}, TabCollapse.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('bs.tabcollapse', new TabCollapse(this, options));
        });
    };

    $.fn.tabCollapse.Constructor = TabCollapse;


}(window.jQuery);

/*! Swipebox v1.3.0.2 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */

;( function ( window, document, $, undefined ) {

	$.swipebox = function( elem, options ) {

		// Default options
		var ui,
			defaults = {
				useCSS : true,
				useSVG : true,
				initialIndexOnArray : 0,
				removeBarsOnMobile : true,
				hideCloseButtonOnMobile : false,
				hideBarsDelay : 3000,
				videoMaxWidth : 1140,
				vimeoColor : 'cccccc',
				beforeOpen: null,
				afterOpen: null,
				afterClose: null,
				loopAtEnd: false,
				autoplayVideos: false,
				queryStringData: {},
                toggleClassOnLoad: ''
			},

			plugin = this,
			elements = [], // slides array [ { href:'...', title:'...' }, ...],
			$elem,
			selector = elem.selector,
			$selector = $( selector ),
			isMobile = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ),
			isTouch = isMobile !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints,
			supportSVG = !! document.createElementNS && !! document.createElementNS( 'http://www.w3.org/2000/svg', 'svg').createSVGRect,
			winWidth = window.innerWidth ? window.innerWidth : $( window ).width(),
			winHeight = window.innerHeight ? window.innerHeight : $( window ).height(),
			currentX = 0,
			/* jshint multistr: true */
			html = '<div id="swipebox-overlay">\
					<div id="swipebox-container">\
						<div id="swipebox-slider"></div>\
						<div id="swipebox-top-bar">\
							<div id="swipebox-title"></div>\
						</div>\
						<div id="swipebox-bottom-bar">\
							<div id="swipebox-arrows">\
								<a id="swipebox-prev"></a>\
								<a id="swipebox-next"></a>\
							</div>\
						</div>\
						<a id="swipebox-close"></a>\
					</div>\
			</div>';

		plugin.settings = {};

		$.swipebox.close = function () {
			ui.closeSlide();
		};

		$.swipebox.extend = function () {
			return ui;
		};

		plugin.init = function() {

			plugin.settings = $.extend( {}, defaults, options );

			if ( $.isArray( elem ) ) {

				elements = elem;
				ui.target = $( window );
				ui.init( plugin.settings.initialIndexOnArray );

			} else {

				$( document ).on( 'click', selector, function( event ) {

					// console.log( isTouch );

					if ( event.target.parentNode.className === 'slide current' ) {

						return false;
					}

					if ( ! $.isArray( elem ) ) {
						ui.destroy();
						$elem = $( selector );
						ui.actions();
					}

					elements = [];
					var index , relType, relVal;

					// Allow for HTML5 compliant attribute before legacy use of rel
					if ( ! relVal ) {
						relType = 'data-rel';
						relVal  = $( this ).attr( relType );
					}

					if ( ! relVal ) {
						relType = 'rel';
						relVal = $( this ).attr( relType );
					}

					if ( relVal && relVal !== '' && relVal !== 'nofollow' ) {
						$elem = $selector.filter( '[' + relType + '="' + relVal + '"]' );
					} else {
						$elem = $( selector );
					}

					$elem.each( function() {

						var title = null,
							href = null;

						if ( $( this ).attr( 'title' ) ) {
							title = $( this ).attr( 'title' );
						}


						if ( $( this ).attr( 'href' ) ) {
							href = $( this ).attr( 'href' );
						}

						elements.push( {
							href: href,
							title: title
						} );
					} );

					index = $elem.index( $( this ) );
					event.preventDefault();
					event.stopPropagation();
					ui.target = $( event.target );
					ui.init( index );
				} );
			}
		};

		ui = {

			/**
			 * Initiate Swipebox
			 */
			init : function( index ) {
				if ( plugin.settings.beforeOpen ) {
					plugin.settings.beforeOpen();
				}
				this.target.trigger( 'swipebox-start' );
				$.swipebox.isOpen = true;
				this.build();
				this.openSlide( index );
				this.openMedia( index );
				this.preloadMedia( index+1 );
				this.preloadMedia( index-1 );
				if ( plugin.settings.afterOpen ) {
					plugin.settings.afterOpen();
				}
			},

			/**
			 * Built HTML containers and fire main functions
			 */
			build : function () {
				var $this = this, bg;

				$( 'body' ).append( html );

				if ( supportSVG && plugin.settings.useSVG === true ) {
					bg = $( '#swipebox-close' ).css( 'background-image' );
					bg = bg.replace( 'png', 'svg' );
					$( '#swipebox-prev, #swipebox-next, #swipebox-close' ).css( {
						'background-image' : bg
					} );
				}

				if ( isMobile && plugin.settings.removeBarsOnMobile ) {
					$( '#swipebox-bottom-bar, #swipebox-top-bar' ).remove();
				}

				$.each( elements,  function() {
					$( '#swipebox-slider' ).append( '<div class="slide"></div>' );
				} );

				$this.setDim();
				$this.actions();

				if ( isTouch ) {
					$this.gesture();
				}

				// Devices can have both touch and keyboard input so always allow key events
				$this.keyboard();

				$this.animBars();
				$this.resize();

			},

			/**
			 * Set dimensions depending on windows width and height
			 */
			setDim : function () {

				var width, height, sliderCss = {};

				// Reset dimensions on mobile orientation change
				if ( 'onorientationchange' in window ) {

					window.addEventListener( 'orientationchange', function() {
						if ( window.orientation === 0 ) {
							width = winWidth;
							height = winHeight;
						} else if ( window.orientation === 90 || window.orientation === -90 ) {
							width = winHeight;
							height = winWidth;
						}
					}, false );


				} else {

					width = window.innerWidth ? window.innerWidth : $( window ).width();
					height = window.innerHeight ? window.innerHeight : $( window ).height();
				}

				sliderCss = {
					width : width,
					height : height
				};

				$( '#swipebox-overlay' ).css( sliderCss );

			},

			/**
			 * Reset dimensions on window resize envent
			 */
			resize : function () {
				var $this = this;

				$( window ).resize( function() {
					$this.setDim();
				} ).resize();
			},

			/**
			 * Check if device supports CSS transitions
			 */
			supportTransition : function () {

				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split( ' ' ),
					i;

				for ( i = 0; i < prefixes.length; i++ ) {
					if ( document.createElement( 'div' ).style[ prefixes[i] ] !== undefined ) {
						return prefixes[i];
					}
				}
				return false;
			},

			/**
			 * Check if CSS transitions are allowed (options + devicesupport)
			 */
			doCssTrans : function () {
				if ( plugin.settings.useCSS && this.supportTransition() ) {
					return true;
				}
			},

			/**
			 * Touch navigation
			 */
			gesture : function () {

				var $this = this,
					index,
					hDistance,
					vDistance,
					hDistanceLast,
					vDistanceLast,
					hDistancePercent,
					vSwipe = false,
					hSwipe = false,
					hSwipMinDistance = 10,
					vSwipMinDistance = 50,
					startCoords = {},
					endCoords = {},
					bars = $( '#swipebox-top-bar, #swipebox-bottom-bar' ),
					slider = $( '#swipebox-slider' );

				bars.addClass( 'visible-bars' );
				$this.setTimeout();

				$( 'body' ).bind( 'touchstart', function( event ) {

					$( this ).addClass( 'touching' );
					index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) );
					endCoords = event.originalEvent.targetTouches[0];
					startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
					startCoords.pageY = event.originalEvent.targetTouches[0].pageY;

					$( '#swipebox-slider' ).css( {
						'-webkit-transform' : 'translate3d(' + currentX +'%, 0, 0)',
						'transform' : 'translate3d(' + currentX + '%, 0, 0)'
					} );

					$( '.touching' ).bind( 'touchmove',function( event ) {
						event.preventDefault();
						event.stopPropagation();
						endCoords = event.originalEvent.targetTouches[0];

						if ( ! hSwipe ) {
							vDistanceLast = vDistance;
							vDistance = endCoords.pageY - startCoords.pageY;
							if ( Math.abs( vDistance ) >= vSwipMinDistance || vSwipe ) {
								var opacity = 0.75 - Math.abs(vDistance) / slider.height();

								slider.css( { 'top': vDistance + 'px' } );
								slider.css( { 'opacity': opacity } );

								vSwipe = true;
							}
						}

						hDistanceLast = hDistance;
						hDistance = endCoords.pageX - startCoords.pageX;
						hDistancePercent = hDistance * 100 / winWidth;

						if ( ! hSwipe && ! vSwipe && Math.abs( hDistance ) >= hSwipMinDistance ) {
							$( '#swipebox-slider' ).css( {
								'-webkit-transition' : '',
								'transition' : ''
							} );
							hSwipe = true;
						}

						if ( hSwipe ) {

							// swipe left
							if ( 0 < hDistance ) {

								// first slide
								if ( 0 === index ) {
									// console.log( 'first' );
									$( '#swipebox-overlay' ).addClass( 'leftSpringTouch' );
								} else {
									// Follow gesture
									$( '#swipebox-overlay' ).removeClass( 'leftSpringTouch' ).removeClass( 'rightSpringTouch' );
									$( '#swipebox-slider' ).css( {
										'-webkit-transform' : 'translate3d(' + ( currentX + hDistancePercent ) +'%, 0, 0)',
										'transform' : 'translate3d(' + ( currentX + hDistancePercent ) + '%, 0, 0)'
									} );
								}

							// swipe rught
							} else if ( 0 > hDistance ) {

								// last Slide
								if ( elements.length === index +1 ) {
									// console.log( 'last' );
									$( '#swipebox-overlay' ).addClass( 'rightSpringTouch' );
								} else {
									$( '#swipebox-overlay' ).removeClass( 'leftSpringTouch' ).removeClass( 'rightSpringTouch' );
									$( '#swipebox-slider' ).css( {
										'-webkit-transform' : 'translate3d(' + ( currentX + hDistancePercent ) +'%, 0, 0)',
										'transform' : 'translate3d(' + ( currentX + hDistancePercent ) + '%, 0, 0)'
									} );
								}

							}
						}
					} );

					return false;

				} ).bind( 'touchend',function( event ) {
					event.preventDefault();
					event.stopPropagation();

					$( '#swipebox-slider' ).css( {
						'-webkit-transition' : '-webkit-transform 0.4s ease',
						'transition' : 'transform 0.4s ease'
					} );

					vDistance = endCoords.pageY - startCoords.pageY;
					hDistance = endCoords.pageX - startCoords.pageX;
					hDistancePercent = hDistance*100/winWidth;

					// Swipe to bottom to close
					if ( vSwipe ) {
						vSwipe = false;
						if ( Math.abs( vDistance ) >= 2 * vSwipMinDistance && Math.abs( vDistance ) > Math.abs( vDistanceLast ) ) {
							var vOffset = vDistance > 0 ? slider.height() : - slider.height();
							slider.animate( { top: vOffset + 'px', 'opacity': 0 },
								300,
								function () {
									$this.closeSlide();
								} );
						} else {
							slider.animate( { top: 0, 'opacity': 1 }, 300 );
						}

					} else if ( hSwipe ) {

						hSwipe = false;

						// swipeLeft
						if( hDistance >= hSwipMinDistance && hDistance >= hDistanceLast) {

							$this.getPrev();

						// swipeRight
						} else if ( hDistance <= -hSwipMinDistance && hDistance <= hDistanceLast) {

							$this.getNext();
						}

					} else { // Top and bottom bars have been removed on touchable devices
						// tap
						if ( ! bars.hasClass( 'visible-bars' ) ) {
							$this.showBars();
							$this.setTimeout();
						} else {
							$this.clearTimeout();
							$this.hideBars();
						}
					}

					$( '#swipebox-slider' ).css( {
						'-webkit-transform' : 'translate3d(' + currentX + '%, 0, 0)',
						'transform' : 'translate3d(' + currentX + '%, 0, 0)'
					} );

					$( '#swipebox-overlay' ).removeClass( 'leftSpringTouch' ).removeClass( 'rightSpringTouch' );
					$( '.touching' ).off( 'touchmove' ).removeClass( 'touching' );

				} );
			},

			/**
			 * Set timer to hide the action bars
			 */
			setTimeout: function () {
				if ( plugin.settings.hideBarsDelay > 0 ) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout( function() {
							$this.hideBars();
						},

						plugin.settings.hideBarsDelay
					);
				}
			},

			/**
			 * Clear timer
			 */
			clearTimeout: function () {
				window.clearTimeout( this.timeout );
				this.timeout = null;
			},

			/**
			 * Show navigation and title bars
			 */
			showBars : function () {
				var bars = $( '#swipebox-top-bar, #swipebox-bottom-bar' );
				if ( this.doCssTrans() ) {
					bars.addClass( 'visible-bars' );
				} else {
					$( '#swipebox-top-bar' ).animate( { top : 0 }, 500 );
					$( '#swipebox-bottom-bar' ).animate( { bottom : 0 }, 500 );
					setTimeout( function() {
						bars.addClass( 'visible-bars' );
					}, 1000 );
				}
			},

			/**
			 * Hide navigation and title bars
			 */
			hideBars : function () {
				var bars = $( '#swipebox-top-bar, #swipebox-bottom-bar' );
				if ( this.doCssTrans() ) {
					bars.removeClass( 'visible-bars' );
				} else {
					$( '#swipebox-top-bar' ).animate( { top : '-50px' }, 500 );
					$( '#swipebox-bottom-bar' ).animate( { bottom : '-50px' }, 500 );
					setTimeout( function() {
						bars.removeClass( 'visible-bars' );
					}, 1000 );
				}
			},

			/**
			 * Animate navigation and top bars
			 */
			animBars : function () {
				var $this = this,
					bars = $( '#swipebox-top-bar, #swipebox-bottom-bar' );

				bars.addClass( 'visible-bars' );
				$this.setTimeout();

				$( '#swipebox-slider' ).click( function() {
					if ( ! bars.hasClass( 'visible-bars' ) ) {
						$this.showBars();
						$this.setTimeout();
					}
				} );

				$( '#swipebox-bottom-bar' ).hover( function() {
					$this.showBars();
					bars.addClass( 'visible-bars' );
					$this.clearTimeout();

				}, function() {
					if ( plugin.settings.hideBarsDelay > 0 ) {
						bars.removeClass( 'visible-bars' );
						$this.setTimeout();
					}

				} );
			},

			/**
			 * Keyboard navigation
			 */
			keyboard : function () {
				var $this = this;
				$( window ).bind( 'keyup', function( event ) {
					event.preventDefault();
					event.stopPropagation();

					if ( event.keyCode === 37 ) {

						$this.getPrev();

					} else if ( event.keyCode === 39 ) {

						$this.getNext();

					} else if ( event.keyCode === 27 ) {

						$this.closeSlide();
					}
				} );
			},

			/**
			 * Navigation events : go to next slide, go to prevous slide and close
			 */
			actions : function () {
				var $this = this,
					action = 'touchend click'; // Just detect for both event types to allow for multi-input

				if ( elements.length < 2 ) {

					$( '#swipebox-bottom-bar' ).hide();

					if ( undefined === elements[ 1 ] ) {
						$( '#swipebox-top-bar' ).hide();
					}

				} else {
					$( '#swipebox-prev' ).bind( action, function( event ) {
						event.preventDefault();
						event.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					} );

					$( '#swipebox-next' ).bind( action, function( event ) {
						event.preventDefault();
						event.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					} );
				}

				$( '#swipebox-close' ).bind( action, function() {
					$this.closeSlide();
				} );
			},

			/**
			 * Set current slide
			 */
			setSlide : function ( index, isFirst ) {

				isFirst = isFirst || false;

				var slider = $( '#swipebox-slider' );

				currentX = -index*100;

				if ( this.doCssTrans() ) {
					slider.css( {
						'-webkit-transform' : 'translate3d(' + (-index*100)+'%, 0, 0)',
						'transform' : 'translate3d(' + (-index*100)+'%, 0, 0)'
					} );
				} else {
					slider.animate( { left : ( -index*100 )+'%' } );
				}

				$( '#swipebox-slider .slide' ).removeClass( 'current' );
				$( '#swipebox-slider .slide' ).eq( index ).addClass( 'current' );
				this.setTitle( index );

				if ( isFirst ) {
					slider.fadeIn();
				}

				$( '#swipebox-prev, #swipebox-next' ).removeClass( 'disabled' );

				if ( index === 0 ) {
					$( '#swipebox-prev' ).addClass( 'disabled' );
				} else if ( index === elements.length - 1 && plugin.settings.loopAtEnd !== true ) {
					$( '#swipebox-next' ).addClass( 'disabled' );
				}
			},

			/**
			 * Open slide
			 */
			openSlide : function ( index ) {
				$( 'html' ).addClass( 'swipebox-html' );
				if ( isTouch ) {
					$( 'html' ).addClass( 'swipebox-touch' );

					if ( plugin.settings.hideCloseButtonOnMobile ) {
						$( 'html' ).addClass( 'swipebox-no-close-button' );
					}
				} else {
					$( 'html' ).addClass( 'swipebox-no-touch' );
				}
				$( window ).trigger( 'resize' ); // fix scroll bar visibility on desktop
				this.setSlide( index, true );
			},

			/**
			 * Set a time out if the media is a video
			 */
			preloadMedia : function ( index ) {
				var $this = this,
					src = null;

				if ( elements[ index ] !== undefined ) {
					src = elements[ index ].href;
				}

				if ( ! $this.isVideo( src ) ) {
					setTimeout( function() {
						$this.openMedia( index );
					}, 1000);
				} else {
					$this.openMedia( index );
				}
			},

			/**
			 * Open
			 */
			openMedia : function ( index ) {
				var $this = this,
					src,
					slide;

				if ( elements[ index ] !== undefined ) {
					src = elements[ index ].href;
				}

				if ( index < 0 || index >= elements.length ) {
					return false;
				}

				slide = $( '#swipebox-slider .slide' ).eq( index );

				if ( ! $this.isVideo( src ) ) {
					slide.addClass( 'slide-loading' );
					$this.loadMedia( src, function() {
						slide.removeClass( 'slide-loading' );
						slide.html( this );
					} );
				} else {
					slide.html( $this.getVideo( src ) );
				}

			},

			/**
			 * Set link title attribute as caption
			 */
			setTitle : function ( index ) {
				var title = null;

				$( '#swipebox-title' ).empty();

				if ( elements[ index ] !== undefined ) {
					title = elements[ index ].title;
				}

				if ( title ) {
					$( '#swipebox-top-bar' ).show();
					$( '#swipebox-title' ).append( title );
				} else {
					$( '#swipebox-top-bar' ).hide();
				}
			},

			/**
			 * Check if the URL is a video
			 */
			isVideo : function ( src ) {

				if ( src ) {
					if ( src.match( /(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match( /vimeo\.com\/([0-9]*)/ ) || src.match( /youtu\.be\/([a-zA-Z0-9\-_]+)/ ) ) {
						return true;
					}

					if ( src.toLowerCase().indexOf( 'swipeboxvideo=1' ) >= 0 ) {

						return true;
					}
				}

			},

			/**
			 * Parse URI querystring and:
			 * - overrides value provided via dictionary
			 * - rebuild it again returning a string
			 */
			parseUri : function (uri, customData) {
				var a = document.createElement('a'),
					qs = {};

				// Decode the URI
				a.href = decodeURIComponent( uri );

				// QueryString to Object
				qs = JSON.parse( '{"' + a.search.toLowerCase().replace('?','').replace(/&/g,'","').replace(/=/g,'":"') + '"}' );

				// Extend with custom data
				if ( $.isPlainObject( customData ) ) {
					qs = $.extend( qs, customData, plugin.settings.queryStringData ); // The dev has always the final word
				}

				// Return querystring as a string
				return $
					.map( qs, function (val, key) {
						if ( val && val > '' ) {
							return encodeURIComponent( key ) + '=' + encodeURIComponent( val );
						}
					})
					.join('&');
			},

			/**
			 * Get video iframe code from URL
			 */
			getVideo : function( url ) {
				var iframe = '',
					youtubeUrl = url.match( /((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/ ),
					youtubeShortUrl = url.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),
					vimeoUrl = url.match( /(?:www\.)?vimeo\.com\/([0-9]*)/ ),
					qs = '';
				if ( youtubeUrl || youtubeShortUrl) {
					if ( youtubeShortUrl ) {
						youtubeUrl = youtubeShortUrl;
					}
					qs = ui.parseUri( url, {
						'autoplay' : ( plugin.settings.autoplayVideos ? '1' : '0' ),
						'v' : ''
					});
					iframe = '<iframe width="560" height="315" src="//' + youtubeUrl[1] + '/embed/' + youtubeUrl[2] + '?' + qs + '" frameborder="0" allowfullscreen></iframe>';

				} else if ( vimeoUrl ) {
					qs = ui.parseUri( url, {
						'autoplay' : ( plugin.settings.autoplayVideos ? '1' : '0' ),
						'byline' : '0',
						'portrait' : '0',
						'color': plugin.settings.vimeoColor
					});
					iframe = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + vimeoUrl[1] + '?' + qs + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

				} else {
					iframe = '<iframe width="560" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
				}

				return '<div class="swipebox-video-container" style="max-width:' + plugin.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + iframe + '</div></div>';
			},

			/**
			 * Load image
			 */
			loadMedia : function ( src, callback ) {
                // Inline content
                if ( src.trim().indexOf('#') === 0 ) {
                    callback.call(
                    	$('<div>', {
                    		'class' : 'swipebox-inline-container'
                    	})
                    	.append(
                    		$(src)
	                    	.clone()
	                    	.toggleClass( plugin.settings.toggleClassOnLoad )
	                    )
                    );
                }
                // Everything else
                else {
    				if ( ! this.isVideo( src ) ) {
    					var img = $( '<img>' ).on( 'load', function() {
    						callback.call( img );
    					} );

    					img.attr( 'src', src );
    				}
                }
			},

			/**
			 * Get next slide
			 */
			getNext : function () {
				var $this = this,
					src,
					index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) );
				if ( index + 1 < elements.length ) {

					src = $( '#swipebox-slider .slide' ).eq( index ).contents().find( 'iframe' ).attr( 'src' );
					$( '#swipebox-slider .slide' ).eq( index ).contents().find( 'iframe' ).attr( 'src', src );
					index++;
					$this.setSlide( index );
					$this.preloadMedia( index+1 );
				} else {

					if ( plugin.settings.loopAtEnd === true ) {
						src = $( '#swipebox-slider .slide' ).eq( index ).contents().find( 'iframe' ).attr( 'src' );
						$( '#swipebox-slider .slide' ).eq( index ).contents().find( 'iframe' ).attr( 'src', src );
						index = 0;
						$this.preloadMedia( index );
						$this.setSlide( index );
						$this.preloadMedia( index + 1 );
					} else {
						$( '#swipebox-overlay' ).addClass( 'rightSpring' );
						setTimeout( function() {
							$( '#swipebox-overlay' ).removeClass( 'rightSpring' );
						}, 500 );
					}
				}
			},

			/**
			 * Get previous slide
			 */
			getPrev : function () {
				var index = $( '#swipebox-slider .slide' ).index( $( '#swipebox-slider .slide.current' ) ),
					src;
				if ( index > 0 ) {
					src = $( '#swipebox-slider .slide' ).eq( index ).contents().find( 'iframe').attr( 'src' );
					$( '#swipebox-slider .slide' ).eq( index ).contents().find( 'iframe' ).attr( 'src', src );
					index--;
					this.setSlide( index );
					this.preloadMedia( index-1 );
				} else {
					$( '#swipebox-overlay' ).addClass( 'leftSpring' );
					setTimeout( function() {
						$( '#swipebox-overlay' ).removeClass( 'leftSpring' );
					}, 500 );
				}
			},

			/**
			 * Close
			 */
			closeSlide : function () {
				$( 'html' ).removeClass( 'swipebox-html' );
				$( 'html' ).removeClass( 'swipebox-touch' );
				$( window ).trigger( 'resize' );
				this.destroy();
			},

			/**
			 * Destroy the whole thing
			 */
			destroy : function () {
				$( window ).unbind( 'keyup' );
				$( 'body' ).unbind( 'touchstart' );
				$( 'body' ).unbind( 'touchmove' );
				$( 'body' ).unbind( 'touchend' );
				$( '#swipebox-slider' ).unbind();
				$( '#swipebox-overlay' ).remove();

				if ( ! $.isArray( elem ) ) {
					elem.removeData( '_swipebox' );
				}

				if ( this.target ) {
					this.target.trigger( 'swipebox-destroy' );
				}

				$.swipebox.isOpen = false;

				if ( plugin.settings.afterClose ) {
					plugin.settings.afterClose();
				}
			}
		};

		plugin.init();
	};

	$.fn.swipebox = function( options ) {

		if ( ! $.data( this, '_swipebox' ) ) {
			var swipebox = new $.swipebox( this, options );
			this.data( '_swipebox', swipebox );
		}
		return this.data( '_swipebox' );

	};

}( window, document, jQuery ) );

/**
 * Swiper 3.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 27, 2015
 */
!function(){"use strict";function e(e){e.fn.swiper=function(a){var t;return e(this).each(function(){var e=new Swiper(this,a);t||(t=e)}),t}}window.Swiper=function(e,a){function t(){return"horizontal"===f.params.direction}function s(){f.autoplayTimeoutId=setTimeout(function(){f.params.loop?(f.fixLoop(),f._slideNext()):f.isEnd?a.autoplayStopOnLast?f.stopAutoplay():f._slideTo(0):f._slideNext()},f.params.autoplay)}function r(e,a){var t=h(e.target);if(!t.is(a))if("string"==typeof a)t=t.parents(a);else if(a.nodeType){var s;return t.parents().each(function(e,t){t===a&&(s=a)}),s?a:void 0}return 0===t.length?void 0:t[0]}function i(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,s=new t(function(e){e.forEach(function(e){f.onResize(),f.emit("onObserverUpdate",f,e)})});s.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),f.observers.push(s)}function n(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var s=!1;if(f.container.parents(".swiper-slide").length>0&&0===f.container.parents(".swiper-slide-active").length)return;for(var r={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=f.container.offset(),l=[[o.left,o.top],[o.left+f.width,o.top],[o.left,o.top+f.height],[o.left+f.width,o.top+f.height]],p=0;p<l.length;p++){var d=l[p];d[0]>=r.left&&d[0]<=r.left+i&&d[1]>=r.top&&d[1]<=r.top+n&&(s=!0)}if(!s)return}t()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),39===a&&f.slideNext(),37===a&&f.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&f.slideNext(),38===a&&f.slidePrev())}}function o(e){e.originalEvent&&(e=e.originalEvent);var a=f._wheelEvent,s=0;if(e.detail)s=-e.detail;else if("mousewheel"===a)if(f.params.mousewheelForceToAxis)if(t()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;s=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;s=e.wheelDeltaY}else s=e.wheelDelta;else if("DOMMouseScroll"===a)s=-e.detail;else if("wheel"===a)if(f.params.mousewheelForceToAxis)if(t()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;s=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;s=-e.deltaY}else s=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(f.params.freeMode){var r=f.getWrapperTranslate()+s;if(r>0&&(r=0),r<f.maxTranslate()&&(r=f.maxTranslate()),f.setWrapperTransition(0),f.setWrapperTranslate(r),f.updateProgress(),f.updateActiveIndex(),0===r||r===f.maxTranslate())return}else(new Date).getTime()-f._lastWheelScrollTime>60&&(0>s?f.slideNext():f.slidePrev()),f._lastWheelScrollTime=(new Date).getTime();return f.params.autoplay&&f.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}function l(e,a){e=h(e);var s,r,i;s=e.attr("data-swiper-parallax")||"0",r=e.attr("data-swiper-parallax-x"),i=e.attr("data-swiper-parallax-y"),r||i?(r=r||"0",i=i||"0"):t()?(r=s,i="0"):(i=s,r="0"),r=r.indexOf("%")>=0?parseInt(r,10)*a+"%":r*a+"px",i=i.indexOf("%")>=0?parseInt(i,10)*a+"%":i*a+"px",e.transform("translate3d("+r+", "+i+",0px)")}function p(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof Swiper))return new Swiper(e,a);var d={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",runCallbacksOnInit:!0},u=a&&a.virtualTranslate;a=a||{};for(var c in d)if("undefined"==typeof a[c])a[c]=d[c];else if("object"==typeof a[c])for(var m in d[c])"undefined"==typeof a[c][m]&&(a[c][m]=d[c][m]);var f=this;f.params=a,f.classNames=[];var h;if(h="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,h&&(f.$=h,f.container=h(e),0!==f.container.length)){if(f.container.length>1)return void f.container.each(function(){new Swiper(this,a)});f.container[0].swiper=f,f.container.data("swiper",f),f.classNames.push("swiper-container-"+f.params.direction),f.params.freeMode&&f.classNames.push("swiper-container-free-mode"),f.support.flexbox||(f.classNames.push("swiper-container-no-flexbox"),f.params.slidesPerColumn=1),(f.params.parallax||f.params.watchSlidesVisibility)&&(f.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(f.params.effect)>=0&&(f.support.transforms3d?(f.params.watchSlidesProgress=!0,f.classNames.push("swiper-container-3d")):f.params.effect="slide"),"slide"!==f.params.effect&&f.classNames.push("swiper-container-"+f.params.effect),"cube"===f.params.effect&&(f.params.resistanceRatio=0,f.params.slidesPerView=1,f.params.slidesPerColumn=1,f.params.slidesPerGroup=1,f.params.centeredSlides=!1,f.params.spaceBetween=0,f.params.virtualTranslate=!0,f.params.setWrapperSize=!1),"fade"===f.params.effect&&(f.params.slidesPerView=1,f.params.slidesPerColumn=1,f.params.slidesPerGroup=1,f.params.watchSlidesProgress=!0,f.params.spaceBetween=0,"undefined"==typeof u&&(f.params.virtualTranslate=!0)),f.params.grabCursor&&f.support.touch&&(f.params.grabCursor=!1),f.wrapper=f.container.children("."+f.params.wrapperClass),f.params.pagination&&(f.paginationContainer=h(f.params.pagination),f.params.paginationClickable&&f.paginationContainer.addClass("swiper-pagination-clickable")),f.rtl=t()&&("rtl"===f.container[0].dir.toLowerCase()||"rtl"===f.container.css("direction")),f.rtl&&f.classNames.push("swiper-container-rtl"),f.rtl&&(f.wrongRTL="-webkit-box"===f.wrapper.css("display")),f.params.slidesPerColumn>1&&f.classNames.push("swiper-container-multirow"),f.device.android&&f.classNames.push("swiper-container-android"),f.container.addClass(f.classNames.join(" ")),f.translate=0,f.progress=0,f.velocity=0,f.lockSwipeToNext=function(){f.params.allowSwipeToNext=!1},f.lockSwipeToPrev=function(){f.params.allowSwipeToPrev=!1},f.lockSwipes=function(){f.params.allowSwipeToNext=f.params.allowSwipeToPrev=!1},f.unlockSwipeToNext=function(){f.params.allowSwipeToNext=!0},f.unlockSwipeToPrev=function(){f.params.allowSwipeToPrev=!0},f.unlockSwipes=function(){f.params.allowSwipeToNext=f.params.allowSwipeToPrev=!0},f.params.grabCursor&&(f.container[0].style.cursor="move",f.container[0].style.cursor="-webkit-grab",f.container[0].style.cursor="-moz-grab",f.container[0].style.cursor="grab"),f.imagesToLoad=[],f.imagesLoaded=0,f.loadImage=function(e,a,t,s){function r(){s&&s()}var i;e.complete&&t?r():a?(i=new Image,i.onload=r,i.onerror=r,i.src=a):r()},f.preloadImages=function(){function e(){"undefined"!=typeof f&&null!==f&&(void 0!==f.imagesLoaded&&f.imagesLoaded++,f.imagesLoaded===f.imagesToLoad.length&&(f.params.updateOnImagesReady&&f.update(),f.emit("onImagesReady",f)))}f.imagesToLoad=f.container.find("img");for(var a=0;a<f.imagesToLoad.length;a++)f.loadImage(f.imagesToLoad[a],f.imagesToLoad[a].currentSrc||f.imagesToLoad[a].getAttribute("src"),!0,e)},f.autoplayTimeoutId=void 0,f.autoplaying=!1,f.autoplayPaused=!1,f.startAutoplay=function(){return"undefined"!=typeof f.autoplayTimeoutId?!1:f.params.autoplay?f.autoplaying?!1:(f.autoplaying=!0,f.emit("onAutoplayStart",f),void s()):!1},f.stopAutoplay=function(){f.autoplayTimeoutId&&(f.autoplayTimeoutId&&clearTimeout(f.autoplayTimeoutId),f.autoplaying=!1,f.autoplayTimeoutId=void 0,f.emit("onAutoplayStop",f))},f.pauseAutoplay=function(e){f.autoplayPaused||(f.autoplayTimeoutId&&clearTimeout(f.autoplayTimeoutId),f.autoplayPaused=!0,0===e?(f.autoplayPaused=!1,s()):f.wrapper.transitionEnd(function(){f.autoplayPaused=!1,f.autoplaying?s():f.stopAutoplay()}))},f.minTranslate=function(){return-f.snapGrid[0]},f.maxTranslate=function(){return-f.snapGrid[f.snapGrid.length-1]},f.updateContainerSize=function(){f.width=f.container[0].clientWidth,f.height=f.container[0].clientHeight,f.size=t()?f.width:f.height},f.updateSlidesSize=function(){f.slides=f.wrapper.children("."+f.params.slideClass),f.snapGrid=[],f.slidesGrid=[],f.slidesSizesGrid=[];var e,a=f.params.spaceBetween,s=0,r=0,i=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*f.size),f.virtualSize=-a,f.slides.css(f.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});var n;f.params.slidesPerColumn>1&&(n=Math.floor(f.slides.length/f.params.slidesPerColumn)===f.slides.length/f.params.slidesPerColumn?f.slides.length:Math.ceil(f.slides.length/f.params.slidesPerColumn)*f.params.slidesPerColumn);var o;for(e=0;e<f.slides.length;e++){o=0;var l=f.slides.eq(e);if(f.params.slidesPerColumn>1){var p,d,u,c,m=f.params.slidesPerColumn;"column"===f.params.slidesPerColumnFill?(d=Math.floor(e/m),u=e-d*m,p=d+u*n/m,l.css({"-webkit-box-ordinal-group":p,"-moz-box-ordinal-group":p,"-ms-flex-order":p,"-webkit-order":p,order:p})):(c=n/m,u=Math.floor(e/c),d=e-u*c),l.css({"margin-top":0!==u&&f.params.spaceBetween&&f.params.spaceBetween+"px"}).attr("data-swiper-column",d).attr("data-swiper-row",u)}"none"!==l.css("display")&&("auto"===f.params.slidesPerView?o=t()?l.outerWidth(!0):l.outerHeight(!0):(o=(f.size-(f.params.slidesPerView-1)*a)/f.params.slidesPerView,t()?f.slides[e].style.width=o+"px":f.slides[e].style.height=o+"px"),f.slides[e].swiperSlideSize=o,f.slidesSizesGrid.push(o),f.params.centeredSlides?(s=s+o/2+r/2+a,0===e&&(s=s-f.size/2-a),Math.abs(s)<.001&&(s=0),i%f.params.slidesPerGroup===0&&f.snapGrid.push(s),f.slidesGrid.push(s)):(i%f.params.slidesPerGroup===0&&f.snapGrid.push(s),f.slidesGrid.push(s),s=s+o+a),f.virtualSize+=o+a,r=o,i++)}f.virtualSize=Math.max(f.virtualSize,f.size);var h;if(f.rtl&&f.wrongRTL&&("slide"===f.params.effect||"coverflow"===f.params.effect)&&f.wrapper.css({width:f.virtualSize+f.params.spaceBetween+"px"}),(!f.support.flexbox||f.params.setWrapperSize)&&f.wrapper.css(t()?{width:f.virtualSize+f.params.spaceBetween+"px"}:{height:f.virtualSize+f.params.spaceBetween+"px"}),f.params.slidesPerColumn>1&&(f.virtualSize=(o+f.params.spaceBetween)*n,f.virtualSize=Math.ceil(f.virtualSize/f.params.slidesPerColumn)-f.params.spaceBetween,f.wrapper.css({width:f.virtualSize+f.params.spaceBetween+"px"}),f.params.centeredSlides)){for(h=[],e=0;e<f.snapGrid.length;e++)f.snapGrid[e]<f.virtualSize+f.snapGrid[0]&&h.push(f.snapGrid[e]);f.snapGrid=h}if(!f.params.centeredSlides){for(h=[],e=0;e<f.snapGrid.length;e++)f.snapGrid[e]<=f.virtualSize-f.size&&h.push(f.snapGrid[e]);f.snapGrid=h,Math.floor(f.virtualSize-f.size)>Math.floor(f.snapGrid[f.snapGrid.length-1])&&f.snapGrid.push(f.virtualSize-f.size)}0===f.snapGrid.length&&(f.snapGrid=[0]),0!==f.params.spaceBetween&&f.slides.css(t()?f.rtl?{marginLeft:a+"px"}:{marginRight:a+"px"}:{marginBottom:a+"px"}),f.params.watchSlidesProgress&&f.updateSlidesOffset()},f.updateSlidesOffset=function(){for(var e=0;e<f.slides.length;e++)f.slides[e].swiperSlideOffset=t()?f.slides[e].offsetLeft:f.slides[e].offsetTop},f.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=f.translate||0),0!==f.slides.length){"undefined"==typeof f.slides[0].swiperSlideOffset&&f.updateSlidesOffset();var a=f.params.centeredSlides?-e+f.size/2:-e;f.rtl&&(a=f.params.centeredSlides?e-f.size/2:e);{f.container[0].getBoundingClientRect(),t()?"left":"top",t()?"right":"bottom"}f.slides.removeClass(f.params.slideVisibleClass);for(var s=0;s<f.slides.length;s++){var r=f.slides[s],i=f.params.centeredSlides===!0?r.swiperSlideSize/2:0,n=(a-r.swiperSlideOffset-i)/(r.swiperSlideSize+f.params.spaceBetween);if(f.params.watchSlidesVisibility){var o=-(a-r.swiperSlideOffset-i),l=o+f.slidesSizesGrid[s],p=o>=0&&o<f.size||l>0&&l<=f.size||0>=o&&l>=f.size;p&&f.slides.eq(s).addClass(f.params.slideVisibleClass)}r.progress=f.rtl?-n:n}}},f.updateProgress=function(e){"undefined"==typeof e&&(e=f.translate||0);var a=f.maxTranslate()-f.minTranslate();0===a?(f.progress=0,f.isBeginning=f.isEnd=!0):(f.progress=(e-f.minTranslate())/a,f.isBeginning=f.progress<=0,f.isEnd=f.progress>=1),f.isBeginning&&f.emit("onReachBeginning",f),f.isEnd&&f.emit("onReachEnd",f),f.params.watchSlidesProgress&&f.updateSlidesProgress(e),f.emit("onProgress",f,f.progress)},f.updateActiveIndex=function(){var e,a,t,s=f.rtl?f.translate:-f.translate;for(a=0;a<f.slidesGrid.length;a++)"undefined"!=typeof f.slidesGrid[a+1]?s>=f.slidesGrid[a]&&s<f.slidesGrid[a+1]-(f.slidesGrid[a+1]-f.slidesGrid[a])/2?e=a:s>=f.slidesGrid[a]&&s<f.slidesGrid[a+1]&&(e=a+1):s>=f.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),t=Math.floor(e/f.params.slidesPerGroup),t>=f.snapGrid.length&&(t=f.snapGrid.length-1),e!==f.activeIndex&&(f.snapIndex=t,f.previousIndex=f.activeIndex,f.activeIndex=e,f.updateClasses())},f.updateClasses=function(){f.slides.removeClass(f.params.slideActiveClass+" "+f.params.slideNextClass+" "+f.params.slidePrevClass);var e=f.slides.eq(f.activeIndex);if(e.addClass(f.params.slideActiveClass),e.next("."+f.params.slideClass).addClass(f.params.slideNextClass),e.prev("."+f.params.slideClass).addClass(f.params.slidePrevClass),f.bullets&&f.bullets.length>0){f.bullets.removeClass(f.params.bulletActiveClass);var a;f.params.loop?(a=Math.ceil(f.activeIndex-f.loopedSlides)/f.params.slidesPerGroup,a>f.slides.length-1-2*f.loopedSlides&&(a-=f.slides.length-2*f.loopedSlides),a>f.bullets.length-1&&(a-=f.bullets.length)):a="undefined"!=typeof f.snapIndex?f.snapIndex:f.activeIndex||0,f.paginationContainer.length>1?f.bullets.each(function(){h(this).index()===a&&h(this).addClass(f.params.bulletActiveClass)}):f.bullets.eq(a).addClass(f.params.bulletActiveClass)}f.params.loop||(f.params.prevButton&&(f.isBeginning?(h(f.params.prevButton).addClass(f.params.buttonDisabledClass),f.params.a11y&&f.a11y&&f.a11y.disable(h(f.params.prevButton))):(h(f.params.prevButton).removeClass(f.params.buttonDisabledClass),f.params.a11y&&f.a11y&&f.a11y.enable(h(f.params.prevButton)))),f.params.nextButton&&(f.isEnd?(h(f.params.nextButton).addClass(f.params.buttonDisabledClass),f.params.a11y&&f.a11y&&f.a11y.disable(h(f.params.nextButton))):(h(f.params.nextButton).removeClass(f.params.buttonDisabledClass),f.params.a11y&&f.a11y&&f.a11y.enable(h(f.params.nextButton)))))},f.updatePagination=function(){if(f.params.pagination&&f.paginationContainer&&f.paginationContainer.length>0){for(var e="",a=f.params.loop?Math.ceil((f.slides.length-2*f.loopedSlides)/f.params.slidesPerGroup):f.snapGrid.length,t=0;a>t;t++)e+=f.params.paginationBulletRender?f.params.paginationBulletRender(t,f.params.bulletClass):'<span class="'+f.params.bulletClass+'"></span>';f.paginationContainer.html(e),f.bullets=f.paginationContainer.find("."+f.params.bulletClass)}},f.update=function(e){function a(){s=Math.min(Math.max(f.translate,f.maxTranslate()),f.minTranslate()),f.setWrapperTranslate(s),f.updateActiveIndex(),f.updateClasses()}if(f.updateContainerSize(),f.updateSlidesSize(),f.updateProgress(),f.updatePagination(),f.updateClasses(),f.params.scrollbar&&f.scrollbar&&f.scrollbar.set(),e){var t,s;f.params.freeMode?a():(t="auto"===f.params.slidesPerView&&f.isEnd&&!f.params.centeredSlides?f.slideTo(f.slides.length-1,0,!1,!0):f.slideTo(f.activeIndex,0,!1,!0),t||a())}},f.onResize=function(){if(f.updateContainerSize(),f.updateSlidesSize(),f.updateProgress(),("auto"===f.params.slidesPerView||f.params.freeMode)&&f.updatePagination(),f.params.scrollbar&&f.scrollbar&&f.scrollbar.set(),f.params.freeMode){var e=Math.min(Math.max(f.translate,f.maxTranslate()),f.minTranslate());f.setWrapperTranslate(e),f.updateActiveIndex(),f.updateClasses()}else f.updateClasses(),"auto"===f.params.slidesPerView&&f.isEnd&&!f.params.centeredSlides?f.slideTo(f.slides.length-1,0,!1,!0):f.slideTo(f.activeIndex,0,!1,!0)};var v=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?v=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(v=["MSPointerDown","MSPointerMove","MSPointerUp"]),f.touchEvents={start:f.support.touch||!f.params.simulateTouch?"touchstart":v[0],move:f.support.touch||!f.params.simulateTouch?"touchmove":v[1],end:f.support.touch||!f.params.simulateTouch?"touchend":v[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===f.params.touchEventsTarget?f.container:f.wrapper).addClass("swiper-wp8-"+f.params.direction),f.initEvents=function(e){var t=e?"off":"on",s=e?"removeEventListener":"addEventListener",r="container"===f.params.touchEventsTarget?f.container[0]:f.wrapper[0],i=f.support.touch?r:document,n=f.params.nested?!0:!1;f.browser.ie?(r[s](f.touchEvents.start,f.onTouchStart,!1),i[s](f.touchEvents.move,f.onTouchMove,n),i[s](f.touchEvents.end,f.onTouchEnd,!1)):(f.support.touch&&(r[s](f.touchEvents.start,f.onTouchStart,!1),r[s](f.touchEvents.move,f.onTouchMove,n),r[s](f.touchEvents.end,f.onTouchEnd,!1)),!a.simulateTouch||f.device.ios||f.device.android||(r[s]("mousedown",f.onTouchStart,!1),i[s]("mousemove",f.onTouchMove,n),i[s]("mouseup",f.onTouchEnd,!1))),window[s]("resize",f.onResize),f.params.nextButton&&(h(f.params.nextButton)[t]("click",f.onClickNext),f.params.a11y&&f.a11y&&h(f.params.nextButton)[t]("keydown",f.a11y.onEnterKey)),f.params.prevButton&&(h(f.params.prevButton)[t]("click",f.onClickPrev),f.params.a11y&&f.a11y&&h(f.params.prevButton)[t]("keydown",f.a11y.onEnterKey)),f.params.pagination&&f.params.paginationClickable&&h(f.paginationContainer)[t]("click","."+f.params.bulletClass,f.onClickIndex),(f.params.preventClicks||f.params.preventClicksPropagation)&&r[s]("click",f.preventClicks,!0)},f.attachEvents=function(){f.initEvents()},f.detachEvents=function(){f.initEvents(!0)},f.allowClick=!0,f.preventClicks=function(e){f.allowClick||(f.params.preventClicks&&e.preventDefault(),f.params.preventClicksPropagation&&(e.stopPropagation(),e.stopImmediatePropagation()))},f.onClickNext=function(e){e.preventDefault(),f.slideNext()},f.onClickPrev=function(e){e.preventDefault(),f.slidePrev()},f.onClickIndex=function(e){e.preventDefault();var a=h(this).index()*f.params.slidesPerGroup;f.params.loop&&(a+=f.loopedSlides),f.slideTo(a)},f.updateClickedSlide=function(e){var a=r(e,"."+f.params.slideClass);if(!a)return f.clickedSlide=void 0,void(f.clickedIndex=void 0);if(f.clickedSlide=a,f.clickedIndex=h(a).index(),f.params.slideToClickedSlide&&void 0!==f.clickedIndex&&f.clickedIndex!==f.activeIndex){var t,s=f.clickedIndex;if(f.params.loop)if(t=h(f.clickedSlide).attr("data-swiper-slide-index"),s>f.slides.length-f.params.slidesPerView)f.fixLoop(),s=f.wrapper.children("."+f.params.slideClass+'[data-swiper-slide-index="'+t+'"]').eq(0).index(),setTimeout(function(){f.slideTo(s)},0);else if(s<f.params.slidesPerView-1){f.fixLoop();var i=f.wrapper.children("."+f.params.slideClass+'[data-swiper-slide-index="'+t+'"]');s=i.eq(i.length-1).index(),setTimeout(function(){f.slideTo(s)},0)}else f.slideTo(s);else f.slideTo(s)}};var g,w,b,y,x,T,S,C,M,P="input, select, textarea, button",z=Date.now(),I=[];f.animating=!1,f.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var E,k;if(f.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),E="touchstart"===e.type,E||!("which"in e)||3!==e.which){if(f.params.noSwiping&&r(e,"."+f.params.noSwipingClass))return void(f.allowClick=!0);if(!f.params.swipeHandler||r(e,f.params.swipeHandler)){if(g=!0,w=!1,y=void 0,k=void 0,f.touches.startX=f.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,f.touches.startY=f.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,b=Date.now(),f.allowClick=!0,f.updateContainerSize(),f.swipeDirection=void 0,f.params.threshold>0&&(S=!1),"touchstart"!==e.type){var a=!0;h(e.target).is(P)&&(a=!1),document.activeElement&&h(document.activeElement).is(P)&&document.activeElement.blur(),a&&e.preventDefault()}f.emit("onTouchStart",f,e)}}},f.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(E&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(f.params.onlyExternal)return w=!0,void(f.allowClick=!1);if(E&&document.activeElement&&e.target===document.activeElement&&h(e.target).is(P))return w=!0,void(f.allowClick=!1);if(f.emit("onTouchMove",f,e),!(e.targetTouches&&e.targetTouches.length>1)){if(f.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,f.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof y){var s=180*Math.atan2(Math.abs(f.touches.currentY-f.touches.startY),Math.abs(f.touches.currentX-f.touches.startX))/Math.PI;y=t()?s>f.params.touchAngle:90-s>f.params.touchAngle}if(y&&f.emit("onTouchMoveOpposite",f,e),"undefined"==typeof k&&f.browser.ieTouch&&(f.touches.currentX!==f.touches.startX||f.touches.currentY!==f.touches.startY)&&(k=!0),g){if(y)return void(g=!1);if(k||!f.browser.ieTouch){f.allowClick=!1,f.emit("onSliderMove",f,e),e.preventDefault(),f.params.touchMoveStopPropagation&&!f.params.nested&&e.stopPropagation(),w||(a.loop&&f.fixLoop(),T=f.getWrapperTranslate(),f.setWrapperTransition(0),f.animating&&f.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),f.params.autoplay&&f.autoplaying&&(f.params.autoplayDisableOnInteraction?f.stopAutoplay():f.pauseAutoplay()),M=!1,f.params.grabCursor&&(f.container[0].style.cursor="move",f.container[0].style.cursor="-webkit-grabbing",f.container[0].style.cursor="-moz-grabbin",f.container[0].style.cursor="grabbing")),w=!0;var r=f.touches.diff=t()?f.touches.currentX-f.touches.startX:f.touches.currentY-f.touches.startY;r*=f.params.touchRatio,f.rtl&&(r=-r),f.swipeDirection=r>0?"prev":"next",x=r+T;var i=!0;if(r>0&&x>f.minTranslate()?(i=!1,f.params.resistance&&(x=f.minTranslate()-1+Math.pow(-f.minTranslate()+T+r,f.params.resistanceRatio))):0>r&&x<f.maxTranslate()&&(i=!1,f.params.resistance&&(x=f.maxTranslate()+1-Math.pow(f.maxTranslate()-T-r,f.params.resistanceRatio))),i&&(e.preventedByNestedSwiper=!0),!f.params.allowSwipeToNext&&"next"===f.swipeDirection&&T>x&&(x=T),!f.params.allowSwipeToPrev&&"prev"===f.swipeDirection&&x>T&&(x=T),f.params.followFinger){if(f.params.threshold>0){if(!(Math.abs(r)>f.params.threshold||S))return void(x=T);if(!S)return S=!0,f.touches.startX=f.touches.currentX,f.touches.startY=f.touches.currentY,x=T,void(f.touches.diff=t()?f.touches.currentX-f.touches.startX:f.touches.currentY-f.touches.startY)}(f.params.freeMode||f.params.watchSlidesProgress)&&f.updateActiveIndex(),f.params.freeMode&&(0===I.length&&I.push({position:f.touches[t()?"startX":"startY"],time:b}),I.push({position:f.touches[t()?"currentX":"currentY"],time:(new Date).getTime()})),f.updateProgress(x),f.setWrapperTranslate(x)}}}}}},f.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),f.emit("onTouchEnd",f,e),g){f.params.grabCursor&&w&&g&&(f.container[0].style.cursor="move",f.container[0].style.cursor="-webkit-grab",f.container[0].style.cursor="-moz-grab",f.container[0].style.cursor="grab");var a=Date.now(),t=a-b;if(f.allowClick&&(f.updateClickedSlide(e),f.emit("onTap",f,e),300>t&&a-z>300&&(C&&clearTimeout(C),C=setTimeout(function(){f&&(f.params.paginationHide&&f.paginationContainer.length>0&&!h(e.target).hasClass(f.params.bulletClass)&&f.paginationContainer.toggleClass(f.params.paginationHiddenClass),f.emit("onClick",f,e))},300)),300>t&&300>a-z&&(C&&clearTimeout(C),f.emit("onDoubleTap",f,e))),z=Date.now(),setTimeout(function(){f&&f.allowClick&&(f.allowClick=!0)},0),!g||!w||!f.swipeDirection||0===f.touches.diff||x===T)return void(g=w=!1);g=w=!1;var s;if(s=f.params.followFinger?f.rtl?f.translate:-f.translate:-x,f.params.freeMode){if(s<-f.minTranslate())return void f.slideTo(f.activeIndex);if(s>-f.maxTranslate())return void f.slideTo(f.slides.length-1);if(f.params.freeModeMomentum){if(I.length>1){var r=I.pop(),i=I.pop(),n=r.position-i.position,o=r.time-i.time;f.velocity=n/o,f.velocity=f.velocity/2,Math.abs(f.velocity)<.02&&(f.velocity=0),(o>150||(new Date).getTime()-r.time>300)&&(f.velocity=0)}else f.velocity=0;I.length=0;var l=1e3*f.params.freeModeMomentumRatio,p=f.velocity*l,d=f.translate+p;f.rtl&&(d=-d);var u,c=!1,m=20*Math.abs(f.velocity)*f.params.freeModeMomentumBounceRatio;d<f.maxTranslate()&&(f.params.freeModeMomentumBounce?(d+f.maxTranslate()<-m&&(d=f.maxTranslate()-m),u=f.maxTranslate(),c=!0,M=!0):d=f.maxTranslate()),d>f.minTranslate()&&(f.params.freeModeMomentumBounce?(d-f.minTranslate()>m&&(d=f.minTranslate()+m),u=f.minTranslate(),c=!0,M=!0):d=f.minTranslate()),0!==f.velocity&&(l=Math.abs(f.rtl?(-d-f.translate)/f.velocity:(d-f.translate)/f.velocity)),f.params.freeModeMomentumBounce&&c?(f.updateProgress(u),f.setWrapperTransition(l),f.setWrapperTranslate(d),f.onTransitionStart(),f.animating=!0,f.wrapper.transitionEnd(function(){M&&(f.emit("onMomentumBounce",f),f.setWrapperTransition(f.params.speed),f.setWrapperTranslate(u),f.wrapper.transitionEnd(function(){f.onTransitionEnd()}))})):f.velocity?(f.updateProgress(d),f.setWrapperTransition(l),f.setWrapperTranslate(d),f.onTransitionStart(),f.animating||(f.animating=!0,f.wrapper.transitionEnd(function(){f.onTransitionEnd()}))):f.updateProgress(d),f.updateActiveIndex()}return void((!f.params.freeModeMomentum||t>=f.params.longSwipesMs)&&(f.updateProgress(),f.updateActiveIndex()))}var v,y=0,S=f.slidesSizesGrid[0];for(v=0;v<f.slidesGrid.length;v+=f.params.slidesPerGroup)"undefined"!=typeof f.slidesGrid[v+f.params.slidesPerGroup]?s>=f.slidesGrid[v]&&s<f.slidesGrid[v+f.params.slidesPerGroup]&&(y=v,S=f.slidesGrid[v+f.params.slidesPerGroup]-f.slidesGrid[v]):s>=f.slidesGrid[v]&&(y=v,S=f.slidesGrid[f.slidesGrid.length-1]-f.slidesGrid[f.slidesGrid.length-2]);var P=(s-f.slidesGrid[y])/S;if(t>f.params.longSwipesMs){if(!f.params.longSwipes)return void f.slideTo(f.activeIndex);"next"===f.swipeDirection&&f.slideTo(P>=f.params.longSwipesRatio?y+f.params.slidesPerGroup:y),"prev"===f.swipeDirection&&f.slideTo(P>1-f.params.longSwipesRatio?y+f.params.slidesPerGroup:y)}else{if(!f.params.shortSwipes)return void f.slideTo(f.activeIndex);"next"===f.swipeDirection&&f.slideTo(y+f.params.slidesPerGroup),"prev"===f.swipeDirection&&f.slideTo(y)}}},f._slideTo=function(e,a){return f.slideTo(e,a,!0,!0)},f.slideTo=function(e,a,s,r){"undefined"==typeof s&&(s=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),f.snapIndex=Math.floor(e/f.params.slidesPerGroup),f.snapIndex>=f.snapGrid.length&&(f.snapIndex=f.snapGrid.length-1);var i=-f.snapGrid[f.snapIndex];f.params.autoplay&&f.autoplaying&&(r||!f.params.autoplayDisableOnInteraction?f.pauseAutoplay(a):f.stopAutoplay()),f.updateProgress(i);for(var n=0;n<f.slidesGrid.length;n++)-i>=f.slidesGrid[n]&&(e=n);if("undefined"==typeof a&&(a=f.params.speed),f.previousIndex=f.activeIndex||0,f.activeIndex=e,i===f.translate)return f.updateClasses(),!1;f.onTransitionStart(s);t()?i:0,t()?0:i;return 0===a?(f.setWrapperTransition(0),f.setWrapperTranslate(i),f.onTransitionEnd(s)):(f.setWrapperTransition(a),f.setWrapperTranslate(i),f.animating||(f.animating=!0,f.wrapper.transitionEnd(function(){f.onTransitionEnd(s)}))),f.updateClasses(),!0},f.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),f.lazy&&f.lazy.onTransitionStart(),e&&(f.emit("onTransitionStart",f),f.activeIndex!==f.previousIndex&&f.emit("onSlideChangeStart",f))},f.onTransitionEnd=function(e){f.animating=!1,f.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),f.lazy&&f.lazy.onTransitionEnd(),e&&(f.emit("onTransitionEnd",f),f.activeIndex!==f.previousIndex&&f.emit("onSlideChangeEnd",f)),f.params.hashnav&&f.hashnav&&f.hashnav.setHash()},f.slideNext=function(e,a,t){if(f.params.loop){if(f.animating)return!1;f.fixLoop();{f.container[0].clientLeft}return f.slideTo(f.activeIndex+f.params.slidesPerGroup,a,e,t)}return f.slideTo(f.activeIndex+f.params.slidesPerGroup,a,e,t)},f._slideNext=function(e){return f.slideNext(!0,e,!0)},f.slidePrev=function(e,a,t){if(f.params.loop){if(f.animating)return!1;f.fixLoop();{f.container[0].clientLeft}return f.slideTo(f.activeIndex-1,a,e,t)}return f.slideTo(f.activeIndex-1,a,e,t)},f._slidePrev=function(e){return f.slidePrev(!0,e,!0)},f.slideReset=function(e,a){return f.slideTo(f.activeIndex,a,e)},f.setWrapperTransition=function(e,a){f.wrapper.transition(e),"slide"!==f.params.effect&&f.effects[f.params.effect]&&f.effects[f.params.effect].setTransition(e),f.params.parallax&&f.parallax&&f.parallax.setTransition(e),f.params.scrollbar&&f.scrollbar&&f.scrollbar.setTransition(e),f.params.control&&f.controller&&f.controller.setTransition(e,a),f.emit("onSetTransition",f,e)},f.setWrapperTranslate=function(e,a,s){var r=0,i=0,n=0;t()?r=f.rtl?-e:e:i=e,f.params.virtualTranslate||f.wrapper.transform(f.support.transforms3d?"translate3d("+r+"px, "+i+"px, "+n+"px)":"translate("+r+"px, "+i+"px)"),f.translate=t()?r:i,a&&f.updateActiveIndex(),"slide"!==f.params.effect&&f.effects[f.params.effect]&&f.effects[f.params.effect].setTranslate(f.translate),f.params.parallax&&f.parallax&&f.parallax.setTranslate(f.translate),f.params.scrollbar&&f.scrollbar&&f.scrollbar.setTranslate(f.translate),f.params.control&&f.controller&&f.controller.setTranslate(f.translate,s),f.emit("onSetTranslate",f,f.translate)},f.getTranslate=function(e,a){var t,s,r,i;return"undefined"==typeof a&&(a="x"),f.params.virtualTranslate?f.rtl?-f.translate:f.translate:(r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?i=new WebKitCSSMatrix("none"===r.webkitTransform?"":r.webkitTransform):(i=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=i.toString().split(",")),"x"===a&&(s=window.WebKitCSSMatrix?i.m41:parseFloat(16===t.length?t[12]:t[4])),"y"===a&&(s=window.WebKitCSSMatrix?i.m42:parseFloat(16===t.length?t[13]:t[5])),f.rtl&&s&&(s=-s),s||0)},f.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=t()?"x":"y"),f.getTranslate(f.wrapper[0],e)},f.observers=[],f.initObservers=function(){if(f.params.observeParents)for(var e=f.container.parents(),a=0;a<e.length;a++)i(e[a]);i(f.container[0],{childList:!1}),i(f.wrapper[0],{attributes:!1})},f.disconnectObservers=function(){for(var e=0;e<f.observers.length;e++)f.observers[e].disconnect();f.observers=[]},f.createLoop=function(){f.wrapper.children("."+f.params.slideClass+"."+f.params.slideDuplicateClass).remove();
var e=f.wrapper.children("."+f.params.slideClass);f.loopedSlides=parseInt(f.params.loopedSlides||f.params.slidesPerView,10),f.loopedSlides=f.loopedSlides+f.params.loopAdditionalSlides,f.loopedSlides>e.length&&(f.loopedSlides=e.length);var a,t=[],s=[];for(e.each(function(a,r){var i=h(this);a<f.loopedSlides&&s.push(r),a<e.length&&a>=e.length-f.loopedSlides&&t.push(r),i.attr("data-swiper-slide-index",a)}),a=0;a<s.length;a++)f.wrapper.append(h(s[a].cloneNode(!0)).addClass(f.params.slideDuplicateClass));for(a=t.length-1;a>=0;a--)f.wrapper.prepend(h(t[a].cloneNode(!0)).addClass(f.params.slideDuplicateClass))},f.destroyLoop=function(){f.wrapper.children("."+f.params.slideClass+"."+f.params.slideDuplicateClass).remove(),f.slides.removeAttr("data-swiper-slide-index")},f.fixLoop=function(){var e;f.activeIndex<f.loopedSlides?(e=f.slides.length-3*f.loopedSlides+f.activeIndex,e+=f.loopedSlides,f.slideTo(e,0,!1,!0)):("auto"===f.params.slidesPerView&&f.activeIndex>=2*f.loopedSlides||f.activeIndex>f.slides.length-2*f.params.slidesPerView)&&(e=-f.slides.length+f.activeIndex+f.loopedSlides,e+=f.loopedSlides,f.slideTo(e,0,!1,!0))},f.appendSlide=function(e){if(f.params.loop&&f.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&f.wrapper.append(e[a]);else f.wrapper.append(e);f.params.loop&&f.createLoop(),f.params.observer&&f.support.observer||f.update(!0)},f.prependSlide=function(e){f.params.loop&&f.destroyLoop();var a=f.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&f.wrapper.prepend(e[t]);a=f.activeIndex+e.length}else f.wrapper.prepend(e);f.params.loop&&f.createLoop(),f.params.observer&&f.support.observer||f.update(!0),f.slideTo(a,0,!1)},f.removeSlide=function(e){f.params.loop&&f.destroyLoop();var a,t=f.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)a=e[s],f.slides[a]&&f.slides.eq(a).remove(),t>a&&t--;t=Math.max(t,0)}else a=e,f.slides[a]&&f.slides.eq(a).remove(),t>a&&t--,t=Math.max(t,0);f.params.observer&&f.support.observer||f.update(!0),f.slideTo(t,0,!1)},f.removeAllSlides=function(){for(var e=[],a=0;a<f.slides.length;a++)e.push(a);f.removeSlide(e)},f.effects={fade:{fadeIndex:null,setTranslate:function(){for(var e=0;e<f.slides.length;e++){var a=f.slides.eq(e),s=a[0].swiperSlideOffset,r=-s;f.params.virtualTranslate||(r-=f.translate);var i=0;t()||(i=r,r=0);var n=f.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);n>0&&1>n&&(f.effects.fade.fadeIndex=e),a.css({opacity:n}).transform("translate3d("+r+"px, "+i+"px, 0px)")}},setTransition:function(e){if(f.slides.transition(e),f.params.virtualTranslate&&0!==e){var a=null!==f.effects.fade.fadeIndex?f.effects.fade.fadeIndex:f.activeIndex;f.slides.eq(a).transitionEnd(function(){for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],a=0;a<e.length;a++)f.wrapper.trigger(e[a])})}}},cube:{setTranslate:function(){var e,a=0;f.params.cube.shadow&&(t()?(e=f.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=h('<div class="swiper-cube-shadow"></div>'),f.wrapper.append(e)),e.css({height:f.width+"px"})):(e=f.container.find(".swiper-cube-shadow"),0===e.length&&(e=h('<div class="swiper-cube-shadow"></div>'),f.container.append(e))));for(var s=0;s<f.slides.length;s++){var r=f.slides.eq(s),i=90*s,n=Math.floor(i/360);f.rtl&&(i=-i,n=Math.floor(-i/360));var o=Math.max(Math.min(r[0].progress,1),-1),l=0,p=0,d=0;s%4===0?(l=4*-n*f.size,d=0):(s-1)%4===0?(l=0,d=4*-n*f.size):(s-2)%4===0?(l=f.size+4*n*f.size,d=f.size):(s-3)%4===0&&(l=-f.size,d=3*f.size+4*f.size*n),f.rtl&&(l=-l),t()||(p=l,l=0);var u="rotateX("+(t()?0:-i)+"deg) rotateY("+(t()?i:0)+"deg) translate3d("+l+"px, "+p+"px, "+d+"px)";if(1>=o&&o>-1&&(a=90*s+90*o,f.rtl&&(a=90*-s-90*o)),r.transform(u),f.params.cube.slideShadows){var c=r.find(t()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),m=r.find(t()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===c.length&&(c=h('<div class="swiper-slide-shadow-'+(t()?"left":"top")+'"></div>'),r.append(c)),0===m.length&&(m=h('<div class="swiper-slide-shadow-'+(t()?"right":"bottom")+'"></div>'),r.append(m));{r[0].progress}c.length&&(c[0].style.opacity=-r[0].progress),m.length&&(m[0].style.opacity=r[0].progress)}}if(f.wrapper.css({"-webkit-transform-origin":"50% 50% -"+f.size/2+"px","-moz-transform-origin":"50% 50% -"+f.size/2+"px","-ms-transform-origin":"50% 50% -"+f.size/2+"px","transform-origin":"50% 50% -"+f.size/2+"px"}),f.params.cube.shadow)if(t())e.transform("translate3d(0px, "+(f.width/2+f.params.cube.shadowOffset)+"px, "+-f.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+f.params.cube.shadowScale+")");else{var v=Math.abs(a)-90*Math.floor(Math.abs(a)/90),g=1.5-(Math.sin(2*v*Math.PI/360)/2+Math.cos(2*v*Math.PI/360)/2),w=f.params.cube.shadowScale,b=f.params.cube.shadowScale/g,y=f.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+b+") translate3d(0px, "+(f.height/2+y)+"px, "+-f.height/2/b+"px) rotateX(-90deg)")}var x=f.isSafari||f.isUiWebView?-f.size/2:0;f.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(t()?0:a)+"deg) rotateY("+(t()?-a:0)+"deg)")},setTransition:function(e){f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),f.params.cube.shadow&&!t()&&f.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=f.translate,a=t()?-e+f.width/2:-e+f.height/2,s=t()?f.params.coverflow.rotate:-f.params.coverflow.rotate,r=f.params.coverflow.depth,i=0,n=f.slides.length;n>i;i++){var o=f.slides.eq(i),l=f.slidesSizesGrid[i],p=o[0].swiperSlideOffset,d=(a-p-l/2)/l*f.params.coverflow.modifier,u=t()?s*d:0,c=t()?0:s*d,m=-r*Math.abs(d),v=t()?0:f.params.coverflow.stretch*d,g=t()?f.params.coverflow.stretch*d:0;Math.abs(g)<.001&&(g=0),Math.abs(v)<.001&&(v=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var w="translate3d("+g+"px,"+v+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(w),o[0].style.zIndex=-Math.abs(Math.round(d))+1,f.params.coverflow.slideShadows){var b=o.find(t()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),y=o.find(t()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");0===b.length&&(b=h('<div class="swiper-slide-shadow-'+(t()?"left":"top")+'"></div>'),o.append(b)),0===y.length&&(y=h('<div class="swiper-slide-shadow-'+(t()?"right":"bottom")+'"></div>'),o.append(y)),b.length&&(b[0].style.opacity=d>0?d:0),y.length&&(y[0].style.opacity=-d>0?-d:0)}}if(f.browser.ie){var x=f.wrapper[0].style;x.perspectiveOrigin=a+"px 50%"}},setTransition:function(e){f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},f.lazy={initialImageLoaded:!1,loadImageInSlide:function(e){if("undefined"!=typeof e&&0!==f.slides.length){var a=f.slides.eq(e),t=a.find("img.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");0!==t.length&&t.each(function(){var e=h(this);e.addClass("swiper-lazy-loading");var t=e.attr("data-src");f.loadImage(e[0],t,!1,function(){e.attr("src",t),e.removeAttr("data-src"),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),a.find(".swiper-lazy-preloader, .preloader").remove(),f.emit("onLazyImageReady",f,a[0],e[0])}),f.emit("onLazyImageLoad",f,a[0],e[0])})}},load:function(){if(f.params.watchSlidesVisibility)f.wrapper.children("."+f.params.slideVisibleClass).each(function(){f.lazy.loadImageInSlide(h(this).index())});else if(f.params.slidesPerView>1)for(var e=f.activeIndex;e<f.activeIndex+f.params.slidesPerView;e++)f.slides[e]&&f.lazy.loadImageInSlide(e);else f.lazy.loadImageInSlide(f.activeIndex);if(f.params.lazyLoadingInPrevNext){var a=f.wrapper.children("."+f.params.slideNextClass);a.length>0&&f.lazy.loadImageInSlide(a.index());var t=f.wrapper.children("."+f.params.slidePrevClass);t.length>0&&f.lazy.loadImageInSlide(t.index())}},onTransitionStart:function(){f.params.lazyLoading&&(f.params.lazyLoadingOnTransitionStart||!f.params.lazyLoadingOnTransitionStart&&!f.lazy.initialImageLoaded)&&(f.lazy.initialImageLoaded=!0,f.lazy.load())},onTransitionEnd:function(){f.params.lazyLoading&&!f.params.lazyLoadingOnTransitionStart&&f.lazy.load()}},f.scrollbar={set:function(){if(f.params.scrollbar){var e=f.scrollbar;e.track=h(f.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=h('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=t()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=f.size/f.virtualSize,e.moveDivider=e.divider*(e.trackSize/f.size),e.dragSize=e.trackSize*e.divider,t()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",f.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(f.params.scrollbar){var e,a=f.scrollbar,s=(f.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*f.progress,f.rtl&&t()?(e=-e,e>0?(s=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(s=a.trackSize+e)):0>e?(s=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(s=a.trackSize-e),t()?(a.drag.transform(f.support.transforms3d?"translate3d("+e+"px, 0, 0)":"translateX("+e+"px)"),a.drag[0].style.width=s+"px"):(a.drag.transform(f.support.transforms3d?"translate3d(0px, "+e+"px, 0)":"translateY("+e+"px)"),a.drag[0].style.height=s+"px"),f.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){f.params.scrollbar&&f.scrollbar.drag.transition(e)}},f.controller={setTranslate:function(e,a){var t,s,r=f.params.control;if(f.isArray(r))for(var i=0;i<r.length;i++)r[i]!==a&&r[i]instanceof Swiper&&(e=r[i].rtl&&"horizontal"===r[i].params.direction?-f.translate:f.translate,t=(r[i].maxTranslate()-r[i].minTranslate())/(f.maxTranslate()-f.minTranslate()),s=(e-f.minTranslate())*t+r[i].minTranslate(),f.params.controlInverse&&(s=r[i].maxTranslate()-s),r[i].updateProgress(s),r[i].setWrapperTranslate(s,!1,f),r[i].updateActiveIndex());else r instanceof Swiper&&a!==r&&(e=r.rtl&&"horizontal"===r.params.direction?-f.translate:f.translate,t=(r.maxTranslate()-r.minTranslate())/(f.maxTranslate()-f.minTranslate()),s=(e-f.minTranslate())*t+r.minTranslate(),f.params.controlInverse&&(s=r.maxTranslate()-s),r.updateProgress(s),r.setWrapperTranslate(s,!1,f),r.updateActiveIndex())},setTransition:function(e,a){var t=f.params.control;if(f.isArray(t))for(var s=0;s<t.length;s++)t[s]!==a&&t[s]instanceof Swiper&&t[s].setWrapperTransition(e,f);else t instanceof Swiper&&a!==t&&t.setWrapperTransition(e,f)}},f.hashnav={init:function(){if(f.params.hashnav){f.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=0,s=f.slides.length;s>t;t++){var r=f.slides.eq(t),i=r.attr("data-hash");if(i===e&&!r.hasClass(f.params.slideDuplicateClass)){var n=r.index();f.slideTo(n,a,f.params.runCallbacksOnInit,!0)}}}},setHash:function(){f.hashnav.initialized&&f.params.hashnav&&(document.location.hash=f.slides.eq(f.activeIndex).attr("data-hash")||"")}},f.disableKeyboardControl=function(){h(document).off("keydown",n)},f.enableKeyboardControl=function(){h(document).on("keydown",n)},f._wheelEvent=!1,f._lastWheelScrollTime=(new Date).getTime(),f.params.mousewheelControl){if(void 0!==document.onmousewheel&&(f._wheelEvent="mousewheel"),!f._wheelEvent)try{new WheelEvent("wheel"),f._wheelEvent="wheel"}catch(D){}f._wheelEvent||(f._wheelEvent="DOMMouseScroll")}f.disableMousewheelControl=function(){return f._wheelEvent?(f.container.off(f._wheelEvent,o),!0):!1},f.enableMousewheelControl=function(){return f._wheelEvent?(f.container.on(f._wheelEvent,o),!0):!1},f.parallax={setTranslate:function(){f.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){l(this,f.progress)}),f.slides.each(function(){var e=h(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);l(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=f.params.speed),f.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=h(this),t=parseInt(a.attr("data-swiper-parallax-duration"),10)||e;0===e&&(t=0),a.transition(t)})}},f._plugins=[];for(var L in f.plugins){var G=f.plugins[L](f,f.params[L]);G&&f._plugins.push(G)}return f.callPlugins=function(e){for(var a=0;a<f._plugins.length;a++)e in f._plugins[a]&&f._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},f.emitterEventListeners={},f.emit=function(e){f.params[e]&&f.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(f.emitterEventListeners[e])for(a=0;a<f.emitterEventListeners[e].length;a++)f.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);f.callPlugins&&f.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},f.on=function(e,a){return e=p(e),f.emitterEventListeners[e]||(f.emitterEventListeners[e]=[]),f.emitterEventListeners[e].push(a),f},f.off=function(e,a){var t;if(e=p(e),"undefined"==typeof a)return f.emitterEventListeners[e]=[],f;if(f.emitterEventListeners[e]&&0!==f.emitterEventListeners[e].length){for(t=0;t<f.emitterEventListeners[e].length;t++)f.emitterEventListeners[e][t]===a&&f.emitterEventListeners[e].splice(t,1);return f}},f.once=function(e,a){e=p(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),f.off(e,t)};return f.on(e,t),f},f.a11y={makeFocusable:function(e){return e[0].tabIndex="0",e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(h(e.target).is(f.params.nextButton)?(f.onClickNext(e),f.a11y.notify(f.isEnd?f.params.lastSlideMsg:f.params.nextSlideMsg)):h(e.target).is(f.params.prevButton)&&(f.onClickPrev(e),f.a11y.notify(f.isBeginning?f.params.firstSlideMsg:f.params.prevSlideMsg)))},liveRegion:h('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=f.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(f.params.nextButton){var e=h(f.params.nextButton);f.a11y.makeFocusable(e),f.a11y.addRole(e,"button"),f.a11y.addLabel(e,f.params.nextSlideMsg)}if(f.params.prevButton){var a=h(f.params.prevButton);f.a11y.makeFocusable(a),f.a11y.addRole(a,"button"),f.a11y.addLabel(a,f.params.prevSlideMsg)}h(f.container).append(f.a11y.liveRegion)},destroy:function(){f.a11y.liveRegion&&f.a11y.liveRegion.length>0&&f.a11y.liveRegion.remove()}},f.init=function(){f.params.loop&&f.createLoop(),f.updateContainerSize(),f.updateSlidesSize(),f.updatePagination(),f.params.scrollbar&&f.scrollbar&&f.scrollbar.set(),"slide"!==f.params.effect&&f.effects[f.params.effect]&&(f.params.loop||f.updateProgress(),f.effects[f.params.effect].setTranslate()),f.params.loop?f.slideTo(f.params.initialSlide+f.loopedSlides,0,f.params.runCallbacksOnInit):(f.slideTo(f.params.initialSlide,0,f.params.runCallbacksOnInit),0===f.params.initialSlide&&(f.parallax&&f.params.parallax&&f.parallax.setTranslate(),f.lazy&&f.params.lazyLoading&&f.lazy.load())),f.attachEvents(),f.params.observer&&f.support.observer&&f.initObservers(),f.params.preloadImages&&!f.params.lazyLoading&&f.preloadImages(),f.params.autoplay&&f.startAutoplay(),f.params.keyboardControl&&f.enableKeyboardControl&&f.enableKeyboardControl(),f.params.mousewheelControl&&f.enableMousewheelControl&&f.enableMousewheelControl(),f.params.hashnav&&f.hashnav&&f.hashnav.init(),f.params.a11y&&f.a11y&&f.a11y.init(),f.emit("onInit",f)},f.cleanupStyles=function(){f.container.removeClass(f.classNames.join(" ")).removeAttr("style"),f.wrapper.removeAttr("style"),f.slides&&f.slides.length&&f.slides.removeClass([f.params.slideVisibleClass,f.params.slideActiveClass,f.params.slideNextClass,f.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),f.paginationContainer&&f.paginationContainer.length&&f.paginationContainer.removeClass(f.params.paginationHiddenClass),f.bullets&&f.bullets.length&&f.bullets.removeClass(f.params.bulletActiveClass),f.params.prevButton&&h(f.params.prevButton).removeClass(f.params.buttonDisabledClass),f.params.nextButton&&h(f.params.nextButton).removeClass(f.params.buttonDisabledClass),f.params.scrollbar&&f.scrollbar&&(f.scrollbar.track&&f.scrollbar.track.length&&f.scrollbar.track.removeAttr("style"),f.scrollbar.drag&&f.scrollbar.drag.length&&f.scrollbar.drag.removeAttr("style"))},f.destroy=function(e,a){f.detachEvents(),f.stopAutoplay(),f.params.loop&&f.destroyLoop(),a&&f.cleanupStyles(),f.disconnectObservers(),f.params.keyboardControl&&f.disableKeyboardControl&&f.disableKeyboardControl(),f.params.mousewheelControl&&f.disableMousewheelControl&&f.disableMousewheelControl(),f.params.a11y&&f.a11y&&f.a11y.destroy(),f.emit("onDestroy"),e!==!1&&(f=null)},f.init(),f}},Swiper.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),s=(e.match(/(iPod)(.*OS\s([\d_]+))?/),!t&&e.match(/(iPhone\sOS)\s([\d_]+)/));return{ios:t||s||t,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var a=["jQuery","Zepto","Dom7"],t=0;t<a.length;t++)window[a[t]]&&e(window[a[t]]);var s;s="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,s&&("transitionEnd"in s.fn||(s.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),t=0;t<s.length;t++)r.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=this;if(e)for(t=0;t<s.length;t++)r.on(s[t],a);return this}),"transform"in s.fn||(s.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in s.fn||(s.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this}))}(),"undefined"!=typeof module?module.exports=Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});
//# sourceMappingURL=maps/swiper.jquery.min.js.map
/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

/*!
 *  Sharrre.com - Make your sharing widget!
 *  Version: beta 1.3.5
 *  Author: Julien Hany
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

;(function ( $, window, document, undefined ) {
	if (typeof _gaq == 'undefined') {
		var _gaq = [];
	}

	/* Defaults
	================================================== */
	var pluginName = 'sharrre',
	defaults = {
		className: '',
		share: {
			googlePlus: false,
			facebook: false,
			twitter: false,
			digg: false,
			delicious: false,
			stumbleupon: false,
			linkedin: false,
			pinterest: false
		},
		shareTotal: 0,
		template: '',
		title: '',
		url: document.location.href,
		text: document.title,
		urlCurl: '',  //PHP script for google plus...
		count: {}, //counter by social network
		total: 0,  //total of sharing
		shorterTotal: true, //show total by k or M when number is to big
		enableHover: true, //disable if you want to personalize hover event with callback
		enableCounter: true, //disable if you just want use buttons
		enableTracking: false, //tracking with google analitycs
		hover: function(){}, //personalize hover event with this callback function
		hide: function(){}, //personalize hide event with this callback function
		click: function(){}, //personalize click event with this callback function
		render: function(){}, //personalize render event with this callback function
		buttons: {  //settings for buttons
			googlePlus : {  //http://www.google.com/webmasters/+1/button/
				url: '',  //if you need to personnalize button url
				urlCount: false,  //if you want to use personnalize button url on global counter
				size: 'medium',
				lang: 'en-US',
				annotation: ''
			},
			facebook: { //http://developers.facebook.com/docs/reference/plugins/like/
				url: '',  //if you need to personalize url button
				urlCount: false,  //if you want to use personnalize button url on global counter
				action: 'like',
				layout: 'button_count',
				width: '',
				send: 'false',
				faces: 'false',
				colorscheme: '',
				font: '',
				lang: 'en_US'
			},
			twitter: {  //http://twitter.com/about/resources/tweetbutton
				url: '',  //if you need to personalize url button
				urlCount: false,  //if you want to use personnalize button url on global counter
				count: 'horizontal',
				hashtags: '',
				via: '',
				related: '',
				lang: 'en'
			},
			digg: { //http://about.digg.com/downloads/button/smart
				url: '',  //if you need to personalize url button
				urlCount: false,  //if you want to use personnalize button url on global counter
				type: 'DiggCompact'
			},
			delicious: {
				url: '',  //if you need to personalize url button
				urlCount: false,  //if you want to use personnalize button url on global counter
				size: 'medium' //medium or tall
			},
			stumbleupon: {  //http://www.stumbleupon.com/badges/
				url: '',  //if you need to personalize url button
				urlCount: false,  //if you want to use personnalize button url on global counter
				layout: '1'
			},
			linkedin: {  //http://developer.linkedin.com/plugins/share-button
				url: '',  //if you need to personalize url button
				urlCount: false,  //if you want to use personnalize button url on global counter
				counter: ''
			},
			pinterest: { //http://pinterest.com/about/goodies/
				url: '',  //if you need to personalize url button
				media: '',
				description: '',
				layout: 'horizontal'
			},
			vk: {
				url: '',  //if you need to personalize url button
				title: '',
				description: '',
				image: '',
				noparse: true,
			}
		}
	},
	/* Json URL to get count number
	================================================== */
	urlJson = {
		googlePlus: "",

	//new FQL method by Sire
	facebook: "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
		//old method facebook: "http://graph.facebook.com/?id={url}&callback=?",
		//facebook : "http://api.ak.facebook.com/restserver.php?v=1.0&method=links.getStats&urls={url}&format=json"
		
		twitter: "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
		digg: "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
		delicious: 'http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?',
		//stumbleupon: "http://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}&format=jsonp&callback=?",
		stumbleupon: "",
		linkedin: "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
		pinterest: "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
		vk: "http://vk.com/share.php?act=count&index=1&url={url}"
	},
	/* Load share buttons asynchronously
	================================================== */
	loadButton = {
		googlePlus : function(self){
			var sett = self.options.buttons.googlePlus;
			//$(self.element).find('.buttons').append('<div class="button googleplus"><g:plusone size="'+self.options.buttons.googlePlus.size+'" href="'+self.options.url+'"></g:plusone></div>');
			$(self.element).find('.buttons').append('<div class="button googleplus"><div class="g-plusone" data-size="'+sett.size+'" data-href="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-annotation="'+sett.annotation+'"></div></div>');
			window.___gcfg = {
				lang: self.options.buttons.googlePlus.lang
			};
			var loading = 0;
			if(typeof gapi === 'undefined' && loading == 0){
				loading = 1;
				(function() {
					var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
					po.src = '//apis.google.com/js/plusone.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
				})();
			}
			else{
				gapi.plusone.go();
			}
		},
		facebook : function(self){
			var sett = self.options.buttons.facebook;
			$(self.element).find('.buttons').append('<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-send="'+sett.send+'" data-layout="'+sett.layout+'" data-width="'+sett.width+'" data-show-faces="'+sett.faces+'" data-action="'+sett.action+'" data-colorscheme="'+sett.colorscheme+'" data-font="'+sett.font+'" data-via="'+sett.via+'"></div></div>');
			var loading = 0;
			if(typeof FB === 'undefined' && loading == 0){
				loading = 1;
				(function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {return;}
					js = d.createElement(s); js.id = id;
					js.src = '//connect.facebook.net/'+sett.lang+'/all.js#xfbml=1';
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
			}
			else{
				FB.XFBML.parse();
			}
		},
		twitter : function(self){
			var sett = self.options.buttons.twitter;
			$(self.element).find('.buttons').append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-count="'+sett.count+'" data-text="'+self.options.text+'" data-via="'+sett.via+'" data-hashtags="'+sett.hashtags+'" data-related="'+sett.related+'" data-lang="'+sett.lang+'">Tweet</a></div>');
			var loading = 0;
			if(typeof twttr === 'undefined' && loading == 0){
				loading = 1;
				(function() {
					var twitterScriptTag = document.createElement('script');
					twitterScriptTag.type = 'text/javascript';
					twitterScriptTag.async = true;
					twitterScriptTag.src = '//platform.twitter.com/widgets.js';
					var s = document.getElementsByTagName('script')[0];
					s.parentNode.insertBefore(twitterScriptTag, s);
				})();
			}
			else{
				$.ajax({ url: '//platform.twitter.com/widgets.js', dataType: 'script', cache:true}); //http://stackoverflow.com/q/6536108
			}
		},
		digg : function(self){
			var sett = self.options.buttons.digg;
			$(self.element).find('.buttons').append('<div class="button digg"><a class="DiggThisButton '+sett.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent((sett.url !== '' ? sett.url : self.options.url))+'"></a></div>');
			var loading = 0;
			if(typeof __DBW === 'undefined' && loading == 0){
				loading = 1;
				(function() {
					var s = document.createElement('SCRIPT'), s1 = document.getElementsByTagName('SCRIPT')[0];
					s.type = 'text/javascript';
					s.async = true;
					s.src = '//widgets.digg.com/buttons.js';
					s1.parentNode.insertBefore(s, s1);
				})();
			}
		},
		delicious : function(self){
			if(self.options.buttons.delicious.size == 'tall'){//tall
				var css = 'width:50px;',
				cssCount = 'height:35px;width:50px;font-size:15px;line-height:35px;',
				cssShare = 'height:18px;line-height:18px;margin-top:3px;';
			}
			else{//medium
				var css = 'width:93px;',
				cssCount = 'float:right;padding:0 3px;height:20px;width:26px;line-height:20px;',
				cssShare = 'float:left;height:20px;line-height:20px;';
			}
			var count = self.shorterTotal(self.options.count.delicious);
			if(typeof count === "undefined"){
				count = 0;
			}
			$(self.element).find('.buttons').append(
			'<div class="button delicious"><div style="'+css+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;">'+
			'<div style="'+cssCount+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+count+'</div>'+
			'<div style="'+cssShare+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;">'+
			'<img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>');
			
			$(self.element).find('.delicious').on('click', function(){
				self.openPopup('delicious');
			});
		},
		stumbleupon : function(self){
			var sett = self.options.buttons.stumbleupon;
			$(self.element).find('.buttons').append('<div class="button stumbleupon"><su:badge layout="'+sett.layout+'" location="'+(sett.url !== '' ? sett.url : self.options.url)+'"></su:badge></div>');
			var loading = 0;
			if(typeof STMBLPN === 'undefined' && loading == 0){
				loading = 1;
				(function() {
					var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
					li.src = '//platform.stumbleupon.com/1/widgets.js'; 
					var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
				})();
				s = window.setTimeout(function(){
					if(typeof STMBLPN !== 'undefined'){
						STMBLPN.processWidgets();
						clearInterval(s);
					}
				},500);
			}
			else{
				STMBLPN.processWidgets();
			}
		},
		linkedin : function(self){
			var sett = self.options.buttons.linkedin;
			$(self.element).find('.buttons').append('<div class="button linkedin"><script type="in/share" data-url="'+(sett.url !== '' ? sett.url : self.options.url)+'" data-counter="'+sett.counter+'"></script></div>');
			var loading = 0;
			if(typeof window.IN === 'undefined' && loading == 0){
				loading = 1;
				(function() {
					var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
					li.src = '//platform.linkedin.com/in.js'; 
					var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
				})();
			}
			else{
				window.IN.init();
			}
		},
		pinterest : function(self){
			var sett = self.options.buttons.pinterest;
			$(self.element).find('.buttons').append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(sett.url !== '' ? sett.url : self.options.url)+'&media='+sett.media+'&description='+sett.description+'" class="pin-it-button" count-layout="'+sett.layout+'">Pin It</a></div>');

			(function() {
				var li = document.createElement('script');li.type = 'text/javascript';li.async = true;
				li.src = '//assets.pinterest.com/js/pinit.js'; 
				var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(li, s);
			})();
		}
	},
	/* Tracking for Google Analytics
	================================================== */
	tracking = {
		googlePlus: function(){},
		facebook: function(){
			//console.log('facebook');
			fb = window.setInterval(function(){
				if (typeof FB !== 'undefined') {
					FB.Event.subscribe('edge.create', function(targetUrl) {
						_gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
					});
					FB.Event.subscribe('edge.remove', function(targetUrl) {
						_gaq.push(['_trackSocial', 'facebook', 'unlike', targetUrl]);
					});
					FB.Event.subscribe('message.send', function(targetUrl) {
						_gaq.push(['_trackSocial', 'facebook', 'send', targetUrl]);
					});
					//console.log('ok');
					clearInterval(fb);
				}
			},1000);
		},
		twitter: function(){
			//console.log('twitter');
			tw = window.setInterval(function(){
				if (typeof twttr !== 'undefined') {
					twttr.events.bind('tweet', function(event) {
						if (event) {
							_gaq.push(['_trackSocial', 'twitter', 'tweet']);
						}
					});
					//console.log('ok');
					clearInterval(tw);
				}
			},1000);
		},
		digg: function(){
			//if somenone find a solution, mail me !
			/*$(this.element).find('.digg').on('click', function(){
				_gaq.push(['_trackSocial', 'digg', 'add']);
			});*/
		},
		delicious: function(){},
		stumbleupon: function(){},
		linkedin: function(){
			function LinkedInShare() {
				_gaq.push(['_trackSocial', 'linkedin', 'share']);
			}
		},
		pinterest: function(){
			//if somenone find a solution, mail me !
		}
	},
	/* Popup for each social network
	================================================== */
	popup = {
		googlePlus: function(opt){
			window.open("https://plus.google.com/share?hl="+opt.buttons.googlePlus.lang+"&url="+encodeURIComponent((opt.buttons.googlePlus.url !== '' ? opt.buttons.googlePlus.url : opt.url)), "", "toolbar=0, status=0, width=900, height=500");
		},
		facebook: function(opt){
			window.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent((opt.buttons.facebook.url !== '' ? opt.buttons.facebook.url : opt.url))+"&t="+opt.text+"", "", "toolbar=0, status=0, width=900, height=500");
		},
		twitter: function(opt){
			window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(opt.text)+"&url="+encodeURIComponent((opt.buttons.twitter.url !== '' ? opt.buttons.twitter.url : opt.url))+(opt.buttons.twitter.via !== '' ? '&via='+opt.buttons.twitter.via : ''), "", "toolbar=0, status=0, width=650, height=360");
		},
		digg: function(opt){
			window.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent((opt.buttons.digg.url !== '' ? opt.buttons.digg.url : opt.url))+"&title="+opt.text+"&related=true&style=true", "", "toolbar=0, status=0, width=650, height=360");
		},
		delicious: function(opt){
			window.open('http://www.delicious.com/save?v=5&noui&jump=close&url='+encodeURIComponent((opt.buttons.delicious.url !== '' ? opt.buttons.delicious.url : opt.url))+'&title='+opt.text, 'delicious', 'toolbar=no,width=550,height=550');
		},
		stumbleupon: function(opt){
			window.open('http://www.stumbleupon.com/badge/?url='+encodeURIComponent((opt.buttons.delicious.url !== '' ? opt.buttons.delicious.url : opt.url)), 'stumbleupon', 'toolbar=no,width=550,height=550');
		},
		linkedin: function(opt){
			window.open('https://www.linkedin.com/cws/share?url='+encodeURIComponent((opt.buttons.delicious.url !== '' ? opt.buttons.delicious.url : opt.url))+'&token=&isFramed=true', 'linkedin', 'toolbar=no,width=550,height=550');
		},
		pinterest: function(opt){
			window.open('http://pinterest.com/pin/create/button/?url='+encodeURIComponent((opt.buttons.pinterest.url !== '' ? opt.buttons.pinterest.url : opt.url))+'&media='+encodeURIComponent(opt.buttons.pinterest.media)+'&description='+opt.buttons.pinterest.description, 'pinterest', 'toolbar=no,width=700,height=300');
		},
		vk:function(opt){
			window.open('http://vkontakte.ru/share.php?url='+encodeURIComponent((opt.buttons.vk.url !== '' ? opt.buttons.vk.url : opt.url))+'&title='+encodeURIComponent(opt.buttons.vk.title)+'&description='+opt.buttons.vk.description+'&image='+opt.buttons.vk.image+'&noparse='+opt.buttons.vk.noparse, 'vk', 'toolbar=0,status=0,width=626,height=436');
		}
	};

	/* Plugin constructor
	================================================== */
	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( true, {}, defaults, options);
		this.options.share = options.share; //simple solution to allow order of buttons

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	};

	/* Initialization method
	================================================== */
	Plugin.prototype.init = function () {
		var self = this;
		if(this.options.urlCurl !== ''){
			var delimiter = this.options.urlCurl.search('\\?') < 0 ? '?' : '&';
			urlJson.googlePlus = this.options.urlCurl + delimiter + 'url={url}&type=googlePlus'; // PHP script for GooglePlus...
			urlJson.stumbleupon = this.options.urlCurl + delimiter + '?url={url}&type=stumbleupon'; // PHP script for Stumbleupon...
		}
		$(this.element).addClass(this.options.className); //add class

		//HTML5 Custom data
		if(typeof $(this.element).data('title') !== 'undefined'){
			this.options.title = $(this.element).attr('data-title');
		}
		if(typeof $(this.element).data('url') !== 'undefined'){
			this.options.url = $(this.element).data('url');
		}
		if(typeof $(this.element).data('text') !== 'undefined'){
			this.options.text = $(this.element).data('text');
		}
		
		//how many social website have been selected
		$.each(this.options.share, function(name, val) {
			if(val === true){
				self.options.shareTotal ++;
			}
		});
		
		if(self.options.enableCounter === true){  //if for some reason you don't need counter
			//get count of social share that have been selected
			$.each(this.options.share, function(name, val) {
				if(val === true){
					//self.getSocialJson(name);
					try {
						self.getSocialJson(name);
					} catch(e){
					}
				}
			});
		} else if(self.options.template !== '') {  //for personalized button (with template)
			this.options.render(this, this.options);
		} else { // if you want to use official button like example 3 or 5
			this.loadButtons();
		}

		//add hover event
		$(this.element).hover(function(){
			//load social button if enable and 1 time
			if($(this).find('.buttons').length === 0 && self.options.enableHover === true){
				self.loadButtons();
			}
			self.options.hover(self, self.options);
		}, function(){
			self.options.hide(self, self.options);
		});

		//click event
		$(this.element).click(function(){
			self.options.click(self, self.options);
			return false;
		});
	};

	/* loadButtons methode
	================================================== */
	Plugin.prototype.loadButtons = function () {
		var self = this;
		$(this.element).append('<div class="buttons"></div>');
		$.each(self.options.share, function(name, val) {
			if(val == true){
				loadButton[name](self);
				if(self.options.enableTracking === true){ //add tracking
					tracking[name]();
				}
			}
		});
	};

	/* getSocialJson methode
	================================================== */
	Plugin.prototype.getSocialJson = function (name) {
		var self = this,
		count = 0,
		url = urlJson[name].replace('{url}', encodeURIComponent(this.options.url));
		if(this.options.buttons[name].urlCount === true && this.options.buttons[name].url !== ''){
			url = urlJson[name].replace('{url}', this.options.buttons[name].url);
		}
		//console.log('name : ' + name + ' - url : '+url); //debug
		if(url != '' && self.options.urlCurl !== ''){  //urlCurl = '' if you don't want to used PHP script but used social button
			$.getJSON(url, function(json){
				if(typeof json.count !== "undefined"){  //GooglePlus, Stumbleupon, Twitter, Pinterest and Digg
					var temp = json.count + '';
					temp = temp.replace('\u00c2\u00a0', '');  //remove google plus special chars
					count += parseInt(temp, 10);
				}
		//get the FB total count (shares, likes and more)
				else if(json.data && json.data.length > 0 && typeof json.data[0].total_count !== "undefined"){ //Facebook total count
					count += parseInt(json.data[0].total_count, 10);
				}
				else if(typeof json[0] !== "undefined"){  //Delicious
					count += parseInt(json[0].total_posts, 10);
				}
				else if(typeof json[0] !== "undefined"){  //Stumbleupon
				}
				self.options.count[name] = count;
				self.options.total += count;
				self.renderer();
				self.rendererPerso();
				//console.log(json); //debug
			})
			.error(function() { 
				self.options.count[name] = 0;
				self.rendererPerso();
			});
		} else {
			self.renderer();
			self.options.count[name] = 0;
			self.rendererPerso();
		}
	};

	/* launch render methode
	================================================== */
	Plugin.prototype.rendererPerso = function () {
		//check if this is the last social website to launch render
		var shareCount = 0;
		for (e in this.options.count) { shareCount++; }
		if(shareCount === this.options.shareTotal){
			this.options.render(this, this.options);
		}
	};

	/* render methode
	================================================== */
	Plugin.prototype.renderer = function () {
		var total = this.options.total,
		template = this.options.template;
		if(this.options.shorterTotal === true){  //format number like 1.2k or 5M
			total = this.shorterTotal(total);
		}

		if(template !== ''){  //if there is a template
			template = template.replace('{total}', total);
			$(this.element).html(template);
		} else { //template by defaults
			$(this.element).html(
				'<div class="box"><a data-total="' + total + '" class="count" href="#"></a>' + 
				(this.options.title !== '' ? '<a class="share" href="#">' + this.options.title + '</a>' : '') +
				'</div>'
			);
		}
	};

	/* format total numbers like 1.2k or 5M
	================================================== */
	Plugin.prototype.shorterTotal = function (num) {
		if (num >= 1e6){
			num = (num / 1e6).toFixed(2) + "M"
		} else if (num >= 1e3){ 
			num = (num / 1e3).toFixed(1) + "k"
		}
		return num;
	};

	/* Methode for open popup
	================================================== */
	Plugin.prototype.openPopup = function (site) {
		popup[site](this.options);  //open
		if(this.options.enableTracking === true){ //tracking!
			var tracking = {
				googlePlus: {site: 'Google', action: '+1'},
				facebook: {site: 'facebook', action: 'like'},
				twitter: {site: 'twitter', action: 'tweet'},
				digg: {site: 'digg', action: 'add'},
				delicious: {site: 'delicious', action: 'add'},
				stumbleupon: {site: 'stumbleupon', action: 'add'},
				linkedin: {site: 'linkedin', action: 'share'},
				pinterest: {site: 'pinterest', action: 'pin'},
				vk: {site: 'vk', action: 'add'}
			};
			_gaq.push(['_trackSocial', tracking[site].site, tracking[site].action]);
		}
	};

	/* Methode for add +1 to a counter
	================================================== */
	Plugin.prototype.simulateClick = function () {
		var html = $(this.element).html();
		$(this.element).html(html.replace(this.options.total, this.options.total+1));
	};

	/* Methode for add +1 to a counter
	================================================== */
	Plugin.prototype.update = function (url, text) {
		if(url !== ''){
			this.options.url = url;
		}
		if(text !== ''){
			this.options.text = text;
		}
	};

	/* A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations
	================================================== */
	$.fn[pluginName] = function ( options ) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
				}
			});
		}
	};
})(jQuery, window, document);

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
        
        if (jQuery('#defined_adult').length>0) {
        jQuery('#defined_adult').prop('disabled', false);
        jQuery('#defined_child').prop('disabled', false);
    }
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
calc_field.datepicker('option', 'changeMonth', true);
calc_field.datepicker('option', 'changeYear', true);
calc_field.datepicker('option', 'yearRange', '2017:2018');
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

