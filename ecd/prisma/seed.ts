import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Schools
  const school1 = await prisma.school.upsert({
    where: { name: 'Bright Stars ECD' },
    update: {},
    create: {
      name: 'Bright Stars ECD',
      address: '123 Sunshine Ave, Nairobi',
      phone: '0712345678',
      email: 'info@brightstars.ac.ke',
    },
  });

  const school2 = await prisma.school.upsert({
    where: { name: 'Little Angels Academy' },
    update: {},
    create: {
      name: 'Little Angels Academy',
      address: '456 Moonlight Rd, Nairobi',
      phone: '0787654321',
      email: 'contact@littleangels.ac.ke',
    },
  });

  // Create Users
  const govUser = await prisma.user.upsert({
    where: { email: 'official@nairobi.go.ke' },
    update: {},
    create: {
      name: 'Jane Doe',
      email: 'official@nairobi.go.ke',
      password: hashedPassword,
      role: UserRole.GOVERNMENT_OFFICIAL,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@brightstars.ac.ke' },
    update: {},
    create: {
      name: 'John Admin',
      email: 'admin@brightstars.ac.ke',
      password: hashedPassword,
      role: UserRole.SCHOOL_ADMIN,
    },
  });

  const caregiverUser = await prisma.user.upsert({
    where: { email: 'teacher@brightstars.ac.ke' },
    update: {},
    create: {
      name: 'Alice Teacher',
      email: 'teacher@brightstars.ac.ke',
      password: hashedPassword,
      role: UserRole.CAREGIVER,
    },
  });

  // Create Staff
  await prisma.staff.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      schoolId: school1.id,
      firstName: 'John',
      lastName: 'Admin',
      phone: '0722000001',
    },
  });

  await prisma.staff.upsert({
    where: { userId: caregiverUser.id },
    update: {},
    create: {
      userId: caregiverUser.id,
      schoolId: school1.id,
      firstName: 'Alice',
      lastName: 'Teacher',
      phone: '0722000002',
    },
  });

  // Create Children
  await prisma.child.createMany({
    data: [
      {
        firstName: 'Peter',
        lastName: 'Pan',
        dateOfBirth: new Date('2021-05-10'),
        schoolId: school1.id,
        guardianName: 'Mary Pan',
        guardianPhone: '0733111222',
        guardianId: '30123456',
      },
      {
        firstName: 'Wendy',
        lastName: 'Darling',
        dateOfBirth: new Date('2020-11-20'),
        schoolId: school1.id,
        guardianName: 'George Darling',
        guardianPhone: '0733222333',
        guardianId: '30654321',
      },
      {
        firstName: 'Leo',
        lastName: 'King',
        dateOfBirth: new Date('2022-01-15'),
        schoolId: school2.id,
        guardianName: 'Sarah Queen',
        guardianPhone: '0733444555',
        guardianId: '30987654',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });