import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";

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

    @Get('/general/')
    async getNotes():Promise<Note[]>{
        return this.todoService.getNotes()
    }

    @Get('/:uid')
    async getUserNotes(@Param('uid') uid:string):Promise<Note[]>{
        return this.todoService.getUsersNotes(uid)
    }


    @Delete('/:id')
    async delete(@Param('id') id:string):Promise<string>{

        return this.todoService.deleteNote(id)
    }
    
}
