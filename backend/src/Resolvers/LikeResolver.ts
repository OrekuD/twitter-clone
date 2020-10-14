import { LikeModel, Like } from "../Models/Like";
import { Tweet, TweetModel } from "../Models/Tweet";
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
import { Comment, CommentModel } from "../Models/Comment";

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
  async likeTweet(
    @Arg("tweetId") tweetId: string,
    @Arg("isComment") isComment: boolean,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
    let tweet: Tweet | Comment | null;

    if (isComment) {
      tweet = await CommentModel.findOne({ _id: tweetId });
    } else {
      tweet = await TweetModel.findOne({ _id: tweetId });
    }

    if (!tweet) {
      return {
        state: false,
        message: "Tweet is unavailable",
      };
    }

    const hasUserAlreadyLiked = tweet.likes.findIndex(
      (like) => like?.creatorId === userId // TODO: fix this
    );

    if (hasUserAlreadyLiked >= 0) {
      const updatedLikes = tweet.likes.filter(
        (like) => like?.creatorId !== userId // TODO: fix this
      );

      if (isComment) {
        await CommentModel.updateOne(
          { _id: tweetId },
          { $set: { likes: updatedLikes } }
        );
      } else {
        await TweetModel.updateOne(
          { _id: tweetId },
          { $set: { likes: updatedLikes } }
        );
      }

      await LikeModel.deleteOne({
        _id: tweet.likes[hasUserAlreadyLiked]?.id, // TODO: fix this
      });

      return { state: true, message: "Unlike successfull" };
    }

    const like = await LikeModel.create({
      creator: userId,
      tweetId,
      creatorId: userId,
    });
    await like.save();

    if (isComment) {
      await CommentModel.updateOne(
        { _id: tweetId },
        { $push: { likes: [like.id] as any } }
      );
    } else {
      await TweetModel.updateOne(
        { _id: tweetId },
        { $push: { likes: [like.id] as any } }
      );
    }

    return { state: true, message: "Like successfull" };
  }

  // @Mutation(() => LikeResponse)
  // @UseMiddleware(Auth)
  // async likeComment(
  //   @Arg("commentId") commentId: string,
  //   @Ctx() { request }: Context
  // ) {
  //   const { userId } = request.session;
  //   const comment = await CommentModel.findOne({ _id: commentId });
  //   if (!comment) {
  //     return {
  //       state: false,
  //       message: "Comment is unavailable",
  //     };
  //   }

  //   const hasUserAlreadyLiked = comment.likes.findIndex(
  //     (like) => like?.creatorId === userId // TODO: fix this
  //   );

  //   if (hasUserAlreadyLiked >= 0) {
  //     const updatedLikes = comment.likes.filter(
  //       (like) => like?.creatorId !== userId // TODO: fix this
  //     );

  //     await CommentModel.updateOne(
  //       { _id: commentId },
  //       { $set: { likes: updatedLikes } }
  //     );

  //     await LikeModel.deleteOne({
  //       _id: comment.likes[hasUserAlreadyLiked]?.id, // TODO: fix this
  //     });

  //     return { state: true, message: "Unlike successfull" };
  //   }

  //   const like = await LikeModel.create({
  //     creator: userId,
  //     tweetId: commentId,
  //     creatorId: userId,
  //   });
  //   await like.save();

  //   await CommentModel.updateOne(
  //     { _id: commentId },
  //     { $push: { likes: [like.id] as any } }
  //   );

  //   return { state: true, message: "Like successfull" };
  // }

  @Query(() => [Like], { nullable: true })
  async getLikesByUser(@Arg("userId") userId: string) {
    const likes = await LikeModel.find({ creatorId: userId });
    return likes;
  }
}
