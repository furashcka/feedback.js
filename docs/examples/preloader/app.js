(function() {
    var $el = {
        form: $( 'form' ),
        preloader: $( '.preloader' ),
        errorEl: $( 'form .error' )
    };
    var feedback = new Feedback( $el.form.get( 0 ) );

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
        url: app.serverURL,
        loadingClass: 'form--loading',
        iframePostMessage: app.isInternetExplorerBrowser() === 9,
        success: function( e ) {
            var res = null;
            var json = JSON.parse( e.xhr.responseText );

            parent.$( 'body' ).trigger( 'feedback.response', e );
        }
    });

    if( app.isInternetExplorerBrowser() === 9 ) {
        $el.form.append( '<input type="hidden" name="use_post_message" value="1">' );
        feedback.update();
    }

    function _getTypeOfFile( file ) {
        type = file.name.split( '.' );
        type = type[ type.length - 1 ];
        type = type.toLowerCase();

        return type;
    }
})();