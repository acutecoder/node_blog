var Autogrow = (function() {

    var id = 'ag', $el = {};

    if( document.getElementById( id ) === null ) {
        $el = $('<div id="' + id + '"></div>').css({
                position:   'absolute'
                , top:        -10000
                , left:       -10000
                , resize:     'none'
            }).appendTo(document.body);
    }
    else $el = $( '#' + id );

    var update = function( height ) {

        var $this = $( this )
            , val = $this.val()
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n/g, '<br/>')
            , newHeight = $el.html( val ).height();

        $this.css( 'height', Math.max( newHeight + 30, height ) );
    };

    return {
        init : function( el ) {

            var $this = typeof el === 'string' ? $( el ) : el;
            var height = $this.height();

            $this.change( function() {
                update.call( $this, height );
            }).keyup( function() {
                update.call( $this, height );
            }).keydown( function() {
                update.call( $this, height );
            });
            update.call( $this, height );            
        },
        remove : function( el ) {
            var $this = typeof el === 'string' ? $( el ) : el;
        }

    };

})();