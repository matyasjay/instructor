import { client } from "@/lib/http";

const promise = client.get("/");

export default async function Component() {
  const result = await promise;
  return <div>{JSON.stringify(result)}</div>;
}
