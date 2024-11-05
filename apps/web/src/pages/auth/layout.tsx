import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaListCheck } from "react-icons/fa6";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="text-center">
          <FaListCheck className="mx-auto" size={64} />
          <h2 className="text-3xl font-bold mt-4">Organiza</h2>
        </CardHeader>
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}
