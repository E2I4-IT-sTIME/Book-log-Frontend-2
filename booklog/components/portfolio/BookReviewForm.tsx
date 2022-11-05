import BookSearch from "./BookSearch";
import Button from "./Button";

const BookReviewForm = () => {
  return (
    <>
      <form className="container">
        <BookSearch />
        <div className="review">
          <label className="title">서평 제목</label>
          <input
            type="text"
            className="title-input"
            placeholder="서평 제목을 입력해주세요"
          />
        </div>
        <div className="review">
          <label className="title">서평 내용</label>
          <textarea
            className="content-input"
            placeholder="서평의 내용을 입력해주세요"
          ></textarea>
        </div>
        <div className="btn-div">
          <Button color="#125B50" text="서평 저장하기" onClick={() => {}} />
        </div>
      </form>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            background: white;
            width: 100%;
            padding: 50px;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          }
          .review {
            display: flex;
            flex-direction: column;
            margin: 40px 0;
          }
          .title {
            color: #303030;
            font-size: 32px;
            font-weight: 900;
            margin-bottom: 20px;
          }
          .title-input {
            height: 50px;
            border: 1px solid #000000;
            padding-left: 10px;
            border-radius: 5px;
            font-size: 16px;
          }
          .content-input {
            height: 400px;
            border: 1px solid #000000;
            padding: 10px;
            border-radius: 5px;
            font-size: 16px;
            font-family: Pretendard;
          }
          .btn-div {
            display: flex;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  );
};

export default BookReviewForm;
