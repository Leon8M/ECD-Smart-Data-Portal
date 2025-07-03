import prisma from "@/lib/prisma";

export default async function SchoolsPage() {
  const schools = await prisma.school.findMany();
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Schools</h2>
          <p className="text-sm text-muted-foreground">Registered schools in system.</p>
        </div>
        <a href="/dashboard/schools/new" className="btn btn-primary">Add School</a>
      </div>
      <ul className="space-y-4">
        {schools.map((school) => (
          <li key={school.id} className="p-4 border rounded">
            <p className="font-semibold">{school.name}</p>
            <p className="text-sm text-gray-500">{school.address} - {school.phone}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}