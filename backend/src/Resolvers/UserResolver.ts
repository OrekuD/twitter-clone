import { User, UserModel } from "../Models/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { Context } from "../types";
import { Auth } from "../Middleware/Auth";

@ObjectType()
class UserError {
  @Field()
  message: string;

  @Field()
  field: "password" | "username";
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
  username: string;

  @Field()
  bio: string;

  @Field()
  location: string;

  @Field()
  email: string;

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

@Resolver()
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
      image: "/dummy.jpg",
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
    const { bio, location, username, email, fullname } = input;
    const { userId } = request.session;
    const user = await UserModel.findOne({ username });

    if (user && user.id !== request.session.userId) {
      return {
        error: {
          message: "Username already taken",
          field: "username",
        },
      };
    }

    await UserModel.updateOne(
      { _id: userId },
      { bio, location, username, email, fullname }
    );
    const updatedUser = await UserModel.findOne({
      _id: userId,
    });

    return { user: updatedUser! };
  }

  @Mutation(() => Boolean)
  async followUser(@Arg("userId") userId: string, @Ctx() { request }: Context) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return false;
    }

    // First, add the current user to the requested user's followers list
    await UserModel.updateOne(
      { _id: userId },
      {
        $push: { followers: [request.session.userId] as any },
      }
    );

    // Then, add the new user to the current user's following list
    await UserModel.updateOne(
      { _id: request.session.userId },
      {
        $push: { following: [userId] as any },
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
  async getUser(@Arg("username") username: string) {
    const user = await UserModel.findOne({ username: username });

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
  logout(@Ctx() { request }: Context) {
    request.session.destroy((err) => {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    });
  }

  @Query(() => [User])
  async getAllUsers() {
    return await UserModel.find();
  }
}
