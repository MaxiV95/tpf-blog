//post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PostDocument = mongoose.HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: [String] })
  categories: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  idAuthor: mongoose.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
