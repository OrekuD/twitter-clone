import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { Post, PostModel } from "../Models/Post";
import { Context } from "../types";

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
class SinglePostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => PostError, { nullable: true })
  error?: PostError;
}

@Resolver()
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
    @Ctx() { request }: Context
  ): Promise<PostResponse> {
    const post = await PostModel.create({
      content,
      creator: request.session.userId,
      createdAt: Date.now(),
      comments: [],
      likes: [],
    });
    await post.save();
    return { post };
  }
}
