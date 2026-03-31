import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import Partner from "@/models/Partner";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const partner = await Partner.findOne({ email: credentials.email.toLowerCase() });
        if (!partner) return null;

        const passwordMatch = await bcrypt.compare(credentials.password, partner.password);
        if (!passwordMatch) return null;

        if (partner.status !== "active") return null;

        return {
          id: partner._id.toString(),
          name: partner.name,
          email: partner.email,
          refCode: partner.refCode,
          status: partner.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.refCode = (user as { refCode?: string }).refCode;
        token.status = (user as { status?: string }).status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { refCode?: string }).refCode = token.refCode as string;
        (session.user as { status?: string }).status = token.status as string;
      }
      return session;
    },
  },
};
