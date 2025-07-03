import { z } from 'zod';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { childSchema } from './data/schema';
import prisma from '@/lib/prisma';
import type { Child } from '@prisma/client';

const validatedSchema = z.array(childSchema);

type TransformedChild = z.infer<typeof childSchema>;

async function getChildren(): Promise<TransformedChild[]> {
  const data: (Child & { school: { name: string } })[] = await prisma.child.findMany({
    include: {
      school: {
        select: {
          name: true,
        },
      },
    },
  });

  const transformedData: TransformedChild[] = data.map((child) => ({
    id: child.id,
    firstName: child.firstName,
    lastName: child.lastName,
    school: child.school.name,
    guardianName: child.guardianName,
  }));

  return validatedSchema.parse(transformedData);
}

export default async function ChildrenPage() {
  const children = await getChildren();

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Children</h2>
          <p className="text-muted-foreground">
            Here's a list of all children in the system.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Add New Child Button would go here */}
        </div>
      </div>
      <DataTable data={children} columns={columns} />
    </div>
  );
}
