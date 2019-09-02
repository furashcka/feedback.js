$(function() {
    var $el = {
        fileInput: $( 'input[type="file"]' ),
        materializecssFileInput: $( '.input-field input[type="file"]' ),
        materializecssInput: $( '.input-field input' ),
    };

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