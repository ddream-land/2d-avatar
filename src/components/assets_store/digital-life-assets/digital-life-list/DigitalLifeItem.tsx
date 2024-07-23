"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, cn, Tooltip } from "@nextui-org/react";
import DownloadIcon from "@/icons/assets_store/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";
import GPTSovitsIcon from "@/icons/assets_store/GPTSovitsIcon";
import { TypeVoiceModel } from "@/lib/definitions.voice";
import { getStarNumStr } from "@/lib/utils";
import CommercialLicenseIcon from "./CommercialLicenseIcon";
import DigitalLifeCollectButton from "./DigitalLifeCollectButton";
import { DigitalLifeCardType } from "@/lib/definitions.digitallife";

function DigitalLifeItem({
  digitalLife,
  isSelected = false,
  type,
  onItemClick,
}: {
  digitalLife: DigitalLifeCardType;
  isSelected: boolean;
  type: "my" | "all";
  onItemClick?: (digitalLife: DigitalLifeCardType) => void;
}) {
  const [isPlay, setIsPlay] = useState(false);
  const tags = ["tags", "tags", "tags", "tags"];

  return (
    <div className="group/item" key={digitalLife.p_id}>
      <div
        className={cn(
          isSelected ? "border-primary" : "group-hover/item:border-primary border-transparent",
          " cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-2 flex-col justify-start items-start inline-flext"
        )}
      >
        <div className="relative">
          <div className="w-full pb-[66%] rounded-xl relative">
            <Image
              fill={true}
              alt={digitalLife.name ?? ""}
              className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
              src={digitalLife.cover_url ?? ""}
              onClick={() => {
                onItemClick && onItemClick(digitalLife);
              }}
            />
          </div>

          <div className="justify-start items-center gap-1 inline-flex absolute top-4 right-3">
            <DigitalLifeCollectButton like={digitalLife.is_collect ?? false} publishId={digitalLife.p_id ?? ""} />
          </div>

          <div className="absolute left-3 bottom-2 justify-start items-center gap-2 flex">
            <div className="justify-end items-center gap-0.5 flex">
              <StarIcon className={`w-4 h-4 ${digitalLife.start_num ? "fill-amber-500" : "fill-zinc-400"}`} />
              <div className="text-white text-xs font-normal leading-none">{getStarNumStr(digitalLife.start_num)}</div>
            </div>
            <div className="justify-end items-center gap-0.5 flex">
              <DownloadIcon className="w-4 h-4" />
              <div className="text-white text-xs font-normal leading-none">
                {getStarNumStr(digitalLife.download_num)}
              </div>
            </div>

            <div className="justify-start items-center gap-0.5 flex">
              <BeakerIcon className="w-4 h-4 relative" />
              <div className="text-white text-xs font-normal leading-none">{getStarNumStr(digitalLife.run_num)}</div>
            </div>
          </div>
        </div>

        <div
          className="w-full px-4 py-3 flex-col justify-start items-start gap-2 inline-flex"
          onClick={() => {
            onItemClick && onItemClick(digitalLife);
          }}
        >
          <div className="h-7 w-full overflow-hidden justify-start items-center inline-flex pr-10">
            <div className="text-white text-lg font-semibold leading-7 truncate">{digitalLife.name}</div>
            {/* {voice.publish_info.permission.commercial_license && type !== "workstation" && <CommercialLicenseIcon />} */}
          </div>
          <>
            <div id="tags" className="flex items-center justify-start gap-x-1">
              {digitalLife.tags &&
                digitalLife.tags.length > 0 &&
                digitalLife.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center justify-center px-2 py-1 min-w-[36px] h-6 rounded-[4px] bg-[#25252a]"
                  >
                    <span className="font-semibold text-xs whitespace-nowrap">{tag}</span>
                  </div>
                ))}
            </div>
          </>
          <div className="self-stretch justify-between items-center inline-flex gap-2">
            <div className="justify-center items-center gap-1.5 flex overflow-hidden">
              <Avatar
                className="shrink-0 w-4 h-4"
                name={digitalLife.author.name}
                src={digitalLife.author.avatar}
                size="sm"
              />
              <div className="text-zinc-400 text-xs font-normal leading-none truncate">{digitalLife.author.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeItem;
