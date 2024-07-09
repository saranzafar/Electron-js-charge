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

// console.log(app.isReady());
// app.whenReady().then(creatrWindow) //alternative
app.on("ready", () => {
    // console.log(app.isReady());
    creatrWindow()
    console.log("Your app is ready");
})

// app.on("before-quit", (e) => {
//     console.log("Code before quit app");
//     e.preventDefault()//prevent to exit window 
// })

// app.on("will-quit", () => {
//     console.log("app will be quit");
//     e.preventDefault()//prevent to exit window 
// })

// app.on("browser-window-focus", () => {
//     console.log("This is focus event");
// })

// app.on("browser-window-blur", () => {
//     console.log("This is blur");
// })