var exceptions = require( './exceptions.js' );
var helper = require( './helper.js' );
var ajaxFnList = {
    XMLHttpRequest_2_0: _XMLHttpRequest_2_0,
    XMLHttpRequest_1_0: _XMLHttpRequest_1_0,
    iframe: _iframe,
};



module.exports = function() {
    var self = this;
    var ajaxFn = _detectAjaxFn( self );

    ajaxFnList[ ajaxFn ]( self );
};



function _detectAjaxFn( self ) {
    if( self.options.polyfillAjaxIframe === true || window.FormData === undefined ) return 'iframe';

    return 'XMLHttpRequest_2_0';
}



function _XMLHttpRequest_2_0( self ) {
    var fd = new FormData( self.form );
    var xhr = new XMLHttpRequest();

    self.options.ajax.before();

    xhr.onreadystatechange = function() {
        if( xhr.readyState !== 4 ) return;

        if( xhr.status === 200 ) {
            self.options.ajax.success({
                type: 'ajax.2_0',
                xhr: xhr
            });
        }
        else {
            self.options.ajax.error({
                type: 'ajax.2_0',
                xhr: xhr
            });
        }

        self.options.ajax.after();
        _resetForm( self );
    };

    xhr.open( self.options.ajax.method, self.options.ajax.url );
    xhr.send( fd );
};



function _XMLHttpRequest_1_0( self ) {
    // not created yet :(
}



function _iframe( self ) {
    if( _iframe.element === undefined ) {
        _iframe.element = _createIframe( self );

        self.options.ajax.before();

        _iframe.element.onload = function() {
            var innerDoc = this.contentDocument || this.contentWindow.document;

            self.options.ajax.success({
                type: 'ajax.iframe',
                xhr: {
                    responseText: innerDoc.body.innerHTML
                }
            });

            self.options.ajax.after();
            _resetForm( self );
        };
    }

    self.form.submit();
}

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

function _resetForm( self ) {
    if( !self.options.resetFormAfterAjax ) return;
    self.form.reset();
}