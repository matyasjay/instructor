declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: "local" | "test" | "development" | "staging" | "production";
      FRONTEND_PORT: number;
      HTTP_PORT: number;
      PSQL_URL: string
    }
  }
}

export {};
