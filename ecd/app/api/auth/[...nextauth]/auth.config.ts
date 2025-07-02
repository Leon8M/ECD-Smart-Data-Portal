import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// You can add other providers like Google, Facebook, etc. here
const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // In a real application, you would add logic here to look up the user
        // from the credentials they provided. For this example, we'll use a
        // dummy user.
        if (credentials?.email === "admin@example.com" && credentials.password === "password") {
          return { id: "1", name: "Admin", email: "admin@example.com", role: "GOVERNMENT_OFFICIAL" };
        }
        if (credentials?.email === "school@example.com" && credentials.password === "password") {
          return { id: "2", name: "School Admin", email: "school@example.com", role: "SCHOOL_ADMIN" };
        }
        if (credentials?.email === "caregiver@example.com" && credentials.password === "password") {
          return { id: "3", name: "Caregiver", email: "caregiver@example.com", role: "CAREGIVER" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};

export default authConfig;
