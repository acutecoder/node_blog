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
			'click #write_enter' : 'enter',
			'click #write_clear' : 'clear'
 		}

		, initialize : function () {

			this.template 	= new EJS({ url : '/views/write_blog.ejs' });
			this.model 		= new Blog;
			this.el 		= '#write_blog';
			this.$el 		= $( this.el );
			this.container 	= '#write_blog_holder';
			this.$container = this.$( this.container );
			this.open 		= false;
		}

		, render : function() {
			var ta = this.$container
					.html( this.template.render( this.model.toJSON() ) )
					.find( '#write_blog_entry' );
			Autogrow.init( ta );
		}

		, close : function() {
			this.$container.html('');
		}

		, switch : function( ab ) {
			event.preventDefault();
			//console.log( ab.target.getAttribute('data-hmm') );
			if( !this.open ) {	//	tab is closed - OPEN
				this.render();
				this.$container.addClass( 'open' )
				this.title 		= '#write_blog_title';
				this.$title 	= $( this.title );
				this.entry 		= '#write_blog_entry';
				this.$entry 	= $( this.entry );
			}
			else if( this.open ) {	//	tab is open - CLOSE
				this.close();
				this.$container.removeClass( 'open' );
			}

			this.open = !this.open;
		}

		, enter : function () {
			event.preventDefault();
			console.log('enter');
		}

		, clear : function () {
			event.preventDefault();
			this.$title.val('');
			this.$entry.text('');
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