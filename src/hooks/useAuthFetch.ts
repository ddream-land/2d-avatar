"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { config } from "@/config";

export const useAuthFetch = () => {
  const router = useRouter();

  const authFetch = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const headers = new Headers(options.headers);
    const session = Cookies.get("nuwa_session");
    const uid = Cookies.get("nuwa_uid");

    if (!session || !uid) {
      // router.push("/login");
      // throw new Error("No session or uid found");
    }

    // headers.append("Authorization", `Bearer ${session}`);
    headers.append("nuwa_session", session);
    headers.append("nuwa_uid", uid);

    const fullUrl = `${config.baseUrl}${path}`;
    const url = new URL(fullUrl);
    url.searchParams.append("session", session);
    url.searchParams.append("uid", uid);

    const response = await fetch(url.toString(), { ...options, headers });

    if (!response.ok) {
      if (response.status === 401) {
        // router.push("/login");
        throw new Error("Unauthorized");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return authFetch;
};
