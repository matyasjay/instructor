import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { z, ZodError } from "zod";
import { useAuth } from "@/components/context/auth";
import createFormPopupLayout from "@/components/layout/popup-form";
import { COOKIES, STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { PAGES } from "@/config/pages";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys, parseErrorObject } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginInput = z.infer<typeof formSchema>;

type LoginResponse = {
  user: User;
  token: string;
};

const defaultUser: LoginInput = {
  email: "",
  password: "",
};

async function loginUser(input: LoginInput) {
  const schema = formSchema.safeParse(input);

  if (schema.error) {
    throw { ...schema.error, zod: schema.error instanceof ZodError };
  }

  const response = await authPost<LoginInput, LoginResponse>(
    ENDPOINTS.LOGIN,
    schema.data,
  );

  if ("error" in response) {
    throw response;
  }

  const result = normalizeObjectKeys<LoginResponse>(response);

  window.localStorage.setItem(
    STORAGE.USER,
    JSON.stringify(Object(result).user),
  );

  Cookies.set(COOKIES.JWT, result.token);

  return result;
}

const FormLayoutPopup = createFormPopupLayout<LoginInput>();

export default function LoginForm() {
  const [user, setUser] = useState(defaultUser);
  const [error, setError] = useState<string>("");
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginInput>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultUser,
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: [MUTATION_KEYS.LOGIN],
    onError: (error) => {
      setError(parseErrorObject(error));
    },
    onSuccess: (data) => {
      if ("error" in data) {
        setError(parseErrorObject(data.error));
      }
      setAuthenticated(true);
      setUser(defaultUser);
      navigate(PAGES.PRIVATE.ACCOUNT);
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
