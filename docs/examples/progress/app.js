(function() {
    var $el = {
        form: $( 'form' ),
        progress: $( '.progress' ),
        loading: $( '.loading' ),
        errorEl: $( 'form .error' )
    };
    var feedback = new Feedback( $el.form.get( 0 ) );
    var files = 'zip,gz,rar,z,tgz,tar,mp3,mp4,aac,wav,au,wmv,avi,mpg,mpeg,pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,tiff,gif,psd,ico,bmp,odt,ods,odp,odb,odg,odf,md,ttf,woff,eot'.split( ',' );

    feedback.schema({
        first: function() {
            var file = this.get().files[ 0 ];
            var type = file && _getTypeOfFile( this.get().files[ 0 ] );

            if( !file ) {
                return 'please, select first file';
            }

            if( files.indexOf( type ) === -1 ) {
                return 'incorrect first file format';
            }
        },
        second: function() {
            var file = this.get().files[ 0 ];
            var type = file && _getTypeOfFile( this.get().files[ 0 ] );

            if( !file ) {
                return 'please, select second file';
            }


            if( files.indexOf( type ) === -1 ) {
                return 'incorrect second file format';
            }
        },
        third: function() {
            var file = this.get().files[ 0 ];
            var type = file && _getTypeOfFile( this.get().files[ 0 ] );

            if( !file ) {
                return 'please, select third file';
            }

            if( files.indexOf( type ) === -1 ) {
                return 'incorrect third file format';
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
        before: function() {
            $el.progress.show();
        },
        after: function() {
            $el.progress.hide();
        },
        progress: function( percent ) {
            if( percent === 100 ) {
                $el.loading.show();
                $el.form.hide();
            }

            $el.progress.find( '.determinate' ).css( 'width', percent + '%' );
        },
        success: function( e ) {
            var res = null;
            var json = JSON.parse( e.xhr.responseText );
            
            json.files[ 'first' ] = json.files[ 'first' ].substring( 0, 50 ) + '...';
            json.files[ 'second' ] = json.files[ 'second' ].substring( 0, 50 ) + '...';
            json.files[ 'third' ] = json.files[ 'third' ].substring( 0, 50 ) + '...';
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