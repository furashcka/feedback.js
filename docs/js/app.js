$(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' ),
        demonstrationBlock: $( '.demonstration-block' ),
        exampleBtns: $( 'button[data-example]' ),
        cdnScript: $( '#cdn-script' ),
        copiedToClipboard: $( '.copied-to-clipboard' )
    };
    var timeoutID = null;

    app.initSmoothScroll();
    app.initMobileMenu();
    app.initDemonstrationBlock( $el.demonstrationBlock, 'html' );

    $el.cdnScript.on('click', function() {
        app.selectText( this );
        if( document.execCommand && document.execCommand( 'copy' ) ) {
            $el.copiedToClipboard.show();

            clearTimeout( timeoutID );
            timeoutID = setTimeout(function() {
                $el.copiedToClipboard.fadeOut();
            }, 1000);
        }
    });

    $el.exampleBtns.on( 'click', function() {
        var partURL = $( this ).data( 'example' );
        var src = _resolveSrc( partURL );
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
        var responseText = JSON.parse( arguments[ 1 ].xhr.responseText );
        var html = [
            '<h4>Response from f-cka.com</h4>',
            '<pre>',
                '<code class="language-json">\n',
                    JSON.stringify( responseText, null, 4),
                '\n\n</code>',
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

    function _resolveSrc( partURL ) {
        var origin = window.location.protocol + '//' + window.location.hostname + ( window.location.port ? ':' + window.location.port : '' );
        var pathname = location.pathname.substring( 0, location.pathname.lastIndexOf( '/' ) ) + '/';
        var src = origin + pathname + 'examples/' + partURL + '/';

        return src;
    }
});

(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' ),
        triggerMenu: $( '.sidenav-trigger' ),
        desktopMenu: $( '.desktop-menu' ),
        mobileMenu: $( '.mobile-menu' ),
        sidenavOverlay: $( '.sidenav-overlay' )
    };

    app.initSmoothScroll = function() {
        var offset = 80;

        $el.body.on( 'click', 'a[href^="#"]', function( e ) {
            var id = this.getAttribute( 'href' );
            var scrollTop = 0;

            if( id != '#' ) {
                scrollTop = $( id ).offset().top - offset;
            }


            $( 'html, body' ).animate({
                scrollTop: scrollTop
            });

            e.preventDefault();
        });
    };

    app.initMobileMenu = function() {
        $el.mobileMenu.html( $el.desktopMenu.html() );
        $el.mobileMenu.show();

        $el.mobileMenu.find( 'a' ).on( 'click', function() {
            $el.sidenavOverlay.trigger( 'click' );
        });

        $el.triggerMenu.on( 'click', function() {
            $el.mobileMenu.add( $el.sidenavOverlay ).toggleClass( 'show' );
        });

        $el.sidenavOverlay.on( 'click', function() {
            $el.mobileMenu.add( $el.sidenavOverlay ).removeClass( 'show' );
        });
    };

    app.modal = function( opts ) {
        $.fancybox.close();
        $.fancybox.open({
            src: [
                '<div>',
                '   <button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small" title="Close">',
                '       <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24">',
                '           <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>',
                '       </svg>',
                '   </button>',
                opts.html,
                '</div>'
            ].join( '' ),
            type: 'html',
            modal: true,
            autoFocus: false,
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
        var iframeSrc = $el.iframe.data( 'src' );

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

        $el.iframe.attr( 'src', iframeSrc );

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

;(function() {
    var app = window.app = window.app || {};

    app.selectText = function( el ) {
        var range = null;
        if( document.selection ) { // IE
            range = document.body.createTextRange();
            range.moveToElementText( el );
            range.select();
        }
        else if( window.getSelection ) {
            range = document.createRange();
            range.selectNode( el );
            window.getSelection().removeAllRanges();
            window.getSelection().addRange( range );
        }
    }
})();