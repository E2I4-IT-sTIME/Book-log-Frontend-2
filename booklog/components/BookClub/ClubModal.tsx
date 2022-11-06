import { clubInfo } from "../../res/interface/BookClubInterface";
import Image from "next/image";
import Link from "next/link";

interface itemProps {
  item: clubInfo;
}

export default function ClubModal(props: itemProps) {
  const { item } = props;
  return (
    <div className="container">
      <div className="img-box">
        <Image src={item.image} layout="fill" objectFit="cover" />
      </div>
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
        <Link href="">
          <a>가입 신청하러 가기</a>
        </Link>
        <Link href="">
          <a>규정에 어긋나는 모임을 발견했다면, 이곳을 눌러주세요.</a>
        </Link>
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
          filter: brightness(50%);
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
        .info-box {
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

        a {
          font-size: 16px;
          color: white;
          text-shadow: 1px 1px 2px #141414;
          font-weight: 400;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
