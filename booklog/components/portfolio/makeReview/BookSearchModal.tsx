import { useState } from 'react';
import { bookSearch } from '../common/fetchBook';
import BookInfoPrev from './BookInfoPrev';
import Image from 'next/image';

export default function BasicModal(props: any) {
  const { open, closeModal, fetchBookInfo, isbnChangeHandler } = props;
  const [books, setBooks] = useState(null);
  const [keyword, setKeyword] = useState('');

  console.log(Array.isArray(books));

  const onChangeKeword = (e: any) => {
    setKeyword(e.target.value);
  };
  const onSearchHandler = async (e: any) => {
    e.preventDefault();
    setBooks(await bookSearch(keyword));
  };

  const onClickBook = (book: any) => {
    isbnChangeHandler(book.isbn);
    fetchBookInfo({
      isbn: book.isbn,
      imgSrc: book.thumbnail,
      bookTitle: book.title,
      author: book.authors[0],
      bookStory: book.contents,
    });
    closeModal();
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'} onClick={closeModal}>
      {open ? (
        <section onClick={(e) => e.stopPropagation()}>
          <main>
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
              {Array.isArray(books) ? (
                books.length ? (
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
                )
              ) : (
                <div className="notice-text init">책을 검색해주세요</div>
              )}
            </div>
          </main>
        </section>
      ) : null}
      <style jsx>{`
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
        .init {
          top: 50%;
          left: 42%;
        }

        .list-box {
          width: 100%;
          height: 80%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 30px;

          margin-top: 40px;
          padding: 0px 20px 100px 20px;
          overflow-y: scroll;
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
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .modal > section {
          width: 90%;
          max-width: 1000px;
          margin: 0 auto;
          border-radius: 0.3rem;
          background-color: #fff;
          animation: modal-show 0.3s;
          overflow: hidden;
        }

        .modal > section > main {
          height: 800px;
          border-bottom: 1px solid #dee2e6;
          border-top: 1px solid #dee2e6;
          padding: 40px;
        }
        .modal.openModal {
          display: flex;
          align-items: center;
          animation: modal-bg-show 0.3s;
        }
        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }
        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
