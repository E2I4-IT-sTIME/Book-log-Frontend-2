import { clubInfo } from "../../res/interface/BookClubInterface";
import Image from "next/image";
import Router from "next/router";

interface itemProps {
  item: clubInfo;
  closeModal: () => void;
}

export default function ClubModalToMember(props: itemProps) {
  const { item, closeModal } = props;
  const router = Router;

  return (
    <div className="container">
      <div className="img-box">
        <Image src={item.image} layout="fill" objectFit="cover" />
      </div>
      <div className="left-box">
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
        </div>
        <div className="info-box">
          <button className="enter-btn" onClick={() => closeModal()}>
            다른 독서모임 구경하기
          </button>
          <button
            className="enter-btn"
            onClick={() => router.push(`/bookclub/${item.id}`)}
          >
            입장하기
          </button>
        </div>
      </div>
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
        .left-box {
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          z-index: 20;
          gap: 30px;
          align-self: center;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 5px;
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
        .enter-btn {
          background-color: #ffffff;
          border: none;
          color: #125b50;
          border-radius: 5px;
          padding: 5px 15px;
          font-size: 16px;
          font-weight: 700;
          font-family: "Pretendard";
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
        }
        .enter-btn:hover {
          background-color: #125b50;
          color: white;
        }
      `}</style>
    </div>
  );
}
