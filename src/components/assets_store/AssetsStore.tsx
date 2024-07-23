"use client";
import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import DiamondIcon from "@/icons/assets_store/DiamondIcon";
import AssetsStoreHeader from "./AssetsStoreHeader";
import { Button, cn } from "@nextui-org/react";
import VoiceModelList from "./voiceassets/voice-model-list/VoiceModelList";
import DigitalLifeList from "./digital-life-assets/digital-life-list/DigitalLifeList";
import { TypeVoiceModel } from "@/lib/definitions.voice";
import VoiceModelListNoScroll from "./VoiceModelListNoScroll";
import DigitalLifeListNoScroll from "./DigitalLifeListNoScroll";
import VoiceModelDetailDrawerModal from "./voiceassets/voice-model-detail/VoiceModelDetailDrawerModal";
import { DEFAULT_DIGITALLIFE, DigitalLifeCardType } from "@/lib/definitions.digitallife";
import DigitalLifeDetailDrawerModal from "./digital-life-assets/digital-life-detail/DigitalLifeDetailDrawerModal";

interface AssetsStoreProps {}

const AssetsStore: FC<AssetsStoreProps> = ({}) => {
  const [currentTag, setCurrentTag] = useState<string>("All");
  const [voiceModelListKey, setVoiceModelListKey] = useState(0);

  const [isEmpty, setIsEmpty] = useState(false);
  const [isVoiceMoreDispaly, setIsVoiceMoreDispaly] = useState(false);
  const [isDigitalMoreDispaly, setIsDigitalMoreDispaly] = useState(false);
  const t = useTranslations();

  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null>(null);
  const [selectedDigitalLife, setSelectedDigitalLife] = useState<DigitalLifeCardType | null>(null);
  // console.log(selectedVoiceModel);
  // console.log(selectedDigitalLife);

  // test

  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <div className="w-full bg-[#15151A] flex flex-col px-6">
        <div className="w-full h-12 mt-[46px] mb-[42px] flex items-center">
          <DiamondIcon className="h-12 w-12" />
          <span className="text-white ml-2 font-semibold text-5xl">{t("assetsStore.title")}</span>
        </div>
        <div className="h-12 mb-8 flex items-center ">
          <AssetsStoreHeader
            onTagChange={(newTag) => {
              setCurrentTag(newTag);
              setVoiceModelListKey(voiceModelListKey + 1);
            }}
          />
        </div>

        {/* digital Life in All */}
        {/* {currentTag === "All" && (
          <div id="assets-store-content" className="w-full flex flex-col mb-12">
            <div id="digital-life" className="w-full">
              <div id="title" className="text-white text-2xl font-bold mb-6">
                {t("assetsStore.digitallife")}
              </div>
              <div id="digital-life-assets-list" className={cn(isEmpty ? "hidden" : "block", "w-full")}>
                <DigitalLifeListNoScroll
                  // key={voiceModelListKey}
                  type="all"
                  selectedDigitalLife={selectedDigitalLife}
                  onItemClick={(digitalLife) => {
                    setSelectedVoiceModel(digitalLife);
                    // setSelectedDigitalLife(digitalLife);
                  }}
                  onChange={(digitalLifeList) => {
                    if (digitalLifeList.length === 0) {
                      setIsEmpty(true);
                    } else {
                      setIsEmpty(false);
                    }
                    if (digitalLifeList.length < 10) {
                      setIsVoiceMoreDispaly(false);
                    } else {
                      setIsVoiceMoreDispaly(true);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )} */}
        {/* voice in all */}
        {/* {currentTag === "All" && (
          <div id="voice-store-content" className="w-full flex flex-col mb-[80px]">
            <div id="voice-assets" className="w-full">
              <div id="title" className="text-white text-2xl font-bold mb-6">
                {t("assetsStore.voiceassets")}
              </div>
              <div id="voice-assets-list" className={cn(isEmpty ? "hidden" : "block", "w-full")}>
                <VoiceModelListNoScroll
                  // key={voiceModelListKey}
                  type="all"
                  selectedVoiceModel={selectedVoiceModel}
                  onItemClick={(voiceModel) => {
                    setSelectedVoiceModel(voiceModel);
                  }}
                  onChange={(voiceList) => {
                    if (voiceList.length === 0) {
                      setIsEmpty(true);
                    } else {
                      setIsEmpty(false);
                    }
                    if (voiceList.length < 10) {
                      setIsVoiceMoreDispaly(false);
                    } else {
                      setIsVoiceMoreDispaly(true);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )} */}

        {/* other tags */}
        {currentTag === "Voice Assets" && (
          <div id="voice-assets-list" className={cn(isEmpty ? "hidden" : "block", "w-full")}>
            <VoiceModelList
              // key={voiceModelListKey}
              type="all"
              selectedVoiceModel={selectedVoiceModel}
              onItemClick={(voiceModel) => {
                setSelectedVoiceModel(voiceModel);
              }}
              onChange={(voiceList) => {
                if (voiceList.length === 0) {
                  setIsEmpty(true);
                } else {
                  setIsEmpty(false);
                }
                if (voiceList.length < 10) {
                  setIsVoiceMoreDispaly(false);
                } else {
                  setIsVoiceMoreDispaly(true);
                }
              }}
            />
          </div>
        )}

        {currentTag === "Digital Life Assets" && (
          <div id="digital-life-assets-list" className={cn(isEmpty ? "hidden" : "block", "w-full")}>
            <DigitalLifeList
              // key={voiceModelListKey}
              type="all"
              selectedDigitalLife={selectedDigitalLife}
              onItemClick={(digitalLife) => {
                setSelectedDigitalLife(digitalLife);
              }}
              onChange={(voiceList) => {
                if (voiceList.length === 0) {
                  setIsEmpty(true);
                } else {
                  setIsEmpty(false);
                }
                if (voiceList.length < 10) {
                  setIsVoiceMoreDispaly(false);
                } else {
                  setIsVoiceMoreDispaly(true);
                }
              }}
            />
          </div>
        )}

        {/* voice detail modal */}
        <VoiceModelDetailDrawerModal
          publishId={selectedVoiceModel?.publish_id}
          isOpen={selectedVoiceModel !== null}
          onChange={(isOpen) => {
            if (!isOpen) {
              setSelectedVoiceModel(null);
            }
          }}
        />

        {/* digital life detail modal */}
        {/* <DigitalLifeDetailDrawerModal
          publishId={selectedDigitalLife?.p_id}
          selectedDigitalLife={selectedDigitalLife}
          isOpen={selectedDigitalLife !== null}
          onChange={(isOpen) => {
            if (!isOpen) {
              setSelectedDigitalLife(null);
            }
          }}
        /> */}
        <DigitalLifeDetailDrawerModal
          publishId={DEFAULT_DIGITALLIFE.p_id}
          selectedDigitalLife={DEFAULT_DIGITALLIFE}
          isOpen={isModalOpen}
          onChange={(isOpen) => {
            if (!isOpen) {
              setSelectedDigitalLife(null);
            }
          }}
          onRunSuccess={(p_id, success) => {
            console.log(p_id, success);
            if (!success) {
              setIsModalOpen(false);
            }
          }}
        />
      </div>
    </>
  );
};

export default AssetsStore;
