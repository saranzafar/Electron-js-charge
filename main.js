import { app, BrowserWindow } from "electron"

function creatrWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        // frame: false,//top heder
        // backgroundColor: "gray",
        // alwaysOnTop: true,
        // title:"Awsome app",
        // resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("index.html")
    win.webContents.openDevTools()
}

app.whenReady().then(creatrWindow)