(function ($)
{
	$(function()
	{

		var control = $('form.wpcf7-form');
		var cityTextField = $('input[name="cityfieldtext-802"]');
	//	var mailChimpPopup = $('script#mailChimpPopup');
	//	var pathName = window.location.pathname;
	//	console.log(pathName);
		cityTextField.attr('placeholder','This helps us send you relevant information');
		//var form = $('#mc-embedded-subscribe-form');
		var source = getParameterFromURL('subCode');
		control.append('<input id="source" name="your-source" type="hidden" value='+source+'>');
        
       /* if(pathName === "/subscribeComp/")
        {
        	console.log(mailChimpPopup);
        	//mailChimpPopup.parentNode.removeChild(mailChimpPopup);

        }*/

        console.log('End of the funcion');

		function getParameterFromURL(sParam)
		{
			var sPageURL = window.location.search.substring(1);
			var sSearchVaraiables = sPageURL.split('&');

			for(var i=0;i<sSearchVaraiables.length;i++)
			{
				var sParamVariables = sSearchVaraiables[i].split('=');

				if(sParamVariables[0]===sParam)
				{   
					var sParamValue = sParamVariables[1].trim().split('/')[0];
					return sParamValue===undefined?'undefined':sParamValue;
				}
			}
		}
	});
}
)(jQuery);