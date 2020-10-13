import { Auth } from "../Middleware/Auth";
import {
  Resolver,
  Arg,
  Query,
  Mutation,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { Post, PostModel } from "../Models/Post";
import { Context } from "../types";
import { extractHashtags } from "../Util/extractHashtags";
import { TrendsModel } from "../Models/Trends";

@ObjectType()
class PostError {
  @Field()
  message: string;

  @Field()
  field: string;
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

  @Query(() => [Post])
  async getPostsByUser(@Arg("userId") userId: string) {
    return await PostModel.find({ creator: userId }).sort({
      createdAt: "desc",
    });
  }

  @Mutation(() => Post)
  @UseMiddleware(Auth)
  async createPost(
    @Arg("content") content: string,
    @Ctx() { request }: Context
  ): Promise<Post> {
    const post = await PostModel.create({
      content,
      creator: request.session.userId,
      createdAt: Date.now(),
      comments: [],
      likes: [],
    });
    await post.save();
    const hashtags = extractHashtags(content);
    if (hashtags.length > 0) {
      hashtags.forEach(async (hashtag) => {
        const trend = await TrendsModel.findOne({ hashtag });
        if (!trend) {
          await TrendsModel.create({
            hashtag,
            numberOfPosts: 1,
            posts: [post.id],
          });
        } else {
          await TrendsModel.updateOne(
            { _id: trend.id! },
            {
              $push: { posts: [post.id] as any },
              numberOfPosts: trend.numberOfPosts + 1,
            }
          );
        }
      });
    }
    return post;
  }
}
