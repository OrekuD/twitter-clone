import { prop, getModelForClass, mongoose, Ref } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { Like } from "./Like";
import { User } from "./User";

@ObjectType()
export class Tweet {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @prop()
  @Field(() => String, { nullable: true })
  parentId: string | null;

  @prop()
  @Field()
  content: string;

  @prop()
  @Field()
  isRetweet: boolean;

  @prop()
  @Field(() => Date)
  createdAt: Date;

  @prop()
  @Field()
  commentsCount: number;

  // @prop({ ref: () => User, autopopulate: true })
  // @Field(() => User)
  // creator: Ref<User>;

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
