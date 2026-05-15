import type { IAuthUser } from "@auth/interfaces/iAuthUser";

export type IGetMeOutput = IAuthUser | { user: IAuthUser };
