import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Tweet } from "./Tweet";

@ObjectType()
export class Trends {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @prop()
  hashtag: string;

  @prop()
  @Field(() => [Tweet])
  tweets: Ref<Tweet>[];

  @Field()
  @prop()
  numberOfTweets: number;

  _doc?: any;
}

export const TrendsModel = getModelForClass(Trends);
