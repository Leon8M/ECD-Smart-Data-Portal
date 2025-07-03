import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Activity, Users, School, Baby } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const totalChildren = await prisma.child.count();
  const totalSchools = await prisma.school.count();
  const totalStaff = await prisma.staff.count();
  const recentActivity = await prisma.attendance.count({
    where: {
      date: {
        gte: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    },
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-bold tracking-tight">Welcome back, {user?.name || "Admin"} 👋</h2>
        <p className="text-gray-600 text-sm">
          Here’s what’s happening in your ECD system today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Children"
          value={totalChildren}
          icon={<Baby className="w-5 h-5 text-white" />}
          color="from-pink-500 to-rose-500"
          description="Registered across all schools"
        />
        <DashboardCard
          title="Total Schools"
          value={totalSchools}
          icon={<School className="w-5 h-5 text-white" />}
          color="from-indigo-500 to-violet-500"
          description="Managed by the system"
        />
        <DashboardCard
          title="Total Staff"
          value={totalStaff}
          icon={<Users className="w-5 h-5 text-white" />}
          color="from-green-500 to-emerald-500"
          description="Admins and Caregivers"
        />
        <DashboardCard
          title="Recent Attendance"
          value={`+${recentActivity}`}
          icon={<Activity className="w-5 h-5 text-white" />}
          color="from-yellow-500 to-amber-500"
          description="Records in the last 24 hours"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-md">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-40 flex items-center justify-center text-sm text-gray-500 border rounded-md border-dashed">
              📊 Analytics chart will appear here.
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-md">
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <p className="text-sm text-gray-500">
              The latest children added to the system.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-center justify-center text-sm text-gray-500 border rounded-md border-dashed">
              🧒 Recent children list will appear here.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// 🎨 Custom Dashboard Card Component
function DashboardCard({
  title,
  value,
  icon,
  color,
  description,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  description: string;
}) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-sm text-gray-700">{title}</CardTitle>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        <div className={`rounded-full p-2 bg-gradient-to-br ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
