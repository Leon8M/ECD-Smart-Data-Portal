import prisma from "@/lib/prisma";

export default async function StaffPage() {
  const staff = await prisma.staff.findMany({
    include: { school: true, user: true },
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Staff</h2>
          <p className="text-sm text-muted-foreground">All system admins and caregivers.</p>
        </div>
        <a href="/dashboard/staff/new" className="btn btn-primary">Add Staff</a>
      </div>
      <ul className="space-y-4">
        {staff.map((s) => (
          <li key={s.id} className="p-4 border rounded">
            <p className="font-semibold">{s.firstName} {s.lastName}</p>
            <p className="text-sm text-gray-500">{s.phone} - {s.school.name}</p>
            <p className="text-xs text-muted-foreground">{s.user.email} ({s.user.role})</p>
          </li>
        ))}
      </ul>
    </section>
  );
}