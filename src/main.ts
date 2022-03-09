import "reflect-metadata";
import { app, BrowserWindow, ipcMain, webContents } from "electron";
import { createConnection} from "typeorm"
import { join} from "path"
import { readdirSync } from "fs"
import { Number } from "./entities/numbers"
import { Address } from "./entities/address"
import { createServer } from "http"
import { getRepository } from "typeorm"
import serve from 'electron-serve';
import isDev from "electron-is-dev"

if (require('electron-squirrel-startup'))  app.quit();

const loadURL = serve({directory: 'frontend'});
app.disableHardwareAcceleration()
app.whenReady().then()

let win: BrowserWindow;

const loadHandlers = async () => {

    const files = readdirSync(join(__dirname, "listener"))
    for(const file of files) { if(/\.js$/.test(file)) { 
            const handler = await import(join(__dirname, "listener" , file)).catch(e => console.error(e))
            handler.default()  
        }
    }
}

;(async () => {
    try {
        await createConnection({  type: "sqlite",  database: "database.db",
            entities: [   Number,  Address  ],   synchronize: true,  logging: false  })
            
        const server = createServer(async (req, res) => {
            if(req.url == "/check") console.log("Telefon baglandi aramalari dinliyor")
            if(req.url?.startsWith("/number/")) {
                const numberRepository = getRepository(Number)
                const phone = req.url.replace("/number/", "")
                let caller = await numberRepository.findOne({phone: phone})
                if(!caller) {
                    caller = new Number()
                    caller.phone = phone
                    caller.addreses = [ new Address() ]
                    await numberRepository.save(caller)
                }               
                win.webContents.send("call", caller)
            }

            res.statusCode = 200
            res.end("ok")
        }).listen(3091)

        await app.whenReady()

        win = new BrowserWindow({
            webPreferences: {
                nodeIntegration: false,
                nativeWindowOpen: false,
                preload: join(__dirname, "preload.js")
            }
        })
        win.setMenu(null) 
        loadHandlers()
        if(isDev)  win.webContents.openDevTools()     
        !isDev ? await loadURL(win) : win.loadURL("http://localhost:3000") ;
        const printers = await win.webContents.getPrintersAsync() 
    } catch(error) {  }
})()

