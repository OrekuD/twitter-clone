import { User, UserModel } from "../Models/User";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import mongoose from "mongoose";

@ObjectType()
class UserError {
  @Field()
  message: string;
}

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
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
  async createAccount(@Arg("input") input: UserInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ username: input.username });
    if (user) {
      return {
        error: {
          message: "Username already exists",
        },
      };
    }
    if (input.password.length <= 4) {
      return {
        error: {
          message: "Password too short",
        },
      };
    }
    const hashedPassword = await argon2.hash(input.password);
    const newUser = await UserModel.create({
      username: input.username,
      password: hashedPassword,
      _id: new mongoose.Types.ObjectId(),
    });
    await newUser.save();

    return { user: newUser };
  }

  @Mutation(() => UserResponse)
  async login(@Arg("input") input: UserInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ username: input.username });
    if (!user) {
      return {
        error: {
          message: "Username does not exist",
        },
      };
    }
    const valid = await argon2.verify(user.password, input.password);

    if (!valid) {
      return {
        error: {
          message: "Authentication failed",
        },
      };
    }
    return { user };
  }
}
