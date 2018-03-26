var helper = require( 'helper' );
var handlersByType = {
    text: _text,
    hidden: _text,
    password: _text,
    search: _text,
    email: _text,
    url: _text,
    tel: _text,
    date: _text,
    time: _text,
    number: _text,
    range: _text,
    color: _text,
    'datetime-local': _text,
    month: _text,
    week: _text,
    datetime: _text,
    textarea: _text,
    radio: _radioAndCheckbox,
    checkbox: _radioAndCheckbox,
    'select-one': _text,
    'select-multiple': _selectMultiple
};

module.exports = function( self ) {
    var result = [];

    helper.forEach( self.inputsGroupedByName, function( group, name ) {
        helper.forEach( group, function( inputEl ) {
            inputEl.type in handlersByType &&
            !inputEl.disabled &&
            handlersByType[ inputEl.type ]( inputEl, result );
        });
    });

    return result.join( '&' );
};

function _text( inputEl, result ) {
    _push( inputEl, result );
}

function _radioAndCheckbox( inputEl, result ) {
    if( !inputEl.checked ) return;
    _push( inputEl, result );
}

function _selectMultiple( inputEl, result ) {
    helper.forEach( inputEl.options, function( optionEl ) {
        optionEl.selected && _push( optionEl, result, inputEl.name, optionEl.value );
    });
}

function _push( inputEl, result, hardSetName, hardSetValue ) {
    var name = encodeURIComponent( hardSetName || inputEl.name );
    var value = encodeURIComponent( hardSetValue || inputEl.value ).replace( /%20/g, '+' );

    result.push( name + '=' + value );
}