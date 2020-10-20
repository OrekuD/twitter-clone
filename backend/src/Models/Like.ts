import {
  getModelForClass,
  mongoose,
  prop,
  // plugin,
  Ref,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
// import autopopulate from "mongoose-autopopulate";

// @plugin(autopopulate as any)
@ObjectType()
export class Like {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  tweetId: string;

  @prop()
  @Field(() => User)
  creator: Ref<User>;

  @prop()
  @Field()
  creatorId: string;

  _doc?: any;
}

export const LikeModel = getModelForClass(Like);
