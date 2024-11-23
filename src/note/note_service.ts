import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import { Todo, TodoDocument } from "./schema/todo_schema";
import { Model } from "mongoose";
import { Note, NoteDocument } from "./schema/note_schema";
import { createNoteDTO } from "./dto/create_note_dto";


@Injectable()
export class NoteService{

         constructor(@InjectModel(Note.name) private readonly noteService:Model<NoteDocument>){}

         async create(noteservice:createNoteDTO){

               try {
                const newTodo =  new this.noteService(noteservice)

                await newTodo.save()

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

         async getAllTodo():Promise<Note[]>{
                try {
                        return this.noteService.find() 
                 } catch (error) {
                     throw  new HttpException(error,500)
  
                 }
         }

         

}