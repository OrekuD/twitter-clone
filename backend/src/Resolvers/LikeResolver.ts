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
import { CommentModel } from "../Models/Comment";

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

    const hasUserAlreadyLiked = post.likes.findIndex(
      (like) => like?.creatorId === userId // TODO: fix this
    );

    if (hasUserAlreadyLiked >= 0) {
      const updatedLikes = post.likes.filter(
        (like) => like?.creatorId !== userId // TODO: fix this
      );

      await PostModel.updateOne(
        { _id: postId },
        { $set: { likes: updatedLikes } }
      );

      await LikeModel.deleteOne({
        _id: post.likes[hasUserAlreadyLiked]?.id, // TODO: fix this
      });

      return { state: true, message: "Unlike successfull" };
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
  async likeComment(
    @Arg("commentId") commentId: string,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
    const comment = await CommentModel.findOne({ _id: commentId });
    if (!comment) {
      return {
        state: false,
        message: "Comment is unavailable",
      };
    }

    const hasUserAlreadyLiked = comment.likes.findIndex(
      (like) => like?.creatorId === userId // TODO: fix this
    );

    if (hasUserAlreadyLiked >= 0) {
      const updatedLikes = comment.likes.filter(
        (like) => like?.creatorId !== userId // TODO: fix this
      );

      await CommentModel.updateOne(
        { _id: commentId },
        { $set: { likes: updatedLikes } }
      );

      await LikeModel.deleteOne({
        _id: comment.likes[hasUserAlreadyLiked]?.id, // TODO: fix this
      });

      return { state: true, message: "Unlike successfull" };
    }

    const like = await LikeModel.create({
      creator: userId,
      postId: commentId,
      creatorId: userId,
    });
    await like.save();

    await CommentModel.updateOne(
      { _id: commentId },
      { $push: { likes: [like.id] as any } }
    );

    return { state: true, message: "Like successfull" };
  }

  @Query(() => [Like], { nullable: true })
  async getLikesByUser(@Arg("userId") userId: string) {
    const likes = await LikeModel.find({ creatorId: userId });
    return likes;
  }
}
