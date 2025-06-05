import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { z, ZodError } from "zod";
import { COOKIES, STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys, parseErrorObject } from "@/lib/utils";
import createFormPopupLayout, { FormField } from "./layout/popup";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginInput = z.infer<typeof formSchema>;

const defaultUser: LoginInput = {
  email: "",
  password: "",
};

async function loginUser(input: LoginInput) {
  const schema = formSchema.safeParse(input);

  if (schema.error) {
    throw { ...schema.error, zod: schema.error instanceof ZodError };
  }

  const response = await authPost<LoginInput>(ENDPOINTS.LOGIN, schema.data);

  if (response.error) {
    throw response;
  }

  const result = normalizeObjectKeys(response);

  window.localStorage.setItem(
    STORAGE.USER,
    JSON.stringify(Object(result).user)
  );

  Cookies.set(COOKIES.JWT, result.token);

  return result;
}

const FormLayoutPopup = createFormPopupLayout<LoginInput>();

export default function LoginForm() {
  const [user, setUser] = useState(defaultUser);
  const [error, setError] = useState<string>("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultUser,
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: [MUTATION_KEYS.LOGIN],
    onError: (e) => {
      setError(parseErrorObject(e));
    },
    onSuccess: (data) => {
      if (data.error) {
        setError(parseErrorObject(data.error));
      }
    },
  });

  const handleChange =
    (field: keyof LoginInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setUser((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate(user);
    setUser(defaultUser);
  };

  const formFields: FormField[] = [
    {
      type: "email",
      name: "email",
      value: user.email,
      handleChange: handleChange("email"),
      label: "E-mail",
    },
    {
      type: "password",
      name: "password",
      value: user.password,
      handleChange: handleChange("password"),
      label: "Password",
    },
  ];

  return (
    <FormLayoutPopup
      form={form}
      handleSubmit={handleSubmit}
      fields={formFields}
      error={error}
    />
  );
}
