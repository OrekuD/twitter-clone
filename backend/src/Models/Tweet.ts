import {
  prop,
  getModelForClass,
  mongoose,
  Ref,
  plugin,
} from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Comment } from "./Comment";
import { User } from "./User";
import autopopulate from "mongoose-autopopulate";
import { Like } from "./Like";

@plugin(autopopulate as any)
@ObjectType()
export class Tweet {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field()
  isRetweet: boolean;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop({ ref: () => User, autopopulate: true })
  @Field(() => User)
  creator: Ref<User>;

  @prop({ ref: () => Comment, autopopulate: true })
  @Field(() => [Comment])
  comments: Ref<Comment>[];

  @prop({ ref: () => Like, autopopulate: true })
  @Field(() => [Like])
  likes: Ref<Like>[];

  @prop({ ref: () => User, autopopulate: true })
  @Field(() => [User])
  retweets: Ref<User>[];
}

export const TweetModel = getModelForClass(Tweet);
