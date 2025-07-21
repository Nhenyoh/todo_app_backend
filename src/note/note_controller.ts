import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { NoteService } from "./note_service";
import { createNoteDTO } from "./dto/create_note_dto";
import { Note } from "./schema/note_schema";

@Controller("notes")
export class Notecontroller{
    constructor(private readonly noteService:NoteService){}
    
    @Post('')
    async create(@Body('') createNotedto:createNoteDTO){
        return this.noteService.create(createNotedto)
    }

    @Get('/general/')
    async getNotes():Promise<Note[]>{
        return this.noteService.getNotes()
    }

    @Get('/:uid')
    async getUserNotes(@Param('uid') uid:string):Promise<Note[]>{
        return this.noteService.getUsersNotes(uid)
    }


    @Delete('/:id')
    async delete(@Param('id') id:string):Promise<string>{

        return this.noteService.deleteNote(id) 
    }

    @Put(':id')
async updateNote(@Param('id') id: string, @Body() body: Partial<createNoteDTO>) {
  return await this.noteService.updateNote(id, body);
}

    
}
