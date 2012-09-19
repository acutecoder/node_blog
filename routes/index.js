
/*
 * GET home page.
 */

exports.index = function( req, res ){

	var mongoose = require('mongoose');
	var db = mongoose.createConnection('localhost', 'blogs');
	var schema = new mongoose.Schema({ 
		user : 'String',
		title: 'String',
		entry: 'String'
	});
	var Blogs = db.model('blogs', schema );

	var result = Blogs.find();

	function render( err, blogs ) {
		res.render('index', { 
			title : 'Blogs',
			blogs : blogs
		});
	}

	mongoose.disconnect();
	result.where( 'status' )
	.equals( true )
	.select( '-status -_id' )
	.exec( render );
};