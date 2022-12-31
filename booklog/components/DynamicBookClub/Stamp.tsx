import Image from "next/image";
import { emojis, ments } from "../../res/emoji/emoji";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface StampProps {
  isCompleted: boolean;
  date: string;
  attendance: () => void;
}

export default function Stamp(props: StampProps) {
  const { isCompleted, date, attendance } = props;
  const [emoji, setEmoji] = useState(
    emojis[Math.floor(Math.random() * emojis.length)]
  );
  const [ment, setMent] = useState(
    ments[Math.floor(Math.random() * ments.length)]
  );

  const attend = () => {
    if (confirm("오늘 모임에 출석체크 하시겠습니까?")) {
      attendance();
    }
  };

  return (
    <div className="container">
      <div className="emoji-wrapper">
        <Image src={emoji} width={30} height={30} alt="emoji" />
      </div>
      <div className="date-wrapper">
        <span>{moment(date).format("YYYY-MM-DD")}</span>
        <span>{moment(date).format("A hh:mm")}</span>
      </div>
      <div className="vertical-line" />
      <div className="ment">
        {isCompleted ? ment : "오늘 독서모임을 완료하셨다면?\n도장 쾅!"}
      </div>
      <div
        className={`box ${isCompleted ? "checked" : "non-checked"}`}
        onClick={() => (!isCompleted ? attend() : null)}
      >
        {isCompleted ? <FontAwesomeIcon icon={faCheck} /> : <></>}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 90px;
          border-radius: 20px;
          background-color: white;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 30px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          padding: 10px 40px;
          position: relative;
        }
        .emoji-wrapper {
          width: 65px;
          height: 65px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }
        .date-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          color: #434343;
          font-weight: 700;
        }
        .date-wrapper span:nth-child(1) {
          font-size: 16px;
        }
        .date-wrapper span:nth-child(2) {
          font-size: 14px;
        }
        .vertical-line {
          width: 1px;
          height: 90%;
          background-color: #d1d3d4;
        }
        .ment {
          font-size: 16px;
          color: #434343;
          white-space: pre-line;
        }
        .box {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          font-size: 20px;
          color: white;
          justify-self: end;
          cursor: pointer;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translate(0%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .checked {
          background-color: #125b50;
        }
        .non-checked {
          background-color: #ff6363;
        }
      `}</style>
    </div>
  );
}
