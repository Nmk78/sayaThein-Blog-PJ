"use client"

import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import React from "react";

const User = ({ session }) => {
  const router = useRouter();
  const { user } = router.query;

  console.log(router);
  return (
    <>
      <Profile />
    </>
  );
};

export default User;
