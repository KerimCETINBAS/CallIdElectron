import { ipcMain } from "electron"
import { getRepository  } from "typeorm";
import { Address } from "../entities/address";


 export default () => {
    ipcMain.handle("add-address", async (event, id) => {

        const addressRepository = getRepository("Address")
        
        const _address = new Address()
        
        _address.phone = id

      
      
        return await  addressRepository.save(_address)
    });
 }

