import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PAGES } from "@/config/pages";
import { COOKIES, STORAGE } from "@/config/cookies";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/query";
import { authPost } from "@/lib/utils";
import { ENDPOINTS } from "@/components/endpoints";

async function fetchUser() {
  const user = window.localStorage.getItem(STORAGE.USER) ?? "{}";
  return authPost(ENDPOINTS.CURRENT_USER, JSON.parse(user));
}

function Dashboard() {
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryFn: fetchUser,
    queryKey: [QUERY_KEYS.USER],
  });

  const handleLogout = () => {
    Cookies.remove(COOKIES.JWT);
    window.localStorage.removeItem(STORAGE.USER);
    navigate(PAGES.PUBLIC.LANDING);
  };

  return (
    <div className="flex flex-col max-w-100 gap-3.5 mx-auto justify-center align-middle min-h-10/12">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-9">
        Dashboard - {!isPending && data.name}
      </h1>
      <Separator />
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}

export default Dashboard;
