import { Arg, Mutation, Resolver } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import { Stream } from "stream";

type Upload = {
  filename: string;
  createReadStream: () => Stream;
};

@Resolver()
export class ImageUploadResolver {
  @Mutation(() => Boolean)
  async addProfileImage(@Arg("image", () => GraphQLUpload) image: FileUpload) {
    console.log({ image });
    return true;
    // new Promise(async (res, rej) =>
    //   createReadStream()
    //     .pipe(
    //       createWriteStream(
    //         __dirname + `../public/profile_images/${filename + new Date()}`
    //       )
    //     )
    //     .on("finish", () => {
    //       console.log("------ 1");
    //       res(true);
    //     })
    //     .on("error", () => {
    //       console.log("------ 2");
    //       rej(false);
    //     })
    // );
  }
}
