import Image from "next/image";
import Link from "next/link";
import noSign from "../../../res/noSign.svg";
import { brText } from "../common/brText";
import ThumnailCard from "../common/thumnailCard";

const PortfolioCard = (props: any) => {
  const { title, content, backgroundImg, isbnArr, id } = props;
  return (
    <>
      <Link href={`/portfolio/${id}`}>
        <div className="portCard-container">
          <div className="text-box">
            <div className="title">{brText(title)}</div>
            <div className="sub">{brText(content)}</div>
          </div>
          <div className="img-box">
            <div className="profile-box">
              <Image src={noSign} width="50px" height="50px" />
            </div>
            <div className="thumnail-box">
              {isbnArr.map((isbn: string) => (
                <ThumnailCard isbn={isbn} />
              ))}
            </div>
          </div>
        </div>
      </Link>
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
