import BookSearch from "./BookSearch";
import Button from "../common/Button";
import { useState } from "react";
import { postReveiwData } from "../../api";
import { useRouter } from "next/router";

const BookReviewForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isbn, setIsbn] = useState("");
  const router = useRouter();

  const inputChangeHandler = (e: any) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "title": {
        setTitle(value);
        break;
      }
      case "content": {
        setContent(value);
        break;
      }
    }
  };

  const isbnChangeHandler = (isbn: string) => {
    setIsbn(isbn.split(" ")[0] || isbn.split(" ")[1]);
  };

  const postReview = async () => {
    const postData = {
      title: title,
      content: content,
      isbn: isbn,
    };
    console.log(postData);
    const IsOk = await postReveiwData(postData);
    if (IsOk) {
      alert("서평이 생성되었습니다!");
      setTitle("");
      setContent("");
      router.push("/portfolio/new");
    } else alert("잠시후 다시 시도해 주세요!");
  };

  return (
    <>
      <form className="container">
        <BookSearch isbnChangeHandler={isbnChangeHandler} />
        <div className="review">
          <label className="title">서평 제목</label>
          <input
            type="text"
            name="title"
            className="title-input"
            value={title}
            placeholder="서평 제목을 입력해주세요"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="review">
          <label className="title">서평 내용</label>
          <textarea
            className="content-input"
            placeholder="서평의 내용을 입력해주세요"
            name="content"
            value={content}
            onChange={inputChangeHandler}
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
