import { User, UserModel } from "../Models/User";
import {
  Arg,
  Ctx,
  // Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import mongoose from "mongoose";
import { Context } from "src/types";
// import { Context } from "src/types";

@ObjectType()
class UserError {
  @Field()
  message: string;

  @Field()
  field: "password" | "username";
}

@InputType()
class UserInput {
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
    @Arg("input") input: UserInput,
    @Ctx() { request }: Context
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ username: input.username });
    if (user) {
      return {
        error: {
          message: "Username already exists",
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
      password: hashedPassword,
      _id: new mongoose.Types.ObjectId(),
      createdAt: Date.now(),
    });
    await newUser.save();
    request.session.userId = newUser.id;

    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: UserInput,
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
          message: "Authentication failed",
          field: "password",
        },
      };
    }
    request.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async addUserDetails(
    @Arg("options") options: DetailsInput,
    @Arg("userId") userId: string
    // @Ctx() { request }: Context
  ): Promise<UserResponse> {
    const { bio, location, username } = options;
    const user = await UserModel.findOne({ username });

    if (user) {
      return {
        error: {
          message: "Username already exists",
          field: "username",
        },
      };
    }

    await UserModel.updateOne({ _id: userId }, { bio, location, username });
    const updatedUser = await UserModel.findOne({ _id: userId });

    return { user: updatedUser! };
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
}
