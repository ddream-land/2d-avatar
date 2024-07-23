"use client";
import React, { useEffect, useState } from "react";
// import VoiceAssetDetailLeft from "./VoiceModelDetailLeft";
// import VoiceAssetDetailRight from "./VoiceModelDetailRight";
import { getVoicePublishInfo } from "@/lib/voice.api";
import { VoiceModelPublishType } from "@/lib/definitions.voice";
import { getDigitalLifeInfoPublic } from "@/lib/digitallife.api";
import {
  DEFAULT_DIGITAL_LIFE_DETAIL_INFO,
  DigitalLifeCardType,
  DigitalLifeDetailType,
} from "@/lib/definitions.digitallife";
import DigitalLifeDetailLeft from "./DigitalLifeDetailLeft";
import DigitalLifeDetailRight from "./DigitalLifeDetailRight";

function DigitalLifeDetail({
  publishId,
  selectedDigitalLife,
  onRunSuccess,
}: {
  publishId: string;
  selectedDigitalLife: DigitalLifeCardType | null;
  onRunSuccess: (p_id: string, success: boolean) => void;
}) {
  const getDigitalLifePublicInfoApi = getDigitalLifeInfoPublic();
  // const [voicePublishInfo, setVoicePublishInfo] = useState<VoiceModelPublishType>();
  const [digitalLifePublicInfo, setDigitalLifePublicInfo] = useState<DigitalLifeDetailType>();
  const [loading, setLoading] = useState(false);

  // console.log(digitalLifePublicInfo);

  const getDigitalLifePublicInfoToServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getDigitalLifePublicInfoApi.send({
      p_id: publishId,
    });
    if (res && res.code === 0) {
      setDigitalLifePublicInfo(res.data);
      console.log(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (publishId) {
      // getDigitalLifePublicInfoToServer();
      setDigitalLifePublicInfo(DEFAULT_DIGITAL_LIFE_DETAIL_INFO);
    }
  }, []);

  return (
    <div className="w-full bg-black/opacity-30 rounded-2xl flex-col justify-start items-end gap-2.5 inline-flex">
      <div className="self-stretch pb-16 bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl flex-col justify-start items-center gap-2.5 flex">
        <div className="w-full pt-16 pb-6">
          {/* <div className="w-full">
              {voicePublishInfo && (<VoiceAssetDetailHeader voicePublishInfo={voicePublishInfo}/>)}
            </div> */}
          <div className="w-full justify-between items-start gap-12 flex">
            <div className="grow overflow-hidden">
              {digitalLifePublicInfo && <DigitalLifeDetailLeft digitalLifePublicInfo={digitalLifePublicInfo} />}
            </div>
            <div className="shrink">
              {digitalLifePublicInfo && (
                <DigitalLifeDetailRight
                  digitalLifePublicInfo={digitalLifePublicInfo}
                  selectedDigitalLife={selectedDigitalLife}
                  onRunSuccess={onRunSuccess}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalLifeDetail;
