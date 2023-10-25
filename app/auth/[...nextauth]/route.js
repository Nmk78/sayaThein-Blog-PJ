import { connecToMongoDB } from "@lib/mongodb";
import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize (credentials){
        const { email, password } = credentials;

        try {
          await connecToMongoDB();
          const user = await user.findOne({ email });

          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
        } catch (error) {
          console.log(error);
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRECT,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
