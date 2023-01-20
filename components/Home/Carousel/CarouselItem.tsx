import { clubInfo } from "../../../res/interface/HomeInterface";
import Image from "next/image";

interface itemProps {
  index: number;
  item: clubInfo;
  length: number;
}

export default function CarouselItem(props: itemProps) {
  const { index, item, length } = props;
  return (
    <div className="container">
      <Image src={item.image} layout="fill" objectFit="cover" alt={item.name} />
      <div className="glass" />
      <div className="text-box">
        <span className="title">{item.name}</span>
        <span className="onoff">
          {item.onoff ? "온라인 모임" : "오프라인 모임"}
        </span>
        <div className="tags">
          {item.tags.map((tag, index) =>
            tag !== null ? <span key={tag}>#{tag}</span> : <></>
          )}
        </div>
        <div className="nums">
          <span>모집인원 : {item.max_num}명</span>
          <span>현재인원 : {item.cur_num}명</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 300px;
          height: 400px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          margin-left: ${index === 0 ? "40px" : "0px"};
          margin-right: ${index + 1 === length ? "40px" : "0px"};
          box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          transition: all 0.25s;
        }
        .container:hover {
          transform: scale(1.02);
        }
        .container:active {
          transform: scale(0.98);
        }
        .glass {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 10px;
        }
        .text-box {
          position: absolute;
          width: 260px;
          height: 360px;
          bottom: 20px;
          left: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          color: white;
          gap: 10px;
          word-break: keep-all;
        }
        .title {
          font-weight: 800;
          font-size: 24px;
        }
        .onoff {
          font-weight: 400;
          font-size: 16px;
        }
        .tags {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 5px;
          font-weight: 400;
          font-size: 16px;
        }
        .nums {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-size: 18px;
          font-weight: 400;
          gap: 2px;
        }
      `}</style>
    </div>
  );
}
