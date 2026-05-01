// src/screens/Stimulus.jsx
import React from "react";
import AframeStimulus from "../components/AframeStimulus";
import TextStimulus from "../components/TextStimulus";
import { STIMULI } from "../data/stimuli";

export default function Stimulus({ war, mediaCell, onComplete, onWithdraw }) {
  const stim = STIMULI[war];

  if (mediaCell === "text") {
    return (
      <TextStimulus war={war} mediaCell={mediaCell}
        text={stim.text} durationSec={stim.durationSec}
        onComplete={onComplete} onAbort={onComplete} />
    );
  }
  // video360 또는 vrhmd 둘 다 같은 컴포넌트, A-Frame이 모드 알아서 처리
  return (
    <AframeStimulus war={war} mediaCell={mediaCell}
      videoUrl={stim.video360Url} durationSec={stim.durationSec}
      onComplete={onComplete} onAbort={onComplete} />
  );
}
