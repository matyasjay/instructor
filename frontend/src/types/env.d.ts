declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: "local" | "test" | "development" | "staging" | "production";
      PORT: number
    }
  }
}

export {};
