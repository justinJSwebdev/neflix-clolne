import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  console.log("session", session);
  if (!session?.user?.email) {
    throw new Error("Not logged in");
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
};

export default serverAuth;
