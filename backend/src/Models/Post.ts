import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field()
  isComment: boolean;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field()
  creator: User;

  @prop()
  @Field(() => [Post])
  comments: Post[];
}

export const PostModel = getModelForClass(Post);
