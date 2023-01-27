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
            { token: 'definition', foreground: 'FFBF00' },
            { token: 'identifier', foreground: 'CCCCCC' },
            { token: 'type.identifier', foreground: '40E0D0' },
            { token: 'function.identifier', foreground: 'EEEEEE'},
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
        language: 'myCustomLanguage',
        automaticLayout: true
    });
});

function enterFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
        document.getElementById("fsB").onclick = exitFullScreen;
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
        document.getElementById("fsB").onclick = exitFullScreen;
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        document.getElementById("fsB").onclick = exitFullScreen;
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        document.getElementById("fsB").onclick = enterFullscreen;
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        document.getElementById("fsB").onclick = enterFullscreen;
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        document.getElementById("fsB").onclick = enterFullscreen;
    }
}

function toggleFullscreen() {
    if (document.fullscreenElement != null) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
}