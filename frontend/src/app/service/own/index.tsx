import { useParams } from "react-router";
import Services from "@/components/feature/dashboard/services";

function ServiceOwn() {
  const { id } = useParams();
  return <Services title="My Services" type="user" defaultOpen={id}/>;
}

export default ServiceOwn;
