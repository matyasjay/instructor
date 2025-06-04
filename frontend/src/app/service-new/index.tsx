import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { STORAGE } from "@/config/cookies";
import { ENDPOINTS } from "@/config/endpoints";
import { PAGES } from "@/config/pages";
import { MUTATION_KEYS } from "@/config/query";
import { authPost, normalizeObjectKeys, parseErrorObject } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, useLoaderData } from "react-router";

type ServiceInput = {
  user: string;
  name: string;
};

const defaultService: ServiceInput = {
  user: "",
  name: "",
};

async function createService(input: ServiceInput) {
  const response = await authPost<ServiceInput>(
    ENDPOINTS.CREATE_SERVICE,
    input
  );
  if (response.error) {
    return response;
  }
  return normalizeObjectKeys<ServiceInput>(response);
}

function ServiceNew() {
  const [service, setService] = useState(defaultService);
  const [error, setError] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [created, setCreated] = useState(false);
  const { authenticated } = useLoaderData();

  const mutation = useMutation({
    mutationFn: createService,
    mutationKey: [MUTATION_KEYS.CREATE_SERVICE],
    onError: (e) => {
      setError(parseErrorObject(e));
    },
    onSuccess: (data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setCreated(data.userid);
      }
    },
  });

  const handleChange =
    (field: keyof ServiceInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setError("");
      setService((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const user = JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? "{}");
    mutation.mutate({ user: user.id, name: service.name });
  };

  useEffect(() => {
    if (authenticated === true) {
      setReady(true);
    }
  }, [authenticated]);

  if (!authenticated) {
    return <Navigate to={PAGES.PUBLIC.LOGIN} />;
  }

  return !ready ? null : (
    <div className="flex flex-col w-full gap-3.5 mx-auto min-h-10/12 px-9">
      <div className="w-full pt-4">
        <h1 className="flex scroll-m-20 text-lg font-semibold tracking-tight mb-4">
          New Service
        </h1>
      </div>
      <form className="min-h-10/12 px-9 max-w-[1400px]" onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-[400px] gap-3.5 mx-auto align-middle min-h-10/12">
          <Label>Service Name</Label>
          <Input
            type="text"
            value={service.name}
            onChange={handleChange("name")}
          />
          <Separator />
          <Button type="submit">Submit</Button>
          {error && <h4>{error}</h4>}
        </div>
        {created && (
          <Alert className="max-w-[500px] mt-[20px] mx-auto">
            <CheckCircle2Icon />
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription className="inline">
              The service has been created successfully.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}

export default ServiceNew;
