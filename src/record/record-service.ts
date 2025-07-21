import { InjectModel } from "@nestjs/mongoose";
import { Record, RecordDocument } from "./schema/record-schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { RecordDTO } from "./Dto/record-dto";
import { DeleteDTO } from "../common/detele-dto";

@Injectable()
export class RecordService{

 constructor(@InjectModel(Record.name) private readonly recordService:Model<RecordDocument>){}


 async create(recordDTO:RecordDTO){
 console.log("CREATING RECORD")
    const newRecord =  new this.recordService(recordDTO)
    await newRecord.save()
 
 }

  async record(){
    return this.recordService.find() 
 }

 async delete(id:string ){
 
    return this.recordService.deleteOne({_id:id})
  
 
 }
                   
                     
 
           
 

}