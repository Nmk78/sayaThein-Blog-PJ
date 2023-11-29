import { connectToMongoDB } from "@lib/mongodb";
import User from "@models/user";
import bcrypt from "bcryptjs";

import NextAuth from "next-auth/next";
// import { CredentialsProvider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        console.log("Request Object:", req);

        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        try {
          await connectToMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      if(user){
        console.log(user);
      session.user = user;
      }
      return Promise.resolve(session);
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRECT,
  pages: {
    signIn: "/login",
    signOut: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };