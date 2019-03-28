module.exports = {
    firstArgumentMustBeFormElement: function( el ) {
        if( !el || !el.nodeName || el.nodeName !== 'FORM' ) {
            throw 'First argument must be a form element!';
        }
    },
    incorrectSubmitButtonName: function( el ) {
        var hasElementWithSubmitName = el.querySelector( '[name="submit"]' );

        if( hasElementWithSubmitName ) {
            throw 'Element with attribute name = submit not allowed';
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
    if( console.warn ) {
        console.warn( text );
    }
}