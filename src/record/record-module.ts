import { MongooseModule } from "@nestjs/mongoose";
import { Record, RecordSchema } from "./schema/record-schema";
import { RecordService } from "./record-service";
import { Recordcontroller } from "./record-controlle";
import { Module } from "@nestjs/common";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Module({
    imports:[
         MongooseModule.forFeature([
        {name:Record.name,schema:RecordSchema}
      ])],
    providers:[RecordService, CloudinaryService],
    controllers:[Recordcontroller]
})
export class RecordModule{

}