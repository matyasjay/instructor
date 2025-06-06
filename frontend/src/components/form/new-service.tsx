import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2Icon } from "lucide-react";
import { z, ZodError } from "zod";
import createFormPopupLayout from "@/components/layout/popup-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys, parseErrorObject } from "@/lib/utils";

const formSchema = z.object({
  service: z.string(),
  name: z.string().min(5).max(30),
  private: z.boolean(),
  description: z.string().min(10).max(150).optional(),
  user: z.string().optional(),
});

type ServiceInput = z.infer<typeof formSchema>;

const defaultService: ServiceInput = {
  service: "",
  name: "",
  private: false,
};

const FormLayoutPopup = createFormPopupLayout<ServiceInput>();

async function createService(input: ServiceInput) {
  const schema = formSchema.safeParse(input);

  if (schema.error) {
    throw { ...schema.error, zod: schema.error instanceof ZodError };
  }

  const response = await authPost<ServiceInput>(
    ENDPOINTS.CREATE_SERVICE,
    schema.data,
  );

  if (response.error) {
    throw response;
  }

  return normalizeObjectKeys(response);
}

export default function NewServiceForm() {
  const [service, setService] = useState(defaultService);
  const [error, setError] = useState<string>("");
  const [created, setCreated] = useState(false);

  const form = useForm<ServiceInput>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultService,
  });

  const mutation = useMutation({
    mutationFn: createService,
    mutationKey: [MUTATION_KEYS.CREATE_SERVICE],
    onError: (e) => {
      setError(parseErrorObject(e));
    },
    onSuccess: (data) => {
      if (data.error) {
        setError(parseErrorObject(data.error));
      } else {
        console.log(data);
        setCreated(data.userid);
      }
    },
  });

  const handleChange =
    (field: keyof ServiceInput) =>
    (
      e:
        | CheckedState
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setError("");
      setService((prev) => ({
        ...prev,
        // Note !e since default value is public ("not private")
        [field]: typeof e === "object" ? e.target.value : !e,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");
    const payload: ServiceInput = {
      ...service,
      user: user.id,
    };
    mutation.mutate(payload);
    setService(defaultService);
  };

  const formFields: FormField[] = [
    {
      type: "text",
      name: "name",
      value: service.name,
      handleChange: handleChange("name"),
      label: "Service name",
    },
    {
      type: "text",
      name: "description",
      value: service.description ?? "",
      handleChange: handleChange("description"),
      label: "Description",
    },
    {
      type: "checkbox",
      name: "private",
      value: service.private ?? false,
      handleChange: handleChange("private"),
      label: "Publicly available service",
    },
  ];

  return (
    <Fragment>
      <FormLayoutPopup
        form={form}
        handleSubmit={handleSubmit}
        fields={formFields}
        error={error}
      />
      {created && (
        <Alert className="max-w-[500px] mt-[20px] mx-auto">
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription className="inline">
            The service has been created successfully.
          </AlertDescription>
        </Alert>
      )}
    </Fragment>
  );
}
