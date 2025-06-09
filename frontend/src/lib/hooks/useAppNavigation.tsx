import {
  IndexRouteObject,
  NonIndexRouteObject,
  useNavigate,
} from "react-router";
import { menu } from "@/lib/menu";

function getPageOrder(page: Nullable<string>) {
  return +(page?.split("#")[0] ?? 0);
}

function getNavigationItems(pages: (IndexRouteObject | NonIndexRouteObject)[]) {
  return pages?.sort((a, b) => {
    const orderA = getPageOrder(a.id);
    const orderB = getPageOrder(b.id);
    return orderA - orderB;
  });
}

const left = menu?.filter(({ id }) => !!id && getPageOrder(id) > 0) ?? [];
const right = menu?.filter(({ id }) => !!id && getPageOrder(id) < 0) ?? [];

export default function useAppNavigation() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  const leftItems = getNavigationItems(left);
  const rightItems = getNavigationItems(right);

  return {
    left: leftItems,
    right: rightItems,
    handleNavigate,
  };
}
