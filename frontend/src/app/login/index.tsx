import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { client } from "@/lib/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { normalizeObjectKeys } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const defaultUser = {
  id: "",
  name: "",
  email: "",
  password: "",
};

function queryUser(setUser: React.Dispatch<React.SetStateAction<User>>) {
  return async () => {
    const result = await client.get("/users");
    const user = normalizeObjectKeys(result.data?.[0] ?? {});
    setUser(user);
    window.history.replaceState(null, "", `/login`);
    return user;
  };
}

async function submitUserData(user: User) {
  console.log(user);
}

function Login() {
  const [user, setUser] = useState<User>(defaultUser);

  useQuery({
    queryKey: ["http-get-user"],
    queryFn: queryUser(setUser),
  });

  const { mutate: submitUser } = useMutation({
    mutationFn: submitUserData,
    mutationKey: ["submit-user"],
  });

  const handleSubmit = () => {
    submitUser(user);
  };

  const handleChange =
    (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <form className="flex flex-col max-w-100 gap-3.5 mx-auto justify-center align-middle min-h-10/12">
      <img src="public/backdrop.gif" />
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-9">
        Instructor
      </h1>
      <Separator />
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
      <div className="flex flex-row gap-3 align-middle justify-start">
        <Checkbox />
        <Label className="text-gray-200"> Remember me</Label>
      </div>
      <Separator />
      <Button className="cursor-pointer" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default Login;
