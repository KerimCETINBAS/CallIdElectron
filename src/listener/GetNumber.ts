import { ipcMain } from "electron"
import { getRepository  } from "typeorm";
import {Number} from "../entities/numbers";
 export default () => {
    ipcMain.handle("NumberById", async (event, data) => {

        const phoneRepository = getRepository(Number)

        const phones = await phoneRepository.findOne({ id: data},{relations: ["addreses"]})
        
        return phones 
    });
 }

