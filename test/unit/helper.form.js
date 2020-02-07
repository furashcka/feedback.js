var forEach = require( 'helper.forEach' );
var form = module.exports = {
    el: null,
    events: {
        afterInit: function() {}
    },
    init: function() {
        form.el = document.createElement( 'form' );

        form.el.setAttribute( 'method', 'post' );
        form.el.setAttribute( 'action', 'http://f-cka.com/other/response-server/post.php' );

        form.el.style.position = 'fixed';
        form.el.style.top = '-9999px';
        form.el.style.left = '-9999px';

        document.body.appendChild( form.el );

        form.events.afterInit();
    },
    add: {
        input: function( attr ) {
            form.el.appendChild(_createElementWithAttr( 'input', attr ));

            return form.add;
        },
        select: function( attr ) {
            var select = _createElementWithAttr( 'select', attr );
            var obj = {
                add: {
                    option: function( attr ) {
                        var option = _createElementWithAttr( 'option', attr );

                        select.appendChild( option );

                        return obj;
                    }
                }
            };

            form.el.appendChild( select );

            return obj;
        }
    },
    getFormElementsByName: function( name ) {
        return form.el.querySelectorAll( '[name="' + name + '"]' );
    },
    setEventListener: function( name, fn ) {
        if( name in form.events ) {
            form.events[ name ] = fn;
        }
    },
    clear: function() {
        form.el.innerHTML = '';
    },
    destroy: function() {
        if( form.el ) {
            form.el.parentNode.removeChild( form.el );
        }

        form.el = null;
    },
    reinit: function() {
        form.destroy();
        form.init();
    }
};

function _createElementWithAttr( name, attr ) {
    var el = document.createElement( name );

    forEach( attr || [], function( val, key ) {
        el.setAttribute( key, val );
    });

    return el;
}