import { Body, Controller, Get, Post } from "@nestjs/common";

import { NoteService } from "./note_service";
import { createNoteDTO } from "./dto/create_note_dto";
import { Note } from "./schema/note_schema";

@Controller("notes")
export class Notecontroller{
    constructor(private readonly todoService:NoteService){}
    
    @Post('')
    async create(@Body('') createNotedto:createNoteDTO){
        return this.todoService.create(createNotedto)
    }

    @Get('/id')
    async getTodo():Promise<Note>{
        return this.getTodo()
    }

    @Get('')
    async getAllTodo():Promise<Note[]>{
        return this.todoService.getAllTodo()
    }
}