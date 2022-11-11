import Image from "next/image";
import noSign from "../../res/noSign.svg";

const PortfolioCard = (props: any) => {
  const { title, sub, backgroundImg, thumnailArr } = props;
  const brText = (text: string) => {
    return (
      <span>
        {text.split("\n").map((txt: String) => (
          <>
            {txt}
            <br />
          </>
        ))}
      </span>
    );
  };
  return (
    <>
      <div className="portCard-container">
        <div className="text-box">
          <div className="title">{brText(title)}</div>
          <div className="sub">{brText(sub)}</div>
        </div>
        <div className="img-box">
          <div className="profile-box">
            <Image src={noSign} width="50px" height="50px" />
          </div>
          <div className="thumnail-box">
            {thumnailArr.map((imgSrc: string) => (
              <Image
                src={imgSrc}
                width={30}
                height={70}
                style={{
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .portCard-container {
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          background: url(${backgroundImg}) no-repeat center center;
          background-size: cover;
          display: flex;
          flex-direction: row;
          width: 48%;
          height: 260px;
          padding: 10px;
          border-radius: 20px;
          padding: 30px;
          cursor: pointer;
        }
        .text-box {
          width: 60%;
          height: 100%;
          display: flex;
          flex-direction: column;
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
          flex-direction: column;
          justify-content: space-between;
        }
        .profile-box {
          display: flex;
          justify-content: flex-end;
        }
        .thumnail-box {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
};

export default PortfolioCard;
