/****************************************
**	LoginView
*****************************************/

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
	});