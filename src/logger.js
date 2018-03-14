module.exports = {
    firstArgumentMustBeFormElement: function( el ) {
        if( !el || !el.nodeName || el.nodeName !== 'FORM' ) {
            throw 'First argument must be a form element!';
        }
    },
    checkDependencies: function() {
        if( !window.validator ) {
            throw 'Please include validator.js. You can download from https://github.com/chriso/validator.js';
        }
    },
    showWarningWhenFormHasInputWithFileTypeAndNeedAjaxPolyfill: function() {
        _warn('You can\'t use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.');
    },
    showWarningWhenIgnoringInputWithFileType: function() {
        _warn( 'Ignoring inputs with file type, because used XMLHttpRequest 1.0' );
    }
};

function _warn( text ) {
    if( typeof console.warn === 'function' ) {
        console.warn( text );
    }
}