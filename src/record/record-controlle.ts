import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { UploadedFileType } from "types";
import { RecordService } from "./record-service";


@Controller("record")
export class Recordcontroller{
     constructor(private readonly cloudinaryService: CloudinaryService, private readonly recordService:RecordService) {}
    
      @Post('')
      @UseInterceptors(FileInterceptor('file'))
      async uploadFile(@UploadedFile() file: UploadedFileType, @Body('createdby') createdby: string,
  @Body('title') title: string){
        console.log("RECORD UPLOADED TO REMOTE DATABASE",createdby)
        const url = await this.cloudinaryService.uploadImage(file);
        
       return this.recordService.create({url,createdby,title})
        
      }

      @Get("")
      async record(){
        return this.recordService.record()
      }


      @Delete("/:id")
      async delete(@Param("id") id:string){
        return this.recordService.delete(id)
      }


}