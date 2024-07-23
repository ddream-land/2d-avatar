"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import PlayButton from "@/components/assets_store/voiceassets/voice-preview/PlayButton";
import { cn, Skeleton } from "@nextui-org/react";
import { usePlayBtnDispatch } from "@/components/assets_store/voiceassets/voice-preview/PlayButtonContextProvider";

function VoicePreviewDigital({
  voiceSrc,
  classNames = {
    playButton: "",
  },
  onTimeChange,
}: {
  voiceSrc: string;
  classNames?: {
    playButton?: string;
  };
  onTimeChange?: (res: { currentTime: number; duration: number | null }) => void;
}) {
  const containerRef = useRef(null);
  const playBtnDispatch = usePlayBtnDispatch();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    height: 32,
    barWidth: 3,
    barRadius: 3,
    waveColor: "#a0a0aa",
    progressColor: "#9353d3",
    cursorColor: "transparent",
    dragToSeek: true,
    url: voiceSrc,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const duration = wavesurfer && wavesurfer.getDuration();

  const onChangePlay = (play: boolean) => {
    onPlayPause();
    // if (play) {
    //   playBtnDispatch({
    //     type: "pause",
    //     payload: {
    //       audio: wavesurfer,
    //     },
    //   });
    // }
  };

  // bump
  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on("finish", () => {
        wavesurfer.stop();
        wavesurfer.seekTo(0);
      });

      return () => {
        wavesurfer.unAll();
      };
    }
  }, [wavesurfer]);

  useEffect(() => {
    onTimeChange && onTimeChange({ currentTime: currentTime, duration: duration });
  }, [currentTime, duration]);

  return (
    <div className="h-full w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll">
      <div className="shrink-0 h-full">
        {isReady ? (
          <div className="h-8 w-8 flex items-center justify-center">
            <PlayButton
              isPlay={isPlaying}
              // isPlay={isAudioPlaying}
              onChange={onChangePlay}
              wavesurfer={wavesurfer}
              classNames={{
                base: classNames.playButton,
              }}
            />
          </div>
        ) : (
          <Skeleton className="w-8 h-8 rounded-lg" />
        )}
      </div>
      <div className="w-full h-8 relative">
        <div ref={containerRef} className="w-full " />
        <div
          className={cn(isReady ? "hidden" : "flex", " absolute top-0 left-0 w-full h-full items-center justify-start")}
        >
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default VoicePreviewDigital;
