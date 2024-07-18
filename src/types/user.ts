export type UserInfo = {
  email: string;
  uid: number;
  wallet: string;
  name: string;
  avatar: string;
  stars: number;
  down_load: number;
  run: number;
};

export const DEFAULT_USER_INFO: UserInfo = {
  email: "user@ddream.com",
  uid: -1,
  wallet: "0x00000000000000000000000000000000000000000",
  name: "ddream1",
  avatar: "/images/avatar.png",
  stars: 0,
  down_load: 0,
  run: 0,
};
