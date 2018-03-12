module.exports = {
    firstArgumentMustBeFormElement: function( el ) {
        if( !el || !el.nodeName || el.nodeName !== 'FORM' ) {
            throw 'First argument must be a form element!';
        }
    },
    checkIncludeValidatorJs: function() {
        if( !window.validator ) {
            throw 'Please include validator.js. You can download from https://github.com/chriso/validator.js';
        }
    }
};