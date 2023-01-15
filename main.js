require(['vs/editor/editor.main'], function () {
    monaco.languages.register({
        id: 'myCustomLanguage'
    });
    monaco.languages.setMonarchTokensProvider('myCustomLanguage', syntax);

    // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme('myCustomTheme', {
        colors: {},
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'keyword', foreground: 'FFFF00' },
            { token: 'identifier', foreground: 'FFF2CC' },
            { token: 'type.identifier', foreground: '77FF77' },
            { token: 'function.identifier', foreground: 'FFBBBB'},
            { token: 'argument.label', foreground: 'CCCCCC' },
            { token: 'label', foreground: '00FFFF' },
            { token: 'operator', foreground: 'FFFFFF' },
            { token: 'delimiter', foreground: 'FFFFFF' },
            { token: 'invalid', foreground: '00FF00' }
        ]
    });
    var editor = monaco.editor.create(document.getElementById('container'), {
        theme: 'myCustomTheme',
        value: code,
        language: 'myCustomLanguage'
    });
});