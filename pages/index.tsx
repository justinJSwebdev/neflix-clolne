import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}

export default function Home() {
  const { data } = useCurrentUser();
  return (
    <>
      <div className="font-bold underline text-white">{data?.email}</div>;
      {data ? (
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/auth",
            })
          }
        >
          Logout
        </button>
      ) : (
        "Hello homepage"
      )}
    </>
  );
}
