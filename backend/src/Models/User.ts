import { getModelForClass, prop, mongoose } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  username: string;

  @prop()
  password: string;
}

export const UserModel = getModelForClass(User);
