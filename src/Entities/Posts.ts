import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Posts {
  @Field(() => ID)
  id: String;

  @prop()
  @Field()
  content: String;

  @prop()
  @Field(() => [Posts])
  comments: Array<Posts>;
}

export const PostsModel = getModelForClass(Posts);
