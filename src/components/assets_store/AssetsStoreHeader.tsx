"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import NuwaChipRadioGroup from "../common/NuwaChipRadioGroup";

interface AssetsStoreHeaderProps {
  onTagChange: (newTag: string) => void;
}

type TypeFilterItem = {
  label: string;
  value: string;
};

const AssetsStoreHeader: FC<AssetsStoreHeaderProps> = ({ onTagChange }) => {
  const t = useTranslations();
  const [isSortDisplay, setIsSortDisplay] = useState<boolean>(false);
  const [sortingOrder, setSortingOrder] = useState<string>("trending");
  const [selectedFilter, setSelectedFilter] = useState<string | null>("All");
  const [filters, setFilters] = useState<Array<TypeFilterItem>>([
    {
      label: `${t("tags.all")}`,
      value: "All",
    },
    {
      label: `${t("tags.digitalLifeAssets")}`,
      value: "Digital Life Assets",
    },
    {
      label: `${t("tags.voiceAssets")}`,
      value: "Voice Assets",
    },
  ]);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      const newTag = e.target.value;
      setSelectedFilter(newTag);
      onTagChange(newTag);

      if (e.target.value === "All") {
        setIsSortDisplay(false);
      } else {
        setIsSortDisplay(true);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-between items-center">
        <div className="w-[400px]">
          <NuwaChipRadioGroup items={filters} value={selectedFilter} onChange={handleTagChange} />
        </div>

        {isSortDisplay && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="lg"
                className="w-[186px] justify-between bg-[#25252a]"
                endContent={<ChevronDownIcon className="h-4 w-4" />}
              >
                {/* {t("assetsStore.trending")} */}
                {t(`assetsStore.${sortingOrder}`)}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sorting Order"
              className="w-[186px]"
              onAction={(key) => {
                if (key === "trending") {
                  setSortingOrder("trending");
                }
                if (key === "latest") {
                  setSortingOrder("latest");
                }
              }}
            >
              <DropdownItem key="trending" textValue="trending">
                {t("assetsStore.trending")}
              </DropdownItem>
              <DropdownItem key="latest" textValue="latest">
                <span className="text-sm font-medium">{t("assetsStore.latest")}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default AssetsStoreHeader;
