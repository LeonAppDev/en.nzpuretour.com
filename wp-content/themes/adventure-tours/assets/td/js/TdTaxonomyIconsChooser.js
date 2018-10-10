jQuery(document).on('ready', function(){
	var format = function(state){
		if (!state.id || 'none' == state.id) {
			return state.text;
		}

		return jQuery('<span><i style="margin-right:5px; font-size:15px;" class="' + state.element.value + '"></i> ' + state.text + '</span>');
	}

	jQuery('.td-js-font-icons').select2({
		templateResult: format,
		templateSelection: format,
		theme: 'classic',
		allowClear: true,
		placeholder: {
			id: 'none',
			text: td_icon_placeholder ? td_icon_placeholder : 'None',
		}
	});
});