var logger = require( 'logger' );
var helper = require( 'helper' );
var resetForm = require( 'resetForm' );

module.exports = function( self ) {
    helper.addClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.before();

    if( self.iframe === null ) {
        self.iframe = _createIframe( self );

        if( !self.options.ajax.iframePostMessage ) {
            self.iframe.onload = function() {
                var innerDoc, responseText;

                if( !self.iframe ) return;

                try {
                    innerDoc = self.iframe.contentDocument || self.iframe.contentWindow.document;
                    responseText = String( innerDoc.body && innerDoc.body.innerHTML );
                }
                catch( e ) {
                    logger.youNeedUsePostMessage();

                    if( helper.isUnitTestingNow() ) {
                        console.error( e );
                        return false;
                    }
                    else {
                        throw e;
                    }
                }

                self.options.ajax.success({
                    type: 'ajax.iframe',
                    xhr: {
                        responseText: responseText,
                        status: 200,
                        statusText: 'OK'
                    }
                });

                _end( self );
            };

            self.iframe.src = self.options.ajax.url;
        }
    }

    if( self.options.ajax.iframeTimeout > 0 ) {
        self.iframe.timeoutLink = window.setTimeout(function() {
            _iframeAbort( self );

            self.options.ajax.error({
                type: 'ajax.iframe',
                xhr: {
                    responseText: '',
                    status: 0,
                    statusText: 'abort'
                }
            });

            _end( self );
        }, self.options.ajax.iframeTimeout );
    }

    self.form.submit();

    self.progressTimeoutID = window.setTimeout(function() {
        self.options.ajax.progress.call( self.form, 30 );
    }, 500);
};

window.addEventListener( 'message', function( e ) {
    var self = null;
    var data = null;
    var isCantReadResponse = false;

    helper.forEach( helper.getFeedbackList(), function( instance ) {
        if( !instance.iframe ) return;
        if( e.source !== instance.iframe.contentWindow ) return;

        self = instance;
        return false;
    });

    if( !self || !self.options.ajax.iframePostMessage ) return;
    isCantReadResponse = helper.isObject( e.data ) || e.data === '[object Object]'; //ie9 e.data = [object Object]

    if( isCantReadResponse ) {
        try {
            logger.youMustReturnTextInPostMessage();
        }
        catch( e ) {
            if( helper.isUnitTestingNow() ) {
                console.error( e );
                return false;
            }
            else {
                throw e;
            }
        }
    }

    window.clearTimeout( self.iframe.timeoutLink );

    self.options.ajax.success({
        type: 'ajax.iframe',
        xhr: {
            responseText: e.data,
            status: 200,
            statusText: 'OK'
        }
    });

    _end( self );
});

function _createIframe( self ) {
    var iframeName = 'feedback-polyfill-ajax-iframe-' + helper.guid();
    var iframe = document.createElement( 'iframe' );

    iframe.timeoutLink = null;
    iframe.name = iframeName;
    iframe.style.display = 'none';

    self.form.setAttribute( 'enctype', 'multipart/form-data' );
    self.form.setAttribute( 'method', self.options.ajax.method );
    self.form.setAttribute( 'target', iframeName );

    document.body.appendChild( iframe );

    return iframe;
}

function _iframeAbort( self ) {
    self.iframe && self.iframe.parentNode && self.iframe.parentNode.removeChild( self.iframe );
    self.iframe = null;
}

function _end( self ) {
    clearTimeout( self.progressTimeoutID );
    self.options.ajax.progress.call( self.form, 100 );
    helper.removeClass( self.form, self.options.ajax.loadingClass );
    self.options.ajax.after();
    resetForm( self );
}