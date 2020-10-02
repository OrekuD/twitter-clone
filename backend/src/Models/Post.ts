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
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field()
  creator: User;

  @prop({ type: [String] })
  @Field(() => [String])
  comments: string[];

  @prop()
  @Field()
  likes: number;
}

export const PostModel = getModelForClass(Post);
