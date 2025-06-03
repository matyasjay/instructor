import { Separator } from "@/components/ui/separator";

function Dashboard() {
  return (
    <div className="flex flex-col max-w-100 gap-3.5 mx-auto justify-center align-middle min-h-10/12">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-9">
        Dashboard
      </h1>
      <Separator />
    </div>
  );
}

export default Dashboard;
