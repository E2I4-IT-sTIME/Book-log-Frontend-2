import { clubInfo } from "../../res/interface/BookClubInterface";
import { useState } from "react";
import Image from "next/image";
import club from "../../res/club.svg";
import UpperBox from "./UpperBox";
import BottomBox from "./BottomBox";

interface clubProps {
  clubs: Array<clubInfo>;
}

export default function ClubLayout(props: clubProps) {
  const { clubs } = props;
  const [curClubs, setClubs] = useState(clubs);

  const resetClubs = (state: boolean) => {
    //내 모임을 보여주거나 전체 모임 보여주거나
    //true 이면 전체모임 보여주기 - false이면 내 모임 보여주기
  };

  return (
    <div className="container">
      <div className="upper-box">
        <div className="upper-circle" />
        <div className="upper-img-cover">
          <div className="upper-img-box">
            <Image src={club} layout="fill" objectFit="cover" />
          </div>
        </div>
        <UpperBox setClubs={resetClubs} />
      </div>
      <div className="bottom-box">
        <BottomBox clubs={curClubs} />
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: 200px;
        }
        .upper-box {
          width: 100%;
          height: 600px;
          background-color: #faf5e4;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding-right: 500px;
        }
        .upper-circle {
          width: 400px;
          height: 400px;
          background-color: #125b50;
          border-radius: 100%;
          position: absolute;
          bottom: -50px;
          right: -50px;
        }
        .upper-img-cover {
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
        .upper-img-box {
          width: 400px;
          height: 380px;
          position: relative;
        }
        .bottom-box {
          width: 90%;
          padding-top: 30px;
        }
      `}</style>
    </div>
  );
}
