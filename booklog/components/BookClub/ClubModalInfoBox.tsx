import { clubInfo, Stage } from "../../res/interface/BookClubInterface";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

interface itemProps {
  item: clubInfo;
  setStage: Dispatch<SetStateAction<Stage>>;
}

export default function ClubModalInfoBox(props: itemProps) {
  const { item, setStage } = props;
  return (
    <div className="info-box">
      <span className="title">{item.name}</span>
      <span className="manager">클럽 매니저 - {item.username}</span>
      <span className="style">
        {item.onoff ? "대면 모임" : "비대면 모임"} ({item.cur_num}/
        {item.max_num})
      </span>
      <div className="tag-box">
        {item.tags.map((tag, index) => (
          <span className="tag" key={`${tag}-${index}`}>
            #{tag}
          </span>
        ))}
      </div>
      <span className="content">{item.info}</span>

      <span className="underline-text" onClick={() => setStage(Stage.Join)}>
        가입 신청하기
      </span>
      <span className="underline-text">
        규정에 어긋나는 모임을 발견했다면, 이곳을 눌러주세요.
      </span>

      <style jsx>{`
        .info-box {
          width: 100%;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 5px;
          padding: 20px 0px;
        }
        .title {
          font-size: 28px;
          color: white;
          font-weight: 700;
          text-shadow: 2px 2px 4px #141414;
        }
        .manager {
          font-size: 16px;
          font-weight: 400;
          color: white;
          text-shadow: 1px 1px 2px #141414;
        }
        .style {
          font-size: 14px;
          font-weight: 600;
          background-color: ${item.onoff ? "#125B50" : "#F94C66"};
          padding: 5px 7px;
          border-radius: 5px;
          color: white;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
          margin-top: 2px;
        }
        .tag-box {
          display: flex;
          flex-direction: row;
          gap: 5px;
          font-size: 14px;
          font-weight: 400;
          color: white;
          text-shadow: 1px 1px 2px #141414;
          flex-wrap: wrap;
        }
        .content {
          text-align: start;
          white-space: pre-line;
          word-break: keep-all;
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(17.5px);
          -webkit-backdrop-filter: blur(17.5px);
          border-radius: 5px;
          padding: 20px;
          margin: 10px 0px;
          line-height: 22px;
        }

        .underline-text {
          font-size: 16px;
          color: white;
          text-shadow: 1px 1px 2px #141414;
          font-weight: 400;
          text-decoration: underline;
          cursor: pointer;
          transition: all 0.15s;
        }
        .underline-text:hover {
          font-size: 16.2px;
        }
        .underline-text:active {
          font-size: 15.9px;
        }
      `}</style>
    </div>
  );
}
