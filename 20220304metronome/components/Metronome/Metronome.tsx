"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

import tickSound from "../../public/sounds/tick1.wav";
import tockSound from "../../public/sounds/tick2.wav";

export default function Metronome() {
  const [number, setNumber] = useState(60);
  const [playing, setPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tick, setTick] = useState<HTMLAudioElement>();
  const [tock, setTock] = useState<HTMLAudioElement>();

  // 초기 렌더링 당시에 메트로놈 사운드 설정해주기.

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));
  }, []);

  const metronomeSoundHandler = useCallback(() => {
    tick && tick.play();
  }, [tick]);

  const metronomeInputBlurHandler = () => {
    // 메트로놈 최소값이 1보다 작으면 1로 설정
    if (number < 1) {
      setNumber(1);
      // 메트로놈 최댓값을 200으로 설정
    } else if (number > 200) {
      setNumber(200);
    }
    if (Number.isNaN(number)) {
      setNumber(1);
    }
  };

  // bpm 소리가 반복되도록 하기

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     metronomeSoundHandler();
  //   }, (60 / bpm) * 1000);

  //   return () => clearInterval(interval);
  // }, [bpm, metronomeSoundHandler]);

  const numberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    setNumber(num);
    if (isNaN(num)) {
      setNumber(1);
    } else if (num > 200) {
      setNumber(200);
    }
    if ((inputRef.current && isNaN(num)) || (inputRef.current && num > 200)) {
      inputRef.current.blur();
    }
    console.log("현재 숫자 : ", number);
  };

  return (
    <>
      <input
        ref={inputRef}
        type={"number"}
        min={1}
        max={200}
        step={1}
        value={number}
        onChange={numberHandler}
        onBlur={metronomeInputBlurHandler}
      />
      <p>현재 숫자 : {Number.isNaN(number) ? "" : number}</p>
    </>
  );
}
