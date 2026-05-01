// src/App.jsx
import React, { useEffect, useState } from "react";
import Landing from "./screens/Landing";
import Consent from "./screens/Consent";
import Screening from "./screens/Screening";
import PreSurvey from "./screens/PreSurvey";
import DeviceCheck from "./screens/DeviceCheck";
import Stimulus from "./screens/Stimulus";
import PostSurvey from "./screens/PostSurvey";
import Debrief from "./screens/Debrief";
import { flushQueue } from "./lib/api";

export default function App() {
  const [step, setStep] = useState("landing");
  const [assignment, setAssignment] = useState(null);

  useEffect(() => { flushQueue(); }, []);

  const cell = assignment?.mediaCell;

  if (step === "landing") return <Landing onStart={() => setStep("consent")} />;
  if (step === "consent") return <Consent onAgree={() => setStep("screening")} />;
  if (step === "screening") return <Screening onPass={() => setStep("pre")} />;
  if (step === "pre") return <PreSurvey onDone={() => setStep("device")} />;
  if (step === "device")
    return <DeviceCheck onAssigned={(a) => { setAssignment(a); setStep("stim1"); }} />;
  if (step === "stim1")
    return (
      <Stimulus war="GA" mediaCell={cell}
        onComplete={() => setStep("post1")}
        onWithdraw={() => setStep("debrief")} />
    );
  if (step === "post1")
    return <PostSurvey war="GA" onDone={() => setStep("debrief")} />;
  if (step === "debrief") return <Debrief />;

  return null;
}
