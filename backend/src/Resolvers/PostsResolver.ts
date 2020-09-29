import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
} from "type-graphql";
import { Post, PostModel } from "../Models/Post";
import { UserModel } from "../Models/User";

@ObjectType()
class PostError {
  @Field()
  message: string;
}

@ObjectType()
class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => PostError, { nullable: true })
  error?: PostError;
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

  @Mutation(() => PostResponse, { nullable: true })
  async createPost(
    @Arg("content") content: string,
    @Arg("creatorId") creatorId: string
  ): Promise<PostResponse> {
    const creator = await UserModel.findOne({ _id: creatorId });
    if (!creator) {
      return {
        error: {
          message: "User doesn't exist",
        },
      };
    }

    const post = await PostModel.create({
      content,
      creator,
    });
    await post.save();
    return { post };
  }
}
