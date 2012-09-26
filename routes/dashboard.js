exports.dashboard = function( req, res ) {

	var render_data = {
		title : 'Dashboard'
	},

	mongoose = require('mongoose'),

	render = function( data ) {
		mongoose.disconnect();
		res.render( 'dashboard', data );
	},

	db = mongoose.createConnection('localhost', 'blogs'),
	schema = new mongoose.Schema({ 
		user : 'String',
		title: 'String',
		entry: 'String'
	}),

	Blogs = db.model('blogs', schema ),
	result = Blogs.find();

	result.where( 'status' )
	.equals( true )
	.select( '-status -_id' )
	.exec( function( err, blogs ) {
		if( blogs ) {
			render_data.blogs = blogs;
			render( render_data );
		}
	});
}