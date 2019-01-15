(function() {
    var $el = {
        form: $( 'form' ).get( 0 ),
        preloader: $( '.preloader' ),
        errorEl: $( 'form .error' )
    };
    var feedback = new Feedback( $el.form );

    feedback.schema({
        avatar: function() {
            var file = this.get().files[ 0 ];
            var type = file && _getTypeOfFile( this.get().files[ 0 ] );

            if( !file ) {
                return 'please, select file';
            }

            if( type !== 'png' && type !== 'jpeg' && type !== 'jpg' ) {
                return 'unsupported file format';
            }
        }
    });

    feedback.validate({
        error: function( msg ) {
            $el.errorEl.text( msg ).show();
        },
        success: function() {
            $el.errorEl.hide();
        }
    });

    feedback.ajax({
        loadingClass: 'form--loading',
        success: function( e ) {
            var res = null;
            var json = JSON.parse( e.xhr.responseText );
            
            json.files.avatar = json.files.avatar.substring( 0, 50 ) + '...';
            res = {
                xhr: {
                    responseText: JSON.stringify( json, null, 4 )
                }
            };

            parent.$( 'body' ).trigger( 'feedback.response', res );
        }
    });

    function _getTypeOfFile( file ) {
        type = file.name.split( '.' );
        type = type[ type.length - 1 ];
        type = type.toLowerCase();

        return type;
    }
})();

$(function() {
    M.updateTextFields();
});