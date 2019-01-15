$(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' ),
        sidenav: $( '.sidenav' ),
        smothScrollContent: $( '[id]' ),
        dataParentSidenav: $( '[data-parent-sidenav]' ),
        demonstrationBlock: $( '.demonstration-block' ),
        exampleBtns: $( 'button[data-example]' )
    };

    $el.sidenav.html( $el.dataParentSidenav.html() );
    $el.sidenav.sidenav();
    $el.smothScrollContent.scrollSpy({
        scrollOffset: 80
    });
    app.initDemonstrationBlock( $el.demonstrationBlock, 'html' );

    $el.exampleBtns.on( 'click', function() {
        var src = 'examples/' + $( this ).data( 'example' ) + '/';
        var html = $( '#demonstration-block-template' ).html().replace( /{{src}}/g, src );

        app.modal({
            html: html,
            after: function() {
                var $demonstrationBlock = app.modal.getEl().find( '.demonstration-block' );

                app.initDemonstrationBlock( $demonstrationBlock );
            }
        });
    });

    $el.body.on( 'feedback.response', function() {
        var responseText = arguments[ 1 ].xhr.responseText;
        var html = [
            '<h4>Response from httpbin.org</h4>',
            '<pre>',
                '<code class="language-json">\n',
                    responseText,
                '\n</code>',
            '</pre>'
        ].join( '' );

        app.modal({
            html: html,
            after: function() {
                var $code = app.modal.getEl().find( 'code' ).get( 0 );

                Prism.highlightElement( $code );
                console.log( responseText );
            }
        });
    });
});

(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' )
    };

    app.modal = function( opts ) {
        $.fancybox.close();
        $.fancybox.open({
            src: '<div>' + opts.html + '</div>',
            type: 'html',
            smallBtn: false,
            touch: {
                vertical: false,
                momentum: false
            },
            afterShow: opts.after
        });
    };

    app.modal.getEl = function() {
        return $( '.fancybox-inner' ).eq( 0 );
    };

    app.initDemonstrationBlock = function( $elBlock, showDefault ) {
        var $el = {
            btn: $elBlock.find( 'button' ),
            preloader: $elBlock.find( '.demonstration-block__preloader' ),
            code: $elBlock.find( '.demonstration-block__code' ),
            iframe: $elBlock.find( '.demonstration-block__iframe iframe' )
        };

        $el.iframe.on( 'load', function() {
            var $body = $el.iframe.contents().find( 'body' );
            var cache = 0;

            setInterval( function() {
                var height = $body.get( 0 ).scrollHeight;

                if( height !== cache ) {
                    cache = height;

                    $el.iframe.height( height );
                }
            }, 200 );
        });

        $el.btn.on( 'click', function() {
            var text = this.innerText.toLowerCase();
            var src = this.getAttribute( 'data-src' );
            var lang = '';

            if( text === 'result' ) {
                $el.code.hide();
                $el.iframe.show();
                return;
            }

            switch( text ) {
                case 'html':
                    lang = 'language-markup';
                    break;
                case 'css':
                    lang = 'language-css';
                    break;
                case 'js':
                    lang = 'language-javascript';
                    break;
            }

            $el.preloader.show();
            $.ajax({
                url: src,
                dataType: 'text',
                success: function( code ) {
                    var html = '';

                    code = _escapeHtml( code );
                    html = '<pre><code class="' + lang + '">\n' + code + '\n\n</code></pre>';

                    $el.code.html( html );
                    $el.code.show();
                    $el.iframe.hide();
                    $el.preloader.hide();
                    Prism.highlightElement( $el.code.find( 'code' ).get( 0 ) );
                }
            });
        });

        if( showDefault ) {
            switch( showDefault ) {
                case 'html':
                    $elBlock.find( 'button[data-src$="html"]' ).trigger( 'click' );
                    break;

                case 'css':
                    $elBlock.find( 'button[data-src$="css"]' ).trigger( 'click' );
                    break;

                case 'js':
                    $elBlock.find( 'button[data-src$="js"]' ).trigger( 'click' );
                    break;
            }
        }

        function _escapeHtml( html ) {
            return html
                 .replace( /&/g, '&amp;' )
                 .replace( /</g, '&lt;' )
                 .replace( />/g, '&gt;' )
                 .replace( /"/g, '&quot;' )
                 .replace( /'/g, '&#039;' );
         }
    };
})();