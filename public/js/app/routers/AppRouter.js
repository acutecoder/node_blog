/****************************************
**	AppRouter
*****************************************/

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
	})