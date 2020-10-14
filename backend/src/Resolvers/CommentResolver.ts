import { CommentModel, Comment } from "../Models/Comment";
import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
  InputType,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Tweet, TweetModel } from "../Models/Tweet";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";

@ObjectType()
class CommentError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@ObjectType()
class CommentResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => CommentError, { nullable: true })
  error?: CommentError;
}

@InputType()
class CommentInput {
  @Field()
  content: string;

  @Field()
  tweetId: string;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Tweet])
  async getCommentsByUser(@Arg("userId") userId: string) {
    const comments = await CommentModel.find({ creatorId: userId });
    return comments;
  }

  @Mutation(() => CommentResponse)
  @UseMiddleware(Auth)
  async createComment(
    @Arg("input") input: CommentInput,
    @Ctx() { request }: Context
  ): Promise<CommentResponse> {
    const { content, tweetId } = input;
    const { userId } = request.session;
    const tweet = await TweetModel.findOne({ _id: tweetId });
    if (!tweet) {
      return {
        error: {
          message: "Tweet is unavailable",
          field: "tweet",
        },
      };
    }

    const comment = await CommentModel.create({
      content,
      creator: userId,
      createdAt: Date.now(),
      tweetId,
      creatorId: userId,
      likes: [],
    });
    await comment.save();

    await TweetModel.updateOne(
      { _id: tweetId },
      { $push: { comments: [comment.id] as any } }
    );

    return { comment };
  }
}
