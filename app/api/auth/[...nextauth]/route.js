import { connectToMongoDB } from "@lib/mongodb";
import User from "@models/user";
import bcrypt from "bcryptjs";

import NextAuth from "next-auth/next";
// import Providers from "next-auth/providers";
// const { CredentialsProvider } = Providers;
import CredentialsProvider from "next-auth/providers/credentials";

//  const handler = NextAuth({
const AuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: {  label: "Password",  type: "password" },
    //   },

    //   // async authorize (credentials){
    //   //   console.log("authorize fn rund");
    //   //   const { email, password } = credentials;

    //   //   try {
    //   //     await connecToMongoDB();
    //   //     const user = await user.findOne({ email });

    //   //     if (!user) {
    //   //       return null;
    //   //     }
    //   //     const passwordMatch = await bcrypt.compare(password, user.password);
    //   //     if (!passwordMatch) {
    //   //       return null;
    //   //     }
    //   //     console.log("Passwordmatch", passwordMatch);
    //         //   return user;
    //   //   } catch (error) {
    //   //     console.log(error);
    //   //   }

    //   // },

    //   async authorize (credentials) {
    //     const {email, password} = credentials;

    //     try {
    //       await connectToMongoDB();
    //       const user = await User.findOne({email});

    //       if(!user){
    //         return null;
    //       }
    //       const passwordMatch = await bcrypt.compare(password, user.password);

    //       if(!passwordMatch){
    //         return null;
    //       }
    //       console.log(user);
    //       return user;
    //     }
    //      catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        await connectToMongoDB();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      console.log('Session callback:', session);
      return Promise.resolve(session);
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  pages: {  
    signIn: "/login",
  },
// })
};

const handler = NextAuth(AuthOptions);

export const GET = handler;
export const POST = handler;
