import { Body, Controller } from "@nestjs/common";

import { NoteService } from "./note_service";
import { createNoteDTO } from "./dto/create_note_dto";
import { Note } from "./schema/note_schema";

@Controller()
export class Notecontroller{
    constructor(private readonly todoService:NoteService){}
    async create(@Body('') createNotedto:createNoteDTO){
        return this.todoService.create(createNotedto)
    }

    async getTodo():Promise<Note>{
        return this.getTodo()
    }

    async getAllTodo():Promise<Note[]>{
        return this.getAllTodo()
    }
}