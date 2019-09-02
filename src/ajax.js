var logger = require( 'logger' );
var helper = require( 'helper' );
var ajaxFnList = {
    iframe: require( 'ajax.IframePolyfill' ),
    XMLHttpRequest: require( 'ajax.XMLHttpRequest' ),
    XDomainRequest: require( 'ajax.XDomainRequest' )
};

module.exports = function() {
    var self = this;
    var ajaxFn = _detectAjaxFn( self );

    ajaxFnList[ ajaxFn ]( self );
};

function _detectAjaxFn( self ) {
    var hasFileType = _formHasInputWithFileType( self );
    var isAutoUsePolyfill = ( hasFileType && self.options.ajax.iframePolyfill === 'auto' ) && helper.cantUseFormData();
    var isNeedUseXDomainRequest = _isNeedUseXDomainRequest( self );

    if( self.options.ajax.iframePolyfill === true || isAutoUsePolyfill ) {
        isAutoUsePolyfill && logger.showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill();
        return 'iframe';
    }
    if( isNeedUseXDomainRequest ) {
        return 'XDomainRequest';
    }
    if( helper.cantUseFormData() && hasFileType ) {
        logger.showWarningWhenIgnoringInputWithFileType();
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

    a.href = self.options.ajax.url;
    a.hostname = helper.hostnameFromStr( a.href ); //ie default return empty

    if( a.hostname !== location.hostname && typeof xhr.withCredentials === 'undefined' && typeof XDomainRequest !== 'undefined' ) {
        return true;
    }

    return false;
}