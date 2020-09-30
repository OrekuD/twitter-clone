import { getModelForClass, mongoose, prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Like {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  value: boolean;

  @Field()
  @prop()
  postId: string;

  @Field()
  @prop()
  userId: string;
}

export const LikeModel = getModelForClass(Like);
