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
import { Like } from "./Like";

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
  tweetId: string;

  @prop()
  @Field()
  creatorId: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop({ ref: () => User, autopopulate: true })
  @Field(() => User)
  creator: Ref<User>;

  @prop({ ref: () => Like, autopopulate: true })
  @Field(() => [Like])
  likes: Ref<Like>[];
}

export const CommentModel = getModelForClass(Comment);
