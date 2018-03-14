var helper = require( './helper.js' );
var resetForm = require( './resetForm.js' );
var ajaxFnList = {
    XMLHttpRequest_2_0: require( './ajax.XMLHttpRequest.2.0.js' ),
    XMLHttpRequest_1_0: require( './ajax.XMLHttpRequest.1.0.js' ),
    iframe: require( './ajax.IframePolyfill.js' )
};

module.exports = function() {
    var self = this;
    var ajaxFn = _detectAjaxFn( self );

    ajaxFnList[ ajaxFn ]( self );
};

function _detectAjaxFn( self ) {
    var hasFileType = _formHasInputWithFileType( self );
    var cantUseFormData = window.FormData === undefined;
    var isAutoUsePolyfill = ( hasFileType && self.options.polyfillAjaxIframe === 'auto' ) && cantUseFormData;

    if( self.options.polyfillAjaxIframe === true || isAutoUsePolyfill ) {
        return 'iframe';
    }
    if( cantUseFormData && !hasFileType ) return 'XMLHttpRequest_1_0';

    return 'XMLHttpRequest_2_0';
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