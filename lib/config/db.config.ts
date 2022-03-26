import { isUndefinedOrNullOrEmpty } from "@gkst/common";
import { registerAs } from "@nestjs/config";

export default registerAs("db", () => {
  const isPresent = !isUndefinedOrNullOrEmpty(process.env.DB_URL);
  const name = process.env.DB_NAME || "default";
  const url = process.env.DB_URL;
  const type = (isPresent ? url.split(":").shift() : null) as
    | "mysql"
    | "mariadb"
    | "postgres"
    | "mssql"
    | "oracle"
    | "sqlite";
  return {
    isPresent,
    name,
    url,
    type,
    entityPath: process.env.DB_ENTITY_PATH || "/**/*.entity.ts",
  };
});
