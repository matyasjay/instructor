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
  name: z.string().min(5).max(30),
  password: z.string().min(8),
  password_confirm: z.string().min(8),
});

type SignupInput = z.infer<typeof formSchema>;

const defaultUser: SignupInput = {
  email: "",
  name: "",
  password: "",
  password_confirm: "",
};

const FormLayoutPopup = createFormPopupLayout<SignupInput>();

async function signupUser(input: SignupInput) {
  const schema = formSchema.safeParse(input);

  if (schema.error) {
    throw { ...schema.error, zod: schema.error instanceof ZodError };
  }

  const response = await authPost<SignupInput>(ENDPOINTS.SIGNUP, schema.data);

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

export default function SignupForm() {
  const [user, setUser] = useState(defaultUser);
  const [error, setError] = useState<string>("");
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupUser,
    mutationKey: [MUTATION_KEYS.SIGNUP],
    onSuccess: () => {
      setAuthenticated(true);
      setUser(defaultUser);
      navigate(PAGES.PRIVATE.ACCOUNT);
    },
    onError: (e) => {
      setError(parseErrorObject(e));
    },
  });

  const form = useForm<SignupInput>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultUser,
  });

  const handleChange =
    (field: keyof SignupInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
      type: "text",
      name: "name",
      value: user.name,
      handleChange: handleChange("name"),
      label: "Full Name",
    },
    {
      type: "password",
      name: "password",
      value: user.password,
      handleChange: handleChange("password"),
      label: "Password",
    },
    {
      type: "password",
      name: "password_confirm",
      value: user.password_confirm,
      handleChange: handleChange("password_confirm"),
      label: "Confirm Password",
    },
  ];

  return (
    <FormLayoutPopup
      form={form}
      fields={formFields}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}
