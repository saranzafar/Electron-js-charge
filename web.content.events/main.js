const { app, BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

let win;

function createWindow() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
    });

    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
    });

    win.loadFile('index.html');
    mainWindowState.manage(win);
    let wc = win.webContents;

    //web content events
    // run when dom load is ready
    wc.on("dom-ready", () => {
        console.log("App dom is ready")
    })
    //run when dom-content is ready
    wc.on("did-finish-load", () => {
        console.log("did finish load")
    })
    //run when dom-content is ready
    wc.on("new-window", () => {
        console.log("did finish load")
    })
    //run when dom-content is ready
    wc.on("before-input-event", () => {
        console.log("Some key is press")
    })

    win.on('closed', () => {
        win = null;
    });
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
