import { NextPage } from "next";
import BookReviewForm from "../components/portfolio/makeReview/BookReviewForm";
import PageTitle from "../components/portfolio/common/PageTitle";
import PortfolioNav from "../components/portfolio/common/PortfolioNav";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect, useState } from "react";
import PortfolioCard from "../components/portfolio/portfolioList/PortfolioCard";
import { fetchPortfolioList } from "../components/api";
// import { userIndexState } from '../states/recoilUserIndex';
import { recoilKakakoState } from "../states/recoilKakaoRedirection";
import Seo from "../components/Seo";

const dummy = [
  {
    id: 1,
    title: "안녕",
    content: "ddddddddd",
    image: "/portBackground.png",
    isbn: ["8934908068", "8934908068", "8934908068"],
  },
];

const Portfolio: NextPage = () => {
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [portfolios, setPortfolios] = useState<any>([]);

  let userIndex: any;

  const getPortfolios = async () => {
    const fetchData = await fetchPortfolioList();
    setPortfolios(fetchData || []);
  };

  useEffect(() => {
    userIndex = localStorage.getItem("uid");
    getPortfolios();
    setIsRedirection(false);
    setLayoutState(CurrentLayout.Header);
  }, []);

  //portfolio 페이지
  const title = "포트폴리오 확인하기";
  const sub =
    "내가 엮은 포트폴리오를 확인하고,\n링크를 복사해 필요한 곳에 첨부해보세요!";
  return (
    <>
      <Seo
        title="Portfolio"
        content="Booklog - 포트폴리오를 채워줄 나의 서평들!"
      />
      <div className="container">
        <PortfolioNav />
        <PageTitle title={title} sub={sub} />
        <div className="portfolio-list">
          {portfolios.length
            ? portfolios.map((card: any) => {
                return (
                  <PortfolioCard
                    key={card.portfolio_id}
                    id={card.portfolio_id}
                    title={card.title}
                    content={card.content}
                    backgroundImg={card.image}
                    isbnArr={card.isbn}
                  />
                );
              })
            : "등록된 포트폴리오가 없습니다."}
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

export default Portfolio;
