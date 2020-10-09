import { LikeModel, Like } from "../Models/Like";
import { PostModel } from "../Models/Post";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";

@ObjectType()
class LikeResponse {
  @Field()
  state: boolean;

  @Field()
  message: string;
}

@Resolver()
export class LikeResolver {
  @Mutation(() => LikeResponse)
  @UseMiddleware(Auth)
  async likePost(@Arg("postId") postId: string, @Ctx() { request }: Context) {
    const { userId } = request.session;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return {
        state: false,
        message: "Post is unavailable",
      };
    }
    const like = await LikeModel.create({
      creator: userId,
      postId,
      creatorId: userId,
    });
    await like.save();

    await PostModel.updateOne(
      { _id: postId },
      { $push: { likes: [like.id] as any } }
    );

    return { state: true, message: "Like successfull" };
  }

  @Mutation(() => LikeResponse)
  @UseMiddleware(Auth)
  async unLikePost(
    @Arg("postId") postId: string,
    @Arg("likeId") likeId: string,
    @Ctx() { request }: Context
  ) {
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return {
        state: false,
        message: "Post is unavailable",
      };
    }

    await LikeModel.deleteOne({
      _id: likeId,
    });

    const updatedLikes = post.likes.filter(
      (like) => like !== request.session.userId
    );

    await PostModel.updateOne(
      { _id: postId },
      { $set: { likes: updatedLikes } }
    );

    return { state: true, message: "Unlike successfull" };
  }

  @Query(() => [Like], { nullable: true })
  async getLikesByUser(@Arg("userId") userId: string) {
    const likes = await LikeModel.find({ creatorId: userId });
    return likes;
  }
}
