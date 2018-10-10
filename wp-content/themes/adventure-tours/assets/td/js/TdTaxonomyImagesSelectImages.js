jQuery(function($){
	var componentElement = $('.td-taxonomy-image'),
		img = componentElement.find('.category-image__image'),
		input_url = componentElement.find('.td-taxonomy-image__image-url'),
		input_id = componentElement.find('.td-taxonomy-image__image-id');

	componentElement.find('.td-taxonomy-image__select').on('click', function(evt){
		var frame = wp.media({
				multiple: false,
			});

		frame.open();

		frame.on( 'select', function() {
			// Grab the selected attachment.
			var attachment = frame.state().get('selection').first();
			frame.close();
			img.attr('src', attachment.attributes.url);
			input_url.val(attachment.attributes.url);
			input_id.val(attachment.attributes.id);
		});
	});

	componentElement.find('.td-taxonomy-image__reset').on('click', function(evt){
		img.attr('src', td_image_placeholder);
		input_url.val('');
		input_id.val('none');
	});
});