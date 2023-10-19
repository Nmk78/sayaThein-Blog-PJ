import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

console.log("G-Auth ", {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secrect: process.env.JWT_SECRET,

  async session({ session }) {},
  async signIn({ profile }) {},
});

export { handler as GET, handler as POST };
