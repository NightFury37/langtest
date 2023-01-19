const syntax = {
    defaultToken: 'invalid',
    
    keywords: [
        'proc', 'func', 'val', 'this',
        'either', 'or', 'match', 'case',
        'let', 'where', 'return', 'goto',
        'if', 'then', 'else', 'elif',
        'from', 'as', 'import', 'export',
        'package', 'module', 'interface'
    ],
    
    typeKeywords: [
        'Type', 'bool', 'byte', 'i8', 'i16', 'i32', 'i64', 'u8', 'u16', 'u32', 'u64', 'char', 'void', 'f32', 'f64'
    ],
    
    operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>=', '=>', '<-'
    ],
    
    // we include these common regular expressions
    symbols:  /[=><!~?:&|+\-*\/\^%]+/,
    
    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    
    // The main tokenizer for our languages
    tokenizer: {
        root: [

        // function and procedure definitions
        [/(func\s+|proc\s+|val\s+)([a-z_][\w$]*)/, ['keyword', 'definition' ] ],

        // labels
        [/(either\s+|case\s+|or\s+|goto\s+)([a-z_][\w$]*:)/, ['keyword', 'label'] ],
        [/[a-z_$][\w$]*:/, 'argument.label'],

        // identifiers and keywords
        [/[a-z_$][\w$]*(?=\()/, { cases: { '@typeKeywords': 'type.identifier',
                                        '@keywords': 'keyword',
                                        '@default': 'function.identifier' } } ],
        
        [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'type.identifier',
                                        '@keywords': 'keyword',
                                        '@default': 'identifier' } } ],
        [/[A-Z][\w$]*/, 'type.identifier' ],  // to show class names nicely
    
        // whitespace
        { include: '@whitespace' },
    
        // delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, { cases: { '@operators': 'operator',
                                '@default'  : '' } } ],
    
        // @ annotations.
        // As an example, we emit a debugging log message on these tokens.
        // Note: message are supressed during the first load -- change some lines to see them.
        [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],
    
        // numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
    
        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],
    
        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
        [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
    
        // characters
        [/'[^\\']'/, 'string'],
        [/(')(@escapes)(')/, ['string','string.escape','string']],
        [/'/, 'string.invalid']
        ],
    
        comment: [
        [/[^\/*]+/, 'comment' ],
        [/\/\*/,    'comment', '@push' ],    // nested comment
        ["\\*/",    'comment', '@pop'  ],
        [/[\/*]/,   'comment' ]
        ],
    
        string: [
        [/[^\\"]+/,  'string'],
        [/@escapes/, 'string.escape'],
        [/\\./,      'string.escape.invalid'],
        [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
        ],
    
        whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\*/,       'comment', '@comment' ],
        [/\/\/.*$/,    'comment'],
        ],
    },
}