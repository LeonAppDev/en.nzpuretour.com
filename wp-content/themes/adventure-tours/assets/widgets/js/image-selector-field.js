jQuery(function($){
	$(document).on('click', '.image-selector-field input.select-img', function(evt){
		var input_url = $(this).siblings('.img'),
			input_id = $(this).siblings('.img-id'),
			frame = wp.media({
				multiple: false,
			});

		frame.open();

		frame.on( 'select', function() {
			// Grab the selected attachment.
			var attachment = frame.state().get('selection').first();
			frame.close();
			input_url.val(attachment.attributes.url);
			input_id.val(attachment.attributes.id);
		});
	});

	$(document).on('click', '.image-selector-field input.reset-img', function(evt){
		var input_url = $(this).siblings('.img'),
			input_id = $(this).siblings('.img-id');
		input_url.val('');
		input_id.val('');
	});
});