import { Module } from "@nestjs/common"
import { CloudinaryService } from "./cloudinary.service";
import { UploadController } from "./cloudinary.controller";

@Module({

controllers:[UploadController],
providers:[CloudinaryService]
})
export class CloudinaryModule{

}