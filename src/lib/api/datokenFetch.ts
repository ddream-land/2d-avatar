import { useTranslations } from "next-intl";
import { authFetch } from "@/lib/api/authFetch";
import { config } from "@/config";

export const getDatoken = () => {
  return authFetch({
    url: config.getDatokenApi,
    options: {
      method: "POST",
    },
    successMsg: "Datoken retrieved successfully",
  });
};
