import { CommentModel, Comment } from "../Models/Comment";
import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
  InputType,
} from "type-graphql";
import { Post, PostModel } from "../Models/Post";
import { UserModel } from "../Models/User";

@ObjectType()
class PostError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@ObjectType()
class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => PostError, { nullable: true })
  error?: PostError;
}

@ObjectType()
class CommentResponse {
  @Field(() => Comment, { nullable: true })
  comment?: Comment;

  @Field(() => PostError, { nullable: true })
  error?: PostError;
}

@InputType()
class CommentInput {
  @Field()
  content: string;

  @Field()
  creatorId: string;

  @Field()
  postId: string;
}

@ObjectType()
class SinglePostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => PostError, { nullable: true })
  error?: PostError;
}

@Resolver(() => SinglePostResponse)
export class PostResolver {
  @Query(() => SinglePostResponse, { nullable: false })
  async getPost(@Arg("id") id: string) {
    const post = await PostModel.findOne({ _id: id });
    if (!post) {
      return {
        message: "Post is unavailable",
        field: "post",
      };
    }
    return { post };
  }

  @Query(() => [Post])
  async getAllPosts() {
    return await PostModel.find().sort({ createdAt: "desc" });
  }

  @Mutation(() => PostResponse)
  async createPost(
    @Arg("content") content: string,
    @Arg("creatorId") creatorId: string
  ): Promise<PostResponse> {
    const creator = await UserModel.findOne({ _id: creatorId });
    if (!creator) {
      return {
        error: {
          message: "User doesn't exist",
          field: "username",
        },
      };
    }

    const post = await PostModel.create({
      content,
      creator,
      createdAt: Date.now(),
      comments: [],
      likes: 0,
    });
    await post.save();
    return { post };
  }

  @Mutation(() => CommentResponse)
  async createComment(
    @Arg("options") options: CommentInput
  ): Promise<CommentResponse> {
    const { content, creatorId, postId } = options;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return {
        error: {
          message: "Post doesn't exist",
          field: "post",
        },
      };
    }

    const creator = await UserModel.findOne({ _id: creatorId });
    if (!creator) {
      return {
        error: {
          message: "User doesn't exist",
          field: "username",
        },
      };
    }

    const comment = await CommentModel.create({
      content,
      creator,
      createdAt: Date.now(),
      postId,
    });
    await comment.save();

    await PostModel.updateOne(
      { _id: options.postId },
      { $push: { comments: [comment.id] as any } }
    );

    return { comment };
  }
}
