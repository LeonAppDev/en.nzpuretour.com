if ( 'undefined' == typeof window.ThemeTools ) window.ThemeTools = {};

ThemeTools.ErrorsRenderer = function( config ){
	if( 'object' == typeof config ){
		jQuery.extend( true, this, config );
	}else{
		this.containerSelector = config;
	}
	this._init();
};

ThemeTools.ErrorsRenderer.prototype = {

	containerSelector:'',

	errors:null,

	fieldsAttribute:'name',

	errorWraper:{
		typeOutput:'after',
		className:'wrap-error',
		tag:'div',
	},

	render:function( errors ){
		this.reset();

		if( jQuery.isEmptyObject( errors ) ){
			return;
		}

		for( var fieldKey in errors ){
			this._renderFieldErrors( fieldKey, errors[fieldKey] );
		}
	},

	reset:function(){
		var fields = this._getFields();
		for( var fieldKey in fields ){
			this._getErrorWraper( fieldKey, true ).remove();
		}
	},

	_init:function(){
		if( ! this.containerSelector ){
			throw 'ErrorRenderer: containerSelector is empty.';
		}

		if( jQuery( this.containerSelector ).length < 1 ){
			throw 'ErrorRenderer: containerSelector is not found ("' + this.containerSelector + '").';
		}

		if ( this.errors ) {
			this.render( this.errors );
			delete( this.errors );
		}
	},

	_renderFieldErrors:function( fieldKey, errors ){
		if( jQuery.isArray( errors ) ){
			errors = errors.join('<br>');
		}

		if ( ! errors ) {
			return;
		}
		this._getErrorWraper( fieldKey )
			.html( errors );
	},

	_getFields:function(){
		var self = this,
			fieldsMap = {},
			fieldsjQuery = this._getContainer().find( 'input,textarea,select' ).filter( '[' + this.fieldsAttribute + ']' );

		fieldsjQuery.each(function( index, el ){
			var el = jQuery( this );
			fieldsMap[el.attr( self.fieldsAttribute )] = el;
		});

		return fieldsMap;
	},

	_getField:function( fieldKey ){
		var field,
			fields = this._getFields();

		if( 'undefined' == typeof fields[fieldKey] ){
			field = jQuery();
		}else{
			field = fields[fieldKey];
		}

		return field;
	},

	_getContainer:function(){
		return jQuery( this.containerSelector );
	},

	_getErrorWraper:function( fieldKey, onlyIfExists ){
		var field = this._getField( fieldKey ),
			errorWraperEl = field.parent().find( '.' + this.errorWraper.className );

		if ( errorWraperEl.length < 1 && !onlyIfExists ) {
			var errorWraperTypeOutput = this.errorWraper.typeOutput,
				errorWraperTemplateHtml = '<' + this.errorWraper.tag + ' class="' + this.errorWraper.className + '"></' + this.errorWraper.tag + '>';
			switch( errorWraperTypeOutput ){
			case 'exists':
				throw 'ErrorRenderer: errorWraperEl for item:("' + fieldKey + '") not found, type output "' + errorWraperTypeOutput + '" selector "' + errorWraperSelector + '".';
				break;
			case 'before':
				errorWraperEl = jQuery( errorWraperTemplateHtml ).insertBefore( field );
				break;
			case 'after':
			default:
				errorWraperEl = jQuery( errorWraperTemplateHtml ).insertAfter( field );
				break;
			}
		}

		return errorWraperEl;
	}
};

ThemeTools.ErrorsRendererSet = function( config ){
	if ( config ) {
		jQuery.extend( true, this, config);
	}

	this._init();
};
ThemeTools.ErrorsRendererSet.prototype = {

	containerSelector: '',

	itemSelector:'',

	rowRendererConfig: {
		_getFields:function(){
			var self = this,
				fieldsMap = {},
				fieldsjQuery = this._getContainer().find( 'input,textarea,select' ).filter( '[' + this.fieldsAttribute + ']' );

			fieldsjQuery.each(function( index, el ){
				var el = jQuery( this ),
					fieldIndex = el.attr( self.fieldsAttribute ),
					indexParts = fieldIndex.match(/\[\d+\]\[(\w+)\](\[\])?$/);
				if ( indexParts ) {
					fieldIndex = indexParts[1];
				}
				fieldsMap[fieldIndex] = el;
			});

			return fieldsMap;
		}
	},

	_init:function() {
		if ( ! this.containerSelector ) {
			throw 'Option "containerSelector" is required.';
		}
		if ( !this.itemSelector ) {
			throw 'Option "itemSelector" is required.';
		}
	},

	render:function( errors ) {
		var items = this._getItemRenderers(),
			itemIndex;

		if ( ! errors ) {
			errors = {};
		}

		for(itemIndex in items) {
			items[itemIndex].render( errors[itemIndex] ? errors[itemIndex] : null );
			if ( 'undefined' != errors[itemIndex] ) {
				delete( errors[itemIndex] );
			}
		}

		if ( ! jQuery.isEmptyObject(errors) ) {
			var missedErrors = [],
				errorIndex;
			for( errorIndex in errors ) {
				var curErrorSet = errors[errorIndex];
				if ( 'string' == typeof curErrorSet ) {
					missedErrors.push( curErrorSet );
				} else {
					missedErrors = missedErrors.concat( curErrorSet );
				}
			}
			if ( missedErrors.length > 0 ) {
				alert( missedErrors.join("\n") );
			}
		}
	},

	_getItemRenderers:function() {
		var _cache = this._renderersCache || {},
			set = {},
			self = this;
		this._getContainer().find( this.itemSelector ).each(function(index, el){
			if ( _cache[index] && _cache[index].containerSelector == el ) {
				set[index] = _cache[index];
			} else {
				var itemCfg = jQuery.extend({}, self.rowRendererConfig);
				itemCfg.containerSelector = el;

				set[index] = new ThemeTools.ErrorsRenderer( itemCfg );
			}
		});
		return set; 
	},

	_getContainer:function() {
		return jQuery( this.containerSelector );
	}
};