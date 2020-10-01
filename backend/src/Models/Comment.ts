import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field()
  postId: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field()
  creator: User;

  //   @prop()
  //   @Field()
  //   likes: number;
}

export const CommentModel = getModelForClass(Comment);
