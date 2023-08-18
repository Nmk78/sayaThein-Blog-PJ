import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers'

const handler = NextAuth({
      providers: [
            GoogleProvider({
                  clientId: '',
                  clientSecrect: '',
            })
      ]
})