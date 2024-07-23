"use client";
import React from "react";
import Image from "next/image";
import { VoiceModelPublishType } from "@/lib/definitions.voice";
import GPTSovitsIcon from "@/icons/assets_store/GPTSovitsIcon";
import { DigitalLifeDetailType } from "@/lib/definitions.digitallife";
import ToneVoicePreview from "../../voiceassets/voice-preview/ToneVoicePreview";
import DigitalLifeVoicePreview from "../digital-life-voice-preview/DigitalLifeVoicePreview";
import DigitalLifeAvatar from "@/icons/assets_store/DigitalLifeAvatar";
// import ToneVoicePreview from "../voice-preview/ToneVoicePreview";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import DigitalLifeAvatarPreview from "../digital-life-avtar-preview/DigitalLifeAvatarPreview";

function DigitalLifeDetailLeft({ digitalLifePublicInfo }: { digitalLifePublicInfo: DigitalLifeDetailType }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div className="w-full flex-col justify-start items-start gap-8 flex">
      <div className="justify-center items-start gap-2.5 flex flex-col">
        <div className="text-white text-4xl font-semibold leading-10 inline-flex">{digitalLifePublicInfo.name}</div>
        <div className="justify-start items-center gap-1 inline-flex">
          {digitalLifePublicInfo.tags.map((tag, index) => {
            return (
              <div key={index} className="px-2 py-0.5 bg-zinc-800 rounded justify-center items-center gap-2 flex">
                <div className="text-white text-xs font-semibold leading-tight">{tag}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 self-stretch justify-start items-start gap-6 flex flex-row">
        <div className="shrink-0 w-[200px] h-[200px] rounded-xl relative">
          <Image
            fill={true}
            alt={digitalLifePublicInfo.avatar}
            className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
            src={digitalLifePublicInfo.avatar}
          />
        </div>
        <div className=" grow text-white text-sm font-normal text-wrap whitespace-pre-wrap">
          {digitalLifePublicInfo.description.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n")}
        </div>
      </div>
      <div className="flex justify-start w-full items-center">
        <div className="text-white text-xl font-semibold">Digital Life’s information</div>
      </div>
      <div className="w-full self-stretch flex-col justify-start items-start gap-5 flex pt-1">
        {digitalLifePublicInfo && (
          <div id="item-greting" className="flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
            <div className="text-white text-base font-semibold">Greeting</div>
            <div className="w-full h-[1px] bg-[#323235]"></div>
            <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
              {digitalLifePublicInfo.greeting}
            </div>
          </div>
        )}
        <div id="item-personality" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">Personality</div>
          <div className="w-full h-[1px] bg-[#323235]"></div>
          <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
            {digitalLifePublicInfo.personality}
          </div>
        </div>
        <div id="item-description" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">Description</div>
          <div className="w-full h-[1px] bg-[#323235]"></div>
          <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
            {digitalLifePublicInfo.description}
          </div>
        </div>
        {digitalLifePublicInfo.world && (
          <div id="item-world" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
            <div className="text-white text-base font-semibold">World</div>
            <div className="w-full h-[1px] bg-[#323235]"></div>
            <div className="text-white font-normal text-sm text-wrap whitespace-pre-wrap">
              {digitalLifePublicInfo.world}
            </div>
          </div>
        )}
        <div id="item-voice" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">Voice</div>
          <div className="w-full h-[1px] bg-[#323235;]"></div>
          <div className="">{/* <DigitalLifeVoicePreview tone={digitalLifePublicInfo.voice} /> */}</div>
        </div>
        <div id="item-avatar" className="w-full flex flex-col px-5 py-[18px] rounded-xl gap-[17px] bg-[#27272A]">
          <div className="text-white text-base font-semibold">Avatar</div>
          <div className="w-full h-[1px] bg-[#323235;]"></div>
          <DigitalLifeAvatarPreview digitalLifePublicInfo={digitalLifePublicInfo} />
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeDetailLeft;
