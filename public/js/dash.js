$(function() {

//	Blog Model

	var Blog = Backbone.Model.extend({
		defaults : {
			title : ''
			, entry : ''
		//	, posted : ''
		//	, updated : ''
			, write_title : 'Write'
		}
	}),

//	Blog Collection

	BlogCollection = Backbone.Collection.extend({
		Model : Blog
		, url : '/blogs'
	}),

//	Blog List View

	BlogList = Backbone.View.extend({

		template: new EJS({ url: '/views/blog_item.ejs' })
		, collection : new BlogCollection( BLOGS )
		, el : '#blog_list'
		, $el : $( this.el )

		, initialize : function ( options ) {
		
			this.render();
		}

		, render : function () {

			var arr_blogs = this.collection.toJSON().reverse();
			for( var i in arr_blogs ) {
				this.$el.append( this.template.render( arr_blogs[i] ) );
			}
		}

	}),

//	Write Blog View

	WriteBlogView = Backbone.View.extend({

		events : {
			'click #write_blog_switch' : 'switch',
			
		}

		, initialize : function () {

			this.template = new EJS({ url : '/views/write_blog.ejs' });
			this.model = new Blog;
			this.el = '#write_blog';
			this.$el = $( this.el );
			this.container = '#write_blog_holder';
			this.$container = this.$( this.container );
			this.open = false;
		}

		, render : function() {

			var ta = this.$container
					.html( this.template.render( this.model.toJSON() ) )
					.find( '#write_blog_entry' );
			Autogrow.init( ta );
		}

		, clear : function() {

			this.$container.html('');
		}

		, switch : function( ab ) {
			
			event.preventDefault();
			//console.log( ab.target.getAttribute('data-hmm') );

			if( !this.open ) {	//	tab is closed - OPEN

				this.render();
				this.$container.addClass( 'open' )
			}
			else if( this.open ) {	//	tab is open - CLOSE

				this.clear();
				this.$container.removeClass( 'open' );
			}

			this.open = !this.open;
		}
	}),

//	Dashboard Router

	DashRouter = Backbone.Router.extend({

		routes : {
			'' : 'dashboard'
		}

		, dashboard : function() {

			var blogList = new BlogList
			  , writeBlogView = new WriteBlogView;

		}
	}),

	dash = new DashRouter;
	Backbone.history.start();

});