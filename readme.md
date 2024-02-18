# Demonstration of bug with `interactive`

## Install

After cloning, install `lark` ([pinned to specific version](https://github.com/lark-parser/Lark.js/issues/37#issuecomment-1946276420)) and `lark-js`:

```
pip install lark==1.1.5 lark-js
lark-js json.lark -o json_parser.js
```

## Run

```
node test.js
```

## Explanation

I believe there is a bug with `interactive.accepts()`.

Specifically, it appears that the `accepts()` method includes this:

```
accepts() {
    let new_cursor;
    let accepts = new Set();
    for (const t of this.choices()) {
```

However, the return type of `this.choices()` is an object:

```
{
    "ESCAPED_STRING": [
        {
            "name": "Shift"
        },
        8
    ],
    "string": [
        {
            "name": "Shift"
        },
        7
    ],
    ...
    ]
}
```

You cannot `const t of` an object. You _can_ `const t in` with an object, to iterate over its keys.
