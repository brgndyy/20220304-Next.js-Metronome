"use client";
import React, { useRef, useState, useEffect } from "react";

import tickSound from "../../public/sounds/tick1.wav";
import tockSound from "../../public/sounds/tick2.wav";

export default function Metronome() {
  const [bpm, setBpm] = useState(60);
  const [playing, setPlaying] = useState(false);
  const inputRef = useRef(null);
  const [tick, setTick] = useState<HTMLAudioElement>();
  const [tock, setTock] = useState<HTMLAudioElement>();

  // 초기 렌더링 당시에 메트로놈 사운드 설정해주기.

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));
  }, []);

  const metronomeSoundHandler = () => {
    tick && tick.play();
  };

  const metronomeInputBlurHandler = () => {
    // 메트로놈 최소값이 1보다 작으면 1로 설정
    if (bpm < 1) {
      setBpm(1);
      // 메트로놈 최댓값을 200으로 설정
    } else if (bpm > 200) {
      setBpm(200);
    }
    if (Number.isNaN(bpm)) {
      setBpm(1);
    }
  };

  // bpm 소리가 반복되도록 하기

  useEffect(() => {
    const interval = setInterval(() => {
      metronomeSoundHandler();
    }, (60 / bpm) * 1000);

    return () => clearInterval(interval);
  }, [bpm, metronomeSoundHandler]);

  const metronomeLoudnessHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    setBpm(num);
  };

  return (
    <>
      <input
        ref={inputRef}
        type={"number"}
        min={1}
        max={200}
        step={1}
        value={bpm}
        onChange={metronomeLoudnessHandler}
        onBlur={metronomeInputBlurHandler}
      />
      <p>현재 bpm : {Number.isNaN(bpm) ? "" : bpm}</p>
      <button onClick={metronomeSoundHandler}>Play</button>
    </>
  );
}
