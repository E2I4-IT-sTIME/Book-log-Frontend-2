import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recoilLoginedState } from '../../../states/recoilLogiendState';
import DeleteButton from '../common/DeleteButton';
import { bookImgSearch } from '../common/fetchBook';

const ReviewCard = (props) => {
  const [isLogined, setisLogined] = useRecoilState(recoilLoginedState);
  const { review_id, title, content, createDate, isbn } = props.review;
  const date = createDate.substr(0, 10);

  const subConent = () => {
    if (content.length > 220) {
      return content.substr(0, 220) + '...';
    } else return content;
  };

  const [bookImgSrc, setBookImgSrc] = useState('');

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
          <img src={bookImgSrc || '/defaultBookImg.jpg'}></img>
        </div>
        <div className="text-box">
          <div className="main">
            <div className="title">{title}</div>
            <div className="date">{date}</div>
            <div className="content">{subConent()}</div>
          </div>
          {isLogined ? (
            <DeleteButton id={review_id} text="-" onClick={props.onClick} />
          ) : (
            ''
          )}
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
          transition: all 0.2s ease-in-out;
        }
        .review-container:hover {
          margin-top: -1px;
          margin-left: 0px;
          transform: scale(1.03, 1.03);
        }
        .img-box {
          width: 30%;
          height: 100%;
          background: url('/defaultBookImg.jpg') no-repeat;
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
        .content {
          font-size: 15px;
        }
      `}</style>
    </>
  );
};
export default ReviewCard;
