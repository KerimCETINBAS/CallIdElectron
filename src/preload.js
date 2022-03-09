const { contextBridge, ipcRenderer } = require('electron');



contextBridge.exposeInMainWorld(
    "api", {
        get: (/** @type {string} */ channel, /** @type {(event: Electron.IpcRendererEvent, ...args: any[]) => void} */ cb) => ipcRenderer.on(channel, cb),
        send: (/** @type {string} */ channel, /** @type {any} */ ...args) => {
          
                ipcRenderer.send(channel, ...args);
          
        },
        invoke: (/** @type {string} */ channel, /** @type {any} */ ...args) => {

            return new Promise((resolve)=>{
                ipcRenderer.invoke(channel, ...args).then((value) =>{
                    resolve(value);
                });
            })
       
           
        }
    }
);