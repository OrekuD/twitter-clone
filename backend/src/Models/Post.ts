import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import mongoose from "mongoose";

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field(() => [Post])
  comments: Post[];
}

export const PostModel = getModelForClass(Post);
