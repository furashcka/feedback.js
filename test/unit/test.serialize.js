var helper = require( './helper' );
var getInputsGroupedByName = require( 'getInputsGroupedByName' );
var serialize = require( 'serialize' );

module.exports = function() {
    _test(function( form ) {
        form.add.input({
            type: 'text',
            name: 'name',
            value: 'Evgeny Krylov'
        });
    })
        .run({
            desc: 'input type text',
            toBe: 'name=Evgeny+Krylov'
        });

    _test(function( form ) {
        form.add.input({
            type: 'text',
            name: 'name',
            value: 'Evgeny Krylov',
            disabled: true
        });
    })
        .run({
            desc: 'disabled input type text',
            toBe: ''
        });

    _test(function( form ) {
        form.add.input({
            type: 'radio',
            name: 'sex',
            value: 'female'
        });

        form.add.input({
            type: 'radio',
            name: 'sex',
            value: 'male'
        });
    })
        .run({
            desc: 'not checked input type radio',
            toBe: ''
        });

    _test(function( form ) {
        form.add.input({
            type: 'radio',
            name: 'sex',
            value: 'female',
            checked: true
        });

        form.add.input({
            type: 'radio',
            name: 'sex',
            value: 'male'
        });
    })
        .run({
            desc: 'checked input type radio',
            toBe: 'sex=female'
        });

    _test(function( form ) {
        form.add.input({
            type: 'radio',
            name: 'sex',
            value: 'female',
            checked: true,
            disabled: true
        });

        form.add.input({
            type: 'radio',
            name: 'sex',
            value: 'male',
            checked: true,
            disabled: true
        });
    })
        .run({
            desc: 'checked disabled input type radio',
            toBe: ''
        });

    _test(function( form ) {
        form.add.input({
            type: 'checkbox',
            name: 'country[]',
            value: 'United Kingdom',
            checked: true
        });

        form.add.input({
            type: 'checkbox',
            name: 'country[]',
            value: 'Germany',
            checked: true
        });
    })
        .run({
            desc: 'checked 2 inputs type checkbox, must be array',
            toBe: 'country%5B%5D=United+Kingdom&country%5B%5D=Germany'
        });

    _test(function( form ) {
        form.add.select({
            name: 'language'
        })
            .add.option({
                text: 'php',
                value: 'php'
            })
            .add.option({
                text: 'javascript',
                value: 'javascript',
                selected: true
            })
            .add.option({
                text: 'css',
                value: 'css'
            });
    })
        .run({
            desc: 'select-one test',
            toBe: 'language=javascript'
        });

    _test(function( form ) {
        form.add.select({
            name: 'language',
            disabled: true
        })
            .add.option({
                text: 'php',
                value: 'php'
            })
            .add.option({
                text: 'javascript',
                value: 'javascript',
                selected: true
            })
            .add.option({
                text: 'css',
                value: 'css'
            });
    })
        .run({
            desc: 'disabled select-one test',
            toBe: ''
        });

    _test(function( form ) {
        form.add.select({
            name: 'language[]',
            multiple: true
        })
            .add.option({
                text: 'php',
                value: 'php',
                selected: true
            })
            .add.option({
                text: 'javascript',
                value: 'javascript',
                selected: true
            })
            .add.option({
                text: 'css',
                value: 'css'
            });
    })
        .run({
            desc: 'select-multiple test',
            toBe: 'language%5B%5D=php&language%5B%5D=javascript'
        });
};

function _test( fn ) {
    helper.form.clear();

    fn( helper.form );

    var res = serialize({
        inputsGroupedByName: getInputsGroupedByName( helper.form.el )
    });

    return {
        run: function( obj ) {
            it( obj.desc, function() {
                expect( res ).toBe( obj.toBe );
            });
        }
    };
}