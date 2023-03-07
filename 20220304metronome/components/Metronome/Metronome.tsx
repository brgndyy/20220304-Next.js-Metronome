"use client";
import React, { useRef, useState } from "react";
import Sound from "components/Sound/Sound";

export default function Metronome() {
  const [bpm, setBpm] = useState(60);
  const inputRef = useRef(null);

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
      <Sound bpm={bpm} />
    </>
  );
}
