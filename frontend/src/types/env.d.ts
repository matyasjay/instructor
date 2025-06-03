declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: "local" | "test" | "development" | "staging" | "production";
      FRONTEND_PORT: string;
      HTTP_PORT: string;
      SERVER_URL: string;
      DATABASE_USER: string;
      DATABASE_DB: string;
      DATABASE_HOST: string;
      DATABASE_PASSWORD: string;
      DATABASE_SCHEMA: string;
      DATABASE_PORT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
