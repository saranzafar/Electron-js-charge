const { app, BrowserWindow, Menu } = require('electron');

let templet = [
    { label: "Item 1" },
    { label: "Item 2" },
    { label: "Item 3", role: "minimize" },
]
let contextMenu = Menu.buildFromTemplate(templet)


function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
    win.webContents.on("context-menu", () => {
        contextMenu.popup()
    })
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
