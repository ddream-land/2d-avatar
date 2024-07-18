"use client";

import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { DDLPay, LoginModal, Auth } from "@ddreamland/common";
import { useLocale, useTranslations } from "next-intl";

import CollectionIcon from "@/icons/dashboard/CollectionIcon";
import LogoutIcon from "@/icons/dashboard/LogoutIcon";

import { UserInfo } from "@/types/user";
import { useUser } from "@/contexts/UserContext";
import { useDatoken } from "@/contexts/DatokenContext";
import { useInitStore } from "@/store/initStore";
import { useDropdownStore } from "@/store/closeDropdownStore";

interface UserProps {}

const Users: FC<UserProps> = ({}) => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isLogouting, setIsLogouting] = useState<boolean>(false);
  const t = useTranslations();
  const locale = useLocale();
  const { isInit, setIsInit } = useInitStore();
  const { setCloseDropdown } = useDropdownStore();

  const user = useUser();
  const datoken = useDatoken();

  const {
    isOpen: isDropdownOpen,
    onOpen: openDropdown,
    onClose: closeDropdown,
  } = useDisclosure({ defaultOpen: false });
  const { isOpen: payIsOpen, onOpen: openPay, onOpenChange: onPayOpenChange } = useDisclosure({ defaultOpen: false });

  function onAvatarClick() {
    closeDropdown();
    if (Auth.isLogin) {
      openDropdown();
    } else {
      setIsLoginOpen(true);
      closeDropdown();
    }
  }

  async function onLogoutClicked() {
    setIsLogouting(true);
    try {
      await Auth.logout();
    } catch {
    } finally {
      setIsLogouting(false);
      closeDropdown();
    }
  }

  useEffect(() => {
    setCloseDropdown(closeDropdown);
  }, [closeDropdown]);

  return (
    <>
      <Dropdown isOpen={isDropdownOpen} placement="bottom-end" className="bg-[#25252A]">
        <DropdownTrigger>
          <div>
            <Avatar onClick={onAvatarClick} showFallback className="w-10 h-10" radius="full" src={user?.avatar} />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User"
          className="w-[300px] h-[289px] rounded-xl mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownItem key="profile" textValue="profile" isReadOnly className="w-full cursor-default">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar src={user?.avatar} showFallback className="w-10 h-10" />
                <span className="ml-2 text-lg font-bold max-w-[150px] truncate">{user?.name}</span>
              </div>
              <div className="text-[#a0a0aa] text-xs cursor-pointer">{t("Header.profile")} &gt;</div>
            </div>
          </DropdownItem>
          <DropdownItem key="wallet" textValue="wallet" isReadOnly className="w-full cursor-default mt-1">
            <div
              className="w-full h-[97px] px-4 py-3  rounded-xl flex flex-col justify-between bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/images/bg-wallet.png')` }}
            >
              <div className="w-full text-white flex justify-between items-center">
                <div className="text-sm font-medium">{t("Header.balance")}</div>
                <div className="text-xs font-normal opacity-70 cursor-pointer">{t("Header.wallets")} &gt;</div>
              </div>
              <div className="w-full text-white flex justify-between items-center">
                <div>
                  <div className=" text-2xl font-bold">{datoken}</div>
                  <div className="text-xs font-normal opacity-75">{t("Header.dreamToken")}</div>
                </div>
                <div
                  onClick={() => {
                    openPay();
                  }}
                  className="w-[66px] h-8 flex items-center justify-center rounded-2xl text-xs font-medium bg-[#ffffff14] cursor-pointer"
                >
                  {t("Header.topUp")}
                </div>
              </div>
            </div>
          </DropdownItem>
          <DropdownItem key="myCollection" textValue="myCollection" isReadOnly className="w-full cursor-default mt-3">
            <Button className="w-full h-6 p-0 flex justify-start items-center gap-4 bg-transparent">
              <CollectionIcon className="w-5 h-5" />
              <div className="text-white text-base font-normal">{t("Header.myCollection")}</div>
            </Button>
          </DropdownItem>
          <DropdownItem key="logout" textValue="logout" isReadOnly className="w-full cursor-default  mt-3">
            <Button
              isLoading={isLogouting}
              onClick={onLogoutClicked}
              className="w-full h-6 p-0 flex justify-start items-center gap-4 bg-transparent "
            >
              <LogoutIcon className="w-5 h-5" />
              <div className="text-white text-base font-normal">{t("Header.logout")}</div>
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* modal */}
      <DDLPay isOpen={payIsOpen} onOpenChange={onPayOpenChange} lang={locale as "en" | "zh-CN"} />

      <LoginModal
        isOpen={isLoginOpen}
        locale={locale as "en" | "zh-CN"}
        onLogin={() => {
          setIsLoginOpen(false);
          setIsInit(true);
        }}
        onClose={() => {
          setIsLoginOpen(false);
        }}
      />
    </>
  );
};

export default Users;
