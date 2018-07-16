var logger = require( 'logger' );
var helper = require( 'helper' );
var ajaxFnList = {
    iframe: require( 'ajax.IframePolyfill' ),
    XMLHttpRequest: require( 'ajax.XMLHttpRequest' )
};

module.exports = function() {
    var self = this;
    var ajaxFn = _detectAjaxFn( self );

    ajaxFnList[ ajaxFn ]( self );
};

function _detectAjaxFn( self ) {
    var hasFileType = _formHasInputWithFileType( self );
    var isAutoUsePolyfill = ( hasFileType && self.options.ajax.polyfillAjaxIframe === 'auto' ) && helper.cantUseFormData();

    if( self.options.ajax.polyfillAjaxIframe === true || isAutoUsePolyfill ) {
        isAutoUsePolyfill && logger.showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill();
        return 'iframe';
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