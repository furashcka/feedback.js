module.exports = function() {
    this.lastAddedElement = null;
    this.$form = $( '<form />', {
        method: 'post',
        action: 'https://httpbin.org/post',
        css: {
            position: 'fixed',
            top: -999999,
            left: -999999
        }
    });
};

module.exports.prototype.addInput = function( attr ) {
    var self = this;
    var $el = $( '<input />', attr );

    this.$form.append( $el );

    return {
        addInput: function( attr ) {
            self.addInput( attr );
        }
    };
}

module.exports.prototype.addSelect = function( attr ) {
    var $el = $( '<select />', attr );
    var obj = {
        addOption: function( attr ) {
            _addOption( $el, attr );
            return obj;
        }
    };

    this.$form.append( $el );

    return obj;
};

module.exports.prototype.getFormEl = function() {
    return this.$form.get( 0 );
};

module.exports.prototype.getInputEl = function( name ) {
    return this.$form.find( '[name="' + name + '"]' ).get( 0 );
};

module.exports.prototype.log = function() {
    console.log( this.getFormEl() );
};

module.exports.prototype.clear = function() {
    this.$form.html( '' );
};

module.exports.prototype.getUrl = function() {
    return this.$form.attr( 'action' );
};

module.exports.prototype.addToDocument = function() {
    $( 'body' ).append( this.$form );
};

function _addOption( $parent, attr ) {
    var $el = $( '<option />', attr );
    $parent.append( $el );
}