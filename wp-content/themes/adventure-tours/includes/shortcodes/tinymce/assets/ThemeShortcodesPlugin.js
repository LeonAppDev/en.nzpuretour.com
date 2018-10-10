(function(){
	tinymce.create(
		'tinymce.plugins.ThemeShortcodesPlugin',
		{
			init: function(d, pliginUrl) {
				this._commandPluginUrl = pliginUrl;
				this._buttonUrl = pliginUrl + '/button.png';

				if ('4' == tinyMCE.majorVersion) {
					jQuery('<style>.mce-ico.mce-i-shortcodes_button{background:url('+this._buttonUrl+') left top no-repeat;}></style>')
						.appendTo('head');

					d.addButton('shortcodes_button',{
						type:'menubutton',
						title:'Insert Shortcode',
						menu:this.createMenu()
					});
				} else { // fallback for the wp 3.8 with tinyMCE 3.X
					d.addButton('shortcodes_button',{
						title:'Insert Shortcode',
						image:this._buttonUrl
					});
				}
				d.addCommand('insertThemeShortcode', this._commandInsertShortcode, this);
			},

			_commandInsertShortcode:function(a,c)
			{
				var selectedText = tinyMCE.activeEditor.selection.getContent(),
					myThemeSelectedShortcodeType = c.identifier,
					parsedValues = null;

				if ('_edit_' == myThemeSelectedShortcodeType) {
					if (!selectedText) {
						return;
					}
					var mr = selectedText.match(/\s?\[(\w+)(\s|\])/),
						wholeParseResult = mr ? wp.shortcode.next(mr[1], selectedText) : null;
					if (!wholeParseResult) {
						alert('Please select whole text of the shortcode.');
						return;
					}
					parsedValues = wholeParseResult.shortcode.attrs.named;
					if (wholeParseResult.shortcode.content) {
						parsedValues.content = wholeParseResult.shortcode.content;
					}
					myThemeSelectedShortcodeType = wholeParseResult.shortcode.tag;
				}

				var shortcodeInsertText = '['+myThemeSelectedShortcodeType+']',
					myThemeSelectedShortcodeTitle = this._getShortcodeTitleByCode( myThemeSelectedShortcodeType );

				if (!ThemeShortcodesConfig.attributes || !ThemeShortcodesConfig.attributes[myThemeSelectedShortcodeType]) {
					shortcodeInsertText = '['+myThemeSelectedShortcodeType+']';
					tinyMCE.activeEditor.execCommand("mceInsertContent", false, shortcodeInsertText);
				} else {
					//loading and rendering of the settings dialog
					var showDialog = function(respone){
						var newDialog = null,
							dialogSelector = '#themeShortcodesDialod';
						if (!ThemeShortcodesConfig._dialogMarkup) {
							newDialog = respone ? jQuery(respone).find(dialogSelector).hide() : null;
							ThemeShortcodesConfig._dialogMarkup = jQuery('<div />').append(newDialog.clone()).html();
						} else {
							newDialog = jQuery(ThemeShortcodesConfig._dialogMarkup);
						}

						if (!newDialog || newDialog.lenght < 1) {
							throw 'Params error. Please contact support.';
						}

						jQuery(dialogSelector).remove();
						newDialog.appendTo("body");

						ThemeShortcodesDialog.init(myThemeSelectedShortcodeType, parsedValues, selectedText, c.inline);

						var width = jQuery(window).width();
						newDialog.width(580 < width ? 580 : width)
						width = newDialog.width();
						var height = newDialog.height() + 10;

						tb_show(
							(parsedValues ? "Update " : "Insert ") + myThemeSelectedShortcodeTitle +" Shortcode",
							"#TB_inline?width="+width+"&height="+height+"&inlineId=themeShortcodesDialod"
						);
						jQuery('#TB_window').css({
							width:'auto',
							height:'auto'
						});
					};

					if (!ThemeShortcodesConfig._dialogMarkup) {
						jQuery.get(this._commandPluginUrl+"/dialog.php",showDialog);
					} else {
						showDialog();
					}
				};
			},

			_getShortcodeTitleByCode:function(shortcode){
				if ( ! shortcode ) {
					return '[undefined]';
				};

				return this._title_finder( this._getShortcodesMenuItemsMap(), shortcode ) || '['+shortcode+']';
			},

			_title_finder:function( node, search_fore ){
				var result = null;
				if ( typeof node == 'object' ) {
					for( var title in node ) {
						if ( typeof node[title] == 'object' ) {
							result = this._title_finder( node[title], search_fore );
							if ( result ) {
								break;
							}
						} else if ( node[title] == search_fore ) {
							result = title;
							break;
						}
					}
				}
				return result;
			},

			_getShortcodesMenuItemsMap:function() {
				return ThemeShortcodesConfig.menu;
			},

			createMenu:function() {
				var shortcodesMenuItems = this._getShortcodesMenuItemsMap();

				var _getSub = function(btntext, details){
					if (typeof details == 'string') {
						return {
							text: btntext,
							// name: 'btn-' + details,
							id:'btn-' + details,
							onclick: function(ev){
								//var btn = jQuery(ev.target),
								//	shortcodeName = btn.attr('id').replace(/^id-(.*)-text$/,'$1');
								tinyMCE.activeEditor.execCommand(
									'insertThemeShortcode',
									false,
									{title:btntext,identifier:details}
								);
							}
						};
					} else {
						var r = [],
							t;
						for(t in details) {
							r.push(_getSub(t, details[t]));
						};
						return {
							text: btntext,
							//type: 'menubutton',
							menu: r
						};
					}
				};

				var result = [],
					btext;
				for (btext in shortcodesMenuItems) {
					result.push(_getSub(btext, shortcodesMenuItems[btext]));
				}
				return result;
			},

			// fallback for tinyMCE 3.X [start]
			createControl: function(d, e) {
				if('shortcodes_button' != d){
					return null;
				}

				var self = this;
				d = e.createMenuButton('shortcodes_button',{
					title:"Insert Shortcode",
					image:this._buttonUrl
				});
				d.onRenderMenu.add(function(c,b){
					var items = self._getShortcodesMenuItemsMap();
					for(var title in items) {
						self._createControl_menuBuilder(b, title, items[title]);
					}
				});
				return d;
			},

			_createControl_menuBuilder:function(item, title, info)
			{
				if (typeof info == 'string') {
					item.add({
						title: title,
						onclick:function(){
							tinyMCE.activeEditor.execCommand('insertThemeShortcode',false,{
								title:title,
								identifier:info
							});
						}
					});
				} else {
					var nItem = item.addMenu({
						title:title
					});
					for(var cTitle in info) {
						this._createControl_menuBuilder(nItem, cTitle, info[cTitle]);
					}
				}
			},
			// fallback for tinyMCE 3.X [end]

			getInfo:function(){
				return{
					longname:"Theme Shortcode Generator",
					author:"Oleg Kutcyna",
					authorurl:"http://softmanner.com",
					version:"1.0"
				};
			}
		}
	);
	tinymce.PluginManager.add('ThemeShortcodesPlugin',tinymce.plugins.ThemeShortcodesPlugin);
})();

var ThemeShortcodesDialog = {
	needsPreview: false,

	dialogSelector:'#themeShortcodesDialod',

	currentShorcodeName:null,

	makeShortcodeFilters:{},

	optionalAttributesWhitelist:{
		'view':true
	},

	init:function(shorcodeName, editionState, selectedText, isinline){
		if (!shorcodeName) {
			throw 'Parameters error. Please contact support.';
		}
		this.currentShorcodeName = shorcodeName;

		var self = this,
			cnt = this.getContainer();

		cnt.find('#cancelBtn').click(function () {
			self.closeDialog()
		});
		cnt.find("#insertBtn").click(function () {
			self.insertShortcode()
		});

		this.initializeDialog(
			isinline ? {
				'__inline':{
					type:'textarea'
				}
			} : this.getShorcodeConfig(
				this.getCurrentShorcodeName()
			),
			editionState,
			selectedText
		);
	},

	registerMakeShortcodeFilter:function(name, filterFunction){
		this.makeShortcodeFilters[name] = filterFunction;
		return this;
	},

	getContainer:function(){
		return jQuery(this.dialogSelector);
	},

	getOptionsTable:function(){
		return jQuery('#attributesContainer');
	},

	getCurrentShorcodeName: function() {
		return this.currentShorcodeName;
	},

	getShorcodeConfig:function(name){
		if (!ThemeShortcodesConfig.attributes || !ThemeShortcodesConfig.attributes[name]) {
			throw 'Configuration error. Please contact support.';
		}
		return ThemeShortcodesConfig.attributes[name];
	},

	initializeDialog: function (shorcodeConfig, fromEdit, selectedText) {
		if (selectedText && !fromEdit) {
			fromEdit = {
				content: selectedText
			}
		};
		if (fromEdit) {
			shorcodeConfig = jQuery.extend(true, {}, shorcodeConfig);
			if (shorcodeConfig.__inline) {
				shorcodeConfig.__inline.value = this.makeShortcode(fromEdit, true);
			} else {
				for(var atrName in fromEdit) {
					if (typeof shorcodeConfig[atrName] == 'undefined') {
						if ( this.optionalAttributesWhitelist[atrName] ) {
							shorcodeConfig[atrName] = fromEdit[atrName];
						}
						continue;
					}
					if (typeof shorcodeConfig[atrName] == 'string') {
						shorcodeConfig[atrName] = fromEdit[atrName];
					} else {
						shorcodeConfig[atrName].value = fromEdit[atrName];
					}
				}
			}
		}

		var optionsTable = this.getOptionsTable(),
			attrId, attrConf, th, td;
		for (attrId in shorcodeConfig) {
			attrConf = shorcodeConfig[attrId];
			th = jQuery('<th valign="top" scope="row"></th>');
			td = jQuery('<td/>');

			if (typeof attrConf == 'string' || typeof attrConf == 'number') {
				var val = attrConf;
				attrConf = {
					value: val
				};
			}

			jQuery('<label/>').attr({
					'class': (attrConf.required ? 'required' : '')
				})
				.html(attrConf.label ? attrConf.label : attrId)
				.append(attrConf.required ? '<span class="required">*</span>' : '<span class="optional"></span>')
				.appendTo(th);

			attrConf.id = attrId;
			if (!attrConf.type) {
				attrConf.type = attrConf.values ? 'select' : (attrId == 'content' ? 'textarea' : 'text');
			}
			if (!attrConf.help && attrConf.description) {
				attrConf.help = attrConf.description;
			}
			switch (attrConf.type) {
			case 'select':
			case 'dropdown':
				this.createSelectControl(attrConf, td);
				break;

			case 'textarea':
				this.createTextAreaControl(attrConf, td);
				break;

			case 'boolean':
				this.createBooleanControl(attrConf, td);
				break;

			case 'image':
			case 'image_id':
			case 'image_url':
			case 'attach_image_url':
				this.createImageSelect(attrConf, td, 'image_id' == attrConf.type);
				break;

			case 'iconpicker':
				this.createIconpickerControl(attrConf, td);
				break;

			default:
				this.createTextControl(attrConf, td);
				break;
			}

			jQuery('<tr/>')
				.append(th)
				.append(td)
				.appendTo(optionsTable)
			if (attrId == '__inline') {
				th.remove();
				td.attr('colspan', '2');
			}
		}
		optionsTable.find('input,select,textarea').first().focus();
	},

	createTextControl: function (a, b) {
		var newInput = jQuery('<input type="text">')
			.addClass('input-text')
			.appendTo(b);

		this._processStandardAttributesFilter(a, newInput);
	},

	createTextAreaControl: function (a, b) {
		var newInput = jQuery('<textarea>')
			.attr('rows', 10)
			.addClass('input-textarea')
			.appendTo(b);

		this._processStandardAttributesFilter(a, newInput);
	},

	createBooleanControl: function(a, b) {
		if (!a.values) {
			a.values = {'on':'on','off':'off'};
		}
		this.createSelectControl(a, b);
	},

	createSelectControl: function (a, b) {
		if (!a.values) {
			throw 'Params error. Please contact support.';
		}

		var selectNode = jQuery('<select>')
			.addClass('input-select');

		var selectBoxValues = a.values,
			labelValues = a.values;

		if (!a.default) {
			a.default = '';
		}

		for (var v in selectBoxValues) {
			var value = selectBoxValues[v],
				label = labelValues[v];
			if (!value) {
				if (a.default == value) {
					label = a.defaultText ? a.defaultText : a.default;
				}
			}
			selectNode.append('<option value="' + value + '">' + label + '</option>');
		}
		selectNode.appendTo(b);

		this._processStandardAttributesFilter(a, selectNode);
	},

	createIconpickerControl: function(a, b){
		if (typeof a.values == 'string') {
			// makes ajax request to load list of available icons
			jQuery.ajax({
				url:ajaxurl,
				dataType:'json',
				async:false,
				data:{
					action:a.values
				},
				complete:function(request,status){
					if ( 'success' == status && request.responseJSON && request.responseJSON.list ) {
						a.values = request.responseJSON.list;
					} else {
						throw 'Request failed. Please contact support.';
					}
				}
			});
		}

		if (!a.values) {
			throw 'Params error. Please contact support.';
		}

		var selectNode = jQuery('<select>')
			.addClass('input-select');

		// select2 for placeholder work
		selectNode.append('<option></option>');

		var list = a.values,
			default_value = !a.default ? '' : a.default,
			category, icon_class, icon_label;
		for(category in list) {
			for(icon_class in list[category] ) {
				icon_label = list[category][icon_class];
				if ( ! icon_class && icon_class == default_value ) {
					icon_label = a.defaultText ? a.defaultText : default_value;
				}
				selectNode.append('<option value="' + icon_class + '">' + icon_label + '</option>');
			}
		}

		selectNode.appendTo(b);

		this._processStandardAttributesFilter(a, selectNode);

		var _select2_format = function(state){
			if (!state.id || 'none' == state.id) {
				return state.text;
			}

			return jQuery('<span><i style="margin-right:5px; font-size:15px;" class="' + state.id + '"></i> ' + state.text + '</span>');
		};

		selectNode.select2({
			formatResult: _select2_format,
			formatSelection: _select2_format,
			escapeMarkup: function(m) { return m; },
			placeholder: "Select an icon",
			allowClear: true,
		});
	},

	createImageSelect: function (a, b, idAsValue) {
		var nameClassInputUrl = 'shortcode-img-url',
			nameClassInputId = 'shortcode-img-id',
			nameClassButton = 'shortcode-img-button',
			valudeButton = 'Select image';

		var idValueInput = jQuery('<input type="hidden">')
			.addClass(nameClassInputId)
			.appendTo(b);

		var urlValueValue = jQuery('<input type="text">')
			.addClass(nameClassInputUrl)
			.appendTo(b);

		if ( idAsValue ) {
			idValueInput.attr('type', 'text');
			urlValueValue.attr('type', 'hidden');
		}

		jQuery('<input type="button">')
			.attr('value', valudeButton)
			.addClass(nameClassButton + ' button')
			.appendTo(b);

		if (a.help) {
			jQuery('<br/>').appendTo(b);
			jQuery('<span/>')
				.addClass('help-note')
				.html(a.help)
				.appendTo(b)
			a.help = '';
		}

		this._processStandardAttributesFilter(a, idAsValue ? idValueInput : urlValueValue);

		if ( ! window.__gl_image_select_inited ) {
			window.__gl_image_select_inited = true;
			jQuery(function($){
				jQuery(document).on('click', '.'+nameClassButton, function(evt){
					var input_image_id = $(this).siblings('.'+nameClassInputId),
						input_image_url = $(this).siblings('.'+nameClassInputUrl),
						frame = wp.media({
							multiple: false,
							library: {
								type: 'image'
							},
						});
					frame.open();
					frame.on( 'select', function() {
						// Grab the selected attachment.
						var attachment = frame.state().get('selection').first();
						frame.close();
						input_image_url.val(attachment.attributes.url);
						input_image_id.val(attachment.attributes.id);
					});
				});
			});
		}
	},

	_processStandardAttributesFilter:function(a, input) {
		input.attr('name', a.id)
			.addClass('theme-shortcodes-input');

		if (a.required) input.addClass('required');
		if (a.validateLink) input.addClass('validation-required');

		if (a.value || a.default) {
			input.val(a.value || a.default);
		}
		if (a.help) {
			jQuery('<div/>')
				.addClass('help-note')
				.html(a.help)
				.insertAfter(input)
		}
	},

	_getFormInputs:function(){
		//.is('[name]')
		return this.getOptionsTable().find('.theme-shortcodes-input');
	},

	_getFieldByName:function(name){
		return this._getFormInputs().filter('[name="'+name+'"]');
	},

	_isRequiredField:function(field){
		var fieldObj = typeof field == 'string' ? this._getFieldByName(field) : field;
		return field.hasClass('required');
	},

	_validateFormData:function(){
		var isValid = true,
			self = this;

		// reseting all errors
		this.getOptionsTable().find('tr.error-required').removeClass('error-required');

		this._getFormInputs().each(function () {
			var field = jQuery(this);
			if (self._isRequiredField(field) && !field.val()) {
				field.parents('tr').addClass('error-required');
				isValid = false;
			}
		});

		return isValid;
	},

	getFormValues:function(withoutValidation){
		if (!withoutValidation && !this._validateFormData()) {
			return null;
		}

		var result = {};
		this._getFormInputs().each(function () {
			var field = jQuery(this);
			result[field.attr('name')] = field.val();
		});
		return result;
	},

	makeShortcode: function(a, ignoreEmptyAttributes) {
		if (!a) return null;

		if (a.__inline) {
			return a.__inline;
		}

		var content = '',
			attributesText = '';
			shName = this.getCurrentShorcodeName();
		if (typeof a.content != 'undefined') {
			content = a.content;
			delete(a.content);
		}

		var htmlText = this.makeShortcodeFilter(shName, a, content);
		if (htmlText) {
			return htmlText;
		}

		for (var aName in a) {
			if (ignoreEmptyAttributes && !a[aName]) {
				continue;
			}
			attributesText += " " + aName + '="' + a[aName] + '"';
		}
		return '[' + shName + attributesText + ']' + (content ? content + '[/' + shName + ']' : '') + ' ';
	},

	makeShortcodeFilter: function(name, attributes, content){
		var filterFunction = this.makeShortcodeFilters[name] ? this.makeShortcodeFilters[name] : null;
		if (filterFunction) {
			return filterFunction.apply(this, arguments);
		}
		return '';
	},

	insertShortcode: function () {
		var text = this.makeShortcode(this.getFormValues(), true);
		if (!text) return;
		tinyMCE.activeEditor.execCommand('mceInsertContent', false, text);
		this.closeDialog()
	},

	closeDialog: function () {
		this.needsPreview = false;
		tb_remove();
		jQuery(this.dialogSelector).remove()
	}
};

var generateTable = function(name, attributes, content){
	var rows = attributes.rows > 0 ? attributes.rows : 2,
		cols = attributes.cols > 1 ? attributes.cols : 2,
		tableAttributes = '',
		css_class = '';

		if ( attributes.css_class ) {
			css_class = ' ' + attributes.css_class;
		}
		tableAttributes = ' class="table table-bordered' + css_class + '"';

	var thead = '',
		tbody = '',
		i = 1, j = 1,
		elements = [];

	if (rows > 1) {
		rows--;
		while (i <= cols) {
			elements.push('Head ' + i);
			i++;
		}
		thead = '<thead><tr><th>' + elements.join('</th><th>') + '</th></tr></thead>';
		elements = [];
		i = 1;
	}
	while (i <= cols) {
		elements.push(i);
		i++;
	}
	var rowHtml = '<tr><td>' + elements.join('</td><td>') + '</td></tr>';
	while (j <= rows) {
		tbody += rowHtml;
		j++;
	}
	return '<table'+tableAttributes+'>' + thead + '<tbody>' + tbody + '</tbody></table>';
}

ThemeShortcodesDialog.registerMakeShortcodeFilter('table', generateTable)
	.registerMakeShortcodeFilter('tour_table', function(name, attributes, content){
		var classTourTable = 'tours-tabs__table';
		if ( attributes.css_class ) {
			attributes.css_class += ' ' + classTourTable;
		}else{
			attributes.css_class = classTourTable;
		}

		// fix count rows becose replace row with head
		attributes.rows = parseInt(attributes.rows, 10) + 1;
		var tableHtml = generateTable(name, attributes, content);
		return tableHtml.replace( new RegExp("<thead>(.)*</thead>"), '');
	})
	.registerMakeShortcodeFilter('row', function(name, attributes, content){
		var columns = attributes.columns > 0 ? attributes.columns : 2;

		if (columns < 1 || columns > 12) {
			return 'Columnt size is incorrent';
		}
		var width = Math.round(12/columns-0.45),
			widthText = width + '/12',
			lineDelimiter = "<br />";

		var html = '[row'+(attributes.css_class ? ' css_class="'+attributes.css_class+'"' : '')+']';

		//var content = attributes.content ? attributes.content : '';
		if (!content) {
			for(var i=0; i<columns; i++) {
				content += lineDelimiter + '[column width="' + widthText + '"]Column #'+ (i+1) +'[/column]';
			}
		} else {
			// todo complete
		}
		html += content + lineDelimiter + '[/row]';

		return html;
	});