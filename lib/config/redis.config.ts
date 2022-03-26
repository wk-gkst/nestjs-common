import { isUndefinedOrNullOrEmpty } from "@gkst/common";
import { registerAs } from "@nestjs/config";

export default registerAs("redis", () => {
  const isPresent = !isUndefinedOrNullOrEmpty(process.env.REDIS_URL);
  const name = process.env.REDIS_NAME || "default";
  const url = process.env.REDIS_URL;
  return {
    isPresent,
    name,
    url,
  };
});
