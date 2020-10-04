import {
  prop,
  getModelForClass,
  mongoose,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Comment } from "./Comment";
import { User } from "./User";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate as any)
@ObjectType()
export class Post {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field()
  creator: User;

  @prop({ ref: () => Comment, autopopulate: true })
  @Field(() => [Comment])
  comments: Ref<Comment>[];

  @prop()
  @Field()
  likes: number;
}

export const PostModel = getModelForClass(Post);
