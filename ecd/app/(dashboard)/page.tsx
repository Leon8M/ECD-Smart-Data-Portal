import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Activity, Users, School, Baby } from "lucide-react";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    const totalChildren = await prisma.child.count();
    const totalSchools = await prisma.school.count();
    const totalStaff = await prisma.staff.count();
    const recentActivity = await prisma.attendance.count({
        where: { date: { gte: new Date(new Date().setDate(new Date().getDate() - 1)) } }
    });

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Children
                        </CardTitle>
                        <Baby className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalChildren}</div>
                        <p className="text-xs text-muted-foreground">
                            Registered across all schools
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Schools
                        </CardTitle>
                        <School className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSchools}</div>
                         <p className="text-xs text-muted-foreground">
                            Managed by the system
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Staff
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStaff}</div>
                         <p className="text-xs text-muted-foreground">
                            Admins and Caregivers
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Recent Attendance
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{recentActivity}</div>
                         <p className="text-xs text-muted-foreground">
                            Records in the last 24 hours
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* A chart would go here */}
                        <p className="text-muted-foreground">Analytics chart placeholder.</p>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            The latest children added to the system.
                        </p>
                    </CardHeader>
                    <CardContent>
                         {/* A list of recent children would go here */}
                         <p className="text-muted-foreground">Recent children list placeholder.</p>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}