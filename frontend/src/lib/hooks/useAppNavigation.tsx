import {
  IndexRouteObject,
  NonIndexRouteObject,
  useNavigate,
} from "react-router";
import { Button } from "@/components/ui/button";
import { menu, PRIMARY_ROUTES } from "@/config/menu";

function getPageOrder(page: Nullable<string>) {
  return +(page?.split("#")[0] ?? 0);
}

function getNavigationItems(
  pages: (IndexRouteObject | NonIndexRouteObject)[],
  handleNavigate: (path: string) => () => void,
) {
  return pages
    ?.sort((a, b) => {
      const orderA = getPageOrder(a.id);
      const orderB = getPageOrder(b.id);
      return orderA - orderB;
    })
    .map((page) => {
      return (
        <Button
          variant={
            PRIMARY_ROUTES.includes(page.id?.split("#")[0] ?? "")
              ? "default"
              : "ghost"
          }
          className="cursor-pointer"
          onClick={handleNavigate(page.path + "")}
          key={page.id}
        >
          {page.id?.split("#")[1]}
        </Button>
      );
    });
}

const left = menu?.filter(({ id }) => !!id && getPageOrder(id) > 0) ?? [];
const right = menu?.filter(({ id }) => !!id && getPageOrder(id) < 0) ?? [];

export default function useAppNavigation() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  const leftItems = getNavigationItems(left, handleNavigate);
  const rightItems = getNavigationItems(right, handleNavigate);

  return {
    left: leftItems,
    right: rightItems,
    handleNavigate,
  };
}
