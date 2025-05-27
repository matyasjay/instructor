import { use } from "react";
import { client } from "@/lib/http";

const promise = client.get("/");

export default function Component() {
  const result = use(promise);
  return <div>{JSON.stringify(result)}</div>;
}
