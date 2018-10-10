var ThemeCustomizer = {
	init:function(){
		this._initResetButton(jQuery);
	},

	_initResetButton:function($){
		var config = window.ThemeCustomizerConfig;
		if (!config || !config.resetBtn) {
			return;
		}

		var button = $('<input type="submit" name="theme-reset" id="themeCustomizeReset" class="button-secondary button">')
			.attr('value', config.resetBtn.text)
			.css({
				'float': 'right',
				'margin-right': '10px',
				'margin-top': '9px'
			})
			.on('click', function (e) {
				e.preventDefault();

				if (!confirm(config.resetBtn.confirm)) return;

				button.attr('disabled', 'disabled');

				$.post(
					ajaxurl, {
						wp_customize: 'on',
						action: 'customizer_reset',
						nonce: config.resetBtn.nonce
					}, function () {
						wp.customize.state('saved').set(true);
						location.reload();
					}
				);
			});

		$('#customize-header-actions').append(button);
	}
};

jQuery(function(){ ThemeCustomizer.init(); });