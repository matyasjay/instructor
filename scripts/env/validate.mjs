import chalk from "chalk";

const REQUIRED_CLIENT_ENVIRONMENT = [];

// prettier-ignore
const REQUIRED_SERVER_ENVIRONMENT = [
  "ENVIRONMENT",
  "FRONTEND_PORT", 
  "HTTP_PORT", 
  "PSQL_URL"
];

// if (process.env.ENVIRONMENT !== "test") {
//   REQUIRED_CLIENT_ENVIRONMENT.push("NEXT_PUBLIC_SENTRY_DSN");
//   REQUIRED_SERVER_ENVIRONMENT.push("SENTRY_TOKEN");
// }

const getInvalids = (envs) =>
  envs.reduce(
    (invalids, env) => (process.env[env] ? invalids : [...invalids, env]),
    [],
  );

const getErrorType = (env) =>
  String(typeof process.env[env]) === "undefined" ? "undefined" : "empty";

const isServerEnvValid = getInvalids(REQUIRED_SERVER_ENVIRONMENT).length === 0;
const isClientEnvValid = getInvalids(REQUIRED_CLIENT_ENVIRONMENT).length === 0;

if (isServerEnvValid && isClientEnvValid) {
  console.log(chalk.bold(`\nEnvironment validation succeded!\n`));
  process.exit(0);
}

const invalids = [
  ...getInvalids(REQUIRED_SERVER_ENVIRONMENT),
  ...getInvalids(REQUIRED_CLIENT_ENVIRONMENT),
];

console.log(
  chalk.redBright(
    chalk.bold(
      `\nFound ${invalids.length} missing ${invalids.length > 1 ? "variables" : "variable"}.\n`,
    ),
  ),
);

invalids.forEach((env) => {
  const type = REQUIRED_SERVER_ENVIRONMENT.includes(env) ? "server" : "client";
  console.error(
    chalk.grey(
      `Missing ${type} variable: ${chalk.bold(chalk.blue(env))} is ${getErrorType(env)}!)`,
    ),
  );
});

console.log(chalk.red.bold(`\nEnvironment validation failed!\n`));
process.exit(13);
