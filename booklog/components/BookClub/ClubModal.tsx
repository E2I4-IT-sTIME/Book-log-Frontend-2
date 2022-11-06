import { clubInfo, Stage } from "../../res/interface/BookClubInterface";
import { useState } from "react";
import Image from "next/image";
import ClubModalInfoBox from "./ClubModalInfoBox";
import ClubModalJoinBox from "./ClubModalJoinBox";
import ClubModalCompleteBox from "./ClubModalCompleteBox";

interface itemProps {
  item: clubInfo;
}

export default function ClubModal(props: itemProps) {
  const { item } = props;
  const [stage, setStage] = useState<Stage>(Stage.Introduce);

  return (
    <div className="container">
      <div className="img-box">
        <Image src={item.image} layout="fill" objectFit="cover" />
      </div>
      {stage === Stage.Introduce ? (
        <ClubModalInfoBox item={item} setStage={setStage} />
      ) : stage === Stage.Join ? (
        <ClubModalJoinBox id={item.id} setStage={setStage} />
      ) : stage === Stage.Complete ? (
        <ClubModalCompleteBox />
      ) : (
        <></>
      )}
      <div className="glass" />
      <Image src={item.image} layout="fill" objectFit="cover" />
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 30px;
          position: relative;
          padding: 20px;
        }
        .glass {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 10;
          filter: brightness(70%);
        }
        .img-box {
          width: 100%;
          max-width: 500px;
          height: 500px;
          position: relative;
          z-index: 20;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        }
      `}</style>
    </div>
  );
}
