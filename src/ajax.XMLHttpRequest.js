var helper = require( 'helper' );
var resetForm = require( 'resetForm' );
var serialize = require( 'serialize' );

module.exports = function( self ) {
    var method = self.options.ajax.method.toUpperCase();
    var url = self.options.ajax.url;
    var data = null;
    var version = '1.0';
    var setRequestHeader = false;
    var xhr = new XMLHttpRequest();

    if( method === 'GET' ) {
        url = _makeSerializationURL( self );
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

    helper.addClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.before();

    _onprogress( self, xhr );

    xhr.onreadystatechange = function() {
        if( xhr.readyState !== 4 ) return;

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
        _fakeProgressEventForOldBrowser( self );
        resetForm( self );
    };

    xhr.open( method, url );
    setRequestHeader && xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send( data );
};

function _makeSerializationURL( self ) {
    var regex = /\?/g;
    var hasVariables = regex.test( self.options.ajax.url );
    var delimiter = hasVariables === true ? '&' : '?';
    var data = serialize( self );

    if( data === '' ) {
        delimiter = '';
    }

    return self.options.ajax.url + delimiter + data;
}

function _onprogress( self, xhr ) {
    if( !helper.canUseProgressEvent() ) return;

    xhr.upload.onprogress = function( e ) {
        var percent = Math.round( e.loaded / e.total * 100 );

        self.options.ajax.progress.call( self.form, percent );
    };
}

function _fakeProgressEventForOldBrowser( self ) {
    !helper.canUseProgressEvent() && self.options.ajax.progress.call( self.form, 100 );
}