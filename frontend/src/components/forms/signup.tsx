import { z, ZodError } from "zod";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys, parseErrorObject } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PAGES } from "@/config/pages";
import createFormPopupLayout, { FormField } from "./layout/popup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  return normalizeObjectKeys(response);
}

export default function SignupForm() {
  const [user, setUser] = useState(defaultUser);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupUser,
    mutationKey: [MUTATION_KEYS.SIGNUP],
    onSuccess: () => {
      navigate(PAGES.PRIVATE.DASHBOARD);
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
