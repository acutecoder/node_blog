	BlogList = Backbone.View.extend({
		
		template: new EJS({ url: '/views/blog_item.ejs' })
		, collection : new BlogCollection( BLOGS )

		, initialize : function ( options ) {
			this.render();
		}

		, render : function () {
			var arr_blogs = this.collection.toJSON().reverse();
			for( var i in arr_blogs ) {
				this.$el.append( this.template.render( arr_blogs[i] ) );
			}
		}

	});