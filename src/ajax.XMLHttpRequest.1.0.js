var resetForm = require( './resetForm.js' );
var serialize = require( './serialize.js' );

module.exports = function( self ) {
    var method = self.options.ajax.method;
    var url = self.options.ajax.url
    var res = serialize( self );
    var xhr = new XMLHttpRequest();

    if( method.toUpperCase() === 'GET' ) {
        url += '?' + res;
        res = null;
    }

    self.options.ajax.before();

    xhr.onreadystatechange = function() {
        if( xhr.readyState !== 4 ) return;

        if( xhr.status === 200 ) {
            self.options.ajax.success({
                type: 'ajax.1_0',
                xhr: xhr
            });
        }
        else {
            self.options.ajax.error({
                type: 'ajax.1_0',
                xhr: xhr
            });
        }

        self.options.ajax.after();
        resetForm( self );
    };

    xhr.open( method, url );
    res !== null && xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    xhr.send( res );
};