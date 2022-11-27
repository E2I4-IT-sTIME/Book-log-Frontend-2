import { useState } from "react";
import BookSearchModal from "./BookSearchModal";
import Image from "next/image";

interface bookInfo {
  isbn: string;
  imgSrc: string;
  bookTitle: string;
  author: string;
  bookStory: string;
}

const BookSearch = (props: any) => {
  const [isSearch, setIsSearch] = useState(false);

  const [bookInfo, setBookInfo] = useState({
    isbn: "",
    imgSrc: "",
    bookTitle: "",
    author: "",
    bookStory: "",
  });

  const fetchBookInfo = (book: bookInfo) => {
    setBookInfo({
      ...bookInfo,
      isbn: book.isbn,
      imgSrc: book.imgSrc,
      bookTitle: book.bookTitle,
      author: book.author,
      bookStory: book.bookStory,
    });
  };

  return (
    <>
      <div>
        <p className="title">책 검색</p>
        <div className="book-search">
          <div
            className="book-img"
            onClick={() => {
              setIsSearch(true);
            }}
          >
            {bookInfo.imgSrc === "" ? (
              <div className="img-none">
                <p>
                  책을
                  <br />
                  등록해주세요
                </p>
                <p className="book-regist">책 등록하기</p>
              </div>
            ) : (
              <div className="thumnail">
                <img src={bookInfo.imgSrc} />
                <p className="msg">책 변경하기</p>
              </div>
            )}
          </div>
          <div className="book-info">
            <div>
              <p className="bold">책 제목</p>
              <p className="sub">{bookInfo.bookTitle}</p>
            </div>
            <div>
              <p className="bold">작가</p>
              <p className="sub">{bookInfo.author}</p>
            </div>
            <div>
              <p className="bold">줄거리</p>
              <p className="sub">
                {bookInfo.bookStory || "줄거리가 존재하지 않아요"}
              </p>
            </div>
          </div>
        </div>
        {isSearch && (
          <BookSearchModal
            isbnChangeHandler={props.isbnChangeHandler}
            closeModal={() => setIsSearch(!isSearch)}
            fetchBookInfo={fetchBookInfo}
          />
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          border-radius: 10px;
          width: fit-content;
          padding: 50px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        }
        p {
          margin: 0;
          font-size: 20px;
        }
        .title {
          color: #303030;
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 20px;
        }
        .book-search {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .book-regist {
          text-decoration: underline;
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
        }
        .book-img {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 300px;
          background-color: #d9d9d9;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          object-fit: cover;
          cursor: pointer;
        }
        .book-info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          margin-left: 30px;
          height: 300px;
          width: calc(100% - 200px);
        }
        .bold {
          font-size: 20px;
          font-weight: 700;
        }
        .sub {
          font-size: 16px;
          margin: 12px 0;
          height: 20px;
        }
        .thumnail {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .thumnail > img {
          transition: filter 0.3s ease-in-out;
        }
        .thumnail > img:hover {
          filter: blur(5px);
        }
        .thumnail > img:hover + .msg {
          opacity: 1;
        }
        .msg:hover + .thumnail > img {
          filter: blur(5px);
        }
        .thumnail > .msg:hover {
          opacity: 1;
        }

        .thumnail > .msg {
          position: absolute;
          top: 48%;
          left: 25%;
          opacity: 0;
          text-decoration: underline;
          transition: all 0.2s ease-in-out;
          color: white;
        }
      `}</style>
    </>
  );
};

export default BookSearch;
