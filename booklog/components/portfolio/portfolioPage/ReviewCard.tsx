const ReviewCard = (props) => {
  const { title, sub, content, date, isbn } = props.review;
  return (
    <>
      <div className="review-container">
        <div className="img-box">
          <img src={"" || "/defaultBookImg.jpg"}></img>
        </div>
        <div className="main">
          <div className="sub">{sub}</div>
          <div className="title">{title}</div>
          <div className="date">{date}</div>
          <div className="content">{content}</div>
        </div>
        <div className="delete">-</div>
      </div>
      <style jsx>{`
        .review-container {
          display: flex;
          flex-direction: row;
          background-color: white;
          border-radius: 20px;
          width: 48%;
          height: 300px;
          gap: 25px;
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
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
        .main {
          display: flex;
          flex-direction: column;
          width: 58%;
          padding: 5px;
          gap: 5px;
          padding: 30px 0;
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
          margin: 10px 0;
          line-height: 15px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
export default ReviewCard;
