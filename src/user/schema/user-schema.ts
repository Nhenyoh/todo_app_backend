import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document{
    @Prop()
    fullNames:string

    @Prop()
    email:string

    @Prop()
    password:string

    @Prop()
    picture:string

    @Prop()
    role:string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)

