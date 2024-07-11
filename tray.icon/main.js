const { app, BrowserWindow, Tray, Menu } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
    });

    win.loadFile('index.html');
    let tray = new Tray("icon.png")// small icon at right-bottom
    tray.setToolTip("Tray for electron app")//hover text
    tray.on("click", () => {
        win.isVisible() ? win.hide() : win.show()//on click hide/show
        let templet = [
            { label: "item 1", type: "radio" },
            { label: "item 2" }
        ]
        const contextMenu = Menu.buildFromTemplate(templet)
        tray.setContextMenu(contextMenu)
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
