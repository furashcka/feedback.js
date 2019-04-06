var helper = require( 'helper' );
var resetForm = require( 'resetForm' );

module.exports = function( self ) {
    if( self.iframe === null ) {
        self.iframe = _createIframe( self );

        helper.addClass( self.form, self.options.ajax.loadingClass );
        self.options.ajax.before();

        self.iframe.onload = function() {
            var innerDoc, responseText, error = false;

            try {
                innerDoc = this.contentDocument || this.contentWindow.document;
                responseText = String( innerDoc.body && innerDoc.body.innerHTML );
            }
            catch( e ) {
                error = e;
                console.error( e );
            }

            if( error === false ) {
                self.options.ajax.success({
                    type: 'ajax.iframe',
                    xhr: {
                        responseText: responseText
                    }
                });
            }
            else {
                self.options.ajax.error({
                    type: 'ajax.iframe',
                    xhr: {
                        statusText: ''
                    }
                });
            }

            self.options.ajax.progress.call( self.form, 100 );
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