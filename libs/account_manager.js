



exports.check_auth = function( req, res, callbacks ) {

	if( global.session !== undefined ) {
		if( global.session.uid !== undefined && global.session.logged === true ) 
			callbacks.success( req, res );
		else 
			callbacks.failure( req, res );
	}
	else {
		if( req.cookies !== undefined  ) {
			if( req.cookies.user !== undefined || req.cookies.pass !== undefined )
				exports.auto_login();
		}
		else {
			callbacks.failure( req, res );
		}
	}
}


exports.log_in = function( req, res, callbacks ) {

	var login_params = {};
 	login_params.uid = req.param( 'uid' );
  	login_params.pwd = req.param( 'pwd' );

  	console.log(login_params);

  	if( login_params.uid ) {
  		if( login_params.pwd ) {
  			if( login_params.uid === 'sam' && login_params.pwd === 'sam' ) {
  				if( global.session === undefined ) global.session = {};
	  			global.session.uid = login_params.uid;
	  			global.session.logged = true;
	  			return true;
	  		}
	  		else {
	  			return false;
	  		}
  		}
  		else {
  			return false;
  		}
  	}
  	else {
  		return false;
  	}
}


exports.auto_login = function() {
	
}