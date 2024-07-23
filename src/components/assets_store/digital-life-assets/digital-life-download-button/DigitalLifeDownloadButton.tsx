"use client";
import React, { useEffect, useState } from "react";
import { downloadVoiceModel } from "@/lib/voice.api";
import { useAmDispatch } from "@/components/common/AlterMessageContextProvider";
import { downloadFiles, sleep } from "@/lib/utils";
import { exportDigitalLifeCard } from "@/lib/digitallife.api";

function DigitalLifeDownloadButton({
  publishId,
  modelId,
  startDownload = 0,
  onDownloading,
}: {
  publishId?: string;
  modelId?: string;
  startDownload: number;
  onDownloading: (downlading: boolean) => void;
}) {
  const [downlanding, setDownlanding] = useState(false);
  const amDispatch = useAmDispatch();

  const downloadVoiceModelApi = downloadVoiceModel();
  const exportDigitalLifeCardApi = exportDigitalLifeCard();
  const downloadDigitalLifeCardServer = async () => {
    if (downlanding) {
      return;
    }
    setDownlanding(true);
    onDownloading(true);

    const res = await exportDigitalLifeCardApi.send({
      p_id: publishId || "",
      id: publishId || "",
    });
    if (res && res.code === 0) {
      const files = [];

      if (res.data.avatar_url) {
        files.push(res.data.avatar_url);
      } else {
        amDispatch({
          type: "add",
          payload: {
            message: "Character Card not exist",
            type: "error",
          },
        });
      }

      if (files.length > 0) {
        // downloadFiles(files);
        downloadFiles(files);
      }

      setDownlanding(false);
      onDownloading(false);
    }

    setDownlanding(false);
  };

  useEffect(() => {
    if (startDownload > 0) {
      downloadDigitalLifeCardServer();
    }
  }, [startDownload]);
  return <div className="hidden"></div>;
}

export default DigitalLifeDownloadButton;
