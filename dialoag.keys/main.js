const { app, BrowserWindow, globalShortcut, dialog } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
    });

    win.loadFile('index.html');
    // globalShortcut.register("K", () => {
    //     dialog.showOpenDialog({
    //         defaultPath: app.getPath("desktop"),
    //         buttonLabel: "button file"
    //     })
    // })
    // win.webContents.on("did-finish-load", () => {
    //     dialog.showOpenDialog({
    //         defaultPath: app.getPath("desktop"),
    //         buttonLabel: "button file"
    //     })
    // })
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
