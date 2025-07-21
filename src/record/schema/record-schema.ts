import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document,Schema as  MongooseSchema } from "mongoose";

@Schema()
export class Record extends Document{
    @Prop()
    url:string
    @Prop()
    title:string
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) // Reference User model
    createdby: string;
    @Prop({type:Date})
    createdat:Date
}


export type RecordDocument = Record & Document

export const RecordSchema = SchemaFactory.createForClass(Record)