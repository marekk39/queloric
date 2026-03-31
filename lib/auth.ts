import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import Partner from "@/models/Partner";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();

        const partner = await Partner.findOne({
          email: credentials.email.toLowerCase(),
          status: "active",
        });

        if (!partner) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          partner.password
        );

        if (!isValid) return null;

        return {
          id: partner._id.toString(),
          email: partner.email,
          name: partner.name,
          refCode: partner.refCode,
          role: partner.email === process.env.ADMIN_EMAIL ? "admin" : "partner",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.refCode = (user as any).refCode;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).refCode = token.refCode;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};