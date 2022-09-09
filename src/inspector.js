module.exports = {
    checkFirstArgument: function(el) {
        if( !el || !el.nodeName || el.nodeName !== 'FORM' ) {
            console.error('First argument must be a form element!');
            return false;
        }

        return true;
    },
    checkSubmitButton: function(el) {
        var hasElementWithSubmitName = el.querySelector( '[name="submit"]' );

        if( hasElementWithSubmitName ) {
            console.error('Element with attribute name = submit not allowed');
            return false;
        }

        return true;
    }
};
