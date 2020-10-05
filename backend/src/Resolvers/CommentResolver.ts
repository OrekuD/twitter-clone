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
} from "type-graphql";
import { Post, PostModel } from "../Models/Post";
import { Context } from "../types";

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
  postId: string;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Post])
  async getCommentsByUser(@Arg("userId") userId: string) {
    const comments = await CommentModel.find({ creatorId: userId });
    return comments;
  }

  @Mutation(() => CommentResponse)
  async createComment(
    @Arg("input") input: CommentInput,
    @Ctx() { request }: Context
  ): Promise<CommentResponse> {
    const { content, postId } = input;
    const { userId } = request.session;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return {
        error: {
          message: "Post is unavailable",
          field: "post",
        },
      };
    }

    const comment = await CommentModel.create({
      content,
      creator: userId,
      createdAt: Date.now(),
      postId,
      creatorId: userId,
    });
    await comment.save();

    await PostModel.updateOne(
      { _id: input.postId },
      { $push: { comments: [comment.id] as any } }
    );

    return { comment };
  }
}
