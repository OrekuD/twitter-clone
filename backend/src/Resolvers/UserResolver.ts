import { User, UserModel } from "../Models/User";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";
import { mongoose } from "@typegoose/typegoose";
import { Tweet, TweetModel } from "../Models/Tweet";
import { userLoader } from "../Utils/dataLoaders";
import { validateEmail } from "../Utils/validateEmail";

@ObjectType()
class UserError {
  @Field()
  message: string;

  @Field()
  field: string;
}

@InputType()
class RegisterInput {
  @Field()
  username: string;

  @Field()
  fullname: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
class DetailsInput {
  @Field()
  bio: string;

  @Field()
  location: string;

  @Field()
  fullname: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => UserError, { nullable: true })
  error?: UserError;
}

@ObjectType()
class PinTweetResponse {
  @Field()
  state: boolean;

  @Field()
  message: string;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async createAccount(
    @Arg("input") input: RegisterInput,
    @Ctx() { request }: Context
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ username: input.username });
    if (user) {
      return {
        error: {
          message: "Username already taken",
          field: "username",
        },
      };
    }

    if (!validateEmail(input.email)) {
      return {
        error: {
          message: "Email is invalid",
          field: "email",
        },
      };
    }

    if (input.password.length <= 4) {
      return {
        error: {
          message: "Password too short",
          field: "password",
        },
      };
    }

    const hashedPassword = await argon2.hash(input.password);
    const newUser = await UserModel.create({
      username: input.username,
      email: input.email!,
      password: hashedPassword,
      fullname: input.fullname,
      createdAt: Date.now(),
      bio: "",
      location: "",
      followers: [],
      following: [],
      profileImage: "/dummy.png",
      headerImage: "/header.jpg",
      pinnedTweetId: null,
    });
    await newUser.save();

    request.session.userId = newUser.id;
    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: LoginInput,
    @Ctx() { request }: Context
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ username: input.username });
    if (!user) {
      return {
        error: {
          message: "Username does not exist",
          field: "username",
        },
      };
    }
    const valid = await argon2.verify(user.password, input.password);

    if (!valid) {
      return {
        error: {
          message: "Password incorrect",
          field: "password",
        },
      };
    }
    request.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(Auth)
  async addUserDetails(
    @Arg("input") input: DetailsInput,
    @Ctx() { request }: Context
  ): Promise<UserResponse> {
    const { bio, location, fullname } = input;
    const { userId } = request.session;

    await UserModel.updateOne({ _id: userId }, { bio, location, fullname });
    const updatedUser = await UserModel.findOne({
      _id: userId,
    });

    return { user: updatedUser! };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth)
  async followUser(@Arg("userId") userId: string, @Ctx() { request }: Context) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return false;
    }

    // First, add the current user to the other user's followers list
    await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          followers: new mongoose.Types.ObjectId(request.session.userId),
        },
      }
    );

    // Then, add the new user to the current user's following list
    await UserModel.updateOne(
      { _id: request.session.userId },
      {
        $push: { following: new mongoose.Types.ObjectId(userId) },
      }
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth)
  async unFollowUser(
    @Arg("userId") userId: string,
    @Ctx() { request }: Context
  ) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return false;
    }

    // First, remove the current user from the other user's followers list
    await UserModel.updateOne(
      { _id: userId },
      {
        $pull: {
          followers: new mongoose.Types.ObjectId(request.session.userId),
        },
      }
    );

    // Then, remove the other user from the current user's following list
    await UserModel.updateOne(
      { _id: request.session.userId },
      {
        $pull: { following: new mongoose.Types.ObjectId(userId) },
      }
    );

    return true;
  }

  @Query(() => UserResponse)
  async getUserDetails(@Arg("userId") userId: string) {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return {
        error: {
          message: "Username does not exist",
          field: "username",
        },
      };
    }
    return { user };
  }

  @Query(() => UserResponse)
  async getUserByUsername(@Arg("username") username: string) {
    if (!username) {
      return {
        error: {
          message: "Wrong input",
          field: "username",
        },
      };
    }
    const user = await UserModel.findOne({ username });

    if (!user) {
      return {
        error: {
          message: "Username does not exist",
          field: "username",
        },
      };
    }
    return { user };
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() { request }: Context) {
    const user = await UserModel.findOne({ _id: request.session.userId });
    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth)
  logout(@Ctx() { request }: Context) {
    request.session.destroy((err) => {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    });
  }

  @Mutation(() => PinTweetResponse)
  @UseMiddleware(Auth)
  async pinTweet(
    @Arg("tweetId") tweetId: string,
    @Ctx() { request }: Context
  ): Promise<PinTweetResponse> {
    const tweet = await TweetModel.findOne({ _id: tweetId });
    const { userId } = request.session;
    if (!tweet) {
      return { state: false, message: "Tweet is unavailable" };
    } else if (tweet.creator !== userId) {
      return { state: false, message: "You aren't the creator of this tweet" };
    }
    await UserModel.updateOne({ _id: userId }, { pinnedTweetId: tweetId });
    return {
      state: true,
      message: "Tweet successfully pinned",
    };
  }

  @Mutation(() => PinTweetResponse)
  @UseMiddleware(Auth)
  async unPinTweet(@Ctx() { request }: Context): Promise<PinTweetResponse> {
    await UserModel.updateOne(
      { _id: request.session.userId },
      { pinnedTweetId: null }
    );
    return {
      state: true,
      message: "Tweet successfully unpinned",
    };
  }

  @Query(() => [User])
  async getAllUsers() {
    return UserModel.find();
  }

  @FieldResolver(() => [User])
  followers(@Root() user: User) {
    // UserModel.find({ _id: { $in: user._doc.followers } })
    return userLoader().loadMany(user._doc.followers);
  }

  @FieldResolver(() => [User])
  following(@Root() user: User) {
    // UserModel.find({ _id: { $in: user._doc.following } });
    return userLoader().loadMany(user._doc.following);
  }

  @FieldResolver(() => Tweet, { nullable: true })
  pinnedTweet(@Root() user: User) {
    if (!user._doc.pinnedTweetId) {
      return null;
    }
    return TweetModel.findOne({ _id: user._doc.pinnedTweetId });
  }
}
