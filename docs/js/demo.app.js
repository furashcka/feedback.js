var form = document.querySelector( 'form' );

var feedback = new Feedback( form, {
    
});

feedback.schema({
    name: function() {
        if( this.isEmpty() ) {
            return 'Пожалуйста, введите Ваше имя!';
        }
    },
    sex: function() {
        return 'Пожалуйста, выберите пол!';
    }
});

feedback.validate({
    before: function( e ) {
        console.log( 'feedback validate before', arguments );
    },
    after: function( e ) {
        console.log( 'feedback validate after', arguments );
    },
    success: function( e ) {
        console.log( 'feedback validate success', arguments );
    },
    error: function( e ) {
        console.log( 'feedback validate error', arguments );
    }
});

feedback.ajax({
    before: function() {
        console.log( 'feedback ajax before' );
    },
    after: function() {
        console.log( 'feedback ajax after' );
    },
    success: function( e ) {
        console.log( 'feedback ajax success', arguments );
    },
    error: function( e ) {
        console.log( 'feedback ajax error', arguments );
    }
});

window.addEventListener( 'load', function() {
    // console.log( (new Array()).__proto__ );

    
    // feedback.ajax();
});

/*
var feedback = new Feedback( form, {
    showErrorsByTurns: false,
    validate: {
        name: function() {
            if( this.isEmpty() ) {
                return 'Пожалуйста, введите Ваше имя!';
            }
        },

    /*
        email: function() {
            if( this.isEmpty() ) {
                return 'Пожалуйста, введите e-mail!';
            }

            if( !this.isEmail() ) {
                return 'Пожалуйста, введите правильный e-mail!';
            }
        },
        tel: function() {
            if( this.isEmpty() ) {
                return 'Пожалуйста, введите ваш мобильный номер!';
            }

            if( !this.isMobilePhone( 'ru-RU' ) ) {
                return 'Пожалуйста, введите правильный мобильный номер!';
            }
        },
        sex: function() {
            var checked = this.get( 0 ).checked || this.get( 1 ).checked;

            if( !checked ) {
                return 'Пожалуйста, выберите пол!';
            }
        },
        avatar: function() {
            var files = this.get( 0 ).files;

            if( !files.length ) {
                return 'Пожалуйста, выберите аватар!';
            }

            if( files[ 0 ].type !== 'image/jpeg' ) {
                return 'Аватар должен быть .jpeg формата!';
            }
        },
        message: function() {
            if( this.isEmpty() ) {
                return 'Пожалуйста, введите сообщение!';
            }
        }
        *
    },
    beforeValidate: function() {
        /*form.querySelectorAll( '.error' ).forEach(function( item ) {
            item.parentNode.removeChild( item );
        });*
    },
    errorValidate: function( e ) {
        console.log( e );
    },
    successValidate: function( e ) {
        console.log( e );
    }
});
*/


/*
document.addEventListener( 'click', function() {
    $.ajax({
        method: 'post',
        url: 'feedback.php',
        data: {
            user: 'furashcka'
        },
        success: function() {
            console.log( 'success', arguments );
        },
        error: function() {
            console.log( 'error', arguments );
        }
    });
});
*/