import { ipcMain } from "electron"
import { getRepository  } from "typeorm";


 export default () => {
    ipcMain.handle("update-address", async (event, data) => {

        const addressRepository = getRepository("Address")

     
      
        return await  addressRepository.update(data.id, {...data}) 
    });
 }

