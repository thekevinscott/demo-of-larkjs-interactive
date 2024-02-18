
const {get_parser} = require('./json_parser.js')

let transformer = {
    number: ([n])  => parseFloat(n.value),
    string: ([s])  => s.value.slice(1, -1),
    array:  Array.from,
    pair:   Array.from,
    object: Object.fromEntries,

    null: () => null,
    true: () => true,
    false: () => false,
}

const parser = get_parser({transformer})

const text = `
{
    "empty_object" : {},
    "empty_array"  : [],
    "booleans"     : { "YES" : true, "NO" : false },
    "numbers"      : [ 0, 1, -2, 3.3, 4.4e5, 6.6e-7 ],
    "strings"      : [ "This", [ "And" , "That", "And a \\"b" ] ],
    "nothing"      : null
}
`
/**
 * This works
 */
console.log( parser.parse(text) )

/**
 * This fails
 */
const interactive = parser.parse_interactive(text);
interactive.exhaust_lexer();
console.log(interactive.accepts());
