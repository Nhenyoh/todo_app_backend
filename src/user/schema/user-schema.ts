import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullNames: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  emailVerified: boolean;

  // @Prop()
  // verificationCode?: string;

  // @Prop()
  // verificationCodeExpires?: Date;
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)


@Schema()
export class OTPStore {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop()
  otpExpiresAt?: Date;

  @Prop()
  updatedAt: Date;
}

export type OTPDocument = OTPStore & Document;
export const otpSchema = SchemaFactory.createForClass(OTPStore);