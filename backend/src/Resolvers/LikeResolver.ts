import { LikeModel } from "../Models/Like";
import { Post, PostModel } from "../Models/Post";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";

@InputType()
class LikeInput {
  @Field()
  value: boolean;

  @Field()
  postId: string;

  @Field()
  userId: string;
}

@ObjectType()
class LikeError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@ObjectType()
class LikeResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => LikeError, { nullable: true })
  error?: LikeError;
}

@Resolver()
export class LikeResolver {
  @Mutation(() => LikeResponse)
  async like(@Arg("options") options: LikeInput) {
    const { postId, userId, value } = options;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return {
        error: {
          message: "Post doesn't exist",
          field: "post",
        },
      };
    }
    const like = await LikeModel.create({
      postId,
      userId,
      value,
    });
    await like.save();
    return { post };
  }
}
