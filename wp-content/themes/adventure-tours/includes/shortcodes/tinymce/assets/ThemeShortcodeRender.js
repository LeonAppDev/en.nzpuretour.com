window._aaresizeIframe = function(obj) {
	setTimeout(function(){
		var height = obj.contentWindow.document.body.scrollHeight;
		obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
	},100);
};

(function(){
	var $ = jQuery;
	tinymce.create('tinymce.plugins.ThemeShortcodeRender', {
		settingsDefault:{
			action:'themedelight_render_shortcode',
			shortcodes:[]
		},

		init: function(ed, url) {
return;
//TODO complete refactoring!
			var settings = {
				shortcodes:[
					//'row',
				]
			};
			settings = $.extend(this.settingsDefault, settings);

			if ($.isEmptyObject(settings.shortcodes)) {
				return;
			}
			this.managerRender.View.action = settings.action;

			var self = this;
			$.each(settings.shortcodes, function(index, shortcodeName){
				wp.mce.views.register(shortcodeName, $.extend({}, self.managerRender));
			});

			ed.addButton('shortcodes_render_mode_switcher', {
				title: 'Switch Shortcodes Render Mode',
				image: url+'/render.png',
				onclick: function() {
					ed._renderShortcodesAsHtml = !ed._renderShortcodesAsHtml;
					self.onSwitcherStatusChange(this, ed._renderShortcodesAsHtml);
					ed.setContent(ed.getContent());
				}
			});
		},

		managerRender:{
			View:{
				action: '',

				ready:function(){
					//this._appendEditionModeSwitcher();
				},

				_appendEditionModeSwitcher:function(){
					var self = this;
					$(this.getNodes()).each(function(){
						self._appendEditionModeSwitcherToNode($(this));
					});
				},
				_appendEditionModeSwitcherToNode:function(node){
					var toolbar = node.parent().find('.toolbar'),
						iconClasses = {
							dialog: 'dashicons-media-code',
							freeText: 'dashicons-media-default'
						};

					if (toolbar.find('.' + iconClasses.dialog).length > 0) {
						return;
					}
					$('<div class="dashicons '+iconClasses.dialog+'"></div>')
						.insertBefore(toolbar.find('.edit'))
						/*.on('click', function(){
							node.data('inline',1);
							toolbar.find('.edit').trigger('click');
							setTimeout(function(){
								node.data('inline','');
							}, 200);
						})*/
						.toggle(function(){
							$(this).removeClass(iconClasses.dialog)
								.addClass(iconClasses.freeText);
							node.data('inline',1);
						},function(){
							$(this).removeClass(iconClasses.freeText)
								.addClass(iconClasses.dialog);
							node.data('inline',0);
						});
				},

				initialize: function( options ) {
					this.shortcode = options.shortcode;
				},

				getHtml: function() {
					var ed = tinymce.get(0),
						renderAsHtml = ed._renderShortcodesAsHtml,
						shortcode = this.shortcode,
						attrs = shortcode.attrs.named,
						content = shortcode.content,
						tag = shortcode.tag,
						shortcodeText = '',
						attrsText = ' ',
						result;

					$.each(attrs, function(key, val){
						attrsText += key + '="' + val + '" ';
					});

					shortcodeText = '[' + tag + attrsText +']' + (content ? content + '[/' + tag + ']' : '' );
					if (!renderAsHtml) {
						return shortcodeText;
					}

					var data = {
						action: this.action,
						shortcode: encodeURIComponent(shortcodeText),
					};

					return '<div style="posiyion:relative">' +
						'<div style="width:100%;height:100%;border:0px solid red;position:absolute"></div>' +
						'<iframe scrolling="no" height="0" frameborder="0" onload="top._aaresizeIframe(this);" width="100%" src="'+ajaxurl+'?'+$.param(data)+'"></iframe>' + 
					'</div>';
				}
			},

			edit: function(node){
				tinyMCE.activeEditor.execCommand(
					'insertThemeShortcode',
					false,
					{
						title:'Edit',
						identifier:'_edit_',
						inline:$(node).data('inline')
					}
				);
			}
		},

		onSwitcherStatusChange: function(edButton, isActive){
			var btn = jQuery('#'+edButton._id + ' button');
			if(isActive){
				btn.addClass('sh-render-active');
			} else {
				btn.removeClass('sh-render-active');
			}
		}
	});

	tinymce.PluginManager.add('ThemeShortcodeRender', tinymce.plugins.ThemeShortcodeRender);
})();
