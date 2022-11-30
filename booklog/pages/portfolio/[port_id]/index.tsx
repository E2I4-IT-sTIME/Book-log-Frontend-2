import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { fetchPortfolio, request } from "../../../components/api";
import { brText } from "../../../components/portfolio/common/brText";
import ThumnailCard from "../../../components/portfolio/common/thumnailCard";
import BookReviewsModal from "../../../components/portfolio/makePortfolio/BookReviewsModal";
import ReviewCard from "../../../components/portfolio/portfolioPage/ReviewCard";
import {
  ClubLayoutState,
  CurrentLayout,
} from "../../../states/recoilLayoutState";
import { recoilLoginedState } from "../../../states/recoilLogiendState";
import { userIndexState } from "../../../states/recoilUserIndex";

const portfolio = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isLogined, setisLogined] = useRecoilState(recoilLoginedState);
  const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [portfolio, setPortfolio] = useState({
    title: "",
    image: "",
    content: "",
    reviewResList: [],
  });
  const [checkReviews, setCheckReviews] = useState([]);

  const router = useRouter();
  const portId = router.query.port_id;

  const getPortfolio = async () => {
    const portfolio = await fetchPortfolio(userIndex, portId);
    setPortfolio(portfolio);
    setCheckReviews(
      portfolio.reviewResList.map((ele) => {
        return { ...ele, selected: true };
      })
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    getPortfolio(portId);
    setLayoutState(CurrentLayout.WhiteHeader);
  }, [router.isReady]);

  const reviewArrHandler = (reviewArr) => {
    setCheckReviews(reviewArr);
  };

  return (
    <>
      <div className="portfolio-container">
        <header>
          <Link href="/">BOOKLOG.</Link>
        </header>
        <div className="main">
          <div className="text-box">
            <div className="title">{brText(portfolio.title)}</div>
            <div className="user">
              <img className="userimg" src={portfolio.image}></img>
              <div className="username">이름</div>
            </div>
            <div className="sub">{brText(portfolio.content)}</div>
          </div>
          <div className="side-box">
            {isLogined ? (
              <div className="buttons">
                <button className="del">삭제</button>
                <button className="share">공유</button>
              </div>
            ) : (
              ""
            )}
            <div className="bookimges">
              {portfolio.reviewResList.map((review) => (
                <ThumnailCard isbn={review.isbn} />
              ))}
            </div>
          </div>
        </div>
        <div className="content">
          {checkReviews
            .filter((review) => review.selected)
            .map((review) => (
              <div className="card-box">
                <ReviewCard review={review} />
              </div>
            ))}
          {isLogined ? (
            <div
              className="add-reveiw"
              onClick={() => {
                setIsSearch(true);
              }}
            >
              서평 추가하기
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <BookReviewsModal
        open={isSearch}
        close={() => {
          setIsSearch(false);
        }}
        checkReviews={checkReviews}
        reviewArrHandler={reviewArrHandler}
        header="서평모달"
      />
      <style jsx>{`
        .portfolio-container {
          display: flex;
          flex-direction: column;
          padding: 40px 5% 20% 5%;
          gap: 50px;
          background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 10%,
              rgba(0, 0, 0, 0.5) 25%,
              rgba(0, 0, 0, 0.7) 40%,
              rgba(0, 0, 0, 1) 50%,
              rgba(0, 0, 0, 1) 75%,
              rgba(0, 0, 0, 1) 100%
            ),
            url(${portfolio.image || "/portBackground.png"}) no-repeat;
          background-size: 100% auto;
        }
        header {
          color: #fff;
          font-size: 48px;
          font-weight: 900;
          text-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          margin-left: 5px;
        }
        .main {
          display: flex;
          justify-content: space-between;
          font-family: "Pretendard-Regular";
        }
        .text-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
          color: white;
        }
        .card-box {
          width: 48%;
          height: 300px;
        }
        .side-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .title {
          font-size: 25px;
          font-weight: 700;
        }
        .sub {
          font-size: 14px;
        }
        .user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        img {
          width: 50px;
        }
        .content {
          height: 600px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 3rem;
          column-gap: 3rem;
          padding-right: 10px;
        }
        button {
          font-size: 14px;
          font-weight: 700;
          padding: 8px 15px;
          margin-left: 10px;
          border-radius: 10px;
          color: white;
          border: none;
          cursor: pointer;
        }
        .del {
          background-color: #ff6363;
        }
        .share {
          background-color: #125b50;
        }
        .bookimges {
        }
        .add-reveiw {
          height: 300px;
          width: 14%;
          background-color: #474747;
          color: white;
          border-radius: 20px;
          text-align: center;
          line-height: 300px;
          font-weight: 800;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default portfolio;
