import { InjectModel } from "@nestjs/mongoose";
import { Record, RecordDocument } from "./schema/record-schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { RecordDTO } from "./Dto/record-dto";
import { DeleteDTO } from "../common/detele-dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class RecordService{

 constructor(@InjectModel(Record.name) private readonly recordService:Model<RecordDocument>,private readonly cloudinaryService: CloudinaryService){}


 async create(recordDTO:RecordDTO){
 console.log("CREATING RECORD")
    const newRecord =  new this.recordService(recordDTO)
    await newRecord.save()
 
 }

  async record(){
    return this.recordService.find() 
 }

async delete(id: string) {
   console.log("DELETING RECORD")
  // 1. Find the record by ID
  const record = await this.recordService.findOne({ _id: id });

  if (!record) {
    throw new NotFoundException('Record not found');
  }

  // 2. Extract public_id from the URL
  const url = record.url;
  const publicId = this.cloudinaryService.extractCloudinaryPublicId(url);

  // 3. Delete from Cloudinary
  if (publicId) {
    await this.cloudinaryService.deleteFile(publicId);
  }

  // 4. Delete from MongoDB
  return this.recordService.deleteOne({ _id: id });
}

                   
                     
 
           
 

}