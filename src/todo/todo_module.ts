import { Module } from "@nestjs/common";
import { TodoService } from "./todo_service";
import { Todocontroller } from "./todo_controller";
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from "./schema/todo_schema";


@Module({
    imports:[
         MongooseModule.forFeature([
        {name:Todo.name,schema:TodoSchema}
      ])],
    providers:[TodoService],
    controllers:[Todocontroller]
})
export class TodModule{

}