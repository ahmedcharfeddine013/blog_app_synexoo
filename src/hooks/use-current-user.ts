import { getServerSession } from "next-auth";

export const useCurrentUser = async () => {
  const session = await getServerSession();
  return session?.user;
};
