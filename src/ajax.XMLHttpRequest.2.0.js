var resetForm = require( './resetForm.js' );

module.exports = function( self ) {
    var fd = new FormData( self.form );
    var xhr = new XMLHttpRequest();

    self.options.ajax.before();

    xhr.onreadystatechange = function() {
        if( xhr.readyState !== 4 ) return;

        if( xhr.status === 200 ) {
            self.options.ajax.success({
                type: 'ajax.2_0',
                xhr: xhr
            });
        }
        else {
            self.options.ajax.error({
                type: 'ajax.2_0',
                xhr: xhr
            });
        }

        self.options.ajax.after();
        resetForm( self );
    };

    xhr.open( self.options.ajax.method, self.options.ajax.url );
    xhr.send( fd );
};