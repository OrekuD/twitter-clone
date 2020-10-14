import {
  getModelForClass,
  mongoose,
  plugin,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Tweet } from "./Tweet";
import autopopulate from "mongoose-autopopulate";

@plugin(autopopulate as any)
@ObjectType()
export class Trends {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  hashtag: string;

  @prop({ ref: () => Tweet, autopopulate: true })
  @Field(() => [Tweet])
  tweets: Ref<Tweet>[];

  @Field()
  @prop()
  numberOfTweets: number;
}

export const TrendsModel = getModelForClass(Trends);
