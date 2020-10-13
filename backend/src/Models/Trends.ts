import {
  getModelForClass,
  mongoose,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Post } from "./Post";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate as any)
@ObjectType()
export class Trends {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  hashtag: string;

  @prop({ ref: () => Post, autopopulate: true })
  @Field(() => [Post])
  posts: Ref<Post>[];

  @Field()
  @prop()
  numberOfPosts: number;
}

export const TrendsModel = getModelForClass(Trends);
