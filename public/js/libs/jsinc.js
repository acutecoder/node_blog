window.jsinc = (function() {
	var start_include_id = 'start-include',
		path = 'site-media/js/app/';

	return function( list ) {

		if( list.isArray ) {
			var self = this,
				next = document.getElementById( this.start_include_id ),
				total = list.length,
				i = 0;
			(function insert( no ) {
				if( no < total ) {
					var script = document.createElement( 'script' );
					script.onload = function() {
						next = script;
						insert( no + 1 );
					}
					script.type = 'text/javascript';
					script.src = self.path + list[ no ];
					next.parentNode.insertBefore( script, next.nextSibling );
				}
			})( i );
		}
	}
})();

/*
//	Add to underscore Object
_.mixin({  inc_script : function() {
		include.script.apply( include, arguments ); 
	}});
	*/