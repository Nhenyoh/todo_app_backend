import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import { Todo, TodoDocument } from "./schema/todo_schema";
import { Model } from "mongoose";
import { Todo, TodoDocument } from "./schema/todo_schema";
import { createTodoDTO } from "./dto/todo_dto";

@Injectable()
export class TodoService{

         constructor(@InjectModel(Todo.name) private readonly todoService:Model<TodoDocument>){}

         async create(todoservice:createTodoDTO){

               try {
                const newTodo =  new this.todoService(todoservice)

                await newTodo.save()

                return "Successful"
               } catch (error) {
                
                throw  new HttpException(error,500)
                   }

         }



         async getTodo(id:String):Promise<Todo>{
                try {
                       return this.todoService.findById(id) 
                } catch (error) {
                    throw  new HttpException(error,500)
 
                }
         }

         async getAllTodo():Promise<Todo[]>{
                try {
                        return this.todoService.find() 
                 } catch (error) {
                     throw  new HttpException(error,500)
  
                 }
         }

         

}