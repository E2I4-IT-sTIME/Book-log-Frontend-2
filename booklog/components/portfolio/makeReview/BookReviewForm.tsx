import BookSearch from "./BookSearch";
import Button from "../common/Button";
import { useState } from "react";
import { userIndexState } from "../../../states/recoilUserIndex";
import { useRecoilState } from "recoil";
import { postReveiwData } from "../../api";

const BookReviewForm = () => {
  const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isbn, setIsbn] = useState("");
  const titleChangeHandler = (e: any) => {
    setTitle(e.target.value);
  };
  const contentChangeHandler = (e: any) => {
    setContent(e.target.value);
  };
  const isbnChangeHandler = (isbn) => {
    setIsbn(isbn.split(" ")[0]);
  };

  const postReview = async () => {
    const postData = {
      title: title,
      content: content,
      isbn: isbn,
    };

    const IsOk = await postReveiwData(postData, userIndex);
    if (IsOk) alert("서평이 생성되었습니다!");
  };

  return (
    <>
      <form className="container">
        <BookSearch isbnChangeHandler={isbnChangeHandler} />
        <div className="review">
          <label className="title">서평 제목</label>
          <input
            type="text"
            className="title-input"
            placeholder="서평 제목을 입력해주세요"
            onChange={titleChangeHandler}
          />
        </div>
        <div className="review">
          <label className="title">서평 내용</label>
          <textarea
            className="content-input"
            placeholder="서평의 내용을 입력해주세요"
            onChange={contentChangeHandler}
          ></textarea>
        </div>
        <div className="btn-div">
          <Button
            color="#125B50"
            text="서평 저장하기"
            onClick={() => postReview()}
          />
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
            font-size: 28px;
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
