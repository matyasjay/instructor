import { z, ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys, parseErrorObject } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  user: z.string(),
  name: z.string().min(5).max(30),
  private: z.boolean(),
  description: z.string().min(10).max(150).optional(),
});

type ServiceInput = z.infer<typeof formSchema>;

const defaultService: ServiceInput = {
  user: "",
  name: "",
  private: false,
};

async function createService(input: ServiceInput) {
  const schema = formSchema.safeParse(input);

  if (schema.error) {
    throw { ...schema.error, zod: schema.error instanceof ZodError };
  }

  const response = await authPost<ServiceInput>(
    ENDPOINTS.CREATE_SERVICE,
    schema.data
  );

  if (response.error) {
    throw response;
  }

  return normalizeObjectKeys(response);
}

export default function ServiceNewForm() {
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
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="bg-sidebar w-full px-7 pt-4 mx-auto"
      >
        <div className="flex flex-col gap-3.5 mx-auto align-middle min-h-10/12">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem
                key={field.name}
                className="flex flex-row items-center gap-2"
              >
                <FormLabel className="text-sm font-normal whitespace-nowrap justify-end w-[200px]">
                  Service Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    value={service.name}
                    onChange={handleChange("name")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem
                key={field.name}
                className="flex flex-row items-center gap-2"
              >
                <FormLabel className="text-sm font-normal whitespace-nowrap w-[200px] justify-end">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    value={service.description}
                    onChange={handleChange("description")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="private"
            render={({ field }) => (
              <FormItem
                key={field.name}
                className="flex flex-row items-center gap-2"
              >
                <FormControl>
                  <Checkbox
                    checked={!service.private}
                    onCheckedChange={handleChange("private")}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Check to create a discoverable public service.
                </FormLabel>
              </FormItem>
            )}
          />
          <Separator />
          <Button
            type="submit"
            className="cursor-pointer w-full max-w-[350px] mx-auto"
          >
            Submit
          </Button>
          {error && <h4>{error}</h4>}
        </div>
      </form>
      {created && (
        <Alert className="max-w-[500px] mt-[20px] mx-auto">
          <CheckCircle2Icon />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription className="inline">
            The service has been created successfully.
          </AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
