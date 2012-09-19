
/*
 * GET users listing.
 */

exports.blogs = function(req, res) {

	/*var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	res.send(query);*/

	var mongoose = require('mongoose');
	var db = mongoose.createConnection('localhost', 'blogs');
	var schema = new mongoose.Schema({ 
		user : 'String',
		title: 'String',
		entry: 'String'
	});
	var Blogs = db.model('blogs', schema );

	Blogs.find(function( err, blogs ) {

		res.send( blogs );
		mongoose.disconnect();
	}).where('status').equals(true);
	
};