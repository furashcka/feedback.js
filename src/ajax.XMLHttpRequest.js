var helper = require( 'helper' );
var serialize = require( 'serialize' );

module.exports = function( self ) {
    var method = self.options.ajax.method;
    var url = self.options.ajax.url;
    var data = null;
    var version = '1.0';
    var setRequestHeader = false;
    var xhr = new XMLHttpRequest();

    helper.addClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.before();

    if( method === 'GET' ) {
        url = helper.makeSerializationURL({
            url: self.options.ajax.url,
            serializedString: serialize( self )
        });
    }
    else {
        if( helper.cantUseFormData() ) {
            setRequestHeader = true;
            data = serialize( self );
        }
        else {
            version = '2.0';
            data = new FormData( self.form );
        }
    }

    _onprogress( self, xhr );

    xhr.onreadystatechange = function() {
        if( xhr.readyState !== 4 ) return;

        window.clearTimeout( self.progressTimeoutID );

        if( xhr.status === 200 ) {
            self.options.ajax.success({
                type: 'ajax.' + version,
                xhr: xhr
            });
        }
        else {
            self.options.ajax.error({
                type: 'ajax.' + version,
                xhr: xhr
            });
        }

        helper.removeClass( self.form, self.options.ajax.loadingClass );
        self.options.ajax.after();
        !helper.canUseProgressEvent() && self.options.ajax.progress.call( self.form, 100 );
        self.options.resetFormAfterAjax && self.form.reset();
    };

    xhr.open( method, url );
    setRequestHeader && xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send( data );

    if(!helper.canUseProgressEvent()) {
        self.progressTimeoutID = window.setTimeout(function() {
            self.options.ajax.progress.call( self.form, 30 );
        }, 500);
    }
};

function _onprogress( self, xhr ) {
    if( !helper.canUseProgressEvent() ) return;

    xhr.upload.onprogress = function( e ) {
        var percent = Math.round( e.loaded / e.total * 100 );

        self.options.ajax.progress.call( self.form, percent );
    };
}