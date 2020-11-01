import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { Auth } from "../Middleware/Auth";
import { Context } from "../types";
import { UserModel } from "../Models/User";

@Resolver()
export class ImageUploadResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(Auth)
  async addProfileImage(
    @Arg("image", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
    const user = await UserModel.findOne({ _id: userId });
    const imageFileName =
      user?.username +
      new Date().toISOString().replace(/:/g, "-") +
      filename.replace(/ /g, "");
    // console.log({ imageFileName });
    return new Promise(async (res, rej) =>
      createReadStream()
        .pipe(
          createWriteStream(
            __dirname + `../../../public/user_images/${imageFileName}`
          )
        )
        .on("finish", async () => {
          console.log({ imageFileName });
          await UserModel.updateOne(
            { _id: userId },

            { profileImage: "/" + imageFileName }
          );
          res(true);
        })
        .on("error", () => {
          rej(false);
        })
    );
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Auth)
  async addHeaderImage(
    @Arg("image", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,
    @Ctx() { request }: Context
  ) {
    const { userId } = request.session;
    const user = await UserModel.findOne({ _id: userId });
    const imageFileName =
      user?.username +
      new Date().toISOString().replace(/:/g, "-") +
      filename.replace(/ /g, "");
    return new Promise(async (res, rej) =>
      createReadStream()
        .pipe(
          createWriteStream(
            __dirname + `../../../public/user_images/${imageFileName}`
          )
        )
        .on("finish", async () => {
          console.log({ imageFileName });
          await UserModel.updateOne(
            { _id: userId },

            { headerImage: "/" + imageFileName }
          );
          res(true);
        })
        .on("error", () => {
          rej(false);
        })
    );
  }
}
