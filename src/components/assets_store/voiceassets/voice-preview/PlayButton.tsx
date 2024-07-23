"use client";
import React, { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/24/solid";
import { usePlayBtnDispatch } from "./PlayButtonContextProvider";

function PlayButton({
  isPlay = false,
  onChange,
  voiceSrc,
  wavesurfer,
  classNames = {
    base: "w-8 h-8",
  },
}: {
  isPlay?: boolean;
  onChange?: (isPlay: boolean) => void;
  voiceSrc?: string;
  wavesurfer?: any;
  classNames?: {
    base?: string;
  };
}) {
  const [playing, setPlaying] = useState(isPlay);
  const audioRef = useRef<HTMLAudioElement>();

  const playBtnDispatch = usePlayBtnDispatch();

  // useEffect(() => {
  //   if (!voiceSrc || voiceSrc === "") return;
  //   if (playing) {
  //     playBtnDispatch({
  //       type: "pause",
  //       payload: {
  //         audio: audioRef.current,
  //       },
  //     });
  //     audioRef.current?.play();
  //   } else {
  //     audioRef.current?.pause();
  //   }
  // }, [playing]);

  // 优化play
  useEffect(() => {
    if (!voiceSrc || voiceSrc === "") return;

    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlayPause = async () => {
      try {
        if (playing) {
          if (audioElement.paused || audioElement.ended) {
            audioElement.currentTime = 0; // 重置到开始
            // playBtnDispatch({
            //   type: "pause",
            //   payload: {
            //     audio: audioRef.current,
            //   },
            // });
            await audioElement.play();
          }
        } else {
          audioElement.pause();
        }
      } catch (error) {
        console.error("音频播放错误:", error);
        setPlaying(false);
      }
    };

    handlePlayPause();

    // 添加结束事件监听器
    const handleEnded = () => {
      setPlaying(false);
    };
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [playing, voiceSrc]);

  return (
    <div>
      {isPlay && (
        <div
          className={`${classNames.base} cursor-pointer bg-white rounded-full flex items-center justify-center`}
          onClick={() => {
            onChange && onChange(false);
            setPlaying(false);
          }}
        >
          <PauseIcon className="h-5 w-5 fill-black stroke-black stroke-1" />
        </div>
      )}
      {!isPlay && (
        <div
          className={`${classNames.base} cursor-pointer bg-white rounded-full flex items-center justify-center`}
          onClick={() => {
            onChange && onChange(true);
            setPlaying(true);
          }}
        >
          <PlayIcon className="h-5 w-5 fill-black stroke-black ml-0.5" />
        </div>
      )}
      {voiceSrc && (
        <audio
          src={voiceSrc}
          ref={audioRef as any}
          onProgress={(e) => {
            // console.log("onProgress", e)
          }}
          onPause={(e) => {
            onChange && onChange(false);
            setPlaying(false);
          }}
        />
      )}
    </div>
  );
}

export default PlayButton;
