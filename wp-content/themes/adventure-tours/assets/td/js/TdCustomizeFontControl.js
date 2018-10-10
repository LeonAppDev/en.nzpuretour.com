(function(){

var api = wp.customize;

// class already defined
if (api.TdFontControl) return;

api.TdFontControl = api.Control.extend({
	/**
	 * @see _getConfig
	 * @type {String}
	 */
	fieldConfigVariablePrefix: '_TdCustomizeFontControl',

	initialize: function( id, options ) {
		api.Control.prototype.initialize.call( this, id, options );
		this._initSelectors();
	},

	_initSelectors: function(){
		this.selectors = this.container.find('select');
		var self = this;
		this.selectors.on('change', function(){
			var subKey = jQuery(this).data('subkey'),
				newValue = jQuery(this).val();
			if ('family' == subKey) {
				self._reloadListsForFamily(newValue);
			}
			self._setSubKey(subKey, newValue);
		});
	},

	_reloadListsForFamily:function(family){
		var lists = this.getStylesAndWeightsForFamily(family);
		for(var listName in lists) {
			this._setupListOptions(listName, lists[listName]);
		}
	},

	getStylesAndWeightsForFamily:function(family){
		var font_set = this._getConfig('font_set'),
			kurKey = font_set[family] ? font_set[family] : {},
			result = {
				style: ['normal'],
				weight: ['regular']
			};

		return jQuery.extend(result, kurKey);
	},

	_getConfig:function(option){
		var confName = this.fieldConfigVariablePrefix + this.id;
		return window[confName] && window[confName][option] ? window[confName][option] : null;
	},

	_getSelectByKey:function(key){
		return this.selectors.filter('[data-subkey="'+key+'"]');
	},

	_setSubKey:function(subKey, value, silent){
		var curSet = this.setting() || {};
		if (value && curSet[subKey] && value == curSet[subKey]) {
			return;
		} else if (!value && !curSet[subKey]) {
			return;
		}
		var newVal = {};
		jQuery.extend(newVal, curSet);
		newVal[subKey] = value;

		this.setting.set(newVal);
		// to mark save changes button as active
		if (!silent) {
			//this.setting.preview();
			//api.trigger('change');
		}
	},

	_setupListOptions:function(listName, set){
		var selector = this._getSelectByKey(listName);
		if (selector.length < 1) {
			return;
		}

		// if set is array - need convert it into object
		var map = {};
		if (set.length) {
			for(var i=0; i<set.length; i++) {
				map[set[i]] = set[i];
			}
		} else {
			map = set;
		}

		var curVal = selector.val(),
			options = [],
			defVal = null,
			hasCurVal = false;

		for(var val in map) {
			options.push('<option value="'+val+'">'+map[val]+'</option>');
			if (!defVal) {
				defVal = val;
			}
			if (!hasCurVal && val == curVal) {
				hasCurVal = true;
			}
		}

		selector.find('option').remove();
		jQuery(options.join('')).appendTo(selector);
		if (hasCurVal) {
			selector.val(curVal);//.trigger('change');
		} else {
			selector.val(defVal).trigger('change');
		}

		return true;
	}
});

api.controlConstructor['themedelight_font'] = api.TdFontControl;

})(); // end of the scope call function