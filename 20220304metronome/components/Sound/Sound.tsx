"use client";
import { useState, useEffect } from "react";
import tickSound from "../../public/sounds/tick1.wav";
import tockSound from "../../public/sounds/tick2.wav";

type bpmProps = {
  bpm: number;
};

export default function Sound({ bpm }: bpmProps) {
  const [tick, setTick] = useState<HTMLAudioElement>();
  const [tock, setTock] = useState<HTMLAudioElement>();

  const metronomeSoundHandler = () => {
    tick && tick.play();
  };

  // 초기 렌더링 당시에 메트로놈 사운드 설정해주기.

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));
  }, []);

  // bpm 소리가 반복되도록 하기

  useEffect(() => {
    const interval = setInterval(() => {
      metronomeSoundHandler();
    }, (60 / bpm) * 1000);

    return () => clearInterval(interval);
  }, [bpm]);

  return (
    <>
      <button onClick={metronomeSoundHandler}>Play</button>
    </>
  );
}
