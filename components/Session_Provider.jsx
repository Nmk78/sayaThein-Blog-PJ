"use client"

import React from 'react'

import { SessionProvider } from 'next-auth/react'

const Session_Provider = ({children, session}) => {

  console.log("Session_Provider Log ", session);
  
  return (
    <SessionProvider session={session} >
      {children}
    </SessionProvider>
    )
}

export default Session_Provider