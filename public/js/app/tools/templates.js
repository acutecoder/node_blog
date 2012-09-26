var _template = (function() {

	var path = 'js/app/',
		templates = {};

	$.getJSON({
		url: 'js/app/json/templates.json',
		success: function(data) {
			var templates = data;
		}
	});

	function _template(name) {
		return new EJS(path + templates[name]);
	}

	return _template;

})();