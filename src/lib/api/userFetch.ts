import { useTranslations } from "next-intl";
import { authFetch } from "@/lib/api/authFetch";
import { config } from "@/config";
import { UserInfo } from "@/types/user";

export const getUserInfo = () => {
  return authFetch({
    url: config.getUserInfoApi,
    options: {
      method: "POST",
    },
    successMsg: "User info retrieved successfully",
  });
};

export const editUserInfo = async (updatedUserInfo: Partial<UserInfo>) => {
  return authFetch({
    url: config.editUserInfoApi,
    options: {
      method: "POST",
      body: JSON.stringify({ updatedUserInfo }),
    },
    successMsg: "User info updated successfully",
  });
};
