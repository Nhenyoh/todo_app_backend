import { Body, Controller } from "@nestjs/common";
import { TodoService } from "./todo_service";
import { createTodoDTO } from "./dto/todo_dto";
import { Todo } from "./schema/todo_schema";

@Controller()
export class Todocontroller{
    constructor(private readonly todoService:TodoService){}
    async create(@Body('') createTododto:createTodoDTO){
        return this.todoService.create(createTododto)
    }

    async getTodo():Promise<Todo>{
        return this.getTodo()
    }

    async getAllTodo():Promise<Todo[]>{
        return this.getAllTodo()
    }
}