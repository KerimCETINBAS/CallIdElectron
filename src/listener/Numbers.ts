import { ipcMain } from "electron"
import { getRepository  } from "typeorm";
 export default () => {
    ipcMain.handle("Numbers", async (event, data) => {

        const phoneRepository = getRepository("Number")

        const phones = await phoneRepository.find({ relations: ["addreses"]})
      
        return phones 
    });
 }

