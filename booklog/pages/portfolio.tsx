import { NextPage } from "next";
import BookReviewForm from "../components/portfolio/makeReview/BookReviewForm";
import PageTitle from "../components/portfolio/common/PageTitle";
import PortfolioNav from "../components/portfolio/common/PortfolioNav";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect, useState } from "react";
import PortfolioCard from "../components/portfolio/portfolioList/PortfolioCard";
import { request } from "../components/api";
import { userIndexState } from "../states/recoilUserIndex";
import { recoilKakakoState } from "../states/recoilKakaoRedirection";

const DUMMY = [
  {
    id: 1,
    title: "내가 1년 동안 자존감을\n 높였던 방법",
    sub: "자존감 밑바닥을 찍던 내가,\n 자존감을 높일 수 있었던 1년의 기록.",
    backgroundImg: "/portBackground.png",
    thumnailArr: ["/tmp.jpg", "/tmp.jpg", "/tmp.jpg"],
  },
  {
    id: 2,
    title: "내가 1년 동안 자존감을\n 높였던 방법",
    sub: "자존감 밑바닥을 찍던 내가,\n 자존감을 높일 수 있었던 1년의 기록.",
    backgroundImg: "/portBackground.png",
    thumnailArr: ["/tmp.jpg", "/tmp.jpg", "/tmp.jpg"],
  },
  {
    id: 3,
    title: "내가 1년 동안 자존감을\n 높였던 방법",
    sub: "자존감 밑바닥을 찍던 내가,\n 자존감을 높일 수 있었던 1년의 기록.",
    backgroundImg: "/portBackground.png",
    thumnailArr: ["/tmp.jpg", "/tmp.jpg", "/tmp.jpg"],
  },
  {
    id: 4,
    title: "내가 1년 동안 자존감을\n 높였던 방법",
    sub: "자존감 밑바닥을 찍던 내가,\n 자존감을 높일 수 있었던 1년의 기록.",
    backgroundImg: "/portBackground.png",
    thumnailArr: ["/tmp.jpg", "/tmp.jpg", "/tmp.jpg"],
  },
];

const portfolio: NextPage = () => {
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);
  const [userIndex, setUserIndex] = useRecoilState<String>(userIndexState);
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [portfolios, setPortfolios] = useState([]);

  const getPortfolios = async () => {
    const portfolios = await request(`/auth/user/${userIndex}/portfolios`);
    setPortfolios(portfolios);
    console.log(portfolios);
  };

  useEffect(() => {
    //getPortfolios();
    setIsRedirection(false);
    setLayoutState(CurrentLayout.Header);
  }, []);

  //portfolio 페이지
  const title = "포트폴리오 확인하기";
  const sub =
    "내가 엮은 포트폴리오를 확인하고,\n링크를 복사해 필요한 곳에 첨부해보세요!";
  return (
    <>
      <div className="container">
        <PortfolioNav />
        <PageTitle title={title} sub={sub} />
        <div className="portfolio-list">
          {DUMMY.map((card) => {
            return (
              <PortfolioCard
                key={card.id}
                title={card.title}
                sub={card.sub}
                backgroundImg={card.backgroundImg}
                thumnailArr={card.thumnailArr}
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .container {
          padding-left: 30%;
          padding-right: 5%;
          padding-top: 10%;
          padding-bottom: 20%;
          background: linear-gradient(#faf5e4 35%, #fff 10%);
          font-family: "Pretendard-Regular";
        }
        .portfolio-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
      `}</style>
    </>
  );
};

export default portfolio;
