$(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' ),
        sidenav: $( '.sidenav' ),
        smothScrollContent: $( '[id]' ),
        dataParentSidenav: $( '[data-parent-sidenav]' ),
        switchContent: $( '[data-content]' ),
        triggerContent: $( '[data-trigger-content]' ),
        exampleBtns: $( '[data-example]' ),
        get modal() {
            return $( '.modal' );
        }
    };

    $el.sidenav.html( $el.dataParentSidenav.html() );
    $el.sidenav.sidenav();

    $el.triggerContent.on( 'click', function( e ) {
        var $self = $( this );
        var offsetTop = -70;
        var scrollTop = $self.offset().top + offsetTop;
        var el = $self.data( 'trigger-content' );

        $el.switchContent.hide();
        $( '[data-content="' + el + '"]' ).show();

        setTimeout(function() {
            $( 'html, body' ).scrollTop( scrollTop );
        });
    });

    $el.exampleBtns.on( 'click', function( e ) {
        var $self = $( this );
        var src = 'examples/' + $self.data( 'example' ) + '/';
        var html = [
            '<button class="waves-effect waves-light btn-small" data-language="markup" data-src="' + src + 'index.html">html</button> ',
            '<button class="waves-effect waves-light btn-small" data-language="css" data-src="' + src + 'app.css">ccs</button> ',
            '<button class="waves-effect waves-light btn-small" data-language="javascript" data-src="' + src + 'app.js">js</button> ',
            '<button class="waves-effect waves-light btn-small btn-close">result</button>',
            '<div class="modal-code"></div>',
            '<iframe src="' + src + '"></iframe>'
        ].join( '' );

        app.modal({
            title: 'Demo - ' + $self.text(),
            html: html,
            before: function() {
                var $modal = app.modal.getEl();
                var $iframe = $modal.find( 'iframe' );
                var $btn = $modal.find( 'button[data-src]' );
                var $btnClose = $modal.find( '.btn-close' );
                var $modalCode = $modal.find( '.modal-code' );

                $btn.on( 'click', function() {
                    var $self = $( this );
                    var src = $self.attr( 'data-src' );
                    var code = $self.data( 'language' );
                    var className = 'language-' + code;

                    $modalCode.html( '<div class="progress"><div class="indeterminate"></div></div>' );

                    $.ajax({
                        url: src,
                        dataType: 'text',
                        success: function( code ) {
                            code = _escapeHtml( code );

                            $btnClose.show();
                            $iframe.hide();
                            $modalCode.html( '<pre><code class="' + className + '">\n' + code + '\n\n</code></pre>' );
                            Prism.highlightElement( $modal.find( 'code' ).get( 0 ) );
                        }
                    });
                });

                $btnClose.on( 'click', function() {
                    $modalCode.html( '' );
                    $btnClose.hide();
                    $iframe.show();
                });

                $iframe.on( 'load', function() {
                    var $body = $iframe.contents().find( 'body' );
                    
                    $body.on( 'click', function() {
                        _update( $body );
                    });

                    _update( $body );
                });

                function _update( $body ) {
                    setTimeout(function() {
                        var height = $body.get( 0 ).scrollHeight;

                        $iframe.height( height );
                    }, 100);
                }

                function _escapeHtml( html ) {
                    return html
                         .replace( /&/g, '&amp;' )
                         .replace( /</g, '&lt;' )
                         .replace( />/g, '&gt;' )
                         .replace( /"/g, '&quot;' )
                         .replace( /'/g, '&#039;' );
                 }
            }
        });

        e.preventDefault();
    });

    $el.body.on( 'feedback.response', function() {
        var responseText = arguments[ 1 ].xhr.responseText;
        var html = '<pre><code class="language-json">' + responseText + '</code></pre>';

        app.modal({
            id: 'modal-console',
            title: 'Response from httpbin.org',
            html: html,
            after: function() {
                console.log( responseText );
                Prism.highlightElement( app.modal.getEl().find( 'code' ).get( 0 ) );
            }
        });
    });

    $el.smothScrollContent.scrollSpy({
        scrollOffset: 80
    });
});

(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' ),
        get modal() {
            return $( '.modal' );
        },
        get modalOverlay() {
            return $( '.modal-overlay' )
        }
    };

    app.modal = function() {
        var options = arguments[ 0 ] || {};
        var opts = {
            id: options.id || 'simple-modal',
            title: options.title || '',
            html: options.html || '',
            before: options.before || function() {},
            after: options.after || function() {}
        };
        var html = [
            '<div id="{{id}}" class="modal modal-fixed-footer">',
            '    <div class="modal-content">',
            '        <h4>{{title}}</h4>',
            '        {{html}}',
            '    </div>',
            '    <div class="modal-footer">',
            '        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>',
            '    </div>',
            '</div>',
        ].join( '' );

        html = html.replace( '{{id}}', opts.id );
        html = html.replace( '{{title}}', opts.title );
        html = html.replace( '{{html}}', opts.html );

        $el.modal.modal( 'close' );
        $el.modal.remove();
        $el.body.append( html );

        $el.modal.modal({
            onOpenStart: opts.before,
            onOpenEnd: opts.after
        }).modal( 'open' );
    };

    app.modal.getEl = function() {
        return $el.modal;
    };
})();