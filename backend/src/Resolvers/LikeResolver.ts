import { LikeModel } from "../Models/Like";
import { Post, PostModel } from "../Models/Post";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";

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
  @UseMiddleware(Auth)
  async likePost(
    @Arg("postId") postId: string,
    // @Arg("userId") userId: string,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
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
    });
    await like.save();

    await PostModel.updateOne(
      { _id: postId },
      { $push: { likes: [like.id] as any } }
    );

    return { post };
  }
}
