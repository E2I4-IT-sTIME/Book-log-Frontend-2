import Image from "next/image";
import noSign from "../../res/noSign.svg";

const PortfolioCard = (props: any) => {
  const { title, sub } = props;
  return (
    <>
      <div className="container">
        <div className="text-box">
          <div className="title">{title}</div>
          <div className="sub">{sub}</div>
        </div>
        <div className="img-box">
          <div className="profile-box">
            <Image src={noSign} width="20px" height="20px" />
          </div>
          <div className="thumnail-box">
            <div className="thumnail"></div>
            <div className="thumnail"></div>
            <div className="thumnail"></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          background: url("../../res/protBackground.png");
          display: flex;
          flex-direction: column;
          width: 45%;
          height: 250px;
          padding: 10px;
        }
        .text-box {
          width: 60%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          color: white;
          gap: 10px;
        }
        .title {
          font-size: 24px;
          font-weight: 700;
        }
        .sub {
          font-size: 16px;
        }
        .img-box {
          width: 40%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .thumnail-box {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default PortfolioCard;
