const { app, BrowserWindow, globalShortcut } = require('electron');
const windowStateKeeper = require('electron-window-state');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
    });

    win.loadFile('index.html');
    globalShortcut.register("Shift+K", () => {
        win.loadFile("other.html")
        console.log("Shift + K ");
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
