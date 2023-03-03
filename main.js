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

    editor = monaco.editor.create(document.getElementById('container'), {
        theme: 'myCustomTheme',
        model: null,
        automaticLayout: true
    });

    appendTab(document.getElementById("tabs"), "tutorial1.impl");
});

function selectTab(tabs, fileName) {
    session.selectedIndex = session.tabIndex[fileName];
    let tab = tabs.childNodes[session.selectedIndex];
    tab.firstChild.className = "sTab";
    tab.lastChild.className = "csTab";
    tab.firstChild.disabled = true;
    editor.setModel(session.tabs[session.selectedIndex].model);
    editor.restoreViewState(session.tabs[session.selectedIndex].viewState);
    editor.focus();
}

function deselectTab(tabs) {
    let tab = tabs.childNodes[session.selectedIndex];
    tab.firstChild.className = "tab";
    tab.lastChild.className = "cTab";
    tab.firstChild.disabled = false;
    session.tabs[session.selectedIndex].viewState = editor.saveViewState();
    session.tabs[session.selectedIndex].model = editor.getModel();
}

function appendTab(tabs, fileName) {
    session.selectedIndex = session.tabs.length;
    session.tabs.push({ title : fileName, model : monaco.editor.createModel(code[fileName], 'myCustomLanguage'), viewState : null });
    session.tabIndex[fileName] = session.selectedIndex;
    let tab = document.createElement("div");
    tab.className = "tabArea";
    tab.innerHTML = `<button class="sTab" onclick="clickTab('${fileName}')" disabled>${fileName}</button><button class="csTab" onclick="closeTab('${fileName}')"></button>`;
    tabs.appendChild(tab);
    editor.setModel(session.tabs[session.selectedIndex].model);
    editor.restoreViewState(session.tabs[session.selectedIndex].viewState);
    editor.focus();
}

function openTab(fileName) {
    let tabs = document.getElementById("tabs");
    if (session.selectedIndex >= 0) {
        deselectTab(tabs);
    }
    if (session.tabIndex.hasOwnProperty(fileName)) {
        selectTab(tabs, fileName);
    } else {
        appendTab(tabs, fileName);
    }
}

function clickTab(fileName) {
    if (session.tabIndex.hasOwnProperty(fileName)) {
        let tabs = document.getElementById("tabs");
        deselectTab(tabs);
        selectTab(tabs, fileName);
    }
}

function closeTab(fileName) {
    let index = session.tabIndex[fileName];
    let tabs = document.getElementById("tabs");
    tabs.childNodes[index].remove();
    session.tabs.splice(index, 1);
    delete session.tabIndex[fileName];
    for (let i = index; i < session.tabs.length; i++) {
        session.tabIndex[session.tabs[i].title]--;
    }
    if (index == session.selectedIndex) {
        if (session.tabs.length == 0) {
            session.selectedIndex = -1;
            editor.setModel(null);
        } else {
            selectTab(tabs, session.tabs[session.tabs.length - 1].title);
        }
    } else if (index < session.selectedIndex) {
        session.selectedIndex--;
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