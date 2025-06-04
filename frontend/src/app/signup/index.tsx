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
import { ENDPOINTS } from "@/config/endpoints";
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
    <form className="min-h-10/12 px-9 max-w-[1400px]" onSubmit={handleSubmit}>
      <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4 pt-4">
        Signup
      </h1>
      <div className="flex flex-col max-w-[400px] gap-3.5 mx-auto align-middle min-h-10/12">
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
      </div>
    </form>
  );
}

export default Signup;
