import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { request } from "../../../components/api";
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
// dummy를 portfolio(state)로 바꿔야함
const DUMMY = {
  title: "내가 1년 동안\n자존감을 높였던 방법",
  username: "중규리",
  userimg: "/noSign.svg",
  sub: "자존감 밑바닥을 찍던 내가,\n 자존감을 높일 수 있었던 1년의 기록.",
  reveiws: [
    {
      id: 1,
      title: "서평 제목",
      sub: "마음이 답답할 때 꺼내보는 책",
      content:
        "독후감과 서평은 다음 세 가지 면에서 분명하게 구별됩니다. 첫째, 독후감이 정서적이라면, 서평은 논리적입니다.독후감은 감상을 담습니다.서평은 사유를 담습니다. 둘째, 독후감이 내향적이라면, 서평은 외향적입니다. 독후감은 독자만의 고유한 느낌을 표현하는 데 초점을 두지만, 서평은 읽어 줄 다른 이의 세계로 나아가고자 합니다. ",
      date: "2022-10-06",
      isbn: "8934908068",
    },
    {
      id: 2,
      title: "서평 제목",
      sub: "마음이 답답할 때 꺼내보는 책",
      content: "어쩌구저쩌구 내용",
      date: "2022-10-06",
      isbn: "8934908068",
    },
  ],
};

const portfolio = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isLogined, setisLogined] = useRecoilState(recoilLoginedState);
  const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [portfolio, setPortfolio] = useState({});

  const router = useRouter();
  const portId = router.query.port_id;

  const getPortfolio = async () => {
    const portfolio = await request(
      `/auth/user/${userIndex}/portfolios/${portId}`
    );
    setPortfolio(portfolio);
  };

  useEffect(() => {
    //getPortfolio();
    setLayoutState(CurrentLayout.WhiteHeader);
  }, []);

  const [checkReviews, setCheckReviews] = useState(
    DUMMY.reveiws.map((ele) => {
      return { ...ele, selected: true };
    })
  );

  const reviewArrHandler = (reviewArr) => {
    setCheckReviews(reviewArr);
    console.log(checkReviews);
  };

  return (
    <>
      <div className="portfolio-container">
        <header>
          <Link href="/">BOOKLOG.</Link>
        </header>
        <div className="main">
          <div className="text-box">
            <div className="title">{brText(DUMMY.title)}</div>
            <div className="user">
              <img className="userimg" src={DUMMY.userimg}></img>
              <div className="username">{DUMMY.username}</div>
            </div>
            <div className="sub">{brText(DUMMY.sub)}</div>
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
              {DUMMY.reveiws.map((review) => (
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
            url("/portBackground.png") no-repeat;
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
