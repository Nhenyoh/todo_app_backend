import { Module } from "@nestjs/common";

import { MongooseModule } from '@nestjs/mongoose';

import { NoteService } from "./note_service";
import { Notecontroller } from "./note_controller";
import { Note, NoteSchema } from "./schema/note_schema";


@Module({
    imports:[
         MongooseModule.forFeature([
        {name:Note.name,schema:NoteSchema}
      ])],
    providers:[NoteService],
    controllers:[Notecontroller]
})
export class NoteModule{

}