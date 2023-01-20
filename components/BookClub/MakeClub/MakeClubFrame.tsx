import { useState, useEffect } from "react";
import MakeClubBox from "./MakeClubBox";
import MakeClubComplete from "./MakeClubComplete";

enum Stage {
  Make,
  Complete,
}

export default function MakeClubFrame() {
  const [stage, setStage] = useState(Stage.Make);
  return (
    <div className="container">
      {stage === Stage.Make ? (
        <MakeClubBox setStage={setStage} />
      ) : (
        <MakeClubComplete />
      )}
      <style jsx>{`
        .container {
          width: 100%;
          padding: 20px;
          border-radius: 10px;
          background-color: white;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
      `}</style>
    </div>
  );
}
