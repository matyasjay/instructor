import { Navigate, useLoaderData, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { FormEventHandler, useEffect, useState } from "react";
import { client } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { normalizeObjectKeys, parseErrorObject } from "@/lib/utils";
import { z } from "zod/v4";
import { PAGES } from "@/config/pages";
import { ENDPOINTS } from "@/components/endpoints";
import { MUTATION_KEYS } from "@/config/query";

const UserPayload = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_confirm: z.string(),
});

type User = z.infer<typeof UserPayload> & { id: string };

const defaultUser: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  password_confirm: "",
};

function submitUserData(user: User) {
  return async function (e: React.FormEvent<HTMLFormElement>): Promise<User> {
    e.preventDefault();
    if (user.password !== user.password_confirm) {
      throw new Error("Passwords must match!");
    }
    UserPayload.parse(user);
    const result = await client.post<User>(ENDPOINTS.SIGNUP, user);
    return normalizeObjectKeys<User>(result.data);
  };
}

function Signup() {
  const [user, setUser] = useState<User>(defaultUser);
  const [error, setError] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const { authenticated } = useLoaderData();

  const mutaion = useMutation({
    mutationFn: submitUserData(user),
    mutationKey: [MUTATION_KEYS.SIGNUP],
    onSuccess: () => {
      navigate(PAGES.PRIVATE.DASHBOARD);
    },
    onError: (e) => {
      setError(parseErrorObject(e));
    },
  });

  const handleChange =
    (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = mutaion.mutate as unknown as FormEventHandler;

  const handleLogin = () => {
    navigate(PAGES.PUBLIC.LOGIN);
  };

  useEffect(() => {
    if (authenticated === false) {
      setIsReady(true);
    }
  }, [authenticated]);

  if (authenticated) {
    return <Navigate to={PAGES.PRIVATE.DASHBOARD} />;
  }

  return !isReady ? null : (
    <form
      className="flex flex-col max-w-100 gap-3.5 mx-auto justify-center align-middle min-h-10/12"
      onSubmit={handleSubmit}
    >
      <img src="public/backdrop.gif" />
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-9">
        Signup
      </h1>
      <Separator />
      <Label>Full name</Label>
      <Input
        type="text"
        defaultValue={user.name}
        onChange={handleChange("name")}
      />
      <Label>E-mail address</Label>
      <Input
        type="email"
        defaultValue={user.email}
        onChange={handleChange("email")}
      />
      <Label>Password</Label>
      <Input
        type="password"
        defaultValue={user.password}
        onChange={handleChange("password")}
      />
      <Label>Confirm password</Label>
      <Input
        type="password"
        defaultValue={user.password_confirm}
        onChange={handleChange("password_confirm")}
      />
      <Separator />
      <Button className="cursor-pointer" type="submit">
        Submit
      </Button>
      <Button type="button" variant="outline" onClick={handleLogin}>
        Sign In
      </Button>
      {error && <h4>{error}</h4>}
    </form>
  );
}

export default Signup;
