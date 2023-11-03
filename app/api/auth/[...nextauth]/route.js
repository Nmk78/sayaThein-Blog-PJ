import { connecToMongoDB } from "@lib/mongodb";
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

      // async authorize (credentials){
      //   console.log("authorize fn rund");
      //   const { email, password } = credentials;

      //   try {
      //     await connecToMongoDB();
      //     const user = await user.findOne({ email });

      //     if (!user) {
      //       return null;
      //     }
      //     const passwordMatch = await bcrypt.compare(password, user.password);
      //     if (!passwordMatch) {
      //       return null;
      //     }
      //     console.log("Passwordmatch", passwordMatch);
            //   return user;
      //   } catch (error) {
      //     console.log(error);
      //   }

      // },

      async authorize (credentials) {
        const {email, password} = credentials;

        try {
          await connecToMongoDB()
          const user = await User.findOne({email});

          if(!user){
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);

          if(!passwordMatch){
            return null;
          }
          console.log(user);
          return user;
        }
         catch (error) {
          console.log(error);
        }
      }
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRECT,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
