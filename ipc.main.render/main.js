const { app, BrowserWindow, Menu, ipcMain } = require('electron');

ipcMain.on("msg", (event, arg) => {
    // console.log("event = ", event);
    console.log("arg = ", arg);
    event.reply("back-msg", "Thank you for data")
})
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
