var helper = require( './helper.js' );
var resetForm = require( './resetForm.js' );

module.exports = function( self ) {
    if( self.iframe === null ) {
        self.iframe = _createIframe( self );

        self.options.ajax.before();

        self.iframe.onload = function() {
            var innerDoc = this.contentDocument || this.contentWindow.document;

            self.options.ajax.success({
                type: 'ajax.iframe',
                xhr: {
                    responseText: innerDoc.body.innerHTML
                }
            });

            self.options.ajax.after();
            resetForm( self );
        };
    }

    self.form.submit();
};

function _createIframe( self ) {
    var iframeName = 'feedback-polyfill-ajax-iframe-' + helper.guid();
    var iframe = document.createElement( 'iframe' );

    iframe.name = iframeName;
    iframe.style.display = 'none';

    self.form.setAttribute( 'enctype', 'multipart/form-data' );
    self.form.setAttribute( 'method', self.options.ajax.method );
    self.form.setAttribute( 'target', iframeName );

    document.body.appendChild( iframe );

    return iframe;
}