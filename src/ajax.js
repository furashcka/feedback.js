var helper = require( 'helper' );
var ajaxFnList = {
    iframe: require( 'ajax.IframePolyfill' ),
    XMLHttpRequest: require( 'ajax.XMLHttpRequest' ),
    XDomainRequest: require( 'ajax.XDomainRequest' )
};

module.exports = function( submitInputs ) {
    var self = this;
    var ajaxFn = _detectAjaxFn( self );

    if ( helper.isArray( submitInputs ) ) {
        _ajaxSubmitInputs( self, ajaxFnList[ ajaxFn ], submitInputs );
    } else {
        ajaxFnList[ ajaxFn ]( self );
    }
};

function _detectAjaxFn( self ) {
    var hasFileType = _formHasInputWithFileType( self );
    var isAutoUsePolyfill = ( hasFileType && self.options.ajax.iframePolyfill === 'auto' ) && helper.cantUseFormData();
    var isNeedUseXDomainRequest = _isNeedUseXDomainRequest( self );

    if( self.options.ajax.iframePolyfill === true || isAutoUsePolyfill ) {
        if ( isAutoUsePolyfill ) {
            console.warn( 'You can\'t use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.' );
        }

        return 'iframe';
    }
    if( isNeedUseXDomainRequest ) {
        return 'XDomainRequest';
    }
    if( helper.cantUseFormData() && hasFileType ) {
        console.warn( 'Ignoring inputs with file type, because used XMLHttpRequest 1.0' );
    }

    return 'XMLHttpRequest';
}

function _formHasInputWithFileType( self ) {
    try {
        helper.forEach( self.inputsGroupedByName, function( group ) {
            helper.forEach( group, function( input ) {
                if( String( input.type ).toLowerCase() === 'file' ) throw 'found!';
            });
        });
    }
    catch( e ) {
        return true;
    }

    return false;
}

function _isNeedUseXDomainRequest( self ) {
    var a = document.createElement( 'A' );
    var xhr = new XMLHttpRequest();
    var hostname = null;

    a.href = self.options.ajax.url;
    hostname = a.hostname = helper.hostnameFromStr( a.href ); // ie default return empty
    a = null;

    return hostname !== location.hostname && typeof xhr.withCredentials === 'undefined' && typeof XDomainRequest !== 'undefined';
}

// submit only selected inputs
function _ajaxSubmitInputs( self, ajaxFn, submitInputs ) {
    var inputs = self.form.querySelectorAll( '[name]' );

    helper.forEach( inputs, function ( input ) {
        if ( submitInputs.indexOf( input.name ) !== -1 ) return;

        input.disabledCache = input.disabled;
        input.setAttribute( 'disabled', 'true' );
    });

    ajaxFn( self );

    helper.forEach( inputs, function ( input ) {
        if ( input.disabledCache ) return;

        input.removeAttribute( 'disabled' );
    });
}