"use client";
import { FC, useEffect, useState } from "react";
import Header from "./Header";
import { UserContextProvider } from "@/contexts/UserContext";
import { type UserInfo, DEFAULT_USER_INFO } from "@/types/user";
import { getIsLogin } from "@/lib/api/authFetch";
import { getUserInfo } from "@/lib/api/userFetch";
import { getDatoken } from "@/lib/api/datokenFetch";
import { DatokenContextProvider } from "@/contexts/DatokenContext";
import { useInitStore } from "@/store/initStore";
import { useDropdownStore } from "@/store/closeDropdownStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(DEFAULT_USER_INFO);
  const [datoken, setDatoken] = useState<number>(0);

  // const [isInit, setIsInit] = useState(false);
  const { isInit, setIsInit } = useInitStore();
  const { closeDropdown } = useDropdownStore();

  const getUserInfoApi = getUserInfo();
  const getDatokenApi = getDatoken();
  const isLogin = getIsLogin();

  useEffect(() => {
    if (!isInit && isLogin) {
      setIsInit(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const res = await getUserInfoApi?.send();
      if (res && res.code === 0) {
        const userInfo = res.data as UserInfo;
        setUserInfo(userInfo);
      }

      setIsInit(false);
    };
    if (isInit) {
      init();
    }
  }, [isInit]);

  useEffect(() => {
    const init = async () => {
      const res = await getDatokenApi?.send();
      if (res && res.code === 0 && res.data !== "" && !isNaN(Number(res.data))) {
        const datoken = Number(res.data) as number;
        setDatoken(datoken);
      }

      setIsInit(false);
    };
    if (isInit) {
      init();
    }
  }, [isInit]);

  return (
    <>
      <UserContextProvider initialUser={userInfo}>
        <DatokenContextProvider initialDatoken={datoken}>
          <main onClick={closeDropdown}>
            <Header />
            {children}
          </main>
        </DatokenContextProvider>
      </UserContextProvider>
    </>
  );
};

export default DashboardLayout;
