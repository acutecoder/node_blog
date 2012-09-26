/****************************************
**	BlogView
*****************************************/

	BlogView = Backbone.View.extend({

		template : new EJS({ url : '/views/entry.ejs' }),
		collection : {},
		initialize : function( options ) {

			for( var i in options ) this[i] = options[i];
			if( this.el !== undefined ) this.setElement( this.el );

			this.collection = new BlogCollection( BLOGS );
			this.render();
		},

		render : function() {

			var i = 0,
				self = this
			;

			var arr = this.collection.toJSON().reverse();

			for( var j in arr ) {

				++i;
				(function( no, json ) {

					$( '#thumb_' + no )
					.html( self.template.render( json ) )
					.find('.thumb')
					.on('click', function() {
						self.switch_blog.call( self, this );
					})
					.find( 'article button.close' )
					.on( 'click', function() {
						self.close();
					});

				})( i, arr[j] );		
			}
		},

		switch_blog : function ( $_obj ) {
			this.close();
			$( $_obj ).addClass( 'open' ).find( '.blog_entry' )
			.removeClass('hide');
		},

		close : function() {
			$('.thumb').removeClass( 'open' );
			$('.blog_entry').addClass( 'hide' );
		}
	});