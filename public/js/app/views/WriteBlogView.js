//	Write Blog View

	WriteBlogView = Backbone.View.extend({

		template 	= new EJS({ url : '/views/write_blog.ejs' }),
		model 		= new Blog,

		events : {
			'click #write_blog_switch' : 'switch',
			'click #write_enter' : 'enter',
			'click #write_clear' : 'clear'
 		}

		, initialize : function() {
			
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
			if ( !this.open ) {	//	tab is closed - OPEN
				this.render();
				this.$container.addClass( 'open' )
				this.title 		= '#write_blog_title';
				this.$title 	= $( this.title );
				this.entry 		= '#write_blog_entry';
				this.$entry 	= $( this.entry );
			}
			else if ( this.open ) {	//	tab is open - CLOSE
				this.close();
				this.$container.removeClass( 'open' );
			}

			this.open = !this.open;
		}

		, enter : function() {
			event.preventDefault();
			console.log('enter');
		}

		, clear : function() {
			event.preventDefault();
			this.$title.val('');
			this.$entry.text('');
		}
	});