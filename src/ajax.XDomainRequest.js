var helper = require( 'helper' );
var serialize = require( 'serialize' );

module.exports = function( self ) {
    var method = self.options.ajax.method;
    var url = self.options.ajax.url;
    var data = null;
    var xdr = new XDomainRequest();
    var ajaxType = 'ajax.1.0';

    helper.addClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.before();

    if( method === 'GET' ) {
        url = helper.makeSerializationURL({
            url: self.options.ajax.url,
            serializedString: serialize( self )
        });
    }
    else {
        data = serialize( self );
    }

    xdr.onload = function() {
        self.options.ajax.success({
            type: ajaxType,
            xhr: xdr
        });

        _end( self );
    };

    xdr.onerror = function() {
        self.options.ajax.error({
            type: ajaxType,
            xhr: xdr
        });

        _end( self );
    };

    xdr.open( method, url );
    xdr.send( data );

    self.progressTimeoutID = window.setTimeout(function() {
        self.options.ajax.progress.call( self.form, 30 );
    }, 500);
};

function _end( self ) {
    window.clearTimeout( self.progressTimeoutID );
    helper.removeClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.after();
    self.options.ajax.progress.call( self.form, 100 );
    self.options.resetFormAfterAjax && self.form.reset();
}