import { Navigate, useLoaderData, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { normalizeObjectKeys, parseErrorObject } from "@/lib/utils";
import { z } from "zod/v4";
import { COOKIES, STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { PAGES } from "@/config/pages";
import { MUTATION_KEYS } from "@/config/query";

const UserPayload = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string(),
});

type User = z.infer<typeof UserPayload> & {
  id: string;
  token: string;
};

const defaultUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  token: "",
};

async function submitUserData(user: User) {
  UserPayload.parse(user);
  const response = await client.post<User>(ENDPOINTS.USER, user);
  const result = normalizeObjectKeys<User>(response.data);
  window.localStorage.setItem(
    STORAGE.USER,
    JSON.stringify(Object(result).user)
  );
  Cookies.set(COOKIES.JWT, result.token);
  return result;
}

function Login() {
  const [user, setUser] = useState<User>(defaultUser);
  const [error, setError] = useState<string>("");
  const [ready, setReady] = useState(false);
  const { authenticated } = useLoaderData();

  const navigate = useNavigate();

  const mutaion = useMutation({
    mutationFn: submitUserData,
    mutationKey: [MUTATION_KEYS.LOGIN],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReady(false);
    mutaion.mutate(user);
  };

  const handleSignUp = () => {
    navigate(PAGES.PUBLIC.SIGNUP);
  };

  useEffect(() => {
    if (authenticated === false) {
      setReady(true);
    }
  }, [authenticated]);

  if (authenticated) {
    return <Navigate to={PAGES.PRIVATE.DASHBOARD} />;
  }

  return !ready ? null : (
    <form className="min-h-10/12 px-9 max-w-[1400px]" onSubmit={handleSubmit}>
      <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4 pt-4">
        Login To Your Account
      </h1>
      <div className="flex flex-col max-w-[400px] gap-3.5 mx-auto align-middle min-h-10/12">
        <Label>E-mail address</Label>
        <Input
          type="email"
          value={user.email}
          onChange={handleChange("email")}
        />
        <Label>Password</Label>
        <Input
          type="password"
          value={user.password}
          onChange={handleChange("password")}
        />
        <Separator />
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline" onClick={handleSignUp}>
          Sign Up
        </Button>
        {error && <h4>{error}</h4>}
      </div>
    </form>
  );
}

export default Login;
