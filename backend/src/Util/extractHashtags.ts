export const extractHashtags = (content: string) => {
  let hashtags: string[] = [];
  content.split("\n").forEach((str) => {
    if (str) {
      str.split(" ").forEach((substr) => {
        if (substr[0] === "#") {
          hashtags.push(substr);
        }
      });
    }
  });

  return hashtags;
};
