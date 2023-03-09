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
  const [blur, setBlur] = useState(false);

  // 초기 렌더링 당시에 메트로놈 사운드 설정해주기.

  useEffect(() => {
    setTick(new Audio(tickSound));
    setTock(new Audio(tockSound));
  }, []);

  const metronomeSoundHandler = useCallback(() => {
    setPlaying(true);

    tick && tick.play();
  }, [tick]);

  const focusHandler = () => {
    setBlur(false);
  };

  const numberInputBlurHandler = () => {
    // 메트로놈 최소값이 1보다 작으면 1로 설정
    if (inputRef.current && number > 200) {
      setNumber(200);
      inputRef.current.blur();
    }
    if (inputRef.current && isNaN(number)) {
      setNumber(1);
      inputRef.current.blur();
    }
    setBlur(true);
  };
  // bpm 소리가 반복되도록 하기

  useEffect(() => {
    const interval = setInterval(() => {
      metronomeSoundHandler();
    }, (60 / number) * 1000);

    return () => clearInterval(interval);
  }, [number, metronomeSoundHandler]);

  // const numberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const num = parseInt(e.target.value);
  //   setNumber(num);
  //   if (num > 200) {
  //     setNumber(200);
  //   }
  //   if (inputRef.current && isNaN(num)) {
  //     inputRef.current.focus();
  //   }
  //   if (inputRef.current && num > 200) {
  //     inputRef.current.blur();
  //   }
  // };

  const numberInputKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      let num = parseInt(event.currentTarget.value);
      if (isNaN(num)) {
        setNumber(1);
        event.currentTarget.blur();
      } else {
        event.currentTarget.blur();
      }
    }
  };
  useEffect(() => {
    if (!isNaN(number) && blur) {
      console.log("number : ", number);
    }
  }, [number, blur]);

  // input이 포커싱을 벗어났을때만 콘솔창이 출력되어야함.

  return (
    <>
      <input
        ref={inputRef}
        type={"number"}
        min={1}
        max={200}
        step={1}
        value={number}
        // onChange={numberHandler}
        onBlur={numberInputBlurHandler}
        onFocus={focusHandler}
        onKeyDown={numberInputKeyPressHandler}
      />
      <p>현재 숫자 : {Number.isNaN(number) ? "" : number}</p>
      <button onClick={metronomeSoundHandler}>
        {playing ? "일시정지" : "재생"}
      </button>
    </>
  );
}
