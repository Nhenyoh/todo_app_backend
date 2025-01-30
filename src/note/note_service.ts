import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note, NoteDocument } from "./schema/note_schema";
import { createNoteDTO } from "./dto/create_note_dto";


@Injectable()
export class NoteService{

         constructor(@InjectModel(Note.name) private readonly noteService:Model<NoteDocument>){}

         async create(noteservice:createNoteDTO){

               try {
                console.log(" VALUE",noteservice.id)

                 const noteExist= await this.noteService.findOne({id:noteservice.id})

                 console.log("THIS IS THE CREATED VALUE",noteExist)
                  if(noteExist){

                    throw  new HttpException("Note exist",502)
                  }
                  else{
                    const newTodo =  new this.noteService(noteservice)
                      console.log("Run time")
                    await newTodo.save()
                    console.log("Note created")

                  }
                  
                    

          

                return "Successful"
               } catch (error) {
                
                throw  new HttpException(error,500)
                   }

         }



         async getTodo(id:String):Promise<Note>{
                try {
                       return this.noteService.findById(id) 
                } catch (error) {
                    throw  new HttpException(error,500)
 
                }
         }

         async getAllTodo(uid:string):Promise<Note[]>{
                try {
                     console.log("OK FETCH")
                        return  await this.noteService.find({owner:uid}) 
                 } catch (error) {
                     throw  new HttpException(error,500)
  
                 }  
         }

         
         async deleteTodo(id:string){
          try {
            console.log("Deleting item",)
            const respons= await this.noteService.deleteOne({_id: id['id'] }); 
            console.log("delete response ",respons)
            return "Deleted"
          }
           catch (error) {
               throw  new HttpException(error,500)

           }

           
   }
         

}
/*

import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schema/note_schema';
import { createNoteDTO } from './dto/create_note_dto';

@Injectable()
export class NoteService {
  private readonly logger = new Logger(NoteService.name);

  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(noteDto: createNoteDTO): Promise<string> {
    try {
      const newNote = new this.noteModel(noteDto);
      await newNote.save();
      this.logger.log('Note created successfully');
      return 'Successful';
    } catch (error) {
      this.logger.error('Error creating note', error.stack);
      throw new HttpException(error.message, 500);
    }
  }

  async getTodo(id: string): Promise<Note> {
    try {
      const note = await this.noteModel.findById(id).exec();
      if (!note) {
        throw new HttpException('Note not found', 404);
      }
      return note;
    } catch (error) {
      this.logger.error(`Error fetching note with ID ${id}`, error.stack);
      throw new HttpException(error.message, 500);
    }
  }

  async getAllTodo(): Promise<Note[]> {
    try {
      this.logger.log('Fetching all notes');
      return await this.noteModel.find().exec();
    } catch (error) {
      this.logger.error('Error fetching all notes', error.stack);
      throw new HttpException(error.message, 500);
    }
  }
}*/
