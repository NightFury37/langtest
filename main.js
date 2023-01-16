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
            { token: 'identifier', foreground: '00FFFF' },
            { token: 'type.identifier', foreground: '40E0D0' },
            { token: 'function.identifier', foreground: 'CCCCFF'},
            { token: 'argument.label', foreground: 'FFBF00' },
            { token: 'label', foreground: 'E0B0FF' },
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