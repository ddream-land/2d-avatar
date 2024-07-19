"use client";

import { FC, useEffect, useState } from "react";
import { DDLSidebar } from "@ddreamland/common";
import { Switch, cn } from "@nextui-org/react";
import FlashIcon from "@/icons/dashboard/FlashIcon";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Users from "./User";
import { useDatoken } from "@/contexts/DatokenContext";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
type LanguageSwitchProps = Readonly<{
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
}>;

function LanguageSwitch({ isSelected, onValueChange }: LanguageSwitchProps) {
  return (
    <Switch
      isSelected={isSelected}
      onValueChange={onValueChange}
      size="sm"
      classNames={{
        base: "",
        wrapper: cn(
          "bg-transparent h-10 w-[76px] text-[#555] border-1 border-[#333]",
          "data-[selected=true]:text-[#555]",
          "data-[selected=true]:text-xs",
          "data-[selected=true]:bg-transparent",
          "group-data-[selected=true]:text-[#555]",
          "group-data-[selected=true]:text-xs",
          "group-data-[selected=true]:bg-transparent"
        ),
        thumb: cn("bg-[#333] w-8 h-8", "data-[selected=true]:ml-[34px]", "group-data-[selected=true]:ml-[34px]"),
      }}
      startContent={<span style={{ fontSize: "12px", color: "#555" }}>En</span>}
      endContent={<span style={{ fontSize: "12px", color: "#555" }}>中</span>}
      thumbIcon={({ isSelected }) =>
        isSelected ? <span className={`text-white`}>中</span> : <span className={`text-white`}>En</span>
      }
    />
  );
}

const Header: FC<HeaderProps> = ({}) => {
  const [sidebarIsFull, setSidebarIsFull] = useState<boolean>(false);
  const [lang, setLang] = useState<"en" | "zh-CN">("en");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const datoken = useDatoken();

  const isZH = locale == "zh-CN";
  function onLanguageChange(isSelected: boolean) {
    const currentPath = pathname.split("/").slice(2).join("/");
    router.push(`/${isSelected ? "zh-CN" : "en"}/${currentPath} `);
  }

  return (
    <>
      <nav className="sticky top-0 w-full h-[82px] px-6 bg-zinc-800 flex justify-between items-center z-[5]">
        <div className="w-60 flex justify-between items-center">
          <div className={`w-[320px] p-[5px] fixed top-0 left-0 bottom-0 pointer-events-none bg-transparent`}>
            <DDLSidebar
              lang={locale as "en" | "zh-CN"}
              title={{ name: "Studio" }}
              minifyTimeout={0}
              onPanelSizeChange={(toFull) => {
                setSidebarIsFull(toFull);
              }}
            ></DDLSidebar>
          </div>
          <div className="w-[216px]"></div>
          <div className="w-[2px] h-[27px] bg-white/10"></div>
        </div>

        <div className="w-[212px] h-10 flex justify-center items-center gap-6 ">
          <LanguageSwitch isSelected={isZH} onValueChange={onLanguageChange} />
          <div className="w-[111px] h-full flex justify-between items-center">
            <div className="w-[67px] h-8 flex justify-center items-center">
              <FlashIcon className="w-5 h-5 fill-green-500 stroke-green-500" />
              <div className="ml-1 text-center text-green-500 text-xs font-bold font-['Inter'] leading-normal">
                {datoken}
              </div>
            </div>
            <div id="avatar" className="w-10 h-10">
              <Users />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
