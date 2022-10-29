import swyg from "../../res/swyg.png";
import ItsTime from "../../res/itsTime.jpg";
import Image from "next/image";

export default function PartnerShip() {
  return (
    <div className="container">
      <span>
        {
          "BookLog에서 나만의 서평을 작성하고, 공유할 수 있어요.\n작성된 서평을 엮어 제출용 포트폴리오를 제작해보세요.\n혼자 책 읽기 심심하다면, 독서 모임을 만들 수 있어요."
        }
      </span>
      <div className="partners">
        <div className="swyg">
          <Image
            src={swyg}
            layout="fill"
            objectFit="cover"
            alt="SWYG Partnership"
          />
        </div>
        <div className="itstime">
          <Image
            src={ItsTime}
            layout="fill"
            objectFit="cover"
            alt="It'sTime 1st Team"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100px;
          background-color: white;
          border-top: 2px solid #c0c0c09e;
          border-bottom: 2px solid #c0c0c09e;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          white-space: pre-line;
        }
        .container span {
          font-size: 14px;
          font-weight: 300;
          text-align: center;
        }
        .partners {
          display: flex;
          justify-content: center;
          gap: 20px;
          align-items: center;
        }
        .swyg {
          position: relative;
          width: 120px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
        }
        .itstime {
          position: relative;
          width: 50px;
          height: 50px;
        }
      `}</style>
    </div>
  );
}
