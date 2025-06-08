import { useContext } from "react";
import { AuthContext } from "@/components/context/auth";

export default function useAuth (){
  return useContext(AuthContext);
};
