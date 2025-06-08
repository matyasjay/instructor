import Account from "@/app/account";
import ServiceAll from "@/app/service/all";
import ServiceOwn from "@/app/service/own";

export const PRIMARY_ROUTES = ["3", "4"];

export const menu = [
  {
    id: "-1#Account",
    path: "/app/account",
    element: <Account />,
  },
  {
    id: "1#My Services",
    path: "/app/service/own",
    element: <ServiceOwn />,
  },
  {
    id: "2#Shared Services",
    path: "/app/service/all",
    element: <ServiceAll />,
  },
];
