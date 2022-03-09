
import Electron, { ipcMain , BrowserWindow ,  webContents } from "electron"
import {} from "electron/main"

export default () => {


    ipcMain.handle("get-printers", async () => {

        const win = BrowserWindow

     
        return await   win.getFocusedWindow()?.webContents.getPrintersAsync()


 
       
    }) 
}