const { app, BrowserWindow, Tray, Menu } = require('electron');

let isMac = process.platform == "darwin"
let templet = [
    ...isMac ? {//applying condition
        label: "Blog", submenu: [
            { label: "About" },
            { label: "Setting" },
        ]
    } : [],
    { label: "File" },
    {
        label: "Operations", submenu: [
            isMac ?
                { role: "close", label: "Close" }
                :
                { role: "quit", label: "Quit" },
            { label: "Zoom" },
        ]
    },
]
let menu = Menu.buildFromTemplate(templet)
Menu.setApplicationMenu(menu)

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
    });

    win.loadFile('index.html');

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
