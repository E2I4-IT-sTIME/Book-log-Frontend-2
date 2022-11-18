import Image from "next/image";

const BookReviewCard = (props) => {
  const { title, content, date, isbn } = props;
  return (
    <>
      <div className="card-container">
        <Image
          src="/tmp.jpg"
          alt=""
          width={120}
          height={180}
          style={{
            borderRadius: 20,
          }}
        />
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
      `}</style>
    </>
  );
};

export default BookReviewCard;
