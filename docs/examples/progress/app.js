(function() {
    var $el = {
        form: $( 'form' ),
        progress: $( '.progress' ),
        loading: $( '.loading' ),
        errorEl: $( 'form .error' )
    };
    var feedback = new Feedback( $el.form.get( 0 ) );
    var fileTypes = 'zip,gz,rar,z,tgz,tar,mp3,mp4,aac,wav,au,wmv,avi,mpg,mpeg,pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,png,tiff,gif,psd,ico,bmp,odt,ods,odp,odb,odg,odf,md,ttf,woff,eot'.split( ',' );
    var maxSizeMB = 6;

    feedback.schema({
        first: function() {
            return _validate( this, {
                'select file error': 'please, select first file',
                'incorrect type error': 'incorrect first file format',
                'max size error': 'Max first file size ' + maxSizeMB + 'Mb'
            });
        },
        second: function() {
            return _validate( this, {
                'select file error': 'please, select second file',
                'incorrect type error': 'incorrect second file format',
                'max size error': 'Max second file size ' + maxSizeMB + 'Mb'
            });
        },
        third: function() {
            return _validate( this, {
                'select file error': 'please, select third file',
                'incorrect type error': 'incorrect third file format',
                'max size error': 'Max third file size ' + maxSizeMB + 'Mb'
            });
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
        iframePostMessage: app.isInternetExplorerBrowser() === 9,
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
            parent.$( 'body' ).trigger( 'feedback.response', e );
        }
    });

    if( app.isInternetExplorerBrowser() === 9 ) {
        $el.form.append( '<input type="hidden" name="use_post_message" value="1">' );
        feedback.update();
    }

    function _validate( self, msg ) {
        var file = self.get().files[ 0 ];
        var fileSizeMB = file && ( file.size / 1024 / 1024 ).toFixed( 2 );
        var fileType = file && _getTypeOfFile( self.get().files[ 0 ] );

        if( !file ) {
            return msg[ 'select file error' ];
        }

        if( fileTypes.indexOf( fileType ) === -1 ) {
            return msg[ 'incorrect type error' ];
        }

        if( fileSizeMB > maxSizeMB ) {
            return msg[ 'max size error' ];
        }
    }

    function _getTypeOfFile( file ) {
        type = file.name.split( '.' );
        type = type[ type.length - 1 ];
        type = type.toLowerCase();

        return type;
    }
})();