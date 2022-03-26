import { isUndefinedOrNullOrEmpty } from "@gkst/common";
import { registerAs } from "@nestjs/config";

export default registerAs("mongodb", () => {
  const isPresent = !isUndefinedOrNullOrEmpty(process.env.MONGO_URL);
  const name = process.env.MONGO_NAME || "default";
  const url = process.env.MONGO_URL;
  return {
    isPresent,
    name,
    url,
  };
});
