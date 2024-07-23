"use client";

import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { config, NUWAUID, NUWASESSION } from "@/config";
import { useAmDispatch } from "@/components/common/AlterMessageContextProvider";
import { useState } from "react";

export const getIsLogin = () => {
  if (typeof document !== "undefined") {
    const uid = Cookies.get(NUWAUID);
    const session = Cookies.get(NUWASESSION);
    return !!(uid && session);
  }

  return false;
};

export const deleteCookie = () => {
  if (typeof document !== "undefined") {
    Cookies.remove(NUWAUID);
    Cookies.remove(NUWASESSION);
  }
};

export const authFetch = ({
  url,
  options = {},
  successMsg,
}: {
  url: string;
  options: RequestInit;
  successMsg: string;
}) => {
  const t = useTranslations();
  const locale = useLocale();

  const [isLoading, setIsLoading] = useState(false);
  const amDispatch = useAmDispatch();

  const uid = Cookies.get(NUWAUID);
  const session = Cookies.get(NUWASESSION);

  if (!uid || !session) {
    return;
  }

  const fullUrl = `${config.baseUrl}${url}?${new URLSearchParams({
    uid: uid,
    session: session,
  }).toString()}`;

  const defaultHeaders = {
    "Accept-Language": locale,
    "Content-Type": "application/json",
    NUWAUID: uid ?? "",
    NUWASESSION: session ?? "",
    ...options.headers, // 合并用户传入的请求头
  };

  const send = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        ...options,
        headers: defaultHeaders,
      });

      if (response.ok) {
        const data = await response.json();

        if (data.code === 0) {
          successMsg &&
            // amDispatch({
            //   type: "add",
            //   payload: {
            //     message: successMsg,
            //     type: "success",
            //   },
            // });
            setIsLoading(false);
          return data;
        }

        // session 过期
        if (data.code === 604) {
          // 跳转到login
          setIsLoading(false);
          return data;
        }

        // amDispatch({
        //   type: "add",
        //   payload: data.msg,
        // });

        setIsLoading(false);
        return data;
      }
    } catch (error) {
      amDispatch({
        type: "add",
        payload: t("Error.sysfail"),
      });
      setIsLoading(false);
    }
  };

  return { send, isLoading };
};
