import { useContext } from "react";
import { ServicesContext } from "@/components/context/services";

export default function useServiceDashboard() {
  return useContext(ServicesContext);
}
