import { useGetMeQuery } from "@auth/api/authApi";
import type { IAuthUser } from "@auth/interfaces/iAuthUser";
import type { IGetMeOutput } from "@auth/interfaces/iGetMeOutput";

const normalizeUser = (data?: IGetMeOutput): IAuthUser | null => {
  if (!data) {
    return null;
  }

  if ("user" in data) {
    return data.user;
  }

  return data;
};

export const useAuth = () => {
  const { data, error, isFetching, isLoading, isUninitialized } =
    useGetMeQuery();

  const user = error ? null : normalizeUser(data);
  const loading = isUninitialized || isLoading || (isFetching && !data);

  return {
    isAuthenticated: Boolean(user),
    loading,
    user,
  };
};
