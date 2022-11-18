import Image from "next/image";
import { useEffect, useState } from "react";
import { bookImgSearch } from "../common/fetchBook";

const BookReviewCard = (props) => {
  const { title, content, date, isbn } = props;

  const [bookImgSrc, setBookImgSrc] = useState("");

  const srcHandler = async () => {
    setBookImgSrc(await bookImgSearch(isbn));
    console.log(bookImgSrc);
  };

  useEffect(() => {
    srcHandler();
  }, []);

  return (
    <>
      <div className="card-container">
        <img className="thumnail" src={bookImgSrc || "/tmp.jpg"} alt={title} />
        <div className="list">
          <div className="title">{title}</div>
          <div className="date">{date}</div>
          <div className="content">{content}</div>
        </div>
      </div>
      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: row;
          background-color: #d9d9d9;
          border-radius: 20px;
          padding: 20px;
          width: 48%;
          height: 230px;
          gap: 20px;
          cursor: pointer;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        }
        .list {
          display: flex;
          flex-direction: column;
          padding: 5px;
          gap: 5px;
        }
        .title {
          font-size: 20px;
          font-weight: 700;
        }
        .date {
          font-size: 12px;
        }
        .content {
          font-size: 14px;
        }
        .thumnail {
          width: 35%;
          height: 100%;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
};

export default BookReviewCard;
