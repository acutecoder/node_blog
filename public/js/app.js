$(function() {

/****************************************
**	Blog Item Model
*****************************************/

	var Blog = Backbone.Model.extend({

		defaults : {
			user : '',
			title : '',
			message : ''
		}
/****************************************
**	Blog Collection
*****************************************/	}),

	BlogCollection = Backbone.Collection.extend({
		model : Blog,
		url : '/blogs'
	}),

/****************************************
**	Blog Collection
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
	}),

	LoginView = Backbone.View.extend({

		template : new EJS({ url : '/views/login.ejs' }),
		initialize : function( options ) {

			var self = this;
			this.$el.append( this.template.render() );
			for( var i in options ) {
				this[i] = options[i];
				if( typeof options[i] === 'string' ) {
					if( options[i].indexOf('#') > -1 || options[i].indexOf('.') > -1 ) {
						this['$' + i] = $( options[i] );
					}
				}
			}
			
			this.$login_show.on( 'click', function() {
				event.preventDefault();
				self.switch_login.call( self, this );
			});

			this.$login_btn.on( 'click', function() {
				event.preventDefault();
				self.login.call( self, this );
			});

		},
		switch_login : function( $_obj ) {
			if( this.$login_form.hasClass( 'minimized' ) )
				this.$login_form.removeClass( 'minimized' );
			else this.$login_form.addClass( 'minimized' );
		},
		login : function( $_obj ) {

			var params = {
				uid : this.$uid_input.val(),
				pwd : this.$pwd_input.val()
			};
			//console.log( params );

			if( params.uid !== '' && params.pwd !== '' ) {
				console.log('here');
				$.post( '/some', params, function( logged ) {
					if( logged === true ) window.location = '/admin';
				});	
			}
		}
	}),

	AppRouter = Backbone.Router.extend({

		routes : {
			'' : 'home'
		},

		home: function () {
			var blogView = new BlogView({
				el : '#contents'
			}),
			loginView = new LoginView({
				el : '#log_in',
				login_show : '#login_show',
				login_form : '#login_form',
				login_btn : '#login_btn',
				uid_input : '#uid',
				pwd_input : '#pwd'
			});
		}
	}),

	app = new AppRouter;
	Backbone.history.start();
});