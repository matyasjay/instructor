import Account from "@/app/account";
import ServiceAll from "@/app/service/all";
import ServiceNew from "@/app/service/new";
import ServiceOwn from "@/app/service/own";
import Template from "@/app/template";

export const PRIMARY_ROUTES = ["3", "4"];

export const menu = [
  {
    id: "-1#Account",
    path: "/app/account",
    element: <Account />,
  },
  {
    id: "3#New Service",
    path: "/app/service/new",
    element: <ServiceNew />,
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
  {
    id: "4#New Templates",
    path: "/app/template",
    element: <Template />,
  },
];
