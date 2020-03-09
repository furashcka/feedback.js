;(function() {
    var app = window.app = window.app || {};

    app.serverURL = _getServerURL();

    app.isInternetExplorerBrowser = function() {
        var userAgent = navigator.userAgent.toLowerCase();
        return ( userAgent.indexOf( 'msie' ) != -1 ) ? parseInt( userAgent.split( 'msie' )[ 1 ] ) : false;
    };

    //_getServerURL duplicated in test/unit/helper.js
    function _getServerURL() {
        var breakPoints = ['docs', 'test'];
        var oldArr = location.href.split('/');
        var newArr = [];

        for(var i = 0; i < oldArr.length; i++) {
            if(breakPoints.indexOf(oldArr[i]) !== -1) break;

            newArr.push(oldArr[i]);
        }

        newArr.push('server/');

        return newArr.join('/');
    }
})();

$(function() {
    var app = window.app = window.app || {};
    var $el = {
        body: $( 'body' ),
        fileInput: $( 'input[type="file"]' ),
        materializecssFileInput: $( '.input-field input[type="file"]' ),
        materializecssInput: $( '.input-field input' ),
    };

    if(app.isInternetExplorerBrowser() === 9) {
        $el.body.addClass( 'ie9' );
    }

    if( _cantUseFileAPI() ) {
        $el.materializecssFileInput.each(function() {
            this.files = [];
        });

        $el.materializecssFileInput.on( 'change', function() {
            this.files[ 0 ] = ({
                name: this.value.substring( this.value.lastIndexOf( '\\' ) + 1 ),
                size: 0,
                type: this.value.substring( this.value.lastIndexOf( '.' ) + 1 )
            });
        });
    }

    if( _cantUsePlaceholder() ) {
        $el.materializecssFileInput.closest( '.input-field' ).find( 'input[type="text"]' ).each(function() {
            this.value = this.getAttribute( 'placeholder' );
        });
    }

    $el.materializecssFileInput.on( 'change', function() {
        $( this ).closest( '.input-field' ).find( 'input[type="text"]' ).val( this.files[ 0 ].name );
    });

    $el.materializecssInput.on( 'focus', function() {
        var $label = $( this ).closest( '.input-field' ).children( 'label' );

        $label.hide();
    });

    $el.materializecssInput.on( 'blur', function() {
        var $label = $( this ).closest( '.input-field' ).children( 'label' );

        if( this.value !== '' ) {
            $label.hide();
        }
        else {
            $label.show();
        }
    });

    function _cantUseFileAPI() {
        var fileInput = $( '<input type="file"/>' ).get( 0 );

        return !( 'files' in fileInput );
    }

    function _cantUsePlaceholder() {
        var input = document.createElement( 'input' );
        return !( 'placeholder' in input );
    }
});