/****************************************
**	Blog Collection
*****************************************/

	BlogCollection = Backbone.Collection.extend({
		Model : BlogModel
		, url : '/blogs'
	}),