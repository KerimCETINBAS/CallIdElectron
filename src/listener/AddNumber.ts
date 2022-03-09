
import { ipcMain } from "electron"
import { Number } from "../entities/numbers"
import { getRepository } from "typeorm"
export default () => {
   ipcMain.handle("addNumber", async (event, data) => {

       const { phone, addreses } = data

       const numberRepository = getRepository(Number)

        const addedNumber = new Number()
       addedNumber.phone = phone
    

       addedNumber.addreses = [...addreses]
 
       await numberRepository.save(addedNumber).catch(e=>console.error(e))

       return
   
   });
}

