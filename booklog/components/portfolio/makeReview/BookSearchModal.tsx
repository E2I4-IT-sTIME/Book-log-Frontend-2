import triangle from "../image/triangle.png";
import Image from "next/image";
import { useState } from "react";
import BookInfoPrev from "./BookInfoPrev";
import router from "next/router";
import axios from "axios";

const Kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

const kakaoSearch = (params: any) => {
  return Kakao.get("/v3/search/book", { params });
};

const BookSearchModal = (props: any) => {
  const { closeModal, fetchBookInfo } = props;
  const [books, setBooks] = useState([]);
  const [isEmpty, setEmpty] = useState(false);
  const [keyword, setKeyword] = useState("");

  const onChangeKeword = (e: any) => {
    setKeyword(e.target.value);
  };
  const onSearchHandler = (e: any) => {
    e.preventDefault();
    search();
  };

  const onClickBook = (book: any) => {
    fetchBookInfo({
      imgSrc: book.thumbnail,
      bookTitle: book.title,
      author: book.authors[0],
      bookStory: book.contents,
    });
    closeModal();
  };

  const search = async () => {
    const searchKey = keyword;
    try {
      if (searchKey === "") {
        setBooks([]);
        setEmpty(false);
        return;
      }
      const params = {
        query: searchKey,
        size: 45,
        target: "title",
      };
      const result = await kakaoSearch(params);

      if (result) {
        setBooks(result.data.documents);
        if (result.data.documents.length === 0) setEmpty(false);
        else setEmpty(true);
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="container" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="title">책 검색</div>
          <div className="input-box">
            <input
              type="text"
              placeholder="책 이름을 검색해보세요."
              onChange={onChangeKeword}
            />
            <button className="search" onClick={onSearchHandler}>
              검색
            </button>
          </div>
          <div className="book-list">
            {isEmpty ? (
              <div className="list-box">
                {books.map((book: any) => (
                  <div onClick={() => onClickBook(book)} key={book.isbn}>
                    <BookInfoPrev
                      imgSrc={book.thumbnail}
                      bookTitle={book.title}
                      author={book.authors[0]}
                      publisher={book.publisher}
                      dateTime={book.datetime}
                      content={book.contents}
                      url={book.url}
                    ></BookInfoPrev>
                  </div>
                ))}
              </div>
            ) : (
              <div className="notice">
                <Image
                  className="triangle"
                  src="/triangle.png"
                  alt="경고"
                  width="370px"
                  height="330px"
                />
                <div className="notice-text">
                  <div className="small">검색결과가 없어요!</div>
                  <div>다른 검색어로 검색해주세요</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
          width: 100%;
          height: 250vh;
          background-color: rgba(0, 0, 0, 0.4);
        }

        .modal {
          display: flex;
          flex-direction: column;
          margin: 10% auto;
          border-radius: 10px;
          background: white;
          width: 85%;
          height: 140vh;
          padding: 50px;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
        }
        .title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        input {
          width: 60%;
          height: 50px;
          border: 1px solid black;
          border-radius: 5px;
          padding: 0 15px;
          margin-right: 20px;
          font-size: 14px;
        }
        .search {
          width: 7%;
          height: 50px;
          color: white;
          background-color: #125b50;
          border: none;
          border-radius: 5px;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }
        .book-list {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          height: 100%;
        }
        .notice {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .notice-text {
          font-size: 40px;
          font-weight: 800;
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .small {
          font-size: 36px;
        }

        .list-box {
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 3rem;
          column-gap: 4rem;
          margin-top: 40px;
          padding: 0px 0px 100px 0px;
          overflow-y: scroll;
        }
      `}</style>
    </>
  );
};

export default BookSearchModal;
