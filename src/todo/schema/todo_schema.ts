import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema()
export class Todo extends Document{
    @Prop()
    mainTask:[{type:{text:string|null,time:string|null}}]
    @Prop()
    subTasks:[{type:{text:string|null,time:string|null}}]
}


export type TodoDocument = Todo & Document

export const TodoSchema = SchemaFactory.createForClass(Todo)