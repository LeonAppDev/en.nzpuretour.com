//configuration variable is ThemeCustomizerConfig
var ThemeCustomizerPerview = {
	init:function(){

	},

	getOption:function(name){
		if (!window.ThemeCustomizerConfig || !window.ThemeCustomizerConfig[name]) {
			throw 'ThemeCustomizerConfig for option "'+name+'" is undefined';
		}
		return window.ThemeCustomizerConfig[name];
	}
};

// jQuery(function(){ ThemeCustomizer.init(); });