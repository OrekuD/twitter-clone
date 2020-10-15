import {
  getModelForClass,
  prop,
  mongoose,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate as any)
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

  @Field()
  @prop()
  bio: string;

  @Field()
  @prop()
  location: string;

  @Field()
  @prop()
  image: string;

  @Field()
  @prop()
  fullname: string;

  @prop({ ref: () => User, autopopulate: true })
  @Field(() => [User])
  following: Ref<User>[];

  @prop({ ref: () => User, autopopulate: true })
  @Field(() => [User])
  followers: Ref<User>[];
}

export const UserModel = getModelForClass(User);
