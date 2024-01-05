//user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Invalid email format. Please enter a valid email address.',
    ],
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, unique: true })
  nickName: string;

  @Prop({ type: Boolean, default: false })
  admin: boolean;

  @Prop({ type: String, default: null })
  img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  return this.toObject({
    transform: (doc: any, ret: Record<string, any>) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  });
};
