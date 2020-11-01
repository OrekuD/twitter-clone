import { prop, getModelForClass, mongoose, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Like } from "./Like";
import { User } from "./User";

@ObjectType()
export class Tweet {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  // A tweet with a parentId is a comment
  @prop()
  @Field(() => String, { nullable: true })
  parentId: string | null;

  // A tweet with an originalTweetId is a retweet
  @prop()
  @Field(() => String, { nullable: true })
  originalTweetId: string | null;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field()
  image: string;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field()
  commentsCount: number;

  @prop()
  @Field(() => User)
  creator: Ref<User>;

  @prop()
  @Field(() => [Like])
  likes: Ref<Like>[];

  @prop()
  @Field(() => [User])
  retweets: Ref<User>[];

  _doc?: any;
}

export const TweetModel = getModelForClass(Tweet);
