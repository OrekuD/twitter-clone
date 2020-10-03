import { getModelForClass, prop, mongoose } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  username: string;

  @Field()
  @prop()
  email: string;

  @prop()
  password: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @Field({ nullable: true })
  @prop()
  bio?: string;

  @Field({ nullable: true })
  @prop()
  location?: string;
}

export const UserModel = getModelForClass(User);
