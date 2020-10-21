import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Like {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  tweetId: string;

  @prop()
  @Field()
  creatorId: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  _doc?: any;
}

export const LikeModel = getModelForClass(Like);
