import {
  prop,
  getModelForClass,
  mongoose,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate as any)
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
  @Field()
  creatorId: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop({ ref: () => User, autopopulate: true })
  @Field(() => User)
  creator: Ref<User>;
}

export const CommentModel = getModelForClass(Comment);
