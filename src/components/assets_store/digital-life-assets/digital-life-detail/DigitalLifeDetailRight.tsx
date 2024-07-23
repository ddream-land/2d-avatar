"use client";
import DCubeIcon from "@/icons/assets_store/3DCubeIcon";
import { ArrowDownTrayIcon, RocketLaunchIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, Snippet, Avatar, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { VoiceModelPublishType } from "@/lib/definitions.voice";
import { getStarNumStr } from "@/lib/utils";
import moment from "moment";
// import VoiceModelCollectButton from "./VoiceModelCollectButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
// import VoiceModelDownloadButton from "../voice-model-download-button/VoiceModelDownloadButton";
import ShareIcon from "@/icons/assets_store/ShareIcon";
import { StarIcon } from "@heroicons/react/24/solid";
import DownloadIcon from "@/icons/assets_store/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";
import { useRouter } from "@/navigation";
import { DigitalLifeCardType, DigitalLifeDetailType } from "@/lib/definitions.digitallife";
import DigitalLifeCollectButton from "./DigitalLifeCollectButton";
// import VoiceModelDetailPublisher from "./VoiceModelDetailPublisher";
import ChatTypingIcon from "@/icons/assets_store/ChatTypingIcon";
import { runDigitalLife } from "@/lib/digitallife.api";
import DigitalLifeDownloadButton from "../digital-life-download-button/DigitalLifeDownloadButton";
import DigitalLifeDetailPublisher from "./DigitalLifeDetailPublisher";

function DigitalLifeDetailRight({
  digitalLifePublicInfo,
  selectedDigitalLife,
  onRunSuccess,
}: {
  digitalLifePublicInfo: DigitalLifeDetailType;
  selectedDigitalLife: DigitalLifeCardType | null;
  onRunSuccess: (p_id: string, success: boolean) => void;
}) {
  const router = useRouter();
  const [startDownload, setStartDownload] = useState(0);
  const [startGptDownload, setStartGptDownload] = useState(0);
  const [startSovitsDownload, setStartSovitsDownload] = useState(0);
  const [startCharacterCardDownload, setStartCharacterCardDownload] = useState(0);
  const [downloading, setDownlanding] = useState(false);
  const pathname = typeof window !== "undefined" && window.location.pathname ? window.location.pathname : "";
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  const url = `${origin}${pathname}?p_i   d=${selectedDigitalLife?.p_id}`;

  const [isLoading, setIsLoading] = useState(false);
  const runDigitalLifeApi = runDigitalLife();

  const handleRunPress = async () => {
    if (!selectedDigitalLife) return;

    setIsLoading(true);
    try {
      const res = await runDigitalLifeApi.send({
        p_id: selectedDigitalLife.p_id!,
      });

      if (res && res.code === 0) {
        onRunSuccess(selectedDigitalLife.p_id!, true);
      } else {
        // 处理错误
        console.error("Failed to run digital life");
        onRunSuccess(selectedDigitalLife.p_id!, false);
      }
    } catch (error) {
      console.error("Error running digital life:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseCustomDate = (dateString: any) => {
    moment.suppressDeprecationWarnings = true;
    const parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2}) @(\d{1,2})h (\d{1,2})m (\d{1,2})s (\d{1,3})ms/);
    if (parts) {
      return moment(new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6], parts[7]));
    }
    return moment(dateString); // Fallback to default parsing if the format doesn't match
  };

  const formattedDate = parseCustomDate(digitalLifePublicInfo.create_date).format("MMMM Do, YYYY");

  return (
    <div className="flex-col justify-start items-start gap-8 inline-flex">
      <div className="self-stretch justify-between items-end inline-flex h-16">
        <div className="w-full shrink-0 self-stretch justify-end items-start gap-2 flex">
          <DigitalLifeCollectButton
            like={digitalLifePublicInfo.fav}
            publishId={selectedDigitalLife?.p_id ?? ""}
            starNum={selectedDigitalLife?.start_num ?? 0}
          />
          {/* <Button
            size="lg"
            variant="bordered"
            startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />}
            isIconOnly={true}
          /> */}
        </div>
      </div>

      {/* right contents */}
      <div className="flex-col justify-start items-start gap-6 inline-flex">
        {/* run button */}
        <div className="justify-start items-start gap-2 inline-flex">
          <Button
            size="lg"
            color="primary"
            variant="ghost"
            className="w-[220px] digitalButton !border-[#18a9cc] hover:!bg-[#18a9cc] hover:!text-white group"
            style={{
              color: "#18a9cc",
            }}
            startContent={<ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 fill-[#18a9cc] group-hover:fill-white" />}
            onPress={async () => {
              // setIsOpen(true)
              await handleRunPress();
            }}
          >
            Run on Role.Ai
          </Button>
          {digitalLifePublicInfo.name && (
            <>
              <DigitalLifeDownloadButton
                publishId={digitalLifePublicInfo.p_id}
                startDownload={startCharacterCardDownload}
                onDownloading={(newDownloading) => {
                  setDownlanding(newDownloading);
                }}
              />
              <Tooltip content="Download Character Card">
                <Button
                  disableRipple={false}
                  size="lg"
                  variant="bordered"
                  startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />}
                  isIconOnly={true}
                  onPress={() => {
                    setStartCharacterCardDownload(startCharacterCardDownload + 1);
                  }}
                  isDisabled={downloading}
                />
              </Tooltip>
            </>
          )}
          <Snippet
            variant="bordered"
            copyIcon={<ShareIcon className="fill-zinc-400 w-4 h-4" />}
            classNames={{
              pre: "hidden",
              base: "px-1.5",
            }}
            size="md"
            hideSymbol={true}
          >
            {url}
          </Snippet>
        </div>

        {/* listed info */}
        <div className="self-stretch flex-col justify-start items-start flex">
          <div className="self-stretch h-[68px] justify-start items-start inline-flex">
            <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
              <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Runnings</div>
              <div className="self-stretch text-white text-sm font-semibold leading-tight">
                {getStarNumStr(selectedDigitalLife!.run_num)}
              </div>
            </div>
            <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
              <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Downloads</div>
              <div className="self-stretch text-white text-sm font-semibold leading-tight">
                {getStarNumStr(selectedDigitalLife!.download_num)}
              </div>
            </div>
            <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
              <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Sharing</div>
              <div className="self-stretch text-white text-sm font-semibold leading-tight">
                {getStarNumStr(selectedDigitalLife!.start_num)}
              </div>
            </div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Version</div>
            <div className="text-white text-sm font-semibold leading-tight">V{digitalLifePublicInfo.spec_version}</div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Supported languages</div>
            <div className="text-white text-sm font-semibold leading-tight">中文 English</div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Rating</div>
            <div className="text-white text-sm font-semibold leading-tight">SFW</div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">CC License</div>
            <div className="text-white text-sm font-semibold leading-tight">HAC KAS</div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Publish Date</div>
            <div className="text-white text-sm font-semibold leading-tight">
              {/* {moment(digitalLifePublicInfo.create_date, "YYYY-M-D @HH[h] mm[m] ss[s] SSS[ms]").format("MMMM Do, YYYY")} */}
              {parseCustomDate(digitalLifePublicInfo.create_date).format("MMMM Do, YYYY")}
            </div>
          </div>
          <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal leading-none">Source</div>
            <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
              <div className="text-white text-sm font-semibold leading-tight">{"Reprint"}</div>
            </div>
          </div>
        </div>
      </div>
      <DigitalLifeDetailPublisher publisher={selectedDigitalLife?.author!} />
    </div>
  );
}

export default DigitalLifeDetailRight;
