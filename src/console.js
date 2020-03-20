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
        console.warn('You can\'t use XMLHttpRequest 2.0 because browser not support it. Used polyfill ajax iframe.');
    },
    showWarningWhenIgnoringInputWithFileType: function() {
        console.warn( 'Ignoring inputs with file type, because used XMLHttpRequest 1.0' );
    },
    youMustReturnTextInPostMessage: function() {
        throw 'You must return text in post message';
    },
    youNeedUsePostMessage: function() {
        console.warn( 'You need use postMessage, read more - https://furashcka.github.io/feedback.js/docs/' );
    }
};