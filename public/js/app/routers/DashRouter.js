//	Dashboard Router

	DashRouter = Backbone.Router.extend({

		routes : {
			'' : 'dashboard'
		},

		dashboard : function() {

			var blogList = new BlogList({
				 el : '#blog_list'
			}),

			writeBlogView = new WriteBlogView({
					el : '#write_blog',
					container : '#write_blog_holder'
			});

		}
	})