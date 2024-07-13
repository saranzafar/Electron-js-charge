const path = require("path")
const { app, BrowserWindow, Menu } = require("electron")

const isMac = process.platform === "darwin"//check mac
const isDev = process.env.NODE_ENV !== "development"

// Create the main window
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 500,
        height: 600
    })
    //open devtools if in dev mode
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
}

// create above window 
function createAboutWindow() {
    const aboutWindow = new BrowserWindow({
        title: "Image Resizer",
        width: 300,
        height: 300
    })
    aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"))
}

// App is ready
app.whenReady().then(() => {
    createMainWindow()

    // Implemtnt menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    });
});

//Menu templet
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: "About",
                click: createAboutWindow
            }
        ]
    }] : []),
    {
        role: "fileMenu"
    },
    ...(!isMac ? [
        {
            label: "Help",
            submenu: [
                {
                    label: "About",
                    click: createAboutWindow
                }
            ]
        }
    ] : [])
];

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})