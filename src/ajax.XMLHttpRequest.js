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
        url += '?' + serialize( self );
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

    self.options.ajax.before();

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

        self.options.ajax.after();
        resetForm( self );
    };

    xhr.open( method, url );
    setRequestHeader && xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send( data );
};