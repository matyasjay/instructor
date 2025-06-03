import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { FormEventHandler, useState } from "react";
import { client } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";
import { normalizeObjectKeys } from "@/lib/utils";
import { AxiosError } from "axios";
import { z } from "zod/v4";

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
    const result = await client.post("/users/create", user);
    return normalizeObjectKeys(result);
  };
}

function Signup() {
  const [user, setUser] = useState<User>(defaultUser);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const mutaion = useMutation({
    mutationFn: submitUserData(user),
    mutationKey: ["submit-user-create"],
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (e) => {
      if (e instanceof z.ZodError) {
        setError(e.issues[0].message);
      } else if (e instanceof AxiosError) {
        setError(e.response?.data.error);
      } else {
        setError(JSON.stringify(e));
      }
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

  return (
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
      {error && <h4>{error}</h4>}
    </form>
  );
}

export default Signup;
