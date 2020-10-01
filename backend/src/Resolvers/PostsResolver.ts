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

@Resolver(() => Post)
export class PostResolver {
  @Query(() => Post, { nullable: false })
  async getPost(@Arg("id") id: string) {
    return await PostModel.findById({ _id: id });
  }

  @Query(() => [Post])
  async getAllPosts() {
    return await PostModel.find();
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

    // console.log(post.comments);

    post.comments = [comment.id, ...post.comments].flat(Infinity);
    // post.comments.unshift(comment.id);
    // post.comments.flat(Infinity);
    await post.save();

    // const comments = { comments: [comment.id, ...post.comments] };
    // post.updateOne(comments);

    // await post.replaceOne({
    //   _id: post._id,
    //   content: post.content,
    //   creator: post.creator,
    //   createdAt: post.createdAt,
    //   likes: post.likes,
    //   comments: ["post.comments.unshift(comment.id)"],
    // });

    console.log(post);

    // await PostModel.updateOne(
    //   { _id: options.postId },
    //   { comments: [comment.id, ...post.comments].flat(Infinity) }
    // );
    return { comment };
  }
}
