import { clubInfo } from "../../res/interface/BookClubInterface";
import { useState } from "react";
import Image from "next/image";
import BasicModal from "./../BasicModal";
import ClubModal from "./ClubModal";

interface itemProps {
  item: clubInfo;
}

export default function BottomBoxItem(props: itemProps) {
  const { item } = props;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="container" onClick={() => setModalOpen(true)}>
        <div className="info-box">
          <span className="club-name">{item.name}</span>
          <span className="sub-info">
            {item.onoff ? "대면 모임" : "비대면 모임"} ({item.cur_num}/
            {item.max_num})
          </span>
          <div className="tag-box">
            {item.tags.map((tag, index) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="trans-box" />
        <div className="img-box">
          <Image src={item.image} layout="fill" objectFit="cover" />
        </div>
        <style jsx>{`
          .container {
            width: 100%;
            height: 450px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
              rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
            position: relative;
            cursor: pointer;
          }
          .img-box {
            width: 100%;
            height: 100%;
            position: relative;
          }
          .trans-box {
            width: 100%;
            height: 70%;
            position: absolute;
            bottom: 0px;
            background: linear-gradient(to top, #000000, #00ff0000);
            z-index: 10;
          }
          .info-box {
            width: 88%;
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 10px;
            color: white;
            z-index: 20;
            white-space: pre-line;
            text-align: end;
          }
          .club-name {
            font-size: 18px;
            font-weight: 800;
          }
          .sub-info {
            font-size: 14px;
            font-weight: 600;
          }
          .tag-box {
            font-size: 14px;
            font-weight: 300;
            display: flex;
            flex-direction: row;
            gap: 5px;
            justify-content: flex-end;
            flex-wrap: wrap;
          }
        `}</style>
      </div>
      <BasicModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        header={`${item.name} 모임`}
      >
        <ClubModal item={item} />
      </BasicModal>
    </>
  );
}
