

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document,Schema as  MongooseSchema } from "mongoose";
import { User } from "src/user/schema/user-schema";



@Schema()
export class Note extends Document{
    @Prop()
    title:string
    @Prop()
    details:string
    @Prop({ unique: true,})
    id:string
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) // Reference User model
    createdby: string;
    @Prop({type:Date})
    createdat:Date
}


export type NoteDocument = Note & Document

export const NoteSchema = SchemaFactory.createForClass(Note)