var helper = require( 'helper' );
var getInputsGroupedByName = require( 'getInputsGroupedByName' );
var serialize = require( 'serialize' );

module.exports = function() {
    _inputTest({
        desc: 'input type text',
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'Evgeny Krylov'
            }
        ],
        toBe: 'name=Evgeny+Krylov'
    });

    _inputTest({
        desc: 'disabled input type text',
        inputs: [
            {
                type: 'text',
                name: 'name',
                value: 'Evgeny Krylov',
                disabled: true
            }
        ],
        toBe: ''
    });

    _inputTest({
        desc: 'not checked input type radio',
        inputs: [
            {
                type: 'radio',
                name: 'sex',
                value: 'female'
            },
            {
                type: 'radio',
                name: 'sex',
                value: 'male'
            }
        ],
        toBe: ''
    });

    _inputTest({
        desc: 'checked input type radio',
        inputs: [
            {
                type: 'radio',
                name: 'sex',
                value: 'female',
                checked: true
            },
            {
                type: 'radio',
                name: 'sex',
                value: 'male'
            }
        ],
        toBe: 'sex=female'
    });

    _inputTest({
        desc: 'checked disabled input type radio',
        inputs: [
            {
                type: 'radio',
                name: 'sex',
                value: 'female',
                checked: true,
                disabled: true
            },
            {
                type: 'radio',
                name: 'sex',
                value: 'male',
                disabled: true
            }
        ],
        toBe: ''
    });

    _inputTest({
        desc: 'checked 2 inputs type checkbox, must be array',
        inputs: [
            {
                type: 'checkbox',
                name: 'country[]',
                value: 'United Kingdom',
                checked: true
            },
            {
                type: 'checkbox',
                name: 'country[]',
                value: 'Germany',
                checked: true
            }
        ],
        toBe: 'country%5B%5D=United+Kingdom&country%5B%5D=Germany'
    });

    _selectTest({
        desc: 'select-one test',
        selects: [
            {
                attr: {
                    name: 'language'
                },
                options: [
                    {
                        innerText: 'php',
                        value: 'php'
                    },
                    {
                        innerText: 'javascript',
                        value: 'javascript',
                        selected: true
                    },
                    {
                        innerText: 'css',
                        value: 'css'
                    }
                ]
            }
        ],
        toBe: 'language=javascript'
    });

    _selectTest({
        desc: 'disabled select-one test',
        selects: [
            {
                attr: {
                    name: 'language',
                    disabled: true
                },
                options: [
                    {
                        innerText: 'php',
                        value: 'php'
                    },
                    {
                        innerText: 'javascript',
                        value: 'javascript',
                        selected: true
                    },
                    {
                        innerText: 'css',
                        value: 'css'
                    }
                ]
            }
        ],
        toBe: ''
    });

    _selectTest({
        desc: 'select-multiple test',
        selects: [
            {
                attr: {
                    name: 'language[]',
                    multiple: true
                },
                options: [
                    {
                        innerText: 'php',
                        value: 'php',
                        selected: true
                    },
                    {
                        innerText: 'javascript',
                        value: 'javascript',
                        selected: true
                    },
                    {
                        innerText: 'css',
                        value: 'css'
                    }
                ]
            }
        ],
        toBe: 'language%5B%5D=php&language%5B%5D=javascript'
    });
};

function _inputTest( obj ) {
    _test( obj, function( form ) {
        helper.forEach( obj.inputs, function( inputAttr ) {
            _addInput( form, inputAttr );
        });
    });
}

function _selectTest( obj ) {
    _test( obj, function( form ) {
        helper.forEach( obj.selects, function( select ) {
            _addSelect( form, select.attr, select.options );
        });
    });
}

function _test( obj, fn ) {
    it( obj.desc, function() {
        var form = _createForm(function( form ) {
            fn( form );
        });
        var res = serialize({
            inputsGroupedByName: getInputsGroupedByName( form )
        });

        expect( res ).toBe( obj.toBe );
    });
}

function _createForm( fn ) {
    var $form = $( '<form />' );
    var form = $form.get( 0 );

    fn( form );
    return form;
}

function _addInput( form, attr ) {
    var $form = $( form );
    var $input = $( '<input />', attr );

    $form.append( $input );
}

function _addSelect( form, attr, optionsArr ) {
    var $form = $( form );
    var $select = $( '<select />', attr );

    helper.forEach( optionsArr, function( optionAttr ) {
        var $option = $( '<option />', optionAttr );
        $select.append( $option );
    });

    $form.append( $select );
}