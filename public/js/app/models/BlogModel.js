/****************************************
**	Blog Item Model
*****************************************/

	var BlogModel = Backbone.Model.extend({
		defaults : {
			title : ''
			, entry : ''
		//	, posted : ''
		//	, updated : ''
			, write_title : 'Write'
		}
	});