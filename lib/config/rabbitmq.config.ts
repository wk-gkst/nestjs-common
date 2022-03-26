import { isUndefinedOrNullOrEmpty } from "@gkst/common";
import { registerAs } from "@nestjs/config";

export default registerAs("rabbitmq", () => {
  const isPresent = !isUndefinedOrNullOrEmpty(process.env.RABBITMQ_URL);
  const name = process.env.RABBITMQ_NAME || "default";
  const url = process.env.RABBITMQ_URL;
  return {
    isPresent,
    name,
    url,
  };
});
