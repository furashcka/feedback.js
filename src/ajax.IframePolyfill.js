var helper = require( 'helper' );
var resetForm = require( 'resetForm' );

module.exports = function( self ) {
    if( self.iframe === null ) {
        self.iframe = _createIframe( self );

        helper.addClass( self.form, self.options.ajax.loadingClass );
        self.options.ajax.before();

        self.iframe.onload = function() {
            var innerDoc = this.contentDocument || this.contentWindow.document;

            self.options.ajax.success({
                type: 'ajax.iframe',
                xhr: {
                    responseText: String( innerDoc.body && innerDoc.body.innerHTML )
                }
            });

            helper.removeClass( self.form, self.options.ajax.loadingClass );
            self.options.ajax.after();
            _fakeProgressEventForOldBrowser( self );
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

function _fakeProgressEventForOldBrowser( self ) {
    !helper.canUseProgressEvent() && self.options.ajax.progress.call( self.form, 100 );
}