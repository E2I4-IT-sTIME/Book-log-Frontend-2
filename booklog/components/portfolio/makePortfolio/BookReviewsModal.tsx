import { useState, useEffect } from "react";
import Button from "../common/Button";
import BookReviewCard from "./BookReviewCard";
import review from "./../../../pages/portfolio/review/index";

interface modalState {
  open: boolean;
  close: () => void;
  header: string;
  checkReviews: any;
  reviewArrHandler: (reviewArr) => void;
}

export default function BasicModal(props: modalState) {
  const { open, close, checkReviews, reviewArrHandler } = props;

  const [newCheckReviews, setNewCheckReviews] = useState([]);
  useEffect(() => {
    setNewCheckReviews(checkReviews);
  }, [checkReviews]);

  return (
    <div className={open ? "openModal modal" : "modal"} onClick={close}>
      {open ? (
        <section onClick={(e) => e.stopPropagation()}>
          <main>
            <div className="title">
              내가 작성한 서평 {checkReviews.length}건
            </div>
            <div className="review-list">
              {newCheckReviews.map((review) => (
                <div
                  className="card-box"
                  onClick={() => {
                    review.selected = !review.selected;
                  }}
                >
                  <BookReviewCard review={review} />
                </div>
              ))}
            </div>
          </main>
          <footer>
            <Button text="닫기" color="#FF6363" onClick={close} />
            <Button
              text="추가하기"
              color="#125B50"
              onClick={() => {
                reviewArrHandler(checkReviews);
                close();
              }}
            />
          </footer>
        </section>
      ) : null}
      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          padding: 25px 35px;
          gap: 15px;
        }
        .title {
          font-size: 30px;
          font-weight: 800;
        }
        .review-list {
          height: 600px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 2rem;
          column-gap: 2rem;
          padding-right: 10px;
          overflow-y: scroll;
        }
        .card-box {
          width: 48%;
          height: 230px;
          border-radius: 20px;
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
        .modal button {
          outline: none;
          cursor: pointer;
          border: 0;
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
        .modal > section > header {
          position: relative;
          padding: 16px 64px 16px 16px;
          background-color: #f1f1f1;
          font-weight: 700;
        }
        .modal > section > header button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          color: #999;
          background-color: transparent;
        }
        .modal > section > main {
          border-bottom: 1px solid #dee2e6;
          border-top: 1px solid #dee2e6;
        }
        .modal > section > footer {
          padding: 12px 16px;
          display: flex;
          justify-content: flex-end;
          gap: 20px;
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
