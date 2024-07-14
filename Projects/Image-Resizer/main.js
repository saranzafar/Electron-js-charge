const path = require("path")
const os = require("os")
const fs = require("fs")
const resizeImg = require("resize-img")
const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron")

const isMac = process.platform === "darwin"//check mac
const isDev = process.env.NODE_ENV !== "development"
let mainWindow;
// Create the main window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 500,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
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

    // remove mainWindow from memory or close
    mainMenu.on("close", () => (mainWindow = null))

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

// respond to ipcRenderer resize 
ipcMain.on("image:resize", (event, options) => {
    options.dest = path.join(os.homedir(), "imageresizer")
    resizeImage(options)
    console.log(options);
})

async function resizeImage({ imagePath, width, height }) {
    try {
        console.log("Resizing");
        const newPath = await resizeImg(fs.readFileSync(imagePath), {
            width: +width,
            height: +height
        });
        console.log("Resized", newPath);

        //create file name
        const filename = path.basename(imagePath)

        // create destination folder 
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }

        //write file to destination
        fs.writeFileSync(path.join(dest, filename), newPath)

        // send seccess message to render
        mainMenu.webContents.send("image:done")
        // open dest folder 
        shell.openPath(dest)
    } catch (error) {

    }
}

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})