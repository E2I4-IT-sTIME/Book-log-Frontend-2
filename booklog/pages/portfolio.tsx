import { NextPage } from "next";
import BookReviewForm from "../components/portfolio/BookReviewForm";
import PageTitle from "../components/portfolio/PageTitle";
import PortfolioNav from "../components/portfolio/PortfolioNav";

const DUMMY = [
  {
    title: "",
    sub: "",
  },
];

const portfolio: NextPage = () => {
  //portfolio 페이지
  const title = "포트폴리오 확인하기";
  const sub =
    "내가 엮은 포트폴리오를 확인하고,\n링크를 복사해 필요한 곳에 첨부해보세요!";
  return (
    <>
      <div className="container">
        <PortfolioNav />
        <PageTitle title={title} sub={sub} />
        <div className="portfolio-list"></div>
      </div>
      <style jsx>{`
        .container {
          padding-left: 30%;
          padding-right: 5%;
          padding-top: 10%;
          padding-bottom: 20%;
          background: linear-gradient(#faf5e4 35%, #fff 10%);
        }
      `}</style>
      <style jsx>{`
        .dd {
          margin-top: 500px;
        }
        .container {
          padding-left: 30%;
          padding-right: 5%;
          padding-top: 10%;
          padding-bottom: 20%;
          background: linear-gradient(#faf5e4 35%, #fff 10%);
        }
      `}</style>
    </>
  );
};

export default portfolio;
