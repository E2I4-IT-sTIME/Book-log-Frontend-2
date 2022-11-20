import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { recoilLoginedState } from "../../../states/recoilLogiendState";
import { bookImgSearch } from "../common/fetchBook";

const ReviewCard = (props) => {
  const [isLogined, setisLogined] = useRecoilState(recoilLoginedState);
  const { title, sub, content, date, isbn } = props.review;
  const [bookImgSrc, setBookImgSrc] = useState("");

  const srcHandler = async () => {
    setBookImgSrc(await bookImgSearch(isbn));
  };

  useEffect(() => {
    srcHandler();
  }, []);

  return (
    <>
      <div className="review-container">
        <div className="img-box">
          <img src={bookImgSrc || "/defaultBookImg.jpg"}></img>
        </div>
        <div className="text-box">
          <div className="main">
            <div className="sub">{sub}</div>
            <div className="title">{title}</div>
            <div className="date">{date}</div>
            <div className="content">{content}</div>
          </div>
          {isLogined ? <div className="delete">-</div> : ""}
        </div>
      </div>
      <style jsx>{`
        .review-container {
          display: flex;
          flex-direction: row;
          background-color: white;
          border-radius: 20px;
          width: 100%;
          height: 100%;
          cursor: pointer;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        }
        .img-box {
          width: 30%;
          height: 100%;
          background: url("/defaultBookImg.jpg") no-repeat;
          padding: 15px;
          border-radius: 10px 0 0 10px;
        }
        .text-box {
          width: 70%;
          padding: 2%;
          display: flex;
          justify-content: space-between;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
        .main {
          display: flex;
          flex-direction: column;
          width: 85%;
          padding: 5px;
          gap: 5px;
        }
        .title {
          font-size: 25px;
          font-weight: 700;
        }
        .date,
        .sub {
          font-size: 14px;
        }
        .content {
          font-size: 15px;
        }
        .delete {
          background-color: #ff8396;
          border-radius: 50%;
          color: white;
          height: 20px;
          width: 20px;
          line-height: 20px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
export default ReviewCard;
